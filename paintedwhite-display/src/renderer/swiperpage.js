import page from '@/renderer/mixin/type/page'
import lifecycle from '@/assets/js/lifecycle'

export default {
  name: 'swiper.page',
  mixins: [page],
  props: ['methods', 'url', 'active'],
  inject: ['htmlElement', 'swiperElement'],
  data () {
    return {
      eventListeners: this.methods,
      file: this.url
    }
  },
  computed: {
    root () {
      return this.htmlElement()
    },
    swiper () {
      return this.swiperElement()
    }
  },
  watch: {
    active (val, old) {
      if (val && !old) {
        /**
         * 当前组件进入actived生命周期
         *
         * @event actived
         * @property {string} obj
         */
        this.$emit('active', this.item.name)
        this.fireEvent('active', this.item.name)
        lifecycle.outerPage()
        lifecycle.enterPage(this.item)
      }
      if (!val && old) {
        /**
         * deactivated
         *
         * @event deactivate
         * @property {string} obj
         */
        this.$emit('deactivate', this.item.name)
        this.fireEvent('deactivate', this.item.name)
      }
    }
  },
  methods: {}
}