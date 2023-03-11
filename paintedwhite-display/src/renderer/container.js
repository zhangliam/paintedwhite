import LOGGER from '@/assets/js/logger'
import layer from './layer'

import status from './mixin/property/status'
import child from './mixin/property/child'
import itemStyle from './mixin/property/itemStyle'

/**
 * @class Container
 * 容器
 */
export default {
  name: 'container',
  mixins: [layer, status, child, itemStyle],
  props: {},
  data () {
    return {
      type: 'container'
    }
  },
  computed: {},
  watch: {},
  methods: {
    onInitialized (e) {
      this.logger.add(LOGGER.FRAMEWORK_FUN, 'onInitialized', e)
      this.children.push(e.selector)
      this.logger.push(e.selector.logger)
    },
    doRefresh () {
      this.children.forEach((e)=> {
        e.doRefresh()
      })
    }
  }
}
