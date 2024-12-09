import { render, h } from 'vue'
import ReqLoading from './ReqLoading.vue'

export function showLoading() {
  const vNode = h(ReqLoading)
  render(vNode, document.body)
  document.body.style.overflow = 'hidden'
}

export function hideLoading() {
  render(null, document.body)
  document.body.style.overflow = ''
}
