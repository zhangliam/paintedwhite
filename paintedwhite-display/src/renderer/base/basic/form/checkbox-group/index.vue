<template>
  <div
    ref="element"
    :id="'checkbox-group-'+id"
    :elementtiming="'checkbox-group-'+id" 
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle">
    <label v-for="(row, i) in rows" :key="i">
      <input type="checkbox" v-model="selectedValue" :multiple="computedConfig.multiple" :name="computedItem.__id" :value="row" @change="onChange" />
      <span v-html="row.label"></span>
    </label>
  </div>
</template>

<script>
import layer from '@/renderer/layer'
import select from '@/renderer/mixin/type/select'
/**
 * The only true checkbox-group.
 * 
 * TODO 默认值
 */
export default {
  name: 'basic-form-checkbox-group',
  mixins: [layer, select],
  methods: {
    onChange (e) {
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
      this.$emit('changed', {target: this, value: this.selectedValue})
      this.fireEvent('changed', {target: this, value: this.selectedValue})
      this.updateProvidor('selectedValue', this.selectedValue)
    },
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !this.selectedValue.length) {
        this.$dialog.alert({
          title: this.localize({i: 'form.error'}),
          text: this.localize({i: `form.${this.item.name}Empty`})
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
  }
}
</script>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
need: true // 必填
multiple: true // 多选
```

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