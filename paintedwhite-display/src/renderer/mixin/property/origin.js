import api from '@/assets/js/api'
import utils from '@/assets/js/utils'
import Parser from '@/parser/parse'
import Expression from '@/parser/expression'

/**
 * @class origin
 * origin
 */
export default {
  name: 'origin',
  props: {
    /**
		 * 组件源数据
		 */
    originParent: {
      type: Object | String,
      default: () => ({})
    }
  },
  data () {
    return {
      origin: {}
    }
  },
  computed: {
    computedOrigin () {
      return Object.assign({}, this.originParent, this.origin)
    }
  },
  watch: {
    originParent: {
      handler () {
        this.doRefresh()
      },
      deep: true
    },
    origin: {
      handler () {
        this.doRefresh()
      },
      deep: true
    },
  },
  methods: {
    /**
     * 设置组件源数据
     *
     * @param {object} obj
     * @public
     */
    setOrigin (obj) {
      this.insertOrUpdateData(this.origin, obj)
    },
    setAppData (obj) {
      this.insertOrUpdateData(this.appData, obj)
    },
    parseExpression (string) {
      if (string === undefined || utils.getTypeName(string) === 'Object') {
        return ''
      }
      let params = this.page ? this.page.origin : {}
      params = Object.assign(params, api.apis())
      params = Object.assign(params, this.apis())
      params = Object.assign(params, this.originParent)
      params = Object.assign(params, this.appData)
      if (utils.getTypeName(this.origin) === 'Object') {
        params = Object.assign(params, this.origin)
      } else {
        string = string.replace('{value}', this.origin)
      }
      const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g
      let result = string.toString().match(defaultTagRE)
      if (result) {
        result.forEach(el => {
          let exp = JSON.parse(Parser.parse(el.substring(2, el.length - 2)))
          let express = Expression.execute(exp, params)
          string = string.replace(el, express ? express : '')
        })
      }
      string = string.replace('{directory}', api.RESOURCE_URL)
      string = string.replace('{root}', api.ROOT_URL)
      return string
    },
    apis () {
      return {
        locale (config) {
          if (utils.getTypeName(config) === 'String') {
            config = JSON.parse(config)
          }
          return this.$locale(config)
        }
      }
    }
  }
}
