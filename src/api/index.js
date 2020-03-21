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

let getApiList = (params) => {
  return http({
    headers: {
      Authorization: `Bearer ${params.token}`
    },
    method: 'get',
    baseURL: params.baseUrl,
    url: '/mock',
    params
  })
}

export {
  test,
  getApiList
}
