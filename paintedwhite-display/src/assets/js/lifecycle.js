import analysis from '@/assets/js/analysis'

let page = {
  _current: {
    name: ''
  },
  changeState(evt) {
    switch (evt.newState) {
      case 'passive':
        if (evt.oldState != 'active') {
          this._current.lastTime = new Date().getTime()
        }
        break
      case 'hidden':
        if (evt.oldState == 'passive') {
          this._current.duration += new Date().getTime() - this._current.lastTime
          this._current.lastTime = new Date().getTime()
        }
        break
    }
  },
  enterPage (page) {
    this._current.name = page.name
    this._current.lastTime = new Date().getTime()
    this._current.duration = 0
    analysis.trigger(this._current.name, 'enter')
  },
  outerPage () {
    this._current.duration += new Date().getTime() - this._current.lastTime
    analysis.trigger(this._current.name, 'outer', this._current.duration)
  },
  pageLifeCycle () {
    let name = this._current.name
    return {
      name,
      duration: new Date().getTime() - this._current.lastTime
    }
  }
}

window.pageLifeCycle = () => {
  return page.pageLifeCycle()
}

export default page