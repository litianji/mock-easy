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

export {
  test
}
