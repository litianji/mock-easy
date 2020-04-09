import controller from '../controller'
import { saveConfig, getConfig } from './local'
import defaultConfig from '../../config'

const { WSC } = window
let webServer

function startWebserver (cport) {
  return new Promise((resolve, reject) => {
    getConfig().then(config => {
      let { port, fileFolder, startUp, sleep, host } = config
      config.port = cport || port || defaultConfig.port
      config.fileFolder = fileFolder || ''
      config.startUp = startUp || defaultConfig.startUp.default
      config.sleep = sleep || defaultConfig.sleep.default
      config.host = '127.0.0.1' || host || defaultConfig.host
      // 启动服务
      webServer && webServer.stop()
      webServer = new WSC.WebApplication({
        host: config.host,
        port: config.port,
        optBackground: true,
        renderIndex: true,
        handlers: controller
      })
      webServer.start()

      resolve({
        ...config,
        host: '127.0.0.1'
      })

      // 保存端口
      saveConfig(config)
    }).catch((e) => {
      reject(e)
    })
  })
}

function stopServer () {
  webServer && webServer.stop()
}

window.startWebserver = startWebserver
window.stopServer = stopServer

export {
  startWebserver,
  stopServer
}
