<template>
  <div class="preview">
    <div class="preview-controller" @click="triggerOrientation">
      <img v-if="orientation" src="@/assets/images/horizontal.svg" class="preview-mode"
        type="image/svg+xml" />
      <img v-else src="@/assets/images/vertical.svg" class="preview-mode"
        type="image/svg+xml" />
    </div>
    <a @click="saveEditRequest" class="preview-exportbtn">保存修改</a>
    <a @click="executeRedoAction" class="preview-excutebtn preview-excutebtn-undo">恢复</a>
    <a @click="executeUndoAction" class="preview-excutebtn preview-excutebtn-do">撤销</a>
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

import axios from 'axios';
import { inject, ref, watch, onMounted } from '@vue/runtime-core'
import Affix from './preview/affix.vue'
import Mock from './preview/mock.vue'
import mitt from '@/utils/mitt'
import { executeRedoAction, executeUndoAction, getExcuteList } from "@/utils/crud"


let $SUPER_PRO_INFO
const $SUPER = inject('$super')

if($SUPER && $SUPER['TENANT-ID']) {
  $SUPER_PRO_INFO = $SUPER.getProInfo()
  axios.defaults.baseURL = process.env.VUE_APP_BASE_API
  axios.defaults.headers.common['TENANT-ID'] = $SUPER_PRO_INFO['tenantId']
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + $SUPER.accessToken()
}

let orientation = inject('orientation')
const exportOriginPageInfo = inject('page')

const triggerOrientation = () => {
  orientation.value = !orientation.value
}

let excuteStepInfo

onMounted( () => {
  const { redoList, undoList } = getExcuteList()
  excuteStepInfo = getExcuteList()
  console.log(excuteStepInfo)
})


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

const saveEditRequest = async () => {
  try {
    const { status, data } = await axios.post(`/blank/paperjson`, {
      pageJson: JSON.stringify(exportOriginPageInfo.value),
      paperId: `${ $SUPER_PRO_INFO['paperId'] }`
    })
    // console.log(status, data)
    alert(data.msg)
  } catch (error) {
    console.error(error)
  }
}

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
