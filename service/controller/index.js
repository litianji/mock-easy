import BaseRequest from './base'
import ApisStorage from '../service/api-list'
import ProjectStorage from '../service/project'

class Mock extends BaseRequest {
  async requestHandle () {
    // method
    let method = this.request.method

    // find mock data
    let { projectId, url } = this.parseUrl(this.request.uri)
    let { code, mode } = await this.findApiData(method, projectId, url)

    this.setStatusCode(code)
    return mode
  }

  parseUrl (uri) {
    let allPath = (uri + '/').replace('/mock/', '')
    let [projectId, ...url] = allPath.split('/')
    return {
      projectId,
      url: '/' + url.filter(item => item).join('/')
    }
  }

  async findApiData (method, projectId, url) {
    let project = await ProjectStorage.find(projectId)
    let mocks = await ApisStorage.find(projectId)

    if (!mocks) {
      return {
        code: 404
      }
    }

    let contextUrl = project.url

    // mapping
    let mockData = mocks.find(item => (this.concatUrl(contextUrl, item.url) === url))

    if (!mockData) {
      return {
        code: 404
      }
    }

    if (mockData.method.toLocaleUpperCase() !== method.toLocaleUpperCase()) {
      return {
        code: 405
      }
    }
    return {
      code: 200,
      mode: mockData.mode
    }
  }

  concatUrl (url1, url2) {
    let url1a = (url1 + '').split('/')
    let url2a = (url2 + '').split('/')

    return '/' + [...url1a, ...url2a].filter(item => item).join('/')
  }
}

let handles = [
  ['/mock', Mock]
]
export default handles
