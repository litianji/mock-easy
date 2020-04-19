import controller from '../controller'
import BaseStorage from './base'
import defaultConfig from '../../config'
import { CONFIG } from '../../constant'
const { WSC, chrome } = window
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

  static async startWebserver (config = {}) {
    // init config
    let _config = await this.getConfig()
    let { port, retainstr, startUp, sleep } = _config
    _config.port = config.port || port || defaultConfig.port
    _config.retainstr = config.retainstr || retainstr || ''
    _config.startUp = config.startUp || startUp || defaultConfig.startUp.default
    _config.sleep = config.sleep || sleep || defaultConfig.sleep.default
    _config.host = defaultConfig.host

    // static file service
    if (_config.retainstr && _config.retainstr !== '-1') {
      let entry = await this.restoreEntry(_config.retainstr)
      let displayPath = await this.displayPath(entry)
      _config.fileFolder = displayPath

      let fs = new WSC.FileSystem(entry)
      controller.push(['.*', WSC.DirectoryEntryHandler.bind(null, fs)])
    } else {
      _config.retainstr = ''
      _config.fileFolder = ''
    }

    // network
    try {
      let network = await this.getNetworkInterfaces()
      _config.network = network
    } catch (error) {
      console.log(error)
    }

    // start
    this.webServer && this.webServer.stop()
    this.webServer = new WSC.WebApplication({
      host: _config.host,
      port: _config.port,
      optPreventSleep: _config.sleep === 1,
      optBackground: true,
      optAutoStart: _config.startUp === 1,
      renderIndex: false,
      handlers: controller
    })
    this.webServer.start()

    // save
    this.saveConfig(_config)

    return {
      ..._config,
      host: '127.0.0.1'
    }
  }

  static stopServer () {
    this.webServer && this.webServer.stop()
  }

  static choosefolder () {
    return new Promise((resolve, reject) => {
      chrome.fileSystem.chooseEntry({type: 'openDirectory'}, (entry) => {
        if (entry) {
          var retainstr = chrome.fileSystem.retainEntry(entry)
          resolve(retainstr)
        } else {
          reject(entry)
        }
      })
    })
  }

  static restoreEntry (retainstr) {
    return new Promise((resolve, reject) => {
      chrome.fileSystem.restoreEntry(retainstr, (entry) => {
        if (entry) {
          resolve(entry)
        } else {
          reject(entry)
        }
      })
    })
  }

  static displayPath (entry) {
    return new Promise((resolve, reject) => {
      chrome.fileSystem.getDisplayPath(entry, (path) => {
        if (path) {
          resolve(path)
        } else {
          reject(path)
        }
      })
    })
  }

  static getNetworkInterfaces () {
    return new Promise((resolve, reject) => {
      chrome.system.network.getNetworkInterfaces((result) => {
        if (result) {
          resolve(result[1].address)
        } else {
          resolve(result)
        }
      })
    })
  }
}
