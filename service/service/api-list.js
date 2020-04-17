import BaseStorage from './base'
import { API_LIST } from '../../constant'

export default class ApisStorage extends BaseStorage {
  static async add (projectId, api) {
    if(!api._id) {
      api._id = this.createId()
    }
    let apis = await this.find(projectId)
    if (!apis || !apis.length) {
      apis = [api]
    } else {
      apis.push(api)
    }
    let data = {}
    let key = `${API_LIST}_${projectId}`
    data[key] = apis
    let res = await this.set(data)
    return res
  }

  static async adds (projectId, apis) {
    if(Object.prototype.toString.call(apis) !== '[object Array]') {
      return new Error('array must')
    }
    let _apis = await this.find(projectId)
    if(_apis) {
      _apis.concat(apis)
    }else {
      _apis = apis
    }
    let data = {}
    let key = `${API_LIST}_${projectId}`
    data[key] = _apis
    let res = await this.set(data)
    return res

  }

  static async del (projectId, apiId) {
    if (apiId) {
      let apis = await this.find(projectId)
      if (!apis) {
        return new Error('can not find project!')
      }
      apis = apis.filter(api => api._id !== apiId)
      let data = {}
      let key = `${API_LIST}_${projectId}`
      data[key] = apis
      let res = await this.set(data)
      return res
    } else {
      let key = `${API_LIST}_${projectId}`
      let res = await this.remove(key)
      return res
    }
  }

  static async update (projectId, api) {
    if (!api) {
      return
    }
    let apis = await this.find(projectId)
    if (!apis) {
      return new Error('can not find project!')
    }
    apis = (apis || []).map(_api => {
      if(_api._id === api._id) {
        return {
          ..._api,
          ...api
        }
      }
      return _api
    })

    let data = {}
    let key = `${API_LIST}_${projectId}`
    data[key] = apis
    let res = await this.set(data)
    return res
  }

  static async find (projectId, apiId) {
    if(!projectId){
      return []
    }
    let key = `${API_LIST}_${projectId}`
    if (apiId) {
      return (this.get(key) || []).find(item => item._id === apiId)
    } else {
      return this.get(key) || []
    }
  }
}
