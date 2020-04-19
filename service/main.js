
import ProjectStorage from './service/project'
import ApisStorage from './service/api-list'
import HttpServer from './service/http'

// background server api
window.ProjectStorage = ProjectStorage
window.ApisStorage = ApisStorage
window.HttpServer = HttpServer

const { chrome } = window
chrome.app.runtime.onLaunched.addListener(init)
chrome.app.runtime.onRestarted.addListener(init)
chrome.runtime.onInstalled.addListener(init)

function init () {
  let win

  chrome.storage.local.get(null, function (data) {
    openWindow('index.html')
  })

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
  })

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
          'width': 1100,
          'height': 700
        }
      }, function (w) {
        win = w
      })
    })
  }

  // window.startWebserver = startWebserver
  window.openWindow = openWindow
}
