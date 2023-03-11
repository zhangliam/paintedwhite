<template>
  <div v-if="computedActive" :id="'file-'+id"
    :elementtiming="'file-'+id" class="file" :class="computedItem.class" :style="computedStyle">
    <div v-if="(computedConfig.max || 1) > list.length" :class="computedItem.class" :style="computedItemSelectedStyle" @click="doSelect">{{computedValue}}</div>
    <input class="fileInput" type="file" ref="image" accept="image/*" @change="tirggerFile" capture="camera" @click="doClear" />
    <input class="fileInput" type="file" ref="video" accept="video/*" @change="tirggerFile" capture="camcorder" @click="doClear" />
    <input class="fileInput" type="file" ref="file" @change="tirggerFile" @click="doClear" />
    <div class="fileList">
      <div v-for="(item, index) in list" :key="index" :style="computedItemStyle" class="image fileItem">
        <img class="aspectFit" v-if="item.type === 'image'" :src="item.dataURL" @click="onItemClick(item)" alt="" />
        <img class="aspectFit" v-if="item.type === 'video'" src="public/files/images/play.png" @click="onItemClick(item)" alt="" />
        <div class="fileRemove" @click="doClose(index)">x</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import utils from '@/assets/js/utils'
import logger from '@/assets/js/logger'
import layer from '@/renderer/layer'
import localize from '@/localize'
import receiver from '@/renderer/mixin/method/receiver'
import ActionSheetComponent from '../../../extend/form/actionsheet'
/**
 * The only true file.
 */
export default {
  name: 'basic-form-file',
  mixins: [layer, receiver],
  props: {
    /**
		 * 选中项样式
		 */
    styleItemSelected: {
      type: Object,
      default: () => ({})
    },
  },
  data () {
    return {
      loaded: 0,
      total: 0,
      list: [],
      actionsheet: null,
      rows: [
        {
          label: '拍照',
          callback: () => {
            this.doSelect()
            this.$refs.image.click()
          }
        },
        {
          label: '拍视频',
          callback: () => {
            this.doSelect()
            this.$refs.video.click()
          }
        },
        {
          label: '从相册中获取',
          callback: () => {
            this.doSelect()
            this.$refs.file.click()
          }
        }
      ]
    }
  },
  computed: {
    computedItemStyle () {
      let style = this.styleItem || {}
      if (Object.keys(style).length === 0) {
        style = this.item.itemStyle || {}
      }
      return utils.px2rem(style)
    },
    computedItemSelectedStyle () {
      let style = this.styleItemSelected || {}
      if (Object.keys(style).length === 0) {
        style = this.item.itemSelectedStyle || {}
      }
      return utils.px2rem(style)
    }
  },
  mounted() {
    this.render()
  },
  destroyed () {
    const el = this.actionsheet.$el
    el.parentNode && el.parentNode.removeChild(el)
  },
  methods: {
    doSelect () {
      this.actionsheet.open()
    },
    doClose (index) {
      this.list.splice(index, 1)
    },
    doClear () {
      this.$refs.file.value = null
      this.$refs.image.value = null
      this.$refs.video.value = null
    },
    removeElement() {
      if (this.actionsheet && this.actionsheet.$el) document.body.removeChild(this.actionsheet.$el)
    },
    render() {
      this.removeElement()
      const ActionSheet = Vue.extend(ActionSheetComponent)
      this.actionsheet = new ActionSheet({
        el: document.createElement('div'),
        localize,
        props: {
          rows: this.rows
        }
      })
      this.actionsheet.rows = this.rows
      this.actionsheet.cancel = this.localize({i: 'form.cancel'})
      document.body.appendChild(this.actionsheet.$el)
      this.actionsheet.$on('confirmed', (value) => {})
    },
    executeCheck () {
      let events = this.page ? this.page.eventListeners : this.eventListeners
      if ((this.computedConfig.need || this.computedConfig.need === 'true') && !this.list.length) {
        this.$dialog.alert({
          title: this.localize({i: 'form.error'}),
          text: this.localize({i: `form.${this.item.name}Empty`})
        })
        return false
      }
      if (events['checking_' + this.item.name]) {
        let result = events['checking_' + this.item.name](this.list)
        if (result !== true) {
          this.error = result
          return false
        }
      }
      return {v : this.list}
    },
    onItemClick (item) {
      /**
       * 当前容器中的单元组件被点击
       *
       * @event itemClicked
       * @property {object} obj {target, item}
       */
      this.$emit('itemClicked', {target: this, item})
      this.fireEvent('itemClicked', {target: this, item})
    },
    tirggerFile (e) {
      let file = e.target.files[0]
      let index = this.list.length
      let type
      if (file.type.startsWith('image')) {
        type = 'image'
        if (file.size / (1024 * 1024) > this.computedConfig.imageMaxSize) {
          this.$dialog.alert({
            title: this.localize({i: 'form.error'}),
            text: this.localize({i: `form.${this.item.name}imagemaxsize`})
          })
          return
        }
      } else if (file.type.startsWith('video')) {
        type = 'video'
        if (file.size / (1024 * 1024) > this.computedConfig.videoMaxSize) {
          this.$dialog.alert({
            title: this.localize({i: 'form.error'}),
            text: this.localize({i: `form.${this.item.name}videomaxsize`})
          })
          return
        }
      }
      let dataURL = this.getFileURL(file)
      this.list.push({dataURL, file, type, index})
      /**
       * 当前组件数据发送变化
       *
       * @event changed
       * @property {object} obj {target, value}
       */
      this.$emit('changed', {target: this, value: this.list})
      this.fireEvent('changed', {target: this, value: this.list})
    },
    getFileURL(file) {
      var getUrl = null
      if(window.createObjectURL != undefined) { // basic
        getUrl = window.createObjectURL(file)
      } else if(window.URL != undefined) { // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file)
      } else if(window.webkitURL != undefined) { // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file)
      }
      return getUrl
    },
    async doUpload() {
      let formData = new FormData()
      for (let {file} of this.list) {
        formData.append(file.name, file)
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: e => {
          this.loaded = e.loaded
          this.total = e.total
        }
      }
      this.$http.post(this.computedConfig.url, formData, config).then((res) => {
        if (res.status === 200) {
          /**
           * 当前组件完成数据上传
           *
           * @event completed
           * @property {object} obj {target}
           */
          this.$emit('completed', res.data)
          this.fireEvent('completed', res.data)
        }
      }).catch((error) => {
        logger.log(logger.FRAMEWORK_ERROR, error)
      })

      let timerInterval
      this.$dialog.loading.open('<b>0%</b> Completed.')
      timerInterval = setInterval(() => {
        if (this.total) {
          this.$dialog.loading.update(`<b>${(this.loaded / this.total * 100 | 0 )}%</b> Completed.`)
          if (this.loaded >= this.total) {
            clearInterval(timerInterval)
            this.$dialog.loading.close()
          }
        }
      }, 100)
    }
  }
}
</script>

