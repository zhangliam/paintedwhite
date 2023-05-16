const utils = {
  px2rem (style) {

    let remUnit
    let docEl = document.documentElement;
    var clientWidth = docEl.clientWidth
    var scale = clientWidth / 375
    
    // if (!clientWidth) return
    // if (clientWidth >= 750) {
    //   remUnit = 100 / scale
    // } else {
      remUnit = (100 * (clientWidth / 750)) / scale
    // }
    
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
          return getValue($1 / (2 * remUnit))
        })
      }
    }
    return p2r
  },
}

export default utils