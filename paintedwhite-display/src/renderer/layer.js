import LOGGER from '@/assets/js/logger'

import basic from './mixin/basic'
import analysis from './mixin/method/analysis'
import animation from './mixin/method/animation'
import dispatcher from './mixin/method/dispatcher'
import style from './mixin/property/style'
import logger from './mixin/property/logger'

/**
 * 图层
 *
 * @class Layer
 */
export default {
  name: 'layer',
  mixins: [basic, style, animation, analysis, dispatcher, logger],
  data () {
    return {
      type: 'layer'
    }
  },
  inject: {
    inputs: {
      default: null
    },
    elements: {
      default: null
    }
  },
  computed: {
    id () {
      return this.item.__id ? this.item.__id : this._uid
    }
  },
  created () {
    const _self = this
    this.logger.start(`${this.type}[${this.id}]`)
    this.logger.add(LOGGER.VUE_COMPONENT_LIFECYCLE, 'created', this.item.name) 
    this.initDisplayObject()
  },
  methods: {
    onClick (event) {
      /**
       * 当前组件被点击
       *
       * @event clicked
       * @property {object} obj {target, evt}
       */
      this.$emit('clicked', {target: this, event})
      this.fireEvent('clicked', {target: this, event})
    },
    /**
     * @method initDisplayObject
     */
    initDisplayObject () {
      this.logger.add(LOGGER.FRAMEWORK_FUN, 'initDisplayObject')
      if (this.item) {
        console.log('layer created =>', this.item)
        if (this.item.name) {
          if (this.elements) {
            this.elements[this.item.name] = this
            // this.elements[this.item.__id] = this
          }
        }
        if (this.form && this.executeCheck) {
          this.form.installLayer(this)
        }
        if (this.item.style) {
          let reg = /^url\('(.+?)'\)/
          for (let k in this.item.style) {
            let ret = reg.exec(this.item.style[k])
            if (ret) {
              let image = new Image()
              image.src = ret[1]
              image.onload = () => {
                if (this.$store) {
                  this.$store.commit('LOADER_COMPLETE', this.item.__id)
                }
              }
              image.onerror = () => {
                if (this.$store) {
                  this.$store.commit('LOADER_COMPLETE', this.item.__id)
                }
              }
              if (this.$store && this.computedConfig.preload !== 'false') {
                this.$store.commit('REGIST_LOADER', this.item.__id)
              }
            }
          }
        }
      }
      /**
       * 当前组件被点击
       *
       * @event clicked
       * @property {object} obj {target, evt}
       */
      this.$emit('initialized', {selector: this})
      this.fireEvent('initialized', {selector: this})
    },
    localize (option) {
      if (this.$locale) {
        return this.$locale(option)
      }
      return option.i
    }
  }
}
