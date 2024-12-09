<template>
  <Transition name="fade">
    <div class="page-box" v-if="visible">
      <img class="close" src="./assets/close.png" @click="close" />
      <div class="circle1"></div>
      <div class="main">
        <img src="@/assets/images/ico.svg" class="logo" />
      </div>
      <div class="btn-groups">
        <div class="item" @click="connect"><img src="./assets/entry1.png" /> Internet Identity</div>
        <div class="item"><img src="./assets/entry2.png" />Plug Mobile</div>
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { getClient } from '@/canisters/connect'
const visible = ref(false)
const userStore = useUserStore()
let resolve = null
let reject = null

defineExpose({
  open,
  close
})

function open() {
  visible.value = true
  return new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
}

function close() {
  visible.value = false
}

async function connect() {
  getClient().then((authClient) => {
    authClient.login({
      // Valid for 7 days
      maxTimeToLive: window.BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      derivationOrigin: import.meta.env.VITE_DEPLOY_CANISTER_URL,
      onSuccess: () => {
        userStore.login().then((res) => {
          resolve(res)
          visible.value = false
        })
      },
      onError: (err) => {
        reject(err)
      }
    })
  })
}
onMounted(() => {})
</script>

<style lang="scss" scoped>
.page-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #60c 0%, #12d861 124.03%);
  overflow: hidden;
  z-index: 100;

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    z-index: 10;
  }
  .circle1 {
    position: absolute;
    left: -20rem;
    top: -20rem;
    width: 57.14286rem;
    height: 57.14286rem;
    border-radius: 50%;
    opacity: 0.5;
    background: linear-gradient(137deg, #fff 23.95%, rgba(255, 255, 255, 0) 76.05%);
    mix-blend-mode: screen;
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.86rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);

    .logo {
      height: 120px;
    }
  }
}
.btn-groups {
  position: fixed;
  bottom: 100px;
  left: 50%;
  width: 84.7%;
  margin: 0 auto;
  transform: translateX(-50%);
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 16px;
    gap: 10px;
    border-radius: 16px;
    border: 1px solid var(--, #c2cfd6);
    background: rgba(255, 255, 255, 0.1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
