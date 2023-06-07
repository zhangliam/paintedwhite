<template>
  <div class="preview">
    <div class="preview-controller" @click="triggerOrientation">
      <img v-if="orientation" src="@/assets/images/horizontal.svg" class="preview-mode"
        type="image/svg+xml" />
      <img v-else src="@/assets/images/vertical.svg" class="preview-mode"
        type="image/svg+xml" />
    </div>
    <a @click="saveEditRequest" class="preview-exportbtn">保存修改</a>
    <a @click="EventExecuteRedoAction"  :class=" 'preview-excutebtn preview-excutebtn-undo ' + (showRedoBtn && ' preview-excutebtn-disable' ) ">恢复</a>
    <a @click="EventExecuteUndoAction"  :class=" 'preview-excutebtn preview-excutebtn-do ' + (showUodoBtn && ' preview-excutebtn-disable') ">撤销</a>
    <div class="preview-mock" ref="preview" @click="doClick">
      <Mock></Mock>
    </div>
    
    <!-- <Affix></Affix>
    <div class="preview-visible">
      <img v-if="visible" @click.stop="triggerVisible" class="options-icon" src="@/assets/images/visible.svg" />
      <img v-else @click.stop="triggerVisible" class="options-icon" src="@/assets/images/invisible.svg" />
    </div> -->

  </div>
</template>

<script setup>

import { inject, ref, watch, onMounted, computed } from '@vue/runtime-core'
import Affix from './preview/affix.vue'
import Mock from './preview/mock.vue'
import mitt from '@/utils/mitt'
import { executeRedoAction, executeUndoAction, getExcuteList } from "@/utils/crud"
import { requestInitial, requestPost } from "@/utils/request"


let $SUPER 
let $SUPER_PRO_INFO
const _APPENV = process.env.VUE_APP_ENV

if(_APPENV === 'DEVELOP') {
  $SUPER = {
    accessToken() {
      return 'd6a06531-debd-430a-9602-17f8335b8eb0'
    },
    getProInfo() {
      return {
        tenantId: 4,
        terminalType: 'to_c',
        paperId: 105,
      }
    } 
  }
}

if(_APPENV === 'RELEASE') {
  $SUPER = inject('$super')
}

if($SUPER) {
  $SUPER_PRO_INFO = $SUPER.getProInfo()
  requestInitial($SUPER)
  console.log('mockIframe Data ======>', $SUPER, $SUPER.getProInfo())
}

let orientation = inject('orientation')
const exportOriginPageInfo = inject('page')

const triggerOrientation = () => {
  orientation.value = !orientation.value
}


const layer = inject('layer')
const layerID = inject('layerID')
const preview = ref(null)

const undoStepList = ref([])
const redoStepList = ref([])
  

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

const saveEditRequest = async () => {

  if(!$SUPER_PRO_INFO) {  
    console.log('主应用信息获取失败')
    return
  }

  try {
    const { status, data } = await requestPost({
      path: '/blank/paperjson',
      data: {
        pageJson: JSON.stringify(exportOriginPageInfo.value),
        paperId: `${ $SUPER_PRO_INFO['paperId'] }`
      }
    })
    alert(data.msg)
  } catch (error) {
    console.error(error)
  }
}


const EventExecuteRedoAction = () => {
  if(showRedoBtn.value) return
  executeRedoAction()
  let action = redoStepList.value.pop()
  undoStepList.value.push(action)
}


const EventExecuteUndoAction = () => {
  if(showUodoBtn.value) return
  executeUndoAction()
  let action = undoStepList.value.pop()
  redoStepList.value.push(action)
}

mitt.on('undo', (e) => {
  undoStepList.value.push(e)
  console.log(e, undoStepList.value)
})

mitt.on('redo', (e) => {
  redoStepList.value.push(e)
  console.log(e, redoStepList.value)
})

const showUodoBtn = computed(() => {
  return Boolean(undoStepList.value.length == 0)
})

const showRedoBtn = computed(() => {
  return Boolean(redoStepList.value.length == 0) 
})

</script>

<style lang="less">
.preview {
  width: 60%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: #E3E7F1;

  &-exportbtn {
    cursor: pointer;
    padding: 8px 10px;
    border-radius: 10px;
    margin: 20px 30px 0 0;
    color: white;
    background-color: #aabdec;
    position: absolute;
    z-index: 999999;
    right: 0;
  } 

  &-excutebtn {
    cursor: pointer;
    padding: 8px 10px;
    border: 1px #aabdec solid; 
    border-radius: 10px;
    color: #aabdec;
    position: absolute;
    z-index: 999999;
    right: 0;
    &-do {
      margin: 20px 120px 0 0;
    }
    &-undo {
      margin: 20px 170px 0 0;
    }
    &-disable {
      background-color: #ccc;
      color: white;
      border: 1px #cccc solid; 
    }
  }


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
