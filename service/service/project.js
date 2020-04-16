import BaseStorage from './base'
import ApisStorage from './api-list'
import { PROJECT } from '../../constant'

export default class ProjectStorage extends BaseStorage {
  static async add (project) {
    if (!project._id) {
      project._id = this.createId()
    }
    
    let key = `${PROJECT}_${project._id}`
    let data = {}
    data[key] = project
    let res = await this.set(data)
    return res
  }

  static async adds (projects) {
    if(Object.prototype.toString.call(projects) !== '[object Array]') {
      return new Error('must array')
    }
    for(let i in projects) {
      await this.add(projects[i])
    }
  }

  static async del (projectId) {
    let key = `${PROJECT}_${projectId}`
    let res = await this.remove(key)
    await ApisStorage.del(projectId)
    return res
  }

  static async update (project) {
    let old = await this.find(project._id)
    old = {
      ...old,
      ...project
    }
    
    let key = `${PROJECT}_${project._id}`
    let nData = {}
    nData[key] = old
    let res = await this.set(nData)
    return res
  }

  static async find (projectId) {
    if(projectId) {
      let project = await this.get(`${PROJECT}_${projectId}`)
      return project
    } else {
      let storage = await this.get()
      let projects = Object.keys(storage).filter(key => key.includes(PROJECT)).map(key => storage[key])
      return projects
    }
  }
}
