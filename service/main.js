
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
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({'projectList': projectList}, function () {
        getProject().then(data => {
          resolve(data)
        })
      })
    })
  }

  function saveApiLists (apiLists) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ apiLists }, function () {
        getApiLists().then(data => {
          resolve(data)
        })
      })
    })
  }

  function getProject () {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('projectList', (data) => {
        resolve(data.projectList)
      })
    })
  }

  function getApiLists (id) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('apiLists', (data) => {
        if (data) {
          resolve(id ? data.apiLists[id] : data.apiLists)
        } else {
          resolve({})
        }
      })
    })
  }

  function delProject (id) {
    return new Promise((resolve, reject) => {
      // 删除项目
      getProject().then(data => {
        if (!data || !data.length) {
          return
        }
        if (id) {
          data = data.filter(item => item._id !== id)
        } else {
          data = []
        }
        saveProject(data).then(left => {
          resolve(left)
          delApiList(id)
        })
      })
    })
  }

  function delApiList (id) {
    return new Promise((resolve, reject) => {
      getApiLists().then(data => {
        if (!data) {
          return
        }

        if (id) {
          delete data[id]
        } else {
          data = {}
        }

        saveApiLists(data).then(left => {
          resolve(left)
        })
      })
    })
  }

  function updateApi ({projectId, mock}) {
    return new Promise((resolve, reject) => {
      getApiLists().then(data => {
        if (!data) {
          return reject(data)
        }

        if (data[projectId]) {
          data[projectId].mock = mock
          saveApiLists(data)
          return resolve(data)
        }
      })
    })
  }

  window.saveProject = saveProject
  window.saveApiLists = saveApiLists
  window.getProject = getProject
  window.getApiLists = getApiLists
  window.delProject = delProject
  window.updateApi = updateApi
  window.startWebserver = startWebserver
  window.openWindow = openWindow
}
