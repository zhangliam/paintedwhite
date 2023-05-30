import axios from 'axios';

let requestInstance = null

export const requestInitial = config => {
  if(!config) return

  const accessToken = config.accessToken()
  const applictionInfo = config.getProInfo()

  requestInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000,
    headers: {
      'TENANT-ID': applictionInfo['tenantId'],
      'Authorization': `Bearer ${ accessToken }` 
    }
  })

    // Add a request interceptor
  requestInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  requestInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response)
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

}

export const requestPost = config => {
  if(!requestInstance) return

  return requestInstance.post(`${ config.path }`, config.data)
}

export const requestGet = config => {
  if(!requestInstance) return

  return requestInstance.get(`${ config.path }`, {
    params: { ...config['params'] }
  })
}

