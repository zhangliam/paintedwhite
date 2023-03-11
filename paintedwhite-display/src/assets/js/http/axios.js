/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'
import store from '@/store/index'
import { v4 as uuidv4 } from 'uuid'

// 创建axios实例
const http = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
});

let reqs = {}
let timer;

window.http = new Proxy(http, {
  get(target, key) {
    if (key === 'all') {
      return target['all']
    }
    return function (url, params) {
      return new Promise((resolve, reject) => {
        clearTimeout(timer)
        reqs[uuidv4()] = {
          resolve,
          reject,
          axios: target[key](url, params)
        }
        timer = setTimeout(() => {
          all(reqs)
          reqs = {}
        }, 100); // 根据应用情况设置足够长的时间
      })
    }
  }
})

// post请求头
http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
http.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.application.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  response => {
    return Promise.resolve(checkStatus(response))
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response) {
      return Promise.reject(checkStatus(error.response));
    } else if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1
    ) {
      return Promise.reject({ msg: "请求超时" });
    } else {
      return Promise.reject({});
    }
  }
)

function all (reqs) {
  let arr = [], keys = []
  let ready = {}
  for (let key in reqs) {
    keys.push(key)
    arr.push(reqs[key].axios)
    ready[key] = {}
    ready[key].resolve = reqs[key].resolve
    ready[key].reject = reqs[key].reject
  }
  axios.all(arr)
  .then(axios.spread(function(...res){
    for (let i = 0; i < res.length; i++) {
      let item = res[i];
      ready[keys[i]].resolve(item)
    }
  }))
  .catch(err => {
    for (let key in ready) {
      ready[key].reject(err)
    }
  })
}

function checkStatus (response) {
  const status = response.status || -1000; // -1000 自己定义，连接错误的status
  if ((status >= 200 && status < 300) || status === 304) {
    // 如果http状态码正常，则直接返回数据
    return response.data;
  } else {
    let errorInfo = '';
    switch (status) {
      case -1:
        errorInfo = '远程服务响应失败,请稍后重试';
        break;
      case 400:
        errorInfo = '400：错误请求';
        break;
      case 401:
        errorInfo = '401：访问令牌无效或已过期';
        break;
      case 403:
        errorInfo = '403：拒绝访问';
        break;
      case 404:
        errorInfo = '404：资源不存在';
        break;
      case 405:
        errorInfo = '405：请求方法未允许'
        break;
      case 408:
        errorInfo = '408：请求超时'
        break;
      case 500:
        errorInfo = '500：访问服务失败';
        break;
      case 501:
        errorInfo = '501：未实现';
        break;
      case 502:
        errorInfo = '502：无效网关';
        break;
      case 503:
        errorInfo = '503：服务不可用'
        break;
      default:
        errorInfo = `连接错误`
    }
    return {
      status,
      msg: errorInfo
    }
  }
}

export default http
