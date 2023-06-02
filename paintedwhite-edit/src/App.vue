<template>
  <header style="-webkit-app-region: drag;">
    <section style="-webkit-app-region: no-drag; width: 20%; overflow: hidden">
      <template v-if="inProcess">
        <img class="header-icon" @click="doOuter" src="@/assets/images/out.svg" />
        <img class="header-icon" v-if="isFullScreen" @click="triggerFullScreen" src="@/assets/images/right-rect.svg" />
        <img class="header-icon" v-else @click="triggerFullScreen" src="@/assets/images/left-rect.svg" />
      </template>
    </section>
  </header>
  <router-view></router-view>
</template>

<script setup>
  
  import { computed, ref } from "@vue/reactivity"
  import { provide, inject, onMounted } from "@vue/runtime-core"
  import { useRoute } from 'vue-router'
  import { executeRedoAction, executeUndoAction } from "./utils/crud"
  // import { installIPC } from './utils/ipc'

  const doOuter = () => {}
  const triggerFullScreen = () => {
    isFullScreen.value = !isFullScreen.value
  }

  const route = useRoute()
  const inProcess = computed(() => route.path !== '/')
  const isFullScreen = ref(false)
  
  provide('pages', ref(null))
  provide('page', ref(null))

  provide('config', ref({version: 3.5, pages: {}, path: ''}))
  provide('filePath', ref(''))
  provide('fileName', ref(''))
  provide('orientation', ref(true))
  provide('fullscreen', isFullScreen)

  // installIPC(ipcRenderer, getCurrentInstance().provides)
  window.addEventListener('keydown', (e) => {
    if (e.key == 'z') {
      if ((e.ctrlKey || e.metaKey)) {
        if (!e.shiftKey) {
          executeUndoAction()
        } else {
          executeRedoAction()
        }
      }
    }
  })

  // export default {
  //   name: 'App',
  //   components: {
  //     HelloWorld
  //   }
  // }

</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: Helvetica;
    font-weight: normal;
    font-size: 12px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  header {
    height: 25px;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 9999;
  }

  section {
    height: 25px;
  }

  input {
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc; 
    margin: 0 5px;
  }

  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    left: 0px;
  }

  .header-icon {
    margin: 5px 0 0 5px;
    width: 15px;
    height: 15px;
    cursor:pointer;
  }

  * {
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    display: none;
  }

</style>
