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
  import { provide } from "@vue/runtime-core"
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


  const _testJSON = {
    "class": "",
    "style": {},
    "components": [{
      "__id": "580E4210-BAAF-4D2D-94E4-3EA36B2F8597",
      "style": {
        "width": "100%",
        "position": "absolute",
        "top": "0px",
        "left": "0px"
      },
      "value": "",
      "components": [{
        "__id": "E21017C7-351E-498D-A766-822306B91CBF",
        "style": {
          "width": "456px",
          "height": "244px",
          "position": "absolute",
          "top": "1040px",
          "left": "156px"
        },
        "value": "",
        "components": [{
          "__id": "A9DD1240-4F54-40D3-898B-8DED379EC6F3",
          "style": {
            "width": "128px",
            "height": "128px",
            "position": "absolute",
            "top": "0px",
            "left": "156px"
          },
          "value": "images/编组 6.png",
          "components": [{
            "__id": "BAE9E8F3-A8F8-4ECD-A088-535C5FD7A788",
            "style": {
              "width": "128px",
              "height": "128px",
              "position": "absolute",
              "top": "0px",
              "left": "0px"
            },
            "value": "images/WechatIMG1932.png",
            "components": [],
            "config": {},
            "include": ["normal"],
            "type": "basic-layer-image"
          }],
          "config": {},
          "include": ["normal"],
          "type": "basic-layer-image"
        }, {
          "__id": "AE88BA63-C9E8-4248-88B1-15F4C847F0DF",
          "style": {
            "width": "456px",
            "height": "84px",
            "position": "absolute",
            "top": "160px",
            "left": "0px",
            "color": "#A0A0A0",
            "font-size": "24px",
            "font-family": "PingFangSC-Regular",
            "font-weight": "5",
            "line-height": "42px",
            "text-align": "center"
          },
          "value": "每位会员限领一次，数量有限，领完即止。\n兑换二维码每5分钟自动刷新。",
          "components": [],
          "config": {},
          "include": ["normal"],
          "type": "basic-layer-text"
        }],
        "config": {},
        "include": ["normal"],
        "type": "basic-container-div"
      }, {
        "__id": "5B1C51F9-67C8-4D15-8074-31DEB4DE9C32",
        "style": {
          "width": "478px",
          "height": "232px",
          "position": "absolute",
          "top": "728px",
          "left": "145px"
        },
        "value": "",
        "components": [{
          "__id": "113A01A5-272F-49F8-9655-D7A493A8ACFA",
          "style": {
            "width": "216px",
            "height": "56px",
            "position": "absolute",
            "top": "0px",
            "left": "123px",
            "color": "#1D1D1D",
            "font-size": "36px",
            "font-family": "PingFangSC-Medium",
            "font-weight": "6",
            "line-height": "56px",
            "text-align": "center"
          },
          "value": "亲爱的吴珊迪",
          "components": [],
          "config": {},
          "include": ["normal"],
          "type": "basic-layer-text"
        }, {
          "__id": "76D151A9-CE85-4FA1-8071-404096ACD2F8",
          "style": {
            "width": "478px",
            "height": "144px",
            "position": "absolute",
            "top": "88px",
            "left": "0px",
            "color": "#1D1D1D",
            "font-size": "28px",
            "font-family": "PingFangSC-Regular",
            "font-weight": "5",
            "line-height": "48px",
            "text-align": "center"
          },
          "value": "感谢您来到香奈儿PREMIÈRE游乐场，\n有一份礼物等待您领取,\n请于入场当日凭此二维码兑换。",
          "components": [],
          "config": {},
          "include": ["normal"],
          "type": "basic-layer-text"
        }],
        "config": {},
        "include": ["normal"],
        "type": "basic-container-div"
      }, {
        "__id": "82388102-FA96-47A4-8B36-51F3F9D57066",
        "style": {
          "width": "100%",
          "position": "absolute",
          "top": "0px",
          "left": "0px"
        },
        "value": "images/ANIMzoltar.png",
        "components": [],
        "config": {
          "mode": "aspectFill"
        },
        "include": ["normal"],
        "type": "basic-layer-image"
      }],
      "config": {},
      "include": ["normal"],
      "type": "basic-container-div"
    }],
    "actions": [],
    "animations": [],
    "__id": "B85724D2-DE3A-452A-8539-89F08364B602",
    "name": "Home",
    "status": ["normal"]
  };


  provide('pages', ref([ _testJSON ]))
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

</style>
