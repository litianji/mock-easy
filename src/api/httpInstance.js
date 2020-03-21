import axios from 'axios'
import { Message } from 'element-ui'

const http = axios.create({
  timeout: 30000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 相应拦截器
http.interceptors.response.use((response) => {
  if (/.*\.json$/.test(response.config.url)) {
    return response
  }

  // 对错误进行统一处理
  if (response.data.code !== 200) {
    if (!response.config.noMsg && response.data.msg) {
      Message.error(response.data.msg)
    }
    return Promise.reject(response)
  } else if (response.data.code === 200 && response.config.successNotify) {
    // 弹出成功提示
    Message.success(response.data.msg || 'success !')
  }
  return Promise.resolve({
    code: response.data.code,
    msg: response.data.msg,
    data: response.data.data
  })
}, function (error) {
  if (error.message.indexOf('timeout') > -1) {
    // 多语言需要自己在项目中配置
    Message.error('请求超时，请重试！')
  }
  // csrf过期
  if (process.env.NODE_ENV !== 'development' && error.response.data.code === '403') {
    window.location.reload()
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default http
