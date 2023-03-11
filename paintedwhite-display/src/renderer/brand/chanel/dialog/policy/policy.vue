<template>
  <div class="dialog-white-mask-policy">
    <div class="policy-head">
      <svg @click.stop="closePolicy" width="16px" height="16px" viewBox="0 0 16 16">
        <polygon id="Page-1" fill="#999999" points="14.8572 0 8 6.8568 1.1428 0 0 1.1428 6.8568 8 0 14.8568 1.1428 16 8 9.1428 14.8572 16 16 14.8568 9.1428 8 16 1.1428"></polygon>
      </svg>
    </div>
    <div class="policy-title" v-html="title"></div>
    <div class="policy-content" v-html="text"></div>
    <div class="policy-foot" @click.stop="closePolicy">
      <a href="javascript:" v-localize="{i: 'form.confirm'}"></a>
    </div>
  </div>
</template>

<script>
/**
 * The only true policy.
 * 
 * @class policy
 * @platform Base
 * @type Dialog
 */
export default {
  name: 'basic-dialog-policy',
  props: {
    title: String,
    text: String,
    callback: Function
  },
  data () {
    return {
      show: false,
      maskerOpacity: .5
    }
  }
}
</script>

<style>
.dialog-white-mask-policy {
  position: fixed;
  z-index: 2000;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background-color: #fff;
}

.policy-head {
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.policy-title {
  margin: 10px;
}

.policy-content {
  margin: 10px;
}

.policy-foot {
  height: 44px;
  background-color: #000;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  margin: 20px;
  width: calc(100% - 40px);
  color: #fff;
}

.policy-foot a {
  color: #fff;
}
</style>