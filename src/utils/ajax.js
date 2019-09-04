/**
 * ajax 请求的封装
 */
import qs from 'qs'
import axios from 'axios'
import toast from './toast'
import cache from './cache'
import router from '../router'

// 定义计时器
let loadCount = 0
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  loadCount++
  // toast.loading()
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  loadCount--
  if (!loadCount) {
    // 结束loading
    setTimeout(() => {
      toast.hide()
    }, 200)
  }
  // 对响应数据做点什么
  return response
}, function (error) {
  loadCount--
  if (!loadCount) {
    // 结束loading
    setTimeout(() => {
      toast.hide()
    }, 200)
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default {

  baseUrl: window.location.protocol + '//' + window.location.host + '/',

  /** ****************新的，ajax方法，参数都在外部发起请求的时候配置******************/
  /*
      诸如
    * {url:'xxx',method:'get',contentType:'xxx',successFunc:function(),errorFunc:function()}
    *
    * */
  fetch (request) {
    let config = this.configFetchConfig(request)
    let that = this
    axios
      .request(config)
      .then(function (response) {
        // toast.hide()
        that.checkResponse(response, request.successFunc, request.errorFunc)
      })
      .catch(function (error) {
        // toast.hide()
        throw new Error(error)
      })
  },

  configFetchConfig (request) {
    let requestMethod = 'get'
    requestMethod = request.method ? request.method : 'get'
    if (request.disableLoading && request.disableLoading === true) {
    } else {
      toast.loading()
    }
    let requestUrl = /^http[s]?:\/\.*/.test(request.url) ? request.url : this.baseUrl + request.url
    let contentType = request.contentType
      ? request.contentType
      : requestMethod === 'post' ? 'application/x-www-form-urlencoded; charset=UTF-8' : ''
    let config = {
      method: requestMethod,
      url: requestUrl,
      headers: {
        'content-type': contentType
      },
      timeout: 80000
    }
    if (requestMethod === 'get') {
      config.params = request.param
    } else if (requestMethod === 'post' || requestMethod === 'put' || requestMethod === 'delete') {
      config.data = qs.stringify(request.param)
    }
    return config
  },

  checkResponse (res, responseFunc, errorFunc) {
    let code = res.data.code
    if (!code) {
      return responseFunc(res.data)
    }
    if (res.data.status === '1') {
      if (code === '200') {
        responseFunc(res.data.data)
      } else if (code === '1010112') {
        toast.showWarning('连接超时')
        cache.clearAll()
        router.replace({ name: 'login' })
      } else {
        if (errorFunc) {
          errorFunc(res.data)
        } else {
          let msg = res.data.info
          if (msg !== null || msg.length >= 0) {
            toast.showWarning(msg)
          }
        }
      }
    } else {
      if (code === '1010112') {
        toast.showWarning('连接超时')
        cache.clearAll()
        router.replace({ name: 'login' })
      } else if (errorFunc) {
        errorFunc(res.data)
      } else {
        let msg = res.data.info
        if (msg !== null || msg.length >= 0) {
          toast.showWarning(msg)
        }
      }
    }
  }
}
