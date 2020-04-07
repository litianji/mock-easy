
// import controller from './controller'
import { getConfig, saveConfig } from './service/local'
import { startWebserver } from './service/web'
import defaultConfig from '../config'

const { chrome } = window

getConfig().then(config => {
  let { port, fileFolder, startUp, sleep, host } = config
  config.port = port || defaultConfig.port
  config.fileFolder = fileFolder || ''
  config.startUp = startUp || defaultConfig.startUp.default
  config.port = sleep || defaultConfig.sleep.default
  config.host = '127.0.0.1' || host || defaultConfig.host

  saveConfig(config)

  if (startUp === 0) {
    startWebserver()
  }
})

chrome.app.runtime.onLaunched.addListener(init)
chrome.app.runtime.onRestarted.addListener(init)

function init () {
  let win

  chrome.storage.local.get(null, function (data) {
    openWindow('index.html')
  })

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
  })

  // 启动服务
  startWebserver()

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

  // window.startWebserver = startWebserver
  window.openWindow = openWindow
}
