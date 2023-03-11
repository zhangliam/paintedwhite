/**
 * 查询元素
 * @param {*} name 
 * @returns 
 */
const files = require.context('.', true, /\.js$/)
const map = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  let dir = key.replace(/(\.\/|\.js)/g, '').split('/')
  map[dir[0]] = files(key).default
})

export default function (name) {
  map.$value = this.$value.elements[name]
  return map
}