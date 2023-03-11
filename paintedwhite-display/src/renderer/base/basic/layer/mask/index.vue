<template>
  <div class="mask" :style="styles"><slot></slot></div>
</template>

<script>
export default {
  name: 'basic-layer-mask',
  data() {
    return {
      show: this.value
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    bgcolor: {
      type: String,
      default: '#000'
    },
    zindex: {
      default: 1500
    },
    opacity: {
      default: .5
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(val) {
      this.show = val
    }
  },
  computed: {
    styles() {
      const style = {'z-index': this.zindex, 'background-color': this.bgcolor}
      if (this.show) {
        style['opacity'] = this.opacity
        style['pointer-events'] = 'auto'
      }
      return style
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<style>
.mask {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  transition: opacity .2s ease-in;
  opacity: 0;
}

</style>