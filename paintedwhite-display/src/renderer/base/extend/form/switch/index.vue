<template>
    <input type="checkbox"
      class="switch"
      :id="'switch-'+id"
      :elementtiming="'switch-'+id"
      :true-value="trueValue"
      :false-value="falseValue"
      :disabled="disabled"
      v-model="checked"
      :style="{color: color}"
    />
</template>

<script>
import layer from '@/renderer/layer'
/**
 * The only true switch.
 */
export default {
  name: 'extend-form-switch',
  mixins: [layer],
  data () {
    return {
      checked: this.value
    }
  },
  props: {
    value: [String, Number, Boolean],
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      default: '#4CD864'
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    size: {
      validator(val) {
        return ['small', 'normal', 'large'].indexOf(val) > -1;
      },
      default: 'normal'
    },
    val: {
      type: [Boolean, String, Number]
    },
    callback: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    checked(val) {
      this.$emit('input', val);
      this.callback(val, this.val);
    },
    value(val) {
      this.checked = val;
    }
  },
  methods: {
    executeCheck () {
      return {v: this.checked}
    },
  }
}
</script>

<docs>
## Examples

```vue
  <template>
    <extend-form-switch :item="{
      __id: 'aaa',
      value,
      style,
      config,
      in: statusInclude,
      status
    }" @ready="onReady">
    </extend-form-switch>
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
        onReady(c) {}
      }
    }
  </script>
```

</docs>