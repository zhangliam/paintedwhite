<template>
  <button
    ref="element"
    :id="'button-'+id"
    :elementtiming="'button-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle"
    class="basic-form-button"
    :disabled="disabled"
    @click.prevent="onClick">{{computedValue}}</button>
</template>

<script>
import layer from '@/renderer/layer'
import receiver from '@/renderer/mixin/method/receiver'

/**
 * The only true button.
 */
export default {
  name: 'basic-form-button',
  mixins: [layer, receiver],
  data () {
    return {
      disabled: undefined
    }
  },
  mounted () {
    this.disabled = this.disabled === undefined ? this.computedConfig.disabled === true : this.disabled
  },
  methods: {
    executeCheck () {return true},
    onClick () {
      if (this.computedConfig.type === 'submit') {
        if (this.form) {
          this.form.doCheck()
        }
        return
      }
      /**
       * 当前组件被点击
       *
       * @event clicked
       * @property {object} obj {target}
       */
      this.$emit('clicked', {target: this})
      this.fireEvent('clicked', {target: this})
    },
    setDisabled (disabled) {
      this.disabled = disabled
    }
  }
}
</script>

<style>
.basic-form-button:disabled {
  background-color: #ccc!important;
}
</style>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
disabled: true // 不可用
type: 'submit' // 提交按钮
```

## Examples

```vue
  <template>
    <basic-form-button :item="{
      value,
      style,
      children,
      in: statusInclude,
      status
    }" @clicked="onClicked">
    </basic-form-button>
  </template>

  <script>
    export default {
      data() {
        return {
          value: 'Button',
          style:{
            background:'red', 
            width:'100px', 
            height:'100px'
          }, 
          children:[], 
          statusInclude: ['normal'], 
          status: ['normal']
        };
      },
      methods: {
        onClicked(e) {
        }
      }
    }
  </script>
```

</docs>