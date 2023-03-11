/**
 * 显示元素
 * @returns 
 */
export default function () {
  let item = this.$value.computedItem
  if (item.style.display === 'none') {
    item.style.display = item.style.originDisplay || 'block'
  }
  return this
}