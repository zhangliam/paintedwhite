import Vue from 'vue'
import logger from '@/assets/js/logger'

export default {
  __cacheRequest: [],
  all () {
    if (!this.__cacheRequest.length) {
      return
    }
    logger.log(logger.FRAMEWORK_FUN, 'start graphql request')
    let body = {}
    for (let request of this.__cacheRequest) {
      if (!body[request.type]) {
        body[request.type] = {}
      }
      body[request.type][request.name] = {
        param: request.param,
        body: request.body
      }
    }
    let data = ``
    for (let key in body) {
      data += `${key} {`
      for (let k in body[key]) {
        data += `
    ${k} ${body[key][k].param ? '(' + body[key][k].param + ')' : ''} {${body[key][k].body}
    }`
      }
      data += `
  }`
    }
    return new Promise((resolve, reject) => {
      Vue.http({
        method: 'post',
        url: 'graphql',
        data: {
          query: data
        }
      }).then(({data: { data }}) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}