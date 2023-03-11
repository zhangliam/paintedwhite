<template>
  <div :id="'actionsheet-'+_uid"
    :elementtiming="'actionsheet-'+_uid">
    <basic-layer-mask v-model="show" @click.native="close" :opacity="maskerOpacity"></basic-layer-mask>
    <div class="actionsheet" :class="show ? 'actionsheet-active' : ''">
      <a v-for="(item, key) in rows" @click.stop="itemClick(item)" href="javascript:;" class="actionsheet-item" :key="key">{{item.label}}</a>
      <a v-if="cancel" @click.stop="close" href="javascript:;" class="actionsheet-action">{{cancel}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'extend-form-actionsheet',
  components: {},
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
    rows: {
      type: Array,
      required: true
    },
    cancel: String,
    maskerOpacity: {
      validator(val) {
        return /^([0]|[1-9]\d*)?(\.\d*)?$/.test(val);
      },
      default: .5
    }
  },
  watch: {
    value(val) {
      this.show = val;
    }
  },
  methods: {
    itemClick(item) {
      if(item) {
        this.$emit('confirmed', {value: item})
        typeof item.callback === 'function' && item.callback(item);
        !item.stay && this.close();
      }
    },
    open() {
      this.show = true
    },
    close() {
      this.show = false
    }
  },
  destroyed() {
    this.close();
  }
}
</script>

<style>
.actionsheet {
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1502;
  background-color: #efeff4;
  transform: translateY(100%);
  transition: transform .2s;
}

.actionsheet-active {
  transform: translate(0);
}

.actionsheet-item {
  display: block;
  position: relative;
  font-size: .28rem;
  color: #555;
  height: 1rem;
  line-height: 1rem;
  background-color: #fff;
}

.actionsheet-item:after {
  height: 1px;
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  content: "";
  width: 100%;
  background-image: linear-gradient(0deg,#ececec 51%,transparent 0);
}

.actionsheet-action {
  display: block;
  margin-top: .15rem;
  font-size: .28rem;
  color: #555;
  height: 1rem;
  line-height: 1rem;
  background-color: #fff;
}
</style>