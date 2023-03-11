<template>
  <div
    ref="element"
    :id="'checkbox-'+id"
    :elementtiming="'checkbox-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle" class="chanel-form-checkbox-item">
    <input type="checkbox" v-model="selectedValue" class="chanel-form-checkbox" :name="computedItem.__id" @change="onChange" />
    <div @click="onClick" v-html="computedConfig.label"></div>
  </div>
</template>

<script>
import logger from '@/assets/js/logger'
import layer from '@/renderer/layer'
import receiver from '@/renderer/mixin/method/receiver'
/**
 * The only true select.
 * 
 * TODO 默认值
 */
export default {
  name: 'chanel-form-checkbox',
  mixins: [layer, receiver],
  data () {
    return {
      selectedValue: false
    }
  },
  methods: {
    onChange (e) {
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {value}
       */
      this.$emit('changed', {target: this, value: this.selectedValue})
      this.fireEvent('changed', {target: this, value: this.selectedValue})
      this.updateProvidor('selectedValue', this.selectedValue)
    },
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !this.selectedValue) {
        this.$dialog.alert({
          title: this.localize({i: 'form.error'}),
          text: this.localize({i: `form.${this.item.name}Empty`})
        })
        logger.log(logger.ERROR,`form.${this.item.name} Empty`)
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
  }
}
</script>

<style>
.chanel-form-checkbox-item {
  display: flex;
}

input[type="checkbox"] {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  position: relative;
  border: unset;
}

input[type="checkbox"]::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  background: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid #D8D8D8;
  border-radius: 0px;
}

input[type="checkbox"]:checked::before {
  content: "\25A0";
  background-color: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid #ACACAC;
  border-radius:0px;
  color: #000;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<docs>
## Examples

```vue
  <template>
    <basic-form-checkbox :item="{
      __id: 'aaa',
      value,
      style,
      config,
      in: statusInclude,
      status
    }" @ready="onReady">
    </basic-form-checkbox>
  </template>

  <script>
    export default {
      data() {
        return {
          
          value: '',
          config: {
          },
          style:{}, 
          statusInclude: ['normal'], 
          status: ['normal']
        };
      },
      methods: {
        onReady(c) {
          c.setRows([
            {
              label: 'a',
              value: 'a'
            },
            {
              label: 'b',
              value: 'b'
            }
          ])
        }
      }
    }
  </script>
```

</docs>