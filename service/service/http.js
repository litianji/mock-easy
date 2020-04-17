import controller from '../controller'
import BaseStorage from './base'
import defaultConfig from '../../config'
import { CONFIG } from '../../constant'
const { WSC } = window
export default class HttpServer extends BaseStorage {
  constructor () {
    super()
    this.webServer = null
  }

  static async getConfig () {
    let res = await this.get(CONFIG)
    return res || {}
  }

  static async saveConfig (config) {
    let _config = await this.getConfig()
    let data = {}
    data[CONFIG] = {
      ..._config,
      ...config
    }
    let res = await this.set(data)
    return res
  }

  static async startWebserver (cport) {
    let config = await this.getConfig()
    let { port, fileFolder, startUp, sleep } = config
    config.port = cport || port || defaultConfig.port
    config.fileFolder = fileFolder || ''
    config.startUp = startUp || defaultConfig.startUp.default
    config.sleep = sleep || defaultConfig.sleep.default
    config.host = defaultConfig.host
    // 启动服务
    this.webServer && this.webServer.stop()
    this.webServer = new WSC.WebApplication({
      host: config.host,
      port: config.port,
      optBackground: true,
      renderIndex: true,
      handlers: controller
    })
    this.webServer.start()

    // 保存端口
    this.saveConfig(config)

    return {
      ...config,
      host: '127.0.0.1'
    }
  }

  static stopServer () {
    this.webServer && this.webServer.stop()
  }
}
