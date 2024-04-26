/*
 * @作者：rocyuan（袁鹏）
 * @邮箱：rocyuan666@163.com
 * @微信：rocyuan666
 * @github：https://github.com/rocyuan666
 *
 * 网络请求的简单封装
 */
import axios from 'axios'
import NProgress from 'nprogress'
import { timeOut, contentType } from '@/config'

let baseURL = ''
if (import.meta.env.DEV && import.meta.env.VITE_APP_PROXY === 'true') {
  baseURL = '/api'
} else {
  baseURL = import.meta.env.VITE_APP_BASE_API
}

export function request(config) {
  const instance1 = axios.create({
    baseURL,
    timeout: timeOut * 1000,
    headers: {
      'Content-Type': contentType,
    },
  })

  // 请求拦截
  instance1.interceptors.request.use(
    (config) => {
      // 展示进度条
      NProgress.start()
      /*
				处理请求的参数数据
			*/
      // 处理请求的config（比如每次请求携带token）
      // config.headers.Authorization = window.sessionStorage.getItem('token');
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )
  // 响应拦截
  instance1.interceptors.response.use(
    (res) => {
      // 隐藏进度条
      NProgress.done()
      /*
				处理响应的状态码及数据...
			*/
      if (res.data.code == 1) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res.data)
      }
    },
    (err) => {
      // 隐藏进度条
      NProgress.done()
      return Promise.reject(err)
    }
  )

  // 发送请求
  return instance1(config)
}
