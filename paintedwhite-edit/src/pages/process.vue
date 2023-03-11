<template>
  <div class="process" @mouseup="mouseup" @mousemove="mousemove">
    <sider ref="sider"></sider>
    <pipe></pipe>
    <worker v-if="worker" :worker="worker" :style="style"></worker>
  </div>
</template>

<script>
export default {
  setup() {
    
  },
}
</script>

<style>
.process {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>