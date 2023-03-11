/**
 * @class config
 * config
 */
export default {
  name: 'config',
  data () {
    return {
      config: {}
    }
  },
  computed: {
    computedConfig () {
      let { config } = this.item
      let statusConfig
      if (config) {
        statusConfig = config[this.status]
      }
      let newConfig = Object.assign({}, this.computedNormalConfig, statusConfig)
      return Object.assign(newConfig, this.config)
    },
    computedNormalConfig () {
      let { config, status } = this.item
      if (config && config.normal) {
        return config.normal
      }
      let newConfig = Object.assign({}, config)
      if (status) {
        for (let key of status) {
          delete newConfig[key]
        }
      }
      return newConfig
    }
  },
  methods: {
    /**
     * 设置组件配置
     *
     * @param {object} obj
     * @public
     */
    setConfig (obj) {
      this.insertOrUpdateData(this.config, obj)
    },
    initializeConfig (config) {return config},
  }
}
