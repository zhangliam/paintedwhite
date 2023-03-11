<template>
  <div ref="element"
    :id="'counter-picker-'+id"
    :elementtiming="'counter-picker-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle" @click.stop="open" class="chanel-counterpicker-input">
    <div :class="currentValue ? ['chanel-counterpicker-placeholder-active'] : ['chanel-counterpicker-placeholder']">{{computedConfig.placeholder}}</div>
    <div class="chanel-counterpicker-input-txt">{{currentValue}}</div>
    <span class="chanel-counterpicker-input-icon">
      <svg width="13px" height="7px" view="0 0 13 7">
        <polygon transform="rotate(90.000000) translate(0, -13)" fill="#1D1D1D" points="5.36671033 6.55823168 0 0.854520446 0.820582811 0 7 6.56745177 0.816200733 13 0.00438207779 12.1362645"></polygon>
      </svg>
    </span>
    <div class="chanel-form-input-error" v-if="error">{{error}}</div>
  </div>
</template>

<script>
import Vue from 'vue'
import layer from '@/renderer/layer'
import logger from '@/assets/js/logger'
import select from '@/renderer/mixin/type/select'
import receiver from '@/renderer/mixin/method/receiver'
import localize from '@/localize'
import PickerComponent from './picker.vue'
/**
 * TODO 默认值
 */
export default {
  name: 'chanel-form-counter-picker',
  mixins: [layer, select, receiver],
  data() {
    return {
      show: false,
      tmpNum: 0,
      picker: null,
      currentValue: '',
      mapping: {},
      config: {},
      error: ''
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
        this.error = this.localize({i: `form.${this.item.name}Empty`})
        logger.log(logger.ERROR,`form. ${this.item.name} Max`)
        return false
      }
      if (events['checking_' + this.item.name]) {
        let result = events['checking_' + this.item.name](this.selectedValue)
        if (result !== true) {
          this.error = result
          return false
        }
      }
      this.error = ''
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
           * @property {object} obj {target}
           */
          this.$emit('confirmed', {target: this, value: result})
          this.fireEvent('confirmed', {target: this, value: result})
          this.updateProvidor('selectedValue', this.selectedValue)

          /**
           * 当前组件数据发送变化
           *
           * @event changed
           * @property {object} obj {value}
           */
          this.$emit('changed', {target: this, value: this.selectedValue})
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
.chanel-counterpicker-input {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid #e1e1e1;
}

.chanel-counterpicker-placeholder {
  width: unset !important;
  pointer-events: none;
  display: flex;
  align-items: center;
  position: absolute;
  height: 50%;
  top: 50%;
  transition: all 0.1s ease-out;
}

.chanel-counterpicker-placeholder-active {
  width: unset !important;
  display: flex;
  align-items: center;
  height: 50%;
  position: absolute;
  top: 10%;
  transform: scale(0.8);
  transform-origin: 0 0;
  transition: all 0.1s ease-out;
}

.chanel-counterpicker-input-txt {
  border: none;
  margin: 0px;
  padding: 0px;
  height: 50%;
}

.chanel-counterpicker-input-icon {
  height: 50%;
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