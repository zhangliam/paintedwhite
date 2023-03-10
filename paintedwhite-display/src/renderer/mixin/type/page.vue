<template>
  <div ref="element"
    :class="item.class"
    :style="computedStyle">
    <component
      :is="val.type"
      v-for="(val, index) in item.components" :key="index" :item="val"
      :statusParent="status"
      :styleItem="val.itemStyle"
      :styleItemSelected="val.itemSelectedStyle"
      @initialized="onInitialized"></component>
    <div v-if="item.preload === true && (!ready || total > loaded)"
      class="preload">
      {{loaded}} / {{total}}
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/api'
import lifecycle from '@/assets/js/lifecycle'
import utils from '@/assets/js/utils'
import LOGGER from '@/assets/js/logger'
import style from '@/renderer/mixin/property/style'
import analysis from '@/renderer/mixin/method/analysis'
import dispatcher from '@/renderer/mixin/method/dispatcher'
import insertOrUpdateData from '@/renderer/mixin/method/insertOrUpdateData'
import scroll from '@/renderer/mixin/type/scroll'
import { mapGetters } from 'vuex'
import logger from '@/renderer/mixin/property/logger'

/**
 * The only true page.
 */

export default {
  name: 'basic-container-page',
  mixins: [style, analysis, dispatcher, insertOrUpdateData, scroll, logger],
  data () {
    return {
      item: {},
      origin: {},
      elements: new Proxy({_cache: {}}, {
        get(target, key) {
          if (typeof key == 'string' && !target[key]) {
            return new Proxy({}, {
              get (t, k) {
                if (typeof k == 'string' && k.startsWith('set')) {
                  return (data) => {
                    if (!target._cache[`${key}`]) {
                      target._cache[`${key}`] = {}
                    }
                    target._cache[`${key}`][`${k}`] = data
                  }
                }
                return target[k]
              }
            })
          }
          return target[key]
        },
        set (target, key, value) {
          if (!target[key] && value && target._cache[key]) {
            for (let k in target._cache[key]) {
              value[k](target._cache[key][k])
            }
            delete target._cache[key]
          }
          target[key] = value
          return target[key]
        }
      }),
      children: [],
      listeners: {},
      animations: {},
      status: 'normal',
      type: 'page',
      ready: false
    }
  },
  computed: {
    ...mapGetters({
      'loaded': 'loaded',
      'total': 'total'
    })
  },
  watch: {
    file () {
      this.getConfig()
    }
  },
  provide () {
    return {
      page: this,
      elements: this.elements,
      listeners: this.listeners,
      animations: this.animations
    }
  },
  inject: {
    appData: {
      default: {}
    }
  },
  created () {
    this.logger.start(`${this.type}[${this._uid}]`)
    this.logger.add(LOGGER.VUE_COMPONENT_LIFECYCLE, 'created')
    this.$store.commit('CLEAR_LOADERS')
    this.getConfig()
  },
  beforeMount () {
    this.logger.add(LOGGER.VUE_COMPONENT_LIFECYCLE, 'beforeMount')
  },
  mounted () {
    this.logger.add(LOGGER.VUE_COMPONENT_LIFECYCLE, 'mounted')
    this.root.addEventListener('scroll', this.onScroll)
  },
  activated () {
    this.logger.add(LOGGER.VUE_COMPONENT_LIFECYCLE, 'activated')
    this.fireEvent('ready', utils.getQueryObject())
  },
  updated () {
    this.logger.add(LOGGER.VUE_COMPONENT_LIFECYCLE, 'updated')
    if (!this.ready) {
      this.ready = true
      api.ready()

      if (process.env.VUE_APP_TYPE !== 'ROUTER') {
        // this.executeAnalysis(this.item.name, 'enter')
      // } else {
        if (this.active) {
          lifecycle.enterPage(this.item)
          // this.executeAnalysis(this.item.name, 'enter')
        }
      }
      /**
       * ??????????????????ready????????????
       *
       * @event ready
       * @property {object} obj urlQueryObject
       */
      this.$emit('ready', utils.getQueryObject())
      this.fireEvent('ready', utils.getQueryObject())

      this.logger.end()
    } else {
      // /**
      //  * ??????????????????updated????????????
      //  *
      //  * @event updated
      //  * @property {object} obj {target}
      //  */
      // this.$emit('updated')
      // this.fireEvent('updated')
    }
  },
  destory () {
    /**
     * ??????????????????destory????????????
     *
     * @event destory
     */
    this.$emit('destory')
    this.fireEvent('destory')
  },
  methods: {
    async getConfig () {
      this.logger.add(LOGGER.FRAMEWORK_FUN, 'load')
      let str = await this.$http.get(api.RESOURCE_URL + this.file)
      this.initDisplayObject(str)
      this.status = this.item.status[0]
      /**
       * ??????????????????created????????????
       *
       * @event created
       * @property {object} obj urlQueryObject
       */
      this.$emit('created', utils.getQueryObject())
      this.fireEvent('created', utils.getQueryObject())
    },
    initDisplayObject (str) {
      this.logger.add(LOGGER.FRAMEWORK_FUN, 'initDisplayObject')
      let config = utils.JSON(str) || {}
      this.$store.commit('INIT_PROVIDOR', config.__id)
      if (config) {
        if (config.actions) {
          config.actions.forEach(event => {
            if (event.workers && event.workers.length) {
              this.listeners[event.name + '_' + event.target] = event.workers
            }
            if (event.animations) {
              this.animations[event.name + '_' + event.target] = event.animations
            }
          })
        }
        if (config.animations && config.animations.length) {
          config.animations.forEach(animation => {
            if (!this.animations[animation.target]) {
              this.animations[animation.target] = []
            }
            this.animations[animation.target].push(animation)
          })
        }
        if (config.preload && config.style) {
          let reg = /^url\('(.+?)'\)/
          for (let k in config.style) {
            let ret = reg.exec(config.style[k])
            if (ret) {
              let image = new Image()
              image.src = ret[1]
              image.onload = () => {
                if (this.$store) {
                  this.$store.commit('LOADER_COMPLETE', config.__id)
                }
              }
              image.onerror = () => {
                if (this.$store) {
                  this.$store.commit('LOADER_COMPLETE', this.item.__id)
                }
              }
              if (this.$store && config.preload !== 'false') {
                this.$store.commit('REGIST_LOADER', config.__id)
              }
            }
          }
        }
        if (config.name == 'PAGE') {
          this.logger.add(LOGGER.ERROR,`??????????????????${this.file} ??? name ????????? "PAGE"`)
        }
        this.elements[config.name] = this
        this.elements['page'] = this.elements['root'] = this
      }
      this.item = config
    },
    /**
     * 
     * @public
     * @param {String} status
     */
    setStatus (status) {
      this.status = status
    },
    /**
     *
     * @public
     * @param {object} obj
     */
    setOrigin (obj) {
      this.insertOrUpdateData(this.origin, obj)
      this.children.forEach((e)=> {
        e.doRefresh()
      })
    },
    setAppData (obj) {
      console.log(this.appData, obj)
      this.insertOrUpdateData(this.appData, obj)
      this.children.forEach((e)=> {
        e.doRefresh()
      })
    },
    onInitialized (e) {
      this.logger.add(LOGGER.FRAMEWORK_FUN, 'onInitialized', e)
      this.children.push(e.selector)
      this.logger.push(e.selector.logger)
    }
  }
}
</script>
