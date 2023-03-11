<template>
  <swiper
    ref="element"
    :id="'swiper-'+id"
    :elementtiming="'swiper-'+id"
    v-if="computedActive"
    :options="options"
    class="swiper-container"
    :class="computedItem.class"
    :style="computedStyle">
    <swiper-slide
      :ref="'child_'+index"
      v-for="(child, index) in computedComponents"
      :key="index">
      <component :is="child.type" :item="child"
        :statusParent="child[rowStatusField]"
        :styleItem="child.itemStyle" 
        :styleItemSelected="child.itemSelectedStyle" 
        @initialized="onInitialized"></component>
    </swiper-slide>
  </swiper>
</template>

<script>
import container from '@/renderer/container'
/**
 * The only true swiper.
 */
export default {
  name: 'extend-container-swiper',
  mixins: [container],
  computed: {
    options () {
      let option = {
        autoplay: this.computedConfig['auto-play'] === 'true'
      }
      return option
    }
  },
  methods: {
    onChange (e) {
      this.property.index = e.index
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
      this.$emit('changed', {target: this, value: e})
      this.fireEvent('changed', {target: this, value: e})
    }
  }
}
</script>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
auto-play: true // 自动播放
```
</docs>