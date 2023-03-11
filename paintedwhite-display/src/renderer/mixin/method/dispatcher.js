import LOGGER from '@/assets/js/logger'

/**
 * @class Dispatcher
 * 触发器
 */
export default {
  name: 'dispatcher',
  inject: {
    listeners: {
      default: null
    }
  },
  methods: {
    /**
     * 触发事件
     *
     * @param {string} evtName
     * @param {object} params
     * @public
     */
    fireEvent (evtName, params) {
      this.logger.add(LOGGER.FRAMEWORK_EVT, evtName, params)
      this.executeListener(evtName, params)
      if (this.checkAnalysis(evtName) && this.executeAnalysis) {
        let page = this.page.item.name
        this.executeAnalysisWithData(page + '_' + this.item.name, evtName, params)
      }
      if (this.executeAnimation) {
        this.executeAnimation(evtName, params)
      }
    },
    executeListener (evtName, params) {
      let fakename = evtName + '_' + this.item.__id
      let nickname = evtName + '_' + this.item.name
      let events = this.page ? this.page.eventListeners : this.eventListeners
      if (events) {
        if (events[fakename]) {
          this.logger.add(LOGGER.FUNCTION, fakename)
          events[fakename].call(this.page || this, params)
        } else if (this.item.name && events[nickname]) {
          this.logger.add(LOGGER.FUNCTION, nickname)
          events[nickname].call(this.page || this, params)
        }
      }
    }
  }
}
