/**
 * 隐藏元素
 * @returns 
 */
export default function () {
  let item = this.$value.computedItem
  if (item.style && item.style.display) {
    item.style.originDisplay = item.style.display
    item.style.display = 'none'
  }
  return this
}