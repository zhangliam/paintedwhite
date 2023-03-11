<template>
  <OptionPageInfo :target="target"></OptionPageInfo>
</template>

<script setup>
import OptionPageInfo from './page/info.vue'

const props = defineProps({
  target: Object
})
</script>