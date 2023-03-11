<template>
  <div
    :id="'movieclip-'+id"
    :elementtiming="'movieclip-'+id"
    v-if="computedActive"
    :class="computedItem.class"
    :style="computedStyle"
    class="image"
    @click="onClick">
    <img
      ref="element"
      alt=""
      v-for="(path, index) in paths"
      :key="index"
      v-show="index + 1 === frame"
      :class="computedConfig.mode || 'aspectFit'"
      :src="path"
      @load="onLoad"
      @error="onError"/>
  </div>
</template>

<script>
import layer from '@/renderer/layer'
import receiver from '@/renderer/mixin/method/receiver'
/**
 * The only true movieclip.
 * 
 */
export default {
  name: 'extend-layer-movieclip',
  mixins: [layer, receiver],
  data () {
    return {
      direct: 1,
      playing: false,
      inloop: false,
      retry: [],
      paths: [],
      frame: 0,
      timeout: null,
      index: 0,
    }
  },
  created: function(){
    if (this.$store && this.computedConfig.preload !== 'false') {
      this.$store.commit('REGIST_LOADER', this.item.__id)
    }
    var hasLazy = this.computedConfig.lazy && this.computedConfig.lazy.length > 0
    var j = 0
    var i = 1
    var offset = 0
    while( i + offset <= this.computedConfig.total ){
      if( hasLazy && this.computedConfig.lazy[j] === i + offset ){
        this.paths.push(this.computedConfig.path + (i - 1) + '.' + this.computedConfig.ext)
        j++
        offset++
      } else {
        i = i + offset
        this.paths.push(this.computedConfig.path + i + '.' + this.computedConfig.ext)
        i++
        offset = 0
      }
    }
  },
  mounted () {
    this.frame = 1
    this.playing = this.computedConfig.autoPlay
    this.direct = this.computedConfig.direct || 1
    if (this.playing && !document.hidden) {
      requestAnimationFrame(this.enterFrame)
    }

    const onVisibilityChange = () => {
      if (this.playing && !document.hidden) {
        requestAnimationFrame(this.enterFrame)
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
  },
  methods: {
    enterFrame () {
      this.index++
      this.index = this.index % 60
      this.timeout = requestAnimationFrame(this.enterFrame)
      let speed = 60 / (this.computedConfig.fps || 60)
      if (!(this.index % speed)) {
        if (this.direct === 1) {
          this.next()
        } else if (this.direct === -1) {
          this.prev()
        }
        /**
         * enterFrame
         *
         * @event enterFrame
         * @property {number} frame
         */
        this.$emit('enterFrame', this.frame)
        this.fireEvent('enterFrame', this.frame)
      }
    },
    next () {
      if (!this.frame) {
        this.frame = 1
      } else if (this.frame >= this.computedConfig.total){
        if ( this.computedConfig.rebound ){
          this.direct = -this.direct
        } else if ( this.computedConfig.loop ) {
          this.frame = 1
        } else {
          if (this.computedConfig.loopwall) {
            this.frame = this.computedConfig.loopwall
          } else if (this.computedConfig.reboundwall) {
            this.inloop = true
            this.descPlay()
          } else {
            /**
             * 最后一帧
             *
             * @event lastFrame
             * @property {number} frame
             */
            this.$emit('lastFrame', this.frame)
            this.fireEvent('lastFrame', this.frame)
            this.stop()
          }
        }
      } else {
        this.frame += 1
      }
    },
    prev () {
      if(!this.frame){
        this.frame = this.computedConfig.total
      } else if( this.frame <= 1 ){
        if ( this.computedConfig.rebound ){
          this.direct = -this.direct
        } else if ( this.computedConfig.loop ) {
          this.frame = this.computedConfig.total
        } else {
          /**
           * 第一帧
           *
           * @event firstFrame
           */
          this.$emit('firstFrame')
          this.fireEvent('firstFrame')
          this.stop()
        }
      } else {
        if (this.inloop && this.frame === this.computedConfig.reboundwall) {
          this.ascPlay()
        } else {
          this.frame -= 1
        }
      }
    },
    ascPlay () {
      this.playing = true
      this.direct = 1
    },
    descPlay () {
      this.playing = true
      this.direct = -1
    },
    /**
     * play
     *
     * @param {string} status
     * @public
     */
    play (index) {
      this.frame = index || (this.direct === 1 ? 1 : this.computedConfig.total)
      this.playing = true
      requestAnimationFrame(this.enterFrame)
    },
    /**
     * stop
     *
     * @public
     */
    stop () {
      this.playing = false
      this.inloop = false
      cancelAnimationFrame(this.timeout)
    },
    /**
     * gotoFrame
     *
     * @public
     */
    gotoFrame (index) {
      this.frame = index
    },
    /**
     * reset
     *
     * @public
     */
    reset () {
      if (this.direct == 1) {
        this.gotoFrame(1)
      }else if (this.direct == -1) {
        this.gotoFrame(this.computedConfig.total)
      }
    },
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
## Examples

```vue
  <template>
    <extend-layer-movieclip :item="{
      style,
      config,
      in: statusInclude,
      status
    }" @ready="onReady">
    </extend-layer-movieclip>
  </template>

  <script>
    export default {
      data() {
        return {
          config: {
            total: 12, //总帧数
            path: 'http://localhost:8080/public/files/images/mc/fingers', // 路径
            ext: 'png', // 后缀
            // autoPlay: true, // 自动播放
            // direct: 1, // 播放顺序 顺序播放: 1 倒序播放: -1
            // loop: true, // 循环
            // lazy: [], // 部分动画中有停顿部分，不在重复下载该资源
            // fps: 60, // 帧频 默认60
            rebound: true, // 反向循环
            // loopwall: 5, // 循环起始点
            // reboundwall: 5, // 反向循环起始点
          },
          style:{}, 
          statusInclude: ['normal'], 
          status: ['normal']
        }
      },
      methods: {
        onReady(c) {
          c.play()
        }
      }
    }
  </script>
```

</docs>