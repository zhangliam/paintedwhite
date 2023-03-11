import logger from '@/assets/js/logger'
/**
 * @class logger
 * logger
 */
export default {
  name: 'logger',
  data () {
    return {
      logger: this.createLogger()
    }
  },
  methods: {
    createLogger() {
      let logs = [],
      label = ``
      return {
        start: (l) => {
          label = l
          if ( logger.LOG_LEVEL == -1 || logger.LOG_LEVEL.toString().indexOf(logger.VUE_LIFECYCLE) > -1 ) {
            console.time(label)
          }
        },
        end: () => {
          if ( logger.LOG_LEVEL == -1 || logger.LOG_LEVEL.toString().indexOf(logger.VUE_LIFECYCLE) > -1 ) {
            let APP_NAME = window.config.appName
            console.groupCollapsed('%c ' + APP_NAME + ' - VUE_LIFECYCLE %c ' + label + ' ', logger.COLORS.VUE_LIFECYCLE.LEVEL, logger.COLORS.VUE_LIFECYCLE.BLOCK)
            logs.forEach( l => {
              if (l.end && typeof l.end == 'function') {
                l.end()
              } else {
                const {level, func, args} = l
                logger.log(level, func, ...args)
              }
            })
            console.timeEnd(label)
            console.groupEnd()
          }
        },
        push: (child) => {
          logs.push(child)
        },
        add: (level, func, ...args) => {
          logs.push({ level, func, args })
        }
      }
    }
  }
}
