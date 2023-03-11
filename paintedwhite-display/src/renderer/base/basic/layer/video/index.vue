<template>
  <video
    ref="element"
    :id="'video-'+id"
    :elementtiming="'video-'+id"
    v-if="computedActive && computedValue"
    :class="computedItem.class"
    :style="computedStyle"
    :src="computedValue"
    :auto-play="computedConfig['auto-play']"
    :play-status="computedConfig['play-status']"
    :controls="computedConfig.controls"
    :loop="computedConfig.loop"
    @click="onClick"
    @start="onstart"
    @pause="onpause"
    @finish="onfinish"
    @fail="onfail"></video>
</template>

<script>
import layer from '@/renderer/layer'
import receiver from '@/renderer/mixin/method/receiver'
/**
 * The only true video.
 */
export default {
  name: 'basic-layer-video',
  mixins: [layer, receiver],
  data () {
    return {
      retry: 0,
      timer: null,
      loaded: false,
      fixString: ''
    }
  },
  mounted () {
    const onVisibilityChange = () => {
      const video = this.$refs.element;
      // 页面完全不可见时，暂停播放，可见时则恢复播放
      video && (document.hidden
        ? video.pause()
        : video.play());
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
  },
  methods: {
    onstart (event) {
      /**
       * 当前组件开始播放
       *
       * @event start
       * @property {object} obj {target, event}
       */
      this.$emit('start', {target: this, event})
      this.fireEvent('start', {target: this, event})
    },
    onpause (event) {
      /**
       * 当前组件暂停播放
       *
       * @event pause
       * @property {object} obj {target, event}
       */
      this.$emit('pause', {target: this, event})
      this.fireEvent('pause', {target: this, event})
    },
    onfinish (event) {
      /**
       * 当前组件完成播放
       *
       * @event finish
       * @property {object} obj {target, event}
       */
      this.$emit('finish', {target: this, event})
      this.fireEvent('finish', {target: this, event})
    },
    onfail (event) {
      /**
       * 当前组件发送错误
       *
       * @event fail
       * @property {object} obj {target, event}
       */
      this.$emit('fail', {target: this, event})
      this.fireEvent('fail', {target: this, event})
    }
  }
}
</script>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
auto-play: true // 自动播放
play-status: '' // 播放状态
controls: true // 控制栏
loop: true // 循环播放
```

## Examples

```vue
  <template>
    <basic-layer-video :item="{
      value,
      style,
      config,
      in: statusInclude,
      status
    }" :originParent="origin" @ready="onReady">
    </basic-layer-video>
  </template>

  <script>
    export default {
      data() {
        return {
          value: '{{url}}',
          origin: {
            url: 'http://flv2.bn.netease.com/videolib3/1611/01/XGqSL5981/SD/XGqSL5981-mobile.mp4'
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
        }
      }
    }
  </script>
```

</docs>