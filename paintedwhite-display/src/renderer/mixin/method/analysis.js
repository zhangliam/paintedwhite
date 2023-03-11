import analysis from '@/assets/js/analysis'

/**
 * @class Analysis
 * 
 */
export default {
  name: 'analysis',
  inject: {
    analysis: {
      default: null
    }
  },
  methods: {
    checkAnalysis (evtName) {
      if (this.item.config && this.item.config.analysis) {
        return this.item.config.analysis.indexOf(evtName) !== -1
      }
      return false
    },
    executeAnalysis (target, event, data) {
      analysis.trigger(target, event, data)
    },
    executeAnalysisWithData (target, event, data) {
      let events = this.item.config.analysis.split(',')
      let reg = /\$\{((?:.|\r?\n)+?)\}/g
      let value = ''
      for (let a of events) {
        if (a.indexOf(event) != -1) {
          let result = a.match(reg)
          if (result) {
            result.forEach((el) => {
              let keys = el.slice(2, -1).split('.')
              let d = Object.assign({}, data)
              while (keys.length) {
                d = d[keys.shift()]
              }
              value += d + ','
            })
          }
          value = value.slice(0, -1)
          analysis.trigger(target, event, value)
        }
      }
    }
  }
}
