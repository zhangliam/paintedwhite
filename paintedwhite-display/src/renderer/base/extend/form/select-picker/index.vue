<template>
  <div ref="element"
    :id="'select-picker-'+id"
    :elementtiming="'select-picker-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle" @click.stop="open" class="datepicker-input">
    <template v-if="!!currentValue">{{currentValue}}</template>
    <template v-else><span class="datepicker-placeholder">{{computedConfig.placeholder}}</span></template>
    <span>
      <svg viewBox="0 0 320 512" width="16px" height="16px">
        <path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z" class=""></path>
      </svg>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import layer from '@/renderer/layer'
import select from '@/renderer/mixin/type/select'
import localize from '@/localize'
import PickerComponent from '../picker/index.vue'
/**
 * The only true select-picker.
 */
export default {
  name: 'extend-form-select-picker',
  mixins: [layer, select],
  data () {
    return {
      tmpNum: 0,
      picker: null,
      currentValue: '',
      mapping: {},
      config: {}
    }
  },
  props: {
    initEmit: {
      type: Boolean,
      default: true
    },
  },
  watch: {
    options: {
      deep: true,
      handler (val) {
        this.initialize()
      }
    },
    rows: {
      deep: true,
      handler () {
        this.render()
      }
    },
    selectedValue: {
      deep: true,
      handler (val) {
        this.currentValue = this.serialize()
      }
    }
  },
  methods: {
    initialize () {},
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !this.selectedValue.length) {
        this.$dialog.alert({
          title: this.localize({i: 'form.error'}),
          text: this.localize({i: `form.${this.item.name}empty`})
        })
        return false
      }
      if (events['checking_' + this.item.name]) {
        let result = events['checking_' + this.item.name](this.selectedValue)
        if (result !== true) {
          this.error = result
          return false
        }
      }
      return {v : this.selectedValue}
    },
    open() {
      if (this.computedConfig.readonly) return
      this.picker && this.picker.open()
    },
    close() {
      this.picker.close()
    },
    inDatas(items, key) {
      let b = false
      items.forEach((item) => {
        if (item.value == key) b = true
      })
      return b
    },
    removeElement() {
      if (this.picker && this.picker.$el) document.body.removeChild(this.picker.$el)
    },
    render() {
      this.removeElement()
      let slcted = [this.rows[0].value || this.rows[0]]
      if (this.computedConfig.default) {
        this.selectedValue = [this.rows[0]]
      }
      if (this.computedConfig.multiple) {
        for (let index in this.rows) {
          slcted[index] = this.rows[index][0].value || this.rows[index][0]
        }
      }
      const Picker = Vue.extend(PickerComponent)
      this.picker = new Picker({
        el: document.createElement('div'),
        localize,
        data: {
          rows: this.computedConfig.multiple ? this.rows : [this.rows],
          selectedValue: slcted
        }
      })
      this.picker.item = {
        config: this.computedConfig
      }
      document.body.appendChild(this.picker.$el)
      this.picker.$on('changed', ({column, value}) => {
        this.selectedValue[column] = value
      })
      this.picker.$on('confirmed', (values) => {
        if (this.tmpNum > 0 || this.initEmit) {
          let result = []
          for (let col in values) {
            if (this.computedConfig.multiple) {
              for (let row in this.rows[col]) {
                if (this.rows[col][row].value == values[col] || this.rows[col][row] == values[col]) {
                  result.push(this.rows[col][row])
                }
              }
            } else {
              for (let row in this.rows) {
                if (this.rows[row].value == values[col] || this.rows[row] == values[col]) {
                  result.push(this.rows[row])
                }
              }
            }
          }
          this.selectedValue = result
          /**
           * 当前组件数据发送变化
           *
           * @event confirmed
           * @property {object} obj {target, value}
           */
          this.$emit('confirmed', {target: this, value: result})
          this.fireEvent('confirmed', {target: this, value: result})
          this.updateProvidor('selectedValue', this.selectedValue)
        }
        this.tmpNum++
      })
    },
    serialize () {
      let format = ``
      for (let i in this.rows) {
        format += `{${i}}`
      }
      for (let col in this.selectedValue) {
        if (this.computedConfig.multiple) {
          let result = this.computedConfig.format || format
          result.replace(`{${col}}`, this.selectedValue[col].value || this.selectedValue[col])
        } else {
          if (this.selectedValue[0]) {
            return this.selectedValue[0].label || this.selectedValue[0]
          }
        }
      }
    },
  },
  beforeDestroy() {
    this.removeElement()
  }
}
</script>

<style>
.datepicker-input>span {
  width: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<docs>
## Examples

```vue
  <template>
    <extend-form-select-picker :item="{
      value,
      style,
      in: statusInclude,
      status
    }" @ready="onCreated" @changed="onChanged">
    </extend-form-select-picker>
  </template>

  <script>
    export default {
      data() {
        return {
          value: 'Select',
          config: {
            default: 'true'
          },
          style:{
            position: 'relative',
            width: '100px',
            height: '30px',
            border: '1px solid #ccc'
          },
          statusInclude: ['normal'], 
          status: ['normal']
        };
      },
      methods: {
        onCreated(e) {
          e.setRows([
            {
              label: 'AAAA',
              value: 'a'
            },
            {
              label: 'BBBB',
              value: 'b'
            }
          ])
        },
        onChanged(e) {
        }
      }
    }
  </script>
```

</docs>