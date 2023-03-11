<template>
  <form
    ref="element"
    :id="'form-'+id"
    :elementtiming="'form-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle"
    @click="onClick">
    <component
      v-for="(child, index) in computedComponents" :key="index"
      :is="child.type" :item="child"
      :originParent="computedOrigin"
      :statusParent="status"
      :styleItem="child.itemStyle"
      :styleItemSelected="child.itemSelectedStyle"
      @initialized="onInitialized"></component>
  </form>
</template>

<script>
import container from '@/renderer/container'
import utils  from '@/assets/js/utils'
import logger from '@/assets/js/logger'
/**
 * The only true form.
 * 所有的表单组件都需要有一个selectedValue和一个changed事件进行上报
 * 
 * @class Form
 * @platform Base
 * @type Container
 */
export default {
  name: 'basic-container-form',
  mixins: [container],
  data () {
    return {
      inputs: [],
    }
  },
  provide () {
    return {
      form: this,
      inputs: this.inputs
    }
  },
  methods: {
    /**
     * 检查Form中所有组件，检测完成将发送checked事件
     *
     * @public
     */
    doCheck () {
      let data = {}
      let keys = this.inputs.sort((a, b) => {
        if (!a.item.config.tab) {
          return 1
        }
        if (!b.item.config.tab) {
          return -1
        }
        return a.item.config.tab < b.item.config.tab ? -1 : 1
      })
      let index = 0
      let pass = true;
      while (index < keys.length) {
        let key = keys[index]
        if (key.executeCheck ) {
          let result = key.executeCheck()
          if (result === false) {
            if (pass && this.computedConfig.errorFocus) key.$refs.element.focus()
            pass = false;
            if (this.computedConfig.checkType == 'single') {
              return
            }
          }
          if (key.item.name) {
            data[key.item.name] = result.v
          }
        }
        index++
      }
      if (!pass) {
        return
      }
      /**
       * 当前表单完成检查
       *
       * @event checked
       * @property {object} obj {key}
       */
      this.$emit('checked', data)
      this.fireEvent('checked', data)

      return data;
    },
    onChanged (e) {
      let logs = []
      let isA = true
      let needInput = this.inputs.filter(input => input.computedConfig.need || input.computedConfig.needTrue || input.computedConfig.needCheck)
      let submits = this.inputs.filter(input => input.computedConfig.type == 'submit')
      for (let input of needInput) {
        // `确认是否有值`
        let hasValue = input.selectedValue != null
        if (hasValue) {
          switch (utils.getClassName(input.selectedValue)) {
            case 'Array':
              if (input.selectedValue.length < 1) {
                hasValue = false
              }
              break
            case 'Object':
              if (Object.keys(input.selectedValue).length < 1) {
                hasValue = false
              }
          }
        }
        if (hasValue) {
          if (input.computedConfig.needTrue) {
            if (!input.selectedValue) {
              logs.push([input.item.name, `不为Ture`])
              isA = false
            }
          }
          if (input.computedConfig.needCheck) {
            let result = input.executeCheck()
            if (result === false) {
              logs.push([input.item.name, `效验错误`])
              isA = false
            }
          }
        } else {
          isA = false
          logs.push([input.item.name, `空值`])
        }
      }
      logs.push([`结果`, isA ? `通过` : `失败`])
      logger.group(logger.FUNCTION, `form.onChanged`, logs)
      for (let input of submits) {
        input.setDisabled(!isA)
      }
    },
    installLayer (layer) {
      this.inputs.push(layer)
      if (this.computedConfig.checkType == 'change') {
        layer.$on('changed', this.onChanged)
        this.onChanged()
      }
    }
  }
}
</script>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
```

## Examples

```vue
  <template>
    <basic-container-form :item="{
      style,
      components,
      in: statusInclude,
      status
    }" @ready="onReady" @checked="onChecked">
    </basic-container-form>
  </template>

  <script>
    import Vue from 'vue'
    import Alert from '../../dialog/alert'
    import Confirm from '../../dialog/confirm'

    Vue.prototype.$dialog = {
      confirm: Confirm,
      alert: Alert
    }

    export default {
      data() {
        return {
          style:{
            display: 'flex',
            'flex-direction': 'column'
          }, 
          components:[
            {
              __id: 'xxxxxxxxxxx01',
              type: 'basic-form-input',
              name: 'input',
              value: '',
              config: {
                min: 4,
                max: 12,
                need: true,
                placeholder: 'input'
              },
              style:{},
              components: [],
              in: ['normal'], 
              status: ['normal']
            },
            {
              __id: 'xxxxxxxxxxx02',
              type: 'basic-form-button',
              value: 'submit',
              config: {
                type: 'submit'
              },
              style:{},
              children: [],
              in: ['normal'], 
              status: ['normal']
            }
          ], 
          statusInclude: ['normal'], 
          status: ['normal']
        };
      },
      methods: {
        onReady(c) {
        },
        onChecked (e) {
        }
      }
    }
  </script>
```

</docs>
