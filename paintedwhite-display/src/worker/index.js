const files = require.context('.', true, /\.js$/)
const workers = {}
const map = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  let dir = key.replace(/(\.\/|\.js)/g, '').split('/')
  if (!map[dir[0]]) {
    map[dir[0]] = {}
  }
  if (dir.length > 1) {
    map[dir[0]][dir[1]] = files(key).default
  } else {
    map[dir[0]].$fun = files(key).default
  }
})

Object.keys(map).forEach(key => {
  if (map[key]['index']) {
    workers[key] = map[key]['index']
  } else {
    workers[key] = map[key].$fun || function () {
      map[key].$value = this.$value
      return map[key]
    }
  }
})

export default function () {
  workers.$value = this
  return workers
}
