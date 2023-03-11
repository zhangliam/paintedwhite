<template>
  <div class="preview">
    <div class="preview-controller" @click="triggerOrientation">
      <img v-if="orientation" src="@/assets/images/horizontal.svg" class="preview-mode"
        type="image/svg+xml" />
      <img v-else src="@/assets/images/vertical.svg" class="preview-mode"
        type="image/svg+xml" />
    </div>
    <div class="preview-mock" ref="preview" @click="doClick">
      <Mock></Mock>
    </div>
    <Affix></Affix>
    <div class="preview-visible">
      <img v-if="visible" @click.stop="triggerVisible" class="options-icon" src="@/assets/images/visible.svg" />
      <img v-else @click.stop="triggerVisible" class="options-icon" src="@/assets/images/invisible.svg" />
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch } from '@vue/runtime-core'
import Affix from './preview/affix.vue'
import Mock from './preview/mock.vue'
import mitt from '@/utils/mitt'

let orientation = inject('orientation')

const triggerOrientation = () => {
  orientation.value = !orientation.value
}

const layer = inject('layer')
const layerID = inject('layerID')
const preview = ref(null)
const doClick = (e) => {
  if (e.target == preview.value) {
    layer.value = null
    layerID.value = null
  }
}

const visible = ref(false)
const triggerVisible = () => {
  visible.value = !visible.value
  mitt.emit('update_visible', visible.value)
}
</script>

<style lang="less">
.preview {
  width: 60%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #E3E7F1;

  &-controller {
    position: absolute;
    top: 30px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 50%;
    margin-left: -12px;
  }

  &-mode {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  &-mock {
    position: absolute;
    top: 56px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center
  }

  &-visible {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }
}
</style>
