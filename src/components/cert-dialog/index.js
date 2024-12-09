import { render, h } from 'vue'
import CertDialog from './CertDialog.vue'
let container = null
export function open(id, userId, spaceId) {
  const props = {
    id,
    userId,
    spaceId
  }
  const vNode = h(CertDialog, {
    onClose: () => {
      close()
    },
    ...props
  })
  container = document.createElement('div')
  document.body.appendChild(container)
  render(vNode, container)
  document.body.style.overflow = 'hidden'
}

export function close() {
  render(null, container)
  container.remove()
  document.body.style.overflow = ''
}
