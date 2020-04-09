import http from './httpInstance'
import store from '../store'

let test = (params) => {
  return http({
    method: 'post',
    url: '/test',
    baseURL: store.state.baseUrl,
    params
  })
}

// 获取token
let loginEm = ({name, password, baseUrl}) => {
  return http({
    url: '/u/login',
    method: 'post',
    baseURL: baseUrl  + '/api',
    data: {
      name,
      password
    }
  })
}

// 获取项目
let getProject = (params) => {
  return http({
    url: 'api/project',
    headers: {
      Authorization: `Bearer ${params.token}`
    },
    baseURL: params.baseUrl,
    method: 'get'
  })
}

// 获取api
let getApiList = (params) => {
  return http({
    headers: {
      Authorization: `Bearer ${params.token}`
    },
    method: 'get',
    baseURL: params.baseUrl,
    url: '/api/mock',
    params: {
      project_id: params.id,
      page_size: 1000
    }
  })
}

export {
  test,
  getApiList,
  loginEm,
  getProject
}
