<template>
  <div class="dialog-black-mask">
    <div class="confirm">
      <div class="confirm-hd"><strong class="confirm-title" v-html="title"></strong></div>
      <div class="confirm-bd" v-html="text"></div>
      <template v-if="typeof opts == 'function'">
        <div class="confirm-ft">
          <a href="javascript:;" class="confirm-btn default" @click.stop="closeConfirm(false)">取消</a>
          <a href="javascript:;" class="confirm-btn primary" @click.stop="closeConfirm(false, opts)">确定</a>
        </div>
      </template>
      <template v-else>
        <div class="confirm-ft">
          <a href="javascript:;"
            class="confirm-btn"
            :key="key"
            v-for="(item, key) in opts"
            :class="typeof item.color == 'boolean' ? (item.color ? 'primary' : 'default') : ''"
            :style="{color: item.color}"
            @click.stop="closeConfirm(item.stay, item.callback)"
          >{{item.txt}}</a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
/**
 * The only true confirm.
 * 
 * @class Confirm
 * @platform Base
 * @type Dialog
 */
export default {
  name: 'basic-dialog-confirm',
  props: {
    title: String,
    text: String,
    opts: {
      type: [Array, Function],
      default: () => {
      }
    }
  }
}
</script>

<style>
.confirm {
  width: 85%;
  background-color: #fafafa;
  border-radius: 2px;
  font-size: 15px;
  animation: zoom-in .15s ease forwards;
}

.confirm-hd {
  text-align: left;
  padding: 15px 20px 5px;
}

.confirm-title {
  font-weight: 400;
  color: #444;
  word-break: break-all;
}

.confirm-bd {
  text-align: left;
  padding: 0 20px;
  font-size: 14px;
  color: #888;
  line-height: 20px;
  word-break: break-all;
}

.confirm-ft {
  position: relative;
  line-height: 40px;
  margin-top: 14px;
  display: flex;
}

.confirm-ft>a {
  position: relative;
  text-align: center;
  display: block;
  flex: 1;
  padding: 0 2px;
}

.confirm-ft:after {
  content: "";
  position: absolute;
  z-index: 0;
  top: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(0deg,#e4e4e4 51%,transparent 0);
}
</style>