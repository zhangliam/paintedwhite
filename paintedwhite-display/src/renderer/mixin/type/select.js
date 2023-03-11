import utils from '@/assets/js/utils'
import list from './list'

import selectedItemStyle from '../property/selectedItemStyle'

/**
 * @class Select
 * 选择器
 */
export default {
  name: 'select',
  mixins: [list, selectedItemStyle],
  props: {},
  data () {
    return {
      selectedIndex: [],
      selectedValue: []
    }
  },
  computed: {},
  methods: {
    setRows (array) {
      this.rows = array
      if (this.computedConfig.default) {
        this.setDefaultValue()
      }
    },
    setDefaultValue () {
      let rows = this.rows
      let index = ''
      while (utils.getClassName(rows) === 'Array' && rows.length) {
        rows = rows[0]
        index += 0 + '_'
      }
      this.selectedIndex = index.substr(0, index.length - 1)
      this.selectedValue = rows
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
      this.$emit('changed', {target: this, default: true, value: rows})
      this.fireEvent('changed', {target: this, default: true, value: rows})
      this.updateProvidor('selectedIndex', this.selectedIndex)
      this.updateProvidor('selectedValue', this.selectedValue)
    },
    setSelected (index, value) {
      value = value ? value : this.rows[index]
      this.selectedIndex = index
      this.selectedValue = value
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
      this.$emit('changed', {target: this, value})
      this.fireEvent('changed', {target: this, value})
      this.updateProvidor('selectedIndex', this.selectedIndex)
      this.updateProvidor('selectedValue', this.selectedValue)
    }
  }
}
