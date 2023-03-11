<template>
  <div
    ref="element"
    :id="'countdown-'+id"
    :elementtiming="'countdown-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle"
    @click="onClick">{{computedValue}}</div>
</template>

<script>
import layer from '@/renderer/layer'
import receiver from '@/renderer/mixin/method/receiver'
/**
 * The only true countdown.
 */
export default {
  name: 'extend-layer-countdown',
  mixins: [layer, receiver]
}
</script>

<docs>
## Examples

```vue
  <template>
    <extend-layer-countdown :item="{
      value,
      style,
      config,
      in: statusInclude,
      status
    }" :originParent="origin" @ready="onReady">
    </extend-layer-countdown>
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