<template>
  <div
    ref="element"
    :id="'scrollview-'+id"
    :elementtiming="'scrollview-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle"
    @click="onClick"
    @scroll="onScroll">
    <component
      v-for="(child, index) in computedComponents" :key="index"
      :is="child.type" :item="child"
      :originParent="computedOrigin"
      :statusParent="status"
      :styleItem="child.itemStyle" 
      :styleItemSelected="child.itemSelectedStyle" 
      @initialized="onInitialized"></component>
  </div>
</template>

<script>
import container from '@/renderer/container'
import scroll from '@/renderer/mixin/type/scroll'
/**
 * The only true scrollview.
 * 
 * @class ScrollView
 * @platform Base
 * @type Container
 */
export default {
  name: 'basic-container-scrollview',
  mixins: [container, scroll]
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
    <basic-container-scrollview :item="{
      style,
      components,
      in: statusInclude,
      status
    }" @ready="onReady">
    </basic-container-scrollview>
  </template>

  <script>
    export default {
      data() {
        return {
          style:{
            background:'red', 
            width:'100px', 
            height:'100px'
          }, 
          components:[
            {
              type: 'basic-container-div',
              value: 'submit',
              style:{
                background:'blue', 
                height:'50px'
              },
              components: [],
              in: ['normal'], 
              status: ['normal']
            }
          ], 
          statusInclude: ['normal'], 
          status: ['normal']
        };
      },
      methods: {
        onReady() {
          console.log('onReady')
        }
      }
    }
  </script>
```

</docs>