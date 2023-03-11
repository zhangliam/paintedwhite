<template>
  <div class="sider">
    <div class="sider-logo">
      <div class="sider-logo-title"></div>
    </div>
    <div class="sider-content">
      <SiderPage></SiderPage>
      <SiderLayer></SiderLayer>
    </div>
  </div>
</template>

<script setup>
import SiderPage from './sider/page.vue'
import SiderLayer from './sider/layer.vue'
</script>

<style lang="less">
.sider {
  width: 20%;
  height: 100%;
  background-color: #FFFFFF;
  border-right: 1px solid #CCC;
  position: relative;

  &-logo {
    height: 50px;
    /* display: flex; */
    box-shadow: 0 2px 1px 0px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;

    &-title {
      color: #494CA2;
      font-size: 32px;
      font-weight: bold;
      // padding: 26px 0px 12px 0px;
      // text-align: center;
      overflow: hidden;
    }
  }

  &-content {
    width: 100%;
    position: absolute;
    left: 0px;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
  }
}
</style>