<template>
  <div
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle"
    class="image"
    :id="'image-'+id"
    @click="onClick">
    <img
      ref="element"
      alt=""
      v-if="computedValue"
      :class="computedConfig.mode || 'aspectFit'"
      :src="computedValue"
      :elementtiming="'image-'+id"
      @load="onLoad"
      @error="onError"/>
  </div>
</template>

<script>
import layer from '@/renderer/layer'
import receiver from '@/renderer/mixin/method/receiver'
/**
 * The only true image.
 */
export default {
  name: 'basic-layer-image',
  mixins: [layer, receiver],
  data () {
    return {
      retry: 0,
      timer: null,
      loaded: false
    }
  },
  created () {
    if (this.$store && this.computedConfig.preload !== 'false') {
      this.$store.commit('REGIST_LOADER', this.item.__id)
    }
  },
  methods: {
    onLoad () {
      if (this.$store) {
        this.$store.commit('LOADER_COMPLETE', this.item.__id)
      }
    },
    onError () {
      if (this.$store) {
        this.$store.commit('LOADER_COMPLETE', this.item.__id)
      }
    }
  }
}
</script>

<style>
.image {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

img {
  width: auto;
  height: auto;
}

.aspectFit {
  max-width: 100%;
  max-height: 100%;
}

.aspectFill {
  width: 100%;
  height: 100%;
}

.scaleToFill {
  min-width: 100%;
  min-height: 100%;
}
</style>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
```

## Examples

```vue
  <template>
    <basic-layer-image :item="{
      value,
      style,
      config,
      in: statusInclude,
      status
    }" :originParent="origin" @ready="onReady">
    </basic-layer-image>
  </template>

  <script>
    export default {
      data() {
        return {
          value: '{{url}}',
          origin: {
            url: ''
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
            key: 'url',
            value: 'http://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png' 
          })
        }
      }
    }
  </script>
```

</docs>