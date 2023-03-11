<template>
  <div
    ref="element"
    :id="'div-'+id"
    :elementtiming="'div-'+id"
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
  </div>
</template>

<script>
import container from '@/renderer/container'
/**
 * The only true div.
 * 
 * @class Div
 * @platform Base
 * @type Container
 */
export default {
  name: 'basic-container-div',
  mixins: [container],
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
    <basic-container-div :item="{
      style,
      components,
      in: statusInclude,
      status
    }" @ready="onReady">
    </basic-container-div>
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
              style:{
                background:'blue', 
                width:'10px', 
                height:'10px'
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