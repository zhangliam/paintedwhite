<template>
  <div class="chanel-form-input"
    :id="'moblie-code-'+id"
    :elementtiming="'moblie-code-'+id"
    v-if="computedActive" 
    :class="error ? ['chanel-form-input-error-border', computedItem.class]: [computedItem.class]" 
    :style="computedStyle">
    <div :class="show || computedInput?['chanel-placeholder-active']:['chanel-placeholder']">{{computedConfig.placeholder}}{{computedConfig.need && !show ? '*' : ''}}</div>
    <input
      ref="element"
      class="chanel-form-input-txt"
      :type="computedConfig.type || 'text'"
      :maxlength="computedConfig.maxlength"
      :value="computedInput"
      @input="onChange"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeyBoard"/>
    <button @click.prevent="onClick" class="chanel-form-mobile-code-button">{{buttonStr}}</button>
    <div class="chanel-form-input-error" v-if="error">{{error}}</div>
  </div>
</template>

<script>
import layer from '@/renderer/layer'
import input from '@/renderer/mixin/type/input'
import receiver from '@/renderer/mixin/method/receiver'
/**
 * The only true input.
 */
export default {
  name: 'chanel-form-mobile-code',
  mixins: [layer, input, receiver],
  data () {
    return {
      buttonStr: this.localize({i: 'form.sendCode'}),
      show: false,
      isTiming: false,
      error: ''
    }
  },
  methods: {
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      let value = this.$refs.element.value
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !value.length) {
        this.error = this.localize({i: `form.${this.item.name}Empty`})
        return false
      }
      if (this.computedConfig.min && this.computedConfig.min > value.length) {
        this.error = this.localize({i: `form.${this.item.name}Min`})
        return false
      }
      if (this.computedConfig.max && this.computedConfig.max < value.length) {
        this.error = this.localize({i: `form.${this.item.name}Max`})
        return false
      }
      if (this.computedOrigin.code != value) {
        this.error = this.localize({i: `form.${this.item.name}NotEq`})
        return false
      }
      if (events['checking_' + this.item.name]) {
        let result = events['checking_' + this.item.name](value)
        if (result !== true) {
          this.error = result
          return false
        }
      }
      this.error = ''
      
      return {v : this.$refs.element.value}
    },
    onFocus () {
      if (this.computedConfig.keepError !== true) {
        this.error = "";
        this.selectedValue = "";
      }
      this.show = true
    },
    onBlur () {
      if (!this.$refs.element.value) {
        this.show = false
      }
    },
    onClick () {
      if (this.isTiming) {
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
    start () {
      this.isTiming = true
      let index = this.computedConfig.duration || 60
      let timer
      let resetTimer = () => {
        clearTimeout(timer)
        this.buttonStr = this.localize({i: 'form.sendCodeDuration'}).replace('$i', index)
        index--
        if (index >= 0) {
          timer = setTimeout(resetTimer, 1000)
        } else {
          this.buttonStr = this.localize({i: 'form.sendCodeAgain'})
          this.isTiming = false
        }
      }
      resetTimer()
    }
  }
}
</script>

<style>
.chanel-form-mobile-code-button {
  position: absolute;
  right: 0;
  border: unset;
  outline: unset;
  background: unset;
  height: 50%;
}
</style>

<docs>
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
