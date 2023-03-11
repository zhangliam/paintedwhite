<template>
  <div class="display">
    <Sider></Sider>
    <Preview></Preview>
    <Options></Options>
    <!-- <StyleBuilder></StyleBuilder> -->
  </div>
</template>

<script setup>
import Sider from '../components/display/sider.vue'
import Preview from '../components/display/preview.vue'
import Options from '../components/display/options.vue'
import StyleBuilder from '../components/display/style-builder.vue'
import { ref } from '@vue/reactivity'
import { provide } from '@vue/runtime-core'

provide('page', ref(null))
provide('layer', ref(null))
provide('layerID', ref(null))
provide('clip_include', ref(null))
provide('clip_include_list', ref(null))
provide('clip_status', ref(null))
provide('clip_status_list', ref(null))
provide('clip_layer', ref(null))
provide('clip_config', ref(null))
provide('clip_style', ref(null))
provide('clip_action', ref(null))
provide('clip_action_list', ref(null))
provide('clip_animation', ref(null))
provide('clip_animation_prop', ref(null))
provide('actions', ref({}))
</script>

<style>
.display {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
