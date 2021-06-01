import axios from 'axios'
import qs from 'qs'
import { setIsLoading } from 'store/app/actions'
import store from 'store'

function formatSendData(data) {
  const formData = {}
  for (let key in data) {
    formData[key] = data[key]
  }
  return formData
}

axios.defaults.timeout = 60000
axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use(function (config) {
  if (config.loading !== false) {
    store.dispatch(setIsLoading(true))
  }

  if (config.method.toLowerCase() === 'get') {
    config.params = {
      _: Math.random(),
      ...config.params,
    }
  }

  if (typeof config.transformRequest !== 'function') {
    if (config.headers['Content-Type'] === 'application/json') {
      config.transformRequest = data => JSON.stringify(config.isNotDeal ? data : formatSendData(data))
    } else if (config.data instanceof FormData) {
      config.transformRequest = data => data
    } else {
      config.transformRequest = data => qs.stringify(config.isNotDeal ? data : formatSendData(data))
    }
  }

  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (resp) {
  const config = resp.config
  const data = resp.data
  if (config.loading !== false) {
    store.dispatch(setIsLoading(false))
  }

  // TODO 错误处理以及判断登陆状态
  // 是否直接返回原生axios内容

  if (config.useRaw) {
    return resp
  } else {
    return data
  }
}, function (error) {
  const config = error.config
  if (config.loading !== false) {
    store.dispatch(setIsLoading(false))
  }
  
  return Promise.reject(error)
})

export default axios
