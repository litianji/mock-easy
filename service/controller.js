
const { chrome, WSC, _ } = window

class Router {
  static post (mapping, handle) {
    function HttpHandler () {
      WSC.BaseHandler.prototype.constructor.call(this)
    }

    HttpHandler.prototype = {
      post () {
        chrome.storage.local.get(null, function (data) {
          this.setHeader('content-type', 'text/json')
          let body = handle(this)
          let buf = new TextEncoder('utf-8').encode(JSON.stringify(body)).buffer
          this.write(buf)
          this.finish()
        }.bind(this))
      },
      get () {
        chrome.storage.local.get(null, function (data) {
          this.setHeader('content-type', 'text/json')
          var buf = new TextEncoder('utf-8').encode(JSON.stringify({code: 405, msg: 'bad request'})).buffer
          this.write(buf)
          this.finish()
        }.bind(this))
      }
    }

    _.extend(HttpHandler.prototype, WSC.BaseHandler.prototype)
    return [mapping, HttpHandler]
  }
}

function testHandle (ctx) {
  console.log(ctx)

  return {
    code: 0,
    msg: 'test success'
  }
}

class Mock extends WSC.BaseHandler {
  async get () {
    await this.requestHandle()
  }

  async post () {
    await this.requestHandle()
  }

  async put () {
    await this.requestHandle()
  }

  async requestHandle () {
    // must keep-alive
    this.request.headers['connection'] = 'keep-alive'

    // method
    let method = this.request.method

    // find mock data
    let { projectId, url } = this.parseUrl(this.request.uri)
    let { code, mode } = await this.findApiData(method, projectId, url)

    // response
    this.setHeader('Content-Type', 'application/json; charset=utf-8')
    this.setHeader('Access-Control-Allow-Origin', '*')
    let buf = new TextEncoder('utf-8').encode(mode).buffer
    this.write(buf, code)
    this.finish()
  }

  parseUrl (uri) {
    let allPath = (uri + '/').replace('/mock/', '')
    let [projectId, ...url] = allPath.split('/')
    return {
      projectId,
      url: '/' + url.filter(item => item).join('/')
    }
  }

  async findApiData (method, id, url) {
    let res = await window.getApiLists(id)
    if (!res) {
      return {
        code: 404
      }
    }

    let { mocks, project } = res
    let contextUrl = project.url

    console.log(url, this.concatUrl(contextUrl, mocks[0].url))
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
  Router.post('/test', testHandle),
  ['/mock', Mock]
]
export default handles
