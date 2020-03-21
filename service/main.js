
import controller from './controller'

const { chrome, WSC } = window

chrome.app.runtime.onLaunched.addListener(init)
chrome.app.runtime.onRestarted.addListener(init)

function init () {
  let win, webServer

  // console.log(chrome.storage.local)
  chrome.storage.local.get(null, function (data) {
    openWindow('index.html')
  })

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
  })

  function startWebserver (port) {
    let _resolve = null
    let p = new Promise((resolve, reject) => (_resolve = resolve))
    chrome.storage.local.get(null, function (data) {
      let _port = port || data.port
      if (!_port) {
        chrome.storage.local.set({port: 8089}, function () {
          console.log('port is 8089')
          _port = 8089
        })
      }
      webServer && webServer.stop()
      webServer = new WSC.WebApplication({
        host: '0.0.0.0',
        port: _port,
        optBackground: true,
        renderIndex: true,
        handlers: controller
      })

      webServer.start()

      _resolve({
        host: '127.0.0.1',
        port: _port
      })
    })

    return p
  }

  function openWindow (path) {
    if (win) win.close()
    chrome.system.display.getInfo(function (d) {
      chrome.app.window.create(path, {
        // 'frame': 'none',
        'id': 'browser',
        // 'state': 'fullscreen',
        'bounds': {
          'left': 0,
          'top': 0,
          'width': d[0].bounds.width,
          'height': d[0].bounds.height
        }
      }, function (w) {
        win = w
      })
    })
  }

  // 保存项目数据
  function saveProject (projectList) {
    chrome.storage.local.set({'projectList': projectList})
  }

  function getProject () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('projectList', (data) => {
        resolve(data.projectList)
      })
    })
  }

  window.saveProject = saveProject
  window.getProject = getProject
  window.startWebserver = startWebserver
  window.openWindow = openWindow
}
