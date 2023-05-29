<template>
  <div id="app">
    
    <transition name="header">
      <div class="header" v-if="$route.meta.navigator">
        <div @click.prevent="goBack">
          <button icon="back" v-localize="{i: 'view.back'}"></button>
        </div>
        <div @click.prevent="goRoot">
          <button icon="home" v-localize="{i: 'view.root'}"></button>
        </div>
      </div>
    </transition>


    <div class="content" :style="style" ref="content">
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </div>

   <!--  <transition name="navi">
      <div class="navi" :style="safeArea" v-if="$route.meta.tabbar">
        <router-link v-for="(n, i) in navi" class="navi_item"
          :key="i" :to="{ path: n.path, query: $route.query }" custom v-slot="{ navigate, isActive }">
          <li @click="navigate" @keypress.enter="navigate" role="link" :class="isActive ? 'router-link-active' : ''">
            <img class="navi_icon" :src="isActive ? n.icon.active : n.icon.normal" />
            <div class="navi_title">{{n.name}}</div>
            <div class="navi_bridge"></div>
          </li>
        </router-link>
      </div>
    </transition> -->


  </div>
</template>

<script>
import Vue from 'vue'
import api from '@/assets/js/api'
import utils from '@/assets/js/utils'
import Renderer from '@/renderer/index'

Vue.use(Renderer)


export default {
  name: 'router.app',
  data () {
    return {
      appData: {},
      transitionName: 'slide-left',
      navi: window.config ? window.config.navis : [],
      style: utils.px2rem({
        "top": this.$route.meta.navigator ? "80px" : "0px",
        "bottom": this.$route.meta.tabbar ? "calc(120px + env(safe-area-inset-bottom))" : "env(safe-area-inset-bottom)"
      }),
      safeArea: {
        'margin-bottom': 'env(safe-area-inset-bottom)'
      }
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.meta.depth;
      const fromDepth = from.meta.depth;
      const meta = to.meta;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      if (utils.detectTerminal() == 'wework') {
        this.style = utils.px2rem({
          "top": meta.navigator ? "80px" : "0px",
          "bottom": meta.tabbar ? "120px" : "0px",
          "transition": toDepth > fromDepth ? "0s" : "all 0.1s ease-out"
        })
      } else {
        this.style = utils.px2rem({
          "top": meta.navigator ? "80px" : "0px",
          "bottom": meta.tabbar ? "calc(120px + env(safe-area-inset-bottom))" : "env(safe-area-inset-bottom)",
          "transition": toDepth > fromDepth ? "0s" : "all 0.1s ease-out"
        })
      }
      this.$refs.content.scrollTo(0, 0)
    }
  },
  computed: {
    headerStyle () {
      return utils.px2rem({
        height: '80px'
      })
    }
  },
  provide () {
    return {
      htmlElement: this.htmlElement,
      swiperElement: null,
      appData: this.appData
    }
  },
  beforeCreate () {
    
  },
  mounted() {
    setTimeout(() => {
      // 微信与企业微信在safearea上的差异
      if (utils.detectTerminal() == 'wework') {
        this.safeArea['margin-bottom'] = '0px'
        this.style.bottom = this.$route.meta.tabbar ? "120px" : "0px"
      }
    }, 500);
    window.$history = api.HISTORY
    window.goBack = this.goBack
    window.goRoot = this.goRoot
  },
  methods: {
    getSafeArea() {
      return getComputedStyle(document.documentElement).getPropertyValue('--safe-area-bottom')
    },
    htmlElement () {
      return this.$refs.content
    },
    goBack() {
      if (utils.getQueryString('state')) {
        window.location.href = '/'
      } else {
        api.HISTORY.pop()
        this.$router.push(api.HISTORY[api.HISTORY.length - 1])
      }
    },
    goRoot() {
      if (utils.getQueryString('state')) {
        window.location.href = '/'
      } else {
        let {path} = this.$route
        let nodes = path.split('/')
        this.$router.push(nodes.slice(0,2).join('/'))
      }
    },
  }
}
</script>

<style>
/* CSS */
body {
  margin: 0;
}

.header {
  width: 100%;
  position: fixed;
  top: 0px;
  height: .8rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header button {
  font-size: 0.3rem;
  background: #fff;
  border: none;
}

.content {
  width: 100%;
  position: fixed;
  /*overflow-y: scroll;*/
  will-change: transform;
  /* transition: all 0.1s ease-out; */
}

.navi {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 1.2rem;
  font-size: .25rem;
  background-color: #f2f2f2;
  border-top: 1px solid #ccc;
}

.navi_item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: .8rem;
}

.navi_icon {
  display: block;
}

a {
  color: #000;
  text-decoration: none;
}

a:hover {
  color: #000;
}

.router-link-active {
  color: #1AAD19!important;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  position: absolute;
  width: 100%;
  will-change: transform;
  transition: all 0.3s ease-out;
}

.slide-right-enter {
  opacity: 0;
  transform: translate(-50%, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate(50%, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate(50%, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate(-50%, 0);
}

.header-enter-active,
.header-leave-active,
.navi-enter-active,
.navi-leave-active {
  position: absolute;
  width: 100%;
  will-change: transform;
  transition: all 0.3s ease-out;
}

.navi-enter {
  opacity: 0;
  transform: translate(0, 50%);
}

.navi-leave-to {
  opacity: 0;
  transform: translate(0, 50%);
}

.header-enter {
  opacity: 0;
  transform: translate(50%, -50%);
}

.header-leave-to {
  opacity: 0;
  transform: translate(50%, -50%);
}

.layer_selected {
  box-sizing: content-box;
  border: #ff0000 dashed 1px!important;
}
</style>
