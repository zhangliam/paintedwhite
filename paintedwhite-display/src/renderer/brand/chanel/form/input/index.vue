<template>
  <div class="chanel-form-input"
    :id="'input-'+id"
    :elementtiming="'input-'+id"
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
    <div class="chanel-form-input-error" v-if="error">{{error}}</div>
  </div>
</template>

<script>
import logger from '@/assets/js/logger'
import layer from '@/renderer/layer'
import input from '@/renderer/mixin/type/input'
import receiver from '@/renderer/mixin/method/receiver'
/**
 * The only true input.
 */
export default {
  name: 'chanel-form-input',
  mixins: [layer, input, receiver],
  data () {
    return {
      show: false,
      error: ''
    }
  },
  methods: {
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      let value = this.$refs.element.value
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !value.length) {
        this.error = this.localize({i: `form.${this.item.name}Empty`})
        logger.log(logger.ERROR,`form. ${this.item.name} empty`)
        return false
      }
      if (this.computedConfig.min && this.computedConfig.min > value.length) {
        this.error = this.localize({i: `form.${this.item.name}Min`})
        logger.log(logger.ERROR,`form. ${this.item.name} Min`)
        return false
      }
      if (this.computedConfig.max && this.computedConfig.max < value.length) {
        this.error = this.localize({i: `form.${this.item.name}Max`})
        logger.log(logger.ERROR,`form. ${this.item.name} Max`)
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
    }
  }
}
</script>

<style>
.chanel-form-input {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: baseline;
  border-bottom: 1px solid #e1e1e1;
}

.chanel-placeholder {
  pointer-events: none;
  display: flex;
  align-items: center;
  position: absolute;
  height: 50%;
  top: 50%;
  transition: all 0.1s ease-out;
}

.chanel-placeholder-active {
  display: flex;
  align-items: center;
  height: 50%;
  position: absolute;
  top: 10%;
  transform: scale(0.95);
  transform-origin: 0 0;
  transition: all 0.1s ease-out;
}

.chanel-form-input-txt {
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 50%;
}

.chanel-form-input-error {
  position: absolute;
  bottom: -50%;
  color: #CD0000;
}

.chanel-form-input-error-border {
  border-bottom: 1px solid #CD0000;
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
