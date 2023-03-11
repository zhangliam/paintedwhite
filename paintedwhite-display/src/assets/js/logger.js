const logger = {
  VUE: 'VUE',
  VUE_ROUTER: 'VUE_ROUTER',
  VUE_RENDER: 'VUE_RENDER',
  VUE_LIFECYCLE: 'VUE_LIFECYCLE',
  VUE_COMPONENT_LIFECYCLE: 'VUE_COMPONENT_LIFECYCLE',
  FRAMEWORK_FUN: 'FRAMEWORK_FUN',
  FRAMEWORK_EVT: 'FRAMEWORK_EVT',
  FRAMEWORK_ERROR: 'FRAMEWORK_ERROR',
  WORKER_CORE: 'WORKER_CORE',
  WORKER_ERROR: 'WORKER_ERROR',
  WORKER_MESSAGE: 'WORKER_MESSAGE',
  APP: 'APP',
  ERROR: 'ERROR',
  FUNCTION: 'FUNCTION',
  EVENT: 'EVENT',
  ANIMATION: 'ANIMATION',
  ANALYSIS: 'ANALYSIS',
  PERFORMANCE: 'PERFORMANCE',
  COLORS: {
    VUE: {
      LEVEL: 'background: rgb(41, 241, 195); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(41, 241, 195);'
    },
    VUE_ROUTER: {
      LEVEL: 'background: rgb(30, 130, 76); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(30, 130, 76);'
    },
    VUE_RENDER: {
      LEVEL: 'background: rgb(77, 175, 124); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(77, 175, 124);'
    },
    VUE_LIFECYCLE: {
      LEVEL: 'background: rgb(27, 163, 156); color: rgb(255,255,255); border-radius: 3px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(27, 163, 156);'
    },
    VUE_COMPONENT_LIFECYCLE: {
      LEVEL: 'background: rgb(135, 211, 124); color: rgb(255,255,255); border-radius: 3px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(135, 211, 124);'
    },
    FRAMEWORK_FUN: {
      LEVEL: 'background: rgb(31, 58, 147); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(31, 58, 147);'
    },
    FRAMEWORK_EVT: {
      LEVEL: 'background: rgb(107, 185, 240); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(107, 185, 240)'
    },
    FRAMEWORK_ERROR: {
      LEVEL: 'background: (240, 52, 52); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'rgb(240, 52, 52)'
    },
    WORKER_ERROR: {
      LEVEL: 'background: rgb(231, 76, 60); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(231, 76, 60)'
    },
    WORKER_CORE: {
      LEVEL: 'background: rgb(247, 202, 24); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(247, 202, 24)'
    },
    WORKER_MESSAGE: {
      LEVEL: 'background: rgb(242, 217, 132); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(242, 217, 132)'
    },
    APP: {
      LEVEL: 'background: rgb(1, 152, 117); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(1, 152, 117)'
    },
    ERROR: {
      LEVEL: 'background: rgb(255, 0, 0); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(255, 0, 0);'
    },
    FUNCTION: {
      LEVEL: 'background: rgb(145, 61, 136); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(145, 61, 136);'
    },
    EVENT: {
      LEVEL: 'background: rgb(142, 68, 173); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(142, 68, 173);'
    },
    ANIMATION: {
      LEVEL: 'background: rgb(102, 51, 153); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(102, 51, 153);'
    },
    ANALYSIS: {
      LEVEL: 'background: rgb(46, 49, 49); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(46, 49, 49)'
    },
    PERFORMANCE: {
      LEVEL: 'background: rgb(228, 120, 51); color: rgb(255,255,255); border-radius: 5px; padding: 3px 0; font-size: 10px;',
      BLOCK: 'color: rgb(228, 120, 51)'
    }
  },
  LOG_LEVEL: '',
  STARTTIME: performance.timing.navigationStart,
  log (level, func, ...args){
    if ( this.LOG_LEVEL == -1 || this.LOG_LEVEL.indexOf(level) > -1 ) {
      args.unshift(this.COLORS[level].BLOCK)
      args.unshift(this.COLORS[level].LEVEL)
      let APP_NAME = window.config.appName
      // + '(' + (new Date().getTime() - this.STARTTIME) + ' ms) '
      args.unshift('%c ' + APP_NAME + ' - ' + level + ' %c ' + func + ' ')
      console.log(...args)
    }
  },
  group (level, func, ...args) {
    if ( this.LOG_LEVEL == -1 || this.LOG_LEVEL.indexOf(level) > -1 ) {
      let lines = args.pop()
      args.unshift(this.COLORS[level].BLOCK)
      args.unshift(this.COLORS[level].LEVEL)
      let APP_NAME = window.config.appName
      args.unshift('%c ' + APP_NAME + ' - ' + level + ' %c ' + func + ' ')
      console.groupCollapsed(...args)
      for (let line of lines) {
        let func = line.shift()
        line.unshift(this.COLORS[level].BLOCK)
        line.unshift('%c ' + func + ' ')
        console.log(...line)
      }
      console.groupEnd()
    }
  }
}

window.setLogLevel = (level) => {
  logger.LOG_LEVEL = level
}

window.logger = logger

export default logger