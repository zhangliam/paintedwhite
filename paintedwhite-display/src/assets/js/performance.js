/**
 * navigationStart:在同一个浏览器上下文中，前一个网页（与当前页面不一定同域）unload 的时间戳，如果无前一个网页 unload ，则与 fetchStart 值相等
 * unloadEventStart:前一个网页（与当前页面同域）unload 的时间戳，如果无前一个网页 unload 或者前一个网页与当前页面不同域，则值为 0
 * unloadEventEnd:和 unloadEventStart 相对应，返回前一个网页 unload 事件绑定的回调函数执行完毕的时间戳
 * redirectStart:第一个 HTTP 重定向发生时的时间。有跳转且是同域名内的重定向才算，否则值为 0
 * redirectEnd:最后一个 HTTP 重定向完成时的时间。有跳转且是同域名内的重定向才算，否则值为 0
 * fetchStart:浏览器准备好使用 HTTP 请求抓取文档的时间，这发生在检查本地缓存之前
 * domainLookupStart:DNS 域名查询开始的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
 * domainLookupEnd:DNS 域名查询完成的时间，如果使用了本地缓存（即无 DNS 查询）或持久连接，则与 fetchStart 值相等
 * connectStart:HTTP（TCP） 开始建立连接的时间，如果是持久连接，则与 fetchStart 值相等,如果在传输层发生了错误且重新建立连接，则这里显示的是新
 * connectEnd:HTTP（TCP） 完成建立连接的时间（完成握手），如果是持久连接，则与 fetchStart 值相等,如果在传输层发生了错误且重新建立连接，则这里
 * secureConnectionStart:HTTPS 连接开始的时间，如果不是安全连接，则值为 0
 * requestStart:HTTP 请求读取真实文档开始的时间（完成建立连接），包括从本地读取缓存,连接错误重连时，这里显示的也是新建立连接的时间
 * responseStart:HTTP 开始接收响应的时间（获取到第一个字节），包括从本地读取缓存
 * responseEnd:HTTP 响应全部接收完成的时间（获取到最后一个字节），包括从本地读取缓存
 * domLoading:开始解析渲染 DOM 树的时间，此时 Document.readyState 变为 loading，并将抛出 readystatechange 相关事件
 * domInteractive:完成解析 DOM 树的时间，Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件
 * domContentLoadedEventStart:DOM 解析完成后，网页内资源加载开始的时间,文档发生 DOMContentLoaded事件的时间
 * domContentLoadedEventEnd:DOM 解析完成后，网页内资源加载完成的时间（如 JS 脚本加载执行完毕），文档的DOMContentLoaded 事件的结束时间
 * domComplete:DOM 树解析完成，且资源也准备就绪的时间，Document.readyState 变为 complete，并将抛出 readystatechange 相关事件
 * loadEventStart:load 事件发送给文档，也即 load 回调函数开始执行的时间,如果没有绑定 load 事件，值为 0
 * loadEventEnd:load 事件的回调函数执行完毕的时间,如果没有绑定 load 事件，值为 0
 */
import utils from './utils'
import api from './api'
import logger from './logger'
import http from './http/axios'
import Vue from 'vue'

export default {
  uploadPerformace: (window.config ? window.config.uploadPerformace : false) || utils.isDebug('performance'),
  loadObserve () {
    let timer
    let all = []
    const ob = new PerformanceObserver((list) => {
      clearTimeout(timer)
      list.getEntries().forEach(function (entry) {
        all.push(entry)
      });
      timer = setTimeout(() => {
        all.forEach((entry) => {
          let {domainLookupEnd, domainLookupStart, connectEnd, connectStart, responseEnd, responseStart, domComplete, startTime, loadEventEnd, domContentLoadedEventStart, domContentLoadedEventEnd} = entry
          switch (utils.getClassName(entry)) {
            case 'PerformanceLongTaskTiming':
              logger.log(logger.PERFORMANCE, entry.entryType, entry.name, parseInt(entry.duration * 100) / 100, 'ms')
              break
            case 'PerformanceResourceTiming':
              if (entry.name.indexOf('/performace/api/')!= -1) {
                return
              }
              logger.group(logger.PERFORMANCE, entry.entryType, entry.name, parseInt(entry.duration * 100) / 100, 'ms', [
                ['DNS:', domainLookupEnd - domainLookupStart, 'ms'],
                ['TCP:', connectEnd - connectStart, 'ms'],
                ['HTTP:', parseInt((responseEnd - responseStart) * 100) / 100, 'ms']
              ])
              break
            case 'PerformanceElementTiming':
              logger.log(logger.PERFORMANCE, entry.entryType, entry.identifier, parseInt(entry.duration * 100) / 100, 'ms')
              break
            case 'PerformanceEventTiming':
              logger.log(logger.PERFORMANCE, entry.entryType, entry.name, parseInt(entry.duration * 100) / 100, 'ms')
              break
            case 'PerformancePaintTiming':
              if (entry.name == 'first-paint') {
                logger.log(logger.PERFORMANCE, '首次绘制:', parseInt(entry.startTime * 100) / 100, 'ms') // 首次绘制，即浏览器绘制页面第一个像素的时间，即白屏时间。
              } else if (entry.name == 'first-contentful-paint') {
                logger.log(logger.PERFORMANCE, '首次内容绘制:', parseInt(entry.startTime * 100) / 100, 'ms') // 首次内容绘制，即浏览器开始绘制页面中的内容（可能是文字、图片，或者任何不属于非内容的样式）的时间。
              }
              break
            case 'PerformanceNavigationTiming':
              logger.group(logger.PERFORMANCE, entry.entryType, entry.name, parseInt(entry.duration * 100) / 100, 'ms', [
                ['白屏时间:', parseInt((domContentLoadedEventEnd - startTime) * 100) / 100, 'ms'],
                ['首屏时间:', parseInt((domComplete - startTime) * 100) / 100, 'ms'],
                ['DOM完成 (DOM解析):', parseInt((domComplete - responseEnd) * 100) / 100, 'ms', '(', parseInt((domContentLoadedEventStart - responseEnd) * 100) / 100, 'ms)'],
                ['总 (DOM):', parseInt((loadEventEnd - startTime) * 100) / 100, 'ms', '(', parseInt((domComplete - startTime) * 100) / 100, 'ms)']
              ])
              break
          }
          if (this.uploadPerformace === true) {
            let _id = Vue.$cookies.get('la')
            http.get(`/performace/api/${_id}?e=${entry.entryType}/${entry.name}/${entry.duration.toFixed(2)}&t=${api.UUID}`).then()
          }
        })
        all = []
      }, 500)
    });
    ob.observe({ entryTypes: [
      'resource', 
      'element', 
      'longtask', 
      'event', 
      'paint', 
      'navigation'
    ]})
  }
}