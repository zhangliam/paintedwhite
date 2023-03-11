<template>
  <swiper id="app" ref="mySwiper" :options="swiper" @slideChange="slideChanged">
    <swiper-slide v-for="(item, index) in pages" :key="index">
      <page :methods="item.methods" :url="item.url" :active="index == activeIndex"></page>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import page from '@/renderer/swiperpage'
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import Renderer from '@/renderer/index'
Vue.use(Renderer)
Vue.use(VueAwesomeSwiper)

export default {
  name: 'swiper.app',
  components: {
    page
  },
  data () {
    return {
      appData: {},
      swiper: window.config ? window.config.swiper : {},
      activeIndex: 0
    }
  },
  computed: {
    pages () {
      return window.config ? window.config.pages : {}
    }
  },
  provide () {
    return {
      htmlElement: this.htmlElement,
      swiperElement: this.swiperElement,
      appData: this.appData
    }
  },
  beforeCreate () {},
  methods: {
    htmlElement () {
      return this.$refs.mySwiper.$el
    },
    swiperElement () {
      return this.$refs.mySwiper.$swiper
    },
    slideChanged () {
      this.activeIndex = this.$refs.mySwiper.$swiper.activeIndex
    }
  }
}
</script>

<style>
/* CSS */
html, body {
  margin: 0;
  height: 100%;
}

.content {
  width: 100%;
  position: fixed;
  overflow-y: scroll;
}

.swiper-container {
  height: 100%;
}

a {
  color: #000;
  text-decoration: none;
}

a:hover {
  color: #000;
}
</style>
