import controller from '../controller'
import { saveConfig, getConfig } from './local'

const { WSC } = window
let webServer
let defaultPort = 8089

function startWebserver (port) {
  return new Promise((resolve, reject) => {
    getConfig().then(config => {
      // 获取端口
      let _port = port || config.port || defaultPort
      // 启动服务
      webServer && webServer.stop()
      webServer = new WSC.WebApplication({
        host: config.host,
        port: _port,
        optBackground: true,
        renderIndex: true,
        handlers: controller
      })
      webServer.start()

      resolve({
        ...config,
        host: '127.0.0.1',
        port: _port
      })

      // 保存端口
      saveConfig({port: _port})
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
