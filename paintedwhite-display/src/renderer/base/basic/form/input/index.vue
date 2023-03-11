<template>
  <input
    ref="element"
    :id="'input-'+id"
    :elementtiming="'input-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle"
    :type="computedConfig.type"
    :maxlength="computedConfig.maxlength"
    :placeholder="computedConfig.placeholder"
    :value="computedInput"
    @input="onChange"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeyBoard"/>
</template>

<script>
import layer from '@/renderer/layer'
import input from '@/renderer/mixin/type/input'
/**
 * The only true input.
 */
export default {
  name: 'basic-form-input',
  mixins: [layer, input],
  methods: {
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      let value = this.$refs.element.value
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !value.length) {
        this.$dialog.alert({
          title: this.localize({i: 'form.error'}),
          text: this.localize({i: `form.${this.item.name}Empty`})
        })
        return false
      }
      if (this.computedConfig.min && this.computedConfig.min > value.length) {
        this.$dialog.alert({
          title: this.localize({i: 'form.error'}),
          text: this.localize({i: `form.${this.item.name}Min`})
        })
        return false
      }
      if (this.computedConfig.max && this.computedConfig.max < value.length) {
        this.$dialog.alert({
            title: this.localize({i: 'form.error'}),
            text: this.localize({i: `form.${this.item.name}Max`})
          })
        return false
      }
      if (events['checking_' + this.item.name]) {
        let result = events['checking_' + this.item.name](value)
        if (result !== true) {
          this.error = result
          return false
        }
      }
      return {v : this.$refs.element.value}
    }
  }
}
</script>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
need: true // 必填
type: 1 // 类型
maxlength: 1000 // 最大输入值
placeholder: 'placeholder' // placeholder
min: 4 // 最小长度
max: 4 // 最大长度
```

## Examples

```vue
<template>
  <basic-form-input :item="{
    value,
    style,
    config,
    in: statusInclude,
    status
  }" @changed="onChanged">
  </basic-form-input>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        config: {
          min: 4,
          max: 16,
          placeholder: 'input'
        },
        style:{}, 
        statusInclude: ['normal'], 
        status: ['normal']
      };
    },
    methods: {
      onChanged(e) {
      }
    }
  }
</script>
```

</docs>