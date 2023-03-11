import LOGGER from '@/assets/js/logger'
import config from './property/config'
import origin from './property/origin'
import include from './property/include'
import insertOrUpdateData from './method/insertOrUpdateData'
import providor from './method/providor'

/**
 * @class Basic
 */
export default {
  name: 'basic',
  mixins: [config, origin, include, insertOrUpdateData, providor],
  props: {
    /**
		 * 组件属性
		 */
    item: {
      type: Object,
      default: () => ({})
    },
  },
  data () {
    return {
      options: {},
      type: ''
    }
  },
  inject: {
    page: {
      default: null
    },
    form: {
      default: null
    },
    appData: {
      default: {}
    }
  },
  computed: {
    computedItem () {
      return Object.assign({}, this.item, this.options)
    }
  },
  watch: {
    item: {
      handler () {
        this.itemUpdated()
      },
      deep: true
    },
    options: {
      handler () {
        this.optionsUpdated()
      },
      deep: true
    }
  },
  created () {
    this.initialize()
  },
  mounted () {
    this.$nextTick(() => {
      this.logger.add(LOGGER.VUE_COMPONENT_LIFECYCLE, 'mounted')
      this.doRefresh()
      /**
       * 当前组件ready
       *
       * @event ready
       * @property {vueComponent} obj
       */
      this.$emit('ready', this)
      this.fireEvent('ready', this)
    })
  },
  methods: {
    /**
     * 设置组件配置
     *
     * @param {object} obj
     * @public
     */
    setItem (obj) {
      this.insertOrUpdateData(this.options, obj)
    },
    doRefresh () {},
    itemUpdated () {},
    initialize () {
      this.initializeConfig()
    },
    toJSON () { // 防止console报错
      return {
        _uid: this._uid
      }
    }
  }
}