<template>
  <div class="notify" :class="classes" v-html="text"></div>
</template>

<script>
/**
 * The only true notify.
 * 
 * @class Notify
 * @platform Base
 * @type Dialog
 */
export default {
  name: 'basic-dialog-notify',
  data() {
    return {
      classes: ''
    }
  },
  props: {
    text: String,
    timeout: Number,
    callback: Function
  }
}
</script>

<style>
.notify {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  right: 0;
  background-color: rgba(40, 40, 40, 0.85);
  line-height: .28rem;
  font-size: .26rem;
  color: #FFF;
  padding: .4rem .24rem .3rem .24rem;
  opacity: 0;
  animation: down-in 0.2s linear forwards;
  word-break: break-all;
  text-align: center;
  z-index: 2000;
}

.notify-out {
  animation: up-out .15s linear forwards;
}
</style>