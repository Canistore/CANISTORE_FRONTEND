<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message.js'
import VConsole from 'vconsole'

const route = useRoute()
const router = useRouter()
const messageStore = useMessageStore()

let showFoot = ref(true)
router.beforeEach((to) => {
  if (!to.meta.foot) {
    showFoot.value = false
  } else {
    showFoot.value = true
  }
})

onMounted(() => {
  setTimeout(debug, 500)
  messageStore.loadMessageKeys()
})

function debug() {
  if (route.query.dev) {
    new VConsole()
  }
}
</script>

<template>
  <div class="router-wrapper">
    <RouterView />
  </div>
  <div class="footer-wrapper" v-if="showFoot" style="display: none">
    <div class="footer">
      <div class="footer-item">
        <img src="./assets/images/homeFoot.png" />
        <p>Home</p>
      </div>
      <div class="footer-item">
        <img src="./assets/images/personPage.png" />
        <p>User</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.router-wrapper {
  height: 100%;
}
.footer-wrapper {
  position: fixed;
  bottom: 0.86rem;
  padding: 0 0.86rem;
  width: 100%;
}
.footer {
  display: flex;
  justify-content: space-around;
  padding: 0.8rem 0;
  border-radius: 1.71429rem/35%;
  background: #191919;
  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 39px;
      height: 39px;
    }
  }
}
</style>