<style>
.file {
  position: relative;
}

.fileList {
  display: flex;
  flex-wrap: wrap;
}

.fileType {
  position: absolute;
  background-color: #fff;
  border: 1px solid #efefef;
  z-index: 99;
}

.fileType-item {
  padding: 5px 15px;
}

.fileInput {
  display: none;
}

.fileItem {
  position: relative;
}

.fileRemove {
  width: 20px;
  height: 20px;
  background-color: #ccc;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<docs>
## Config

```html
preload: true // 预加载图片（如：background-image:url('...')）
need: true // 必填
max: 1 // 最大文件数
imageMaxSize: 1000 // 最大图片大小
videoMaxSize: 1000 // 最大视频大小
url: '....' // 文件上传地址
```

## Examples

```vue
  <template>
    <basic-form-file :item="{
      value,
      style,
      itemStyle,
      itemSelectedStyle,
      in: statusInclude,
      status
    }" @changed="onChanged">
    </basic-form-file>
  </template>

  <script>
    export default {
      data() {
        return {
          value: 'Select',
          config: {
            max: 3,
            imageMaxSize: 5,
            videoMaxSize: 30,
            url: 'upload'
          },
          style:{
            position: 'relative'
          }, 
          itemStyle:{
            width:'100px', 
            height:'100px',
            'margin-right': '5px'
          }, 
          itemSelectedStyle:{
            color: '#fff',
            'border-radius': '15px',
            background:'red', 
            width:'100px', 
            height:'50px',
            display: 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'margin-bottom': '5px'
          }, 
          statusInclude: ['normal'], 
          status: ['normal']
        };
      },
      methods: {
        onChanged(e) {
        }
      }
    }
  </script>
```

</docs>