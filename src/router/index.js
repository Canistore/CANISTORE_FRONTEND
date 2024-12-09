import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import itemInfo from '@/views/itemInfo.vue'
import goodList from '@/views/goodList.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: IndexView
    },
    {
      path: '/itemInfo',
      name: 'itemInfo',
      component: itemInfo,
      meta: {
        foot: false
      }
    },
    {
      path: '/goodList',
      name: 'goodList',
      component: goodList,
      meta: {
        foot: true
      }
    },
    {
      path: '/guide',
      component: () => import('../views/pc/guide/GuideView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  if (!isMobile() && to.fullPath !== '/guide') {
    return '/guide'
  }
})

// Determine if it is a mobile device
function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /android|iphone|ipad|ipod|windows phone/i.test(userAgent)
}

export default router
