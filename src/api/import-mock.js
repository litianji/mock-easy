import axios from 'axios'
import { Message } from 'element-ui'

let createRequestByToken = (token, domain) => {
  let instance = axios.create({
    baseURL: domain + '/api',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  instance.interceptors.response.use(response => {
    if (!response.data.success) {
      Message.error(response.data.message +'\n' + response.config.url)
    }
    return response
  }, error => {
    Message.error(error)
  })

  return instance
}

let getProjects = (config) => {
  return new Promise((resolve, reject) => {
    createRequestByToken(null, config.onlineUrl)
      .post('/u/login', {
        name: config.onlineUserName,
        password: config.onlineUserPassword
      })
      .then(res => {
        const body = res.data.data
        if (body && body.token) {
          createRequestByToken(body.token, config.onlineUrl).get('/project').then(res => {
            res.data.token = body.token
            resolve(res.data.data)
          })
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export {
  getProjects
}