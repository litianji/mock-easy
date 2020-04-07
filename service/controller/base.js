const { WSC } = window

export default class BaseRequest extends WSC.BaseHandler {
  constructor () {
    super()
    this.statusCode = 200
  }

  async get () {
    await this.requestFilter()
  }

  async post () {
    await this.requestFilter()
  }

  async put () {
    await this.requestFilter()
  }

  async delete () {
    await this.requestFilter()
  }

  async patch () {
    await this.requestFilter()
  }

  async requestHandle () {
    // must rewrite
    return {
      code: 400,
      msg: 'can not find request handle'
    }
  }

  async requestFilter () {
    // must keep-alive
    this.request.headers['connection'] = 'keep-alive'

    // response headers
    this.setHeader('Content-Type', 'application/json; charset=utf-8')
    this.setHeader('Access-Control-Allow-Origin', '*')

    try {
      let respose = await this.requestHandle()
      let buf = new TextEncoder('utf-8').encode(respose).buffer
      this.write(buf, this.statusCode || 200)
    } catch (error) {
      this.write(error + '', 400)
    }

    this.finish()
  }

  setStatusCode (code) {
    this.statusCode = code
  }
}
