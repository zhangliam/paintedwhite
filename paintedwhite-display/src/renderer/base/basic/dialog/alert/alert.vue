<template>
  <div class="dialog-black-mask">
    <div class="confirm alert">
      <div class="confirm-bd" v-html="text"></div>
      <div class="confirm-ft">
        <a href="javascript:;" class="yd-confirm-btn primary" @click.stop="closeAlert">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * The only true alert.
 * 
 * @class Alert
 * @platform Base
 * @type Dialog
 */
export default {
  name: 'basic-dialog-alert',
  props: {
    title: String,
    text: String,
    callback: Function
  }
}
</script>

<style>
.dialog-black-mask {
  position: fixed;
  z-index: 2000;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-black-mask {
  background-color: rgba(0,0,0,.5);
}

.alert {
  animation: zoom-in .15s ease forwards;
}

.alert .confirm-bd {
  text-align: center;
  padding: 20px 20px 0;
}

.alert .confirm-ft {
  margin-top: 14px;
}
</style>