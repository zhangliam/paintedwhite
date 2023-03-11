<template>
  <div
    ref="element"
    v-if="computedActive"
    :id="'text-'+id"
    :elementtiming="'text-'+id"
    :class="computedItem.class"
    :style="computedStyle"
    @click="onClick" v-html="computedValue"></div>
</template>

<script>
import layer from '@/renderer/layer'
import receiver from '@/renderer/mixin/method/receiver'
/**
 * The only true text.
 */
export default {
  name: 'basic-layer-text',
  mixins: [layer, receiver]
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
    <basic-layer-text :item="{
      value,
      style,
      config,
      in: statusInclude,
      status
    }" :originParent="origin" @ready="onReady">
    </basic-layer-text>
  </template>

  <script>
    export default {
      data() {
        return {
          value: 'Hello {{txt}}',
          origin: {
            txt: 'Text'
          },
          config: {
          },
          style:{}, 
          statusInclude: ['normal'], 
          status: ['normal']
        };
      },
      methods: {
        onReady(c) {
          c.setOrigin({
            key: 'txt',
            value: 'World' 
          })
        }
      }
    }
  </script>
```

</docs>