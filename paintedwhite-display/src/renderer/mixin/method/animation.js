import anime from 'animejs';
import logger from '@/assets/js/logger'

window.anime = anime

/**
 * @class Animation
 * 动画
 */
export default {
  name: 'animation',
  inject: {
    animations: {
      default: null
    }
  },
  data () {
    return {
      animation: null,
      bindAnimations: []
    }
  },
  mounted () {
    this.initializeAnimation()
  },
  methods: {
    initializeAnimation () {
      if (this.animations && this.item.__id) {
        this.bindAnimations = this.animations[this.item.__id]
        if (this.bindAnimations) {
          logger.log(logger.ANIMATION, this.item.__id)
          this.bindAnimations.forEach(animation => {
            this.setAnimation(animation)
          })
        }
      }
    },
    executeAnimation (name) {
      if (this.animations && this.item.__id) {
        if (this.animations[name + this.item.__id]) {
          logger.log(logger.ANIMATION, name + this.item.__id)
          this.animations[name + this.item.__id].forEach(animation => {
            this.setAnimation(animation)
          })
        }
      }
    },
    setAnimation (options) {
      let {name} = options
      let begin = (anim) => {
        /**
         * 当前组件开始动画
         *
         * @event ani_start
         * @property {object} obj {name, status}
         */
        this.$emit('ani_start', { name, status: 'start' })
        this.fireEvent('ani_start', { name, status: 'start' })
      }
      let update = (anim) => {
        let { progress } = anim
        /**
         * 当前组件动画更新
         *
         * @event ani_update
         * @property {object} obj {name, status, progress}
         */
        this.$emit('ani_update', { name, progress: parseInt(progress), status: 'progress' })
        this.fireEvent('ani_update', { name, progress: parseInt(progress), status: 'progress' })
      }
      let complete = (anim) => {
        /**
         * 当前组件完成动画
         *
         * @event ani_finish
         * @property {object} obj {name, status}
         */
        this.$emit('ani_finish', { name, status: 'finish' })
        this.fireEvent('ani_finish', { name, status: 'finish' })
      }
      if (options.begin) {
        let optionsBegin = options.begin
        options.begin = function (anim) {
          optionsBegin(anim)
          begin.call(options, anim)
        }
      } else {
        options.begin = begin
      }
      if (options.update) {
        let optionsUpdate = options.update
        options.update = function (anim) {
          optionsUpdate(anim)
          update.call(options, anim)
        }
      } else {
        options.update = update
      }
      if (options.complete) {
        let optionsComplete = options.complete
        options.complete = function (anim) {
          optionsComplete(anim)
          complete.call(options, anim)
        }
      } else {
        options.complete = complete
      }
      options.targets = [this.$el]
      this.animation = anime(options)
    }
  }
}
