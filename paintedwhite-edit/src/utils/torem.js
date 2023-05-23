const utils = {
  px2rem (style, type) {
    let remUnit
    let docEl = document.documentElement;
    let clientWidth = docEl.clientWidth
    let scale = clientWidth / 375
    
    let suffix = type === 'h5' ? 'rem' : 'rpx'
    // if (!clientWidth) return
    // if (clientWidth >= 750) {
    //   remUnit = 100 / scale
    // } else {
      remUnit = (100 * (clientWidth / 750)) / scale
    // }
    
    function getValue(val) {
      val = parseFloat(val.toFixed(6)) // control decimal precision of the calculated value
      return val == 0 ? val : val + suffix
    }

    function getValueForWX(val) {
      val = parseFloat(val.toFixed(6)) // control decimal precision of the calculated value
      return val == 0 ? val : val + suffix
    }

    let pxRegExp = /\b(\d+(\.\d+)?)px\b/
    let pxGlobalRegExp = new RegExp(pxRegExp.source, 'g')
    let p2r = {}
    for (let key in style) {
      p2r[key] = style[key]
      if (pxRegExp.test(style[key])) {
        p2r[key] = style[key].replace(pxGlobalRegExp, ($0, $1) => {
          return type === 'h5' ? getValue($1 / (2 * remUnit)) : getValueForWX($1 * 2)
        })
      }
    }
    return p2r
  },
}

export default utils