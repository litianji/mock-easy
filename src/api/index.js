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
  getApiList
}
