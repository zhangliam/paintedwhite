/**
 * @class Scroll
 * 滑动
 */
export default {
  name: 'scroll',
  data () {
    return {
      scrollWatcher: null,
      scrolling: false,
      scrollTop: 0,
      scrollStatus: 'top'
    }
  },
  methods: {
    onScroll (event) {
      clearTimeout(this.scrollWatcher)
      this.scrollWatcher = setTimeout(() => {
        this.scrolling = false
        /**
         * 当前组件停止滚动
         *
         * @event scrolled
         * @property {object} obj {target, event}
         */
        this.$emit('scrolled')
        this.fireEvent('scrolled', {target: this, event})
      }, 100)
      /**
       * 当前组件正在滚动
       *
       * @event scrolling
       * @property {object} obj {target, event}
       */
      this.$emit('scrolling')
      this.fireEvent('scrolling', {target: this, event})
      let { scrollTop, offsetHeight, scrollHeight } = event.target
      if (this.scrollStatus !== 'bottom' &&
          this.scrollTop > scrollTop &&
          scrollTop < 5) {
        this.scrollStatus = 'top'
        /**
         * 当前组件滚动至顶部
         *
         * @event scrollTop
         * @property {object} obj {target: this, event}
         */
        this.$emit('scrollTop', {target: this, event})
        this.fireEvent('scrollTop', {target: this, event})
      } else if (this.scrollStatus !== 'bottom' &&
        this.scrollTop < scrollTop &&
        scrollTop + offsetHeight > scrollHeight - 5) {
        this.scrollStatus = 'bottom'
        /**
         * 当前组件滚动至底部
         *
         * @event scrollBottom
         * @property {object} obj {target: this, event}
         */
        this.$emit('scrollBottom', {target: this, event})
        this.fireEvent('scrollBottom', {target: this, event})
      } else {
        this.scrollStatus = ''
      }
      this.scrolling = true
      this.scrollTop = event.target.scrollTop
    },
  }
}
