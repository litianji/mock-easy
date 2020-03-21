import axios from 'axios'
import { Message } from 'element-ui'
import { getApiList } from './index'

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

// 获取所有项目
let getProjects = (config) => {
  return new Promise((resolve, reject) => {
    createRequestByToken(null, config.onlineUrl)
      .post('/u/login', {
        name: config.onlineUserName,
        password: config.onlineUserPassword
      })
      .then(res => {
        let body = res.data.data
        if (body && body.token) {
          createRequestByToken(body.token, config.onlineUrl).get('/project').then(res => {
            let projects = res.data.data
            Promise.all(
              projects
                .map(item => getApiList({
                  id: item._id,
                  token: body.token,
                  baseUrl: config.onlineUrl
                }))
            )
            .then(res => {
              resolve({
                projects,
                apiLists: res.reduce((res, current) => {
                  res[current.data.project._id] = current.data
                  return res
                }, {})
              })
            })
            
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