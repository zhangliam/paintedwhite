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
      ready: false,
      lastElements: null,
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
      // 页面切换监控
      // this.getConfig()
    },
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
       * 当前组件进入ready生命周期
       *
       * @event ready
       * @property {object} obj urlQueryObject
       */
      this.$emit('ready', utils.getQueryObject())
      this.fireEvent('ready', utils.getQueryObject())

      this.logger.end()
    } else {
      // /**
      //  * 当前组件进入updated生命周期
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
     * 当前组件进入destory生命周期
     *
     * @event destory
     */
    this.$emit('destory')
    this.fireEvent('destory')
  },
  methods: {
    getConfig () {

      this.logger.add(LOGGER.FRAMEWORK_FUN, 'load')
      
      const _self = this
      window.addEventListener('message', (e) => {
        const parseJson = JSON.parse(e.data?.data || "{}")

        switch (e.data.command) {
          case 'POST_DESIGNDRAFT_JSON':
            const { data } = e.data
            _self.initDisplayObject(data)
            _self.status = _self.item.status[0]
            break

          case 'SELECT_LAYER':
            let { layer } = e.data;
            // console.log(_self.elements[layer].$el)
            console.log('SELECT_LAYER', e.data, _self)
            if(_self._lastElements) {
              _self._lastElements.classList.remove('layer_selected');
              _self._lastElements = null;
            }
            _self._lastElements = _self.elements[layer].$el;
            _self.elements[layer].$el.classList.add('layer_selected');
            break;

          case 'UPDATE_PROP':
            if (parseJson.prop.startsWith('style.')) {
              _self.elements[parseJson.target].setStyle({
                [parseJson.prop.replace('style.', '')]: parseJson.newValue
              })
            } else if (parseJson.prop.startsWith('config.')) {
              _self.elements[parseJson.target].setConfig({
                [parseJson.prop.replace('config.', '')]: parseJson.newValue
              })
            } else {
              _self.elements[parseJson.target].setItem({
                [parseJson.prop]: parseJson.newValue
              })
            }
            break;

          case 'UPDATE_VISIBLE':
            _self.elements[parseJson['layer']].setVisible(parseJson.invisible)
            break;

            // case 'LOAD_CSS':
            //   loadCss(e.data.path, e.data.files)
            //   break;

            // case 'CHANGE_PAGE':
            //   console.time('mounted')
            //   isChanged = true
            //   layerID.value = ''
            //   Object.keys(elements.value).forEach(el => {
            //     delete elements.value[el]
            //   })
            //   dataSource.value = JSON.parse(e.data.page)
            //   break;    

            // case 'UPDATE_STATUS':
            //   elements.value[data.target].setStatus(JSON.parse(data.newValue))
            //   break;

            // case 'UPDATE_ORIGIN':
            //   elements.value[data.target].setOrigin(JSON.parse(data.newValue))
            //   break;

            // case 'UPDATE_ROWS':
            //   elements.value[data.target].setRows(JSON.parse(data.newValue))
            //   break;

            // case 'UPDATE_ACTION':
            //   changeAction(data.target, data.action)
            //   break;
        }
      })

      /* 
        原读取本地public目录
      */
      // let str = await this.$http.get(api.RESOURCE_URL + this.file)
      // this.initDisplayObject(str)
      // this.status = this.item.status[0]

      /**
       * 当前组件进入created生命周期
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
          this.logger.add(LOGGER.ERROR,`请确保修改了${this.file} 中 name 值不为 "PAGE"`)
        }
        this.elements[config.name] = this
        this.elements['page'] = this.elements['root'] = this 
      }
      this.item = config
      console.log('page initDisplayObject =>', config, this.elements)
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
