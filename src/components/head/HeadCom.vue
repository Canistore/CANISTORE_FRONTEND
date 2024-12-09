<template>
  <div class="head-box">
    <img class="logo" src="./image/head-logo.svg" />
    <div class="right">
      <div class="user-name" v-if="userStore.shortPid">
        <img src="./image/user.svg" />
        <span class="nickname">{{ userStore.shortPid }}</span>
      </div>
      <img v-if="userStore.shortPid" src="./image/logout.svg" @click="logout" />
      <img v-else src="./image/user.svg" class="user-icon" @click="login" />
    </div>
  </div>
  <Login ref="loginRef"></Login>
</template>

<style scoped lang="scss">
.head-box {
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding: 18px 24px;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background: linear-gradient(92.38deg, #6600cc 0%, #12d861 130.65%);
  .home-icon {
    width: 32px;
    height: 32px;
  }
  .logo {
    height: 54px;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .user-name {
      display: flex;
      align-items: center;
      height: 70%;
      margin-left: 0.57rem;
      padding-left: 0.57rem;
      .nickname {
        margin-left: 10px;
      }
    }
  }
  .user-icon {
    width: 32px;
    height: 32px;
  }
}
</style>
<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import Login from '@/components/login/LoginCom.vue'
const userStore = useUserStore()
const loginRef = ref()

function logout() {
  userStore.logout()
}
function login() {
  loginRef.value.open()
}
</script>
