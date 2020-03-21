
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

let handles = [
  Router.post('/test', testHandle)
]
export default handles
