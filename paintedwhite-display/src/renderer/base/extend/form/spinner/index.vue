<template>
  <div :id="'spinner-'+id"
    :elementtiming="'spinner-'+id" class="spinner" :class="computedConfig.buttonStyle === 'circle' ? 'spinner-circle' : 'spinner-square'" :style="computedStyle">
    <span ref="minus" :class="minAble?['spinner-button']:['spinner-button-disable']" @click="doMinus">
      <svg viewBox="0 0 448 512" width="16px" height="16px">
        <path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" class=""></path>
      </svg>
    </span>
    <input
      type="number"
      pattern="[0-9]*"
      :style="{width: computedConfig.buttonStyle === 'circle' ? width : '50%'}"
      ref="numInput"
      class="spinner-input"
      :readonly="computedConfig.readonly"
      v-model="counter"
      placeholder=""
    />
    <span ref="add" :class="maxAble?['spinner-button']:['spinner-button-disable']" @click="doAdd">
      <svg viewBox="0 0 448 512" width="16px" height="16px">
        <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" class=""></path>
      </svg>
    </span>
  </div>
</template>

<script>
import layer from '@/renderer/layer'
import receiver from '@/renderer/mixin/method/receiver'
/**
 * The only true spinner.
 */
export default {
  name: 'extend-form-spinner',
  mixins: [layer, receiver],
  data () {
    return {
      counter: 0
    }
  },
  computed: {
    minAble () {
      return this.computedConfig.min != undefined ? this.computedConfig.min < this.counter : true
    },
    maxAble () {
      return this.computedConfig.max != undefined ? this.computedConfig.max > this.counter : true
    }
  },
  methods: {
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !this.counter) {
        this.$dialog.alert({
          title: this.localize({i: 'form.error'}),
          text: this.localize({i: `form.${this.item.name}empty`})
        })
        return false
      }
      if (events['checking_' + this.item.name]) {
        let result = events['checking_' + this.item.name](this.counter)
        if (result !== true) {
          this.error = result
          return false
        }
      }
      return {v: this.counter}
    },
    doMinus() {
      if (!this.minAble) {
        return
      }
      this.counter--
      /**
       * 当前组件被点击
       *
       * @event clicked
       * @property {object} obj {target, value}
       */
      this.$emit('clicked', {target: this, value: this.counter})
      this.fireEvent('clicked', {target: this, value: this.counter})

      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
      this.$emit('changed', {target: this, value: this.counter})
    },
    doAdd() {
      if (!this.maxAble) {
        return
      }
      this.counter++
      /**
       * 当前组件被点击
       *
       * @event clicked
       * @property {object} obj {target, value}
       */
      this.$emit('clicked', {target: this, value: this.counter})
      this.fireEvent('clicked', {target: this, value: this.counter})
      
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
      this.$emit('changed', {target: this, value: this.counter})
    }
  }
}
</script>

<style>
.spinner>span {
  float: left;
  width: 25%;
  height: 100%;
  text-align: center;
  font-weight: 700;
  color: #666;
  letter-spacing: 0;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-button {
  border: 1px solid #000;
}

.spinner-button-disable {
  border: 1px solid #EDEDED;
}

.spinner, .spinner>span {
  position: relative;
  overflow: hidden;
}

.spinner-square>span:first-child:before {
  content: "";
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
}

.spinner>input {
  letter-spacing: 0;
  float: left;
  height: inherit;
  text-align: center;
  color: #666;
  border: none;
  font-size: .26rem;
  background-color: #fff;
}
</style>

<docs>
## Examples

```vue
  <template>
    <extend-form-spinner :item="{
      __id: 'aaa',
      value,
      style,
      config,
      in: statusInclude,
      status
    }" @ready="onReady">
    </extend-form-spinner>
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