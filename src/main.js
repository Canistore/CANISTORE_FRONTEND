/* global BUILD_TIME GIT_VERSION */
import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Skeleton, SkeletonTitle, SkeletonImage, SkeletonAvatar, SkeletonParagraph } from 'vant'
import App from './App.vue'
import 'vant/lib/index.css'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(Skeleton)
app.use(SkeletonTitle)
app.use(SkeletonImage)
app.use(SkeletonAvatar)
app.use(SkeletonParagraph)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

app.use(router)

app.mount('#app')
console.log(`BUILD_TIME ${BUILD_TIME}`)
console.log(`Version ${GIT_VERSION}`)
