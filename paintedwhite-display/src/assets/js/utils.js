import logger from './logger'
import Vue from 'vue'

const utils = {
  remUnit: 0,
  openScale: window.config ? window.config.openScale : true,
  px2rem (style) {
    if (!this.remUnit || this.openScale !== false) {
      return style
    }
    function getValue(val) {
      val = parseFloat(val.toFixed(6)) // control decimal precision of the calculated value
      return val == 0 ? val : val + 'rem'
    }
    let pxRegExp = /\b(\d+(\.\d+)?)px\b/
    var pxGlobalRegExp = new RegExp(pxRegExp.source, 'g')
    let p2r = {}
    for (let key in style) {
      p2r[key] = style[key]
      if (pxRegExp.test(style[key])) {
        p2r[key] = style[key].replace(pxGlobalRegExp, ($0, $1) => {
          return getValue($1 / (2 * this.remUnit))
        })
      }
    }
    return p2r
  },
  JSON (str) {
    if (this.getTypeName(str) === 'String') {
      try {
        return JSON.parse(str)
      } catch (e) {
        logger.log(logger.FRAMEWORK_ERROR, 'start ajax request')
        return str
      }
    }
    return str
  },
  getQueryString ( name ) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  getQueryObject () {
    const url = decodeURI(window.location.search) // 取得整个地址栏
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    // [^?&=]+表示：除了？、&、=之外的一到多个字符
    // [^?&=]*表示：除了？、&、=之外的0到多个字符（任意多个）
    search.replace(reg, function (rs, $1, $2) {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return Object.assign(obj, Vue.router.history.current.query)
  },
  isDebug (field) {
    const url = decodeURI(window.location.search || window.location.hash)
    const search = url.substring(url.lastIndexOf('?') + 1)
    const all = search.match(/([^?&=]+)([^?&=]*)/g)
    if (!all) {
      return false
    }
    let index = all.indexOf('debug')
    if (index != -1 && field) {
      return all[index + 1] ? all[index + 1].indexOf(field) != -1 : false
    }
    return index != -1
  },
  detectOS () {
    var sUserAgent = navigator.userAgent
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows")
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")
    if (isMac) return "Mac"
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac
    if (isUnix) return "Unix"
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1)
    var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == "android"
    if (isLinux) {
      if(bIsAndroid) return "Android"
      else return "Linux"
    }
    var isiPhone = navigator.platform == "iPhone"
    if (isiPhone) return "iPhone"
    if (isWin) {
      var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1
      if (isWin2K) return "Win2000"
      var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 ||
      sUserAgent.indexOf("Windows XP") > -1
      if (isWinXP) return "WinXP"
      var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1
      if (isWin2003) return "Win2003"
      var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1
      if (isWinVista) return "WinVista"
      var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1
      if (isWin7) return "Win7"
    }
    return "other"
  },
  detectTerminal () {
    var userAgent = navigator.userAgent
    //微信内置浏览器
    if(userAgent.match(/MicroMessenger/i) == 'MicroMessenger') {
      if (userAgent.match(/wework/i) == 'wework') {
        return 'wework'
      }
      return "wechat"
    }
    //QQ内置浏览器
    else if(userAgent.match(/QQ/i) == 'QQ') {
      return "QQ"
    }
    //Chrome
    else if(userAgent.match(/Chrome/i) == 'Chrome') {
      return "Chrome"
    }
    //Opera
    else if(userAgent.match(/Opera/i) == 'Opera') {
      return "Opera"
    }
    //Firefox
    else if(userAgent.match(/Firefox/i) == 'Firefox') {
      return "Firefox"
    }
    //Safari
    else if(userAgent.match(/Safari/i) == 'Safari') {
      return "Safari"
    }
    //IE
    else if(!!window.ActiveXObject || "ActiveXObject" in window) {
      return "IE"
    }
    else {
      return "未定义:"+userAgent
    }
  },
  loadScript (path, async, onload, id, doc) {
    var root = doc != null ? doc : document
    var script = root.createElement('script')
    script.src = path
    script.onload = onload
    if (async) { script.async = async }
    if (id) { script.id = id }
    document.body.appendChild(script)
  },
  getClassName (instance) {
    const constructor = instance.constructor.prototype.constructor.toString()
    return constructor.slice(9, constructor.indexOf('(')).trim()
  },
  getTypeName (instance) {
    const constructor = Object.prototype.toString.call(instance)
    return constructor.slice(8, -1)
  },
  getDate (string) {
    if (this.detectOS() == 'iPhone') {
      return new Date(string.replace(/\-/g, '/'))
    }
    return new Date(string)
  }
}

window.utils = utils

export default utils