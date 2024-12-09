<template>
  <Transition name="fade">
    <div class="page-box" v-if="visible">
      <div class="circle1"></div>
      <div class="main">
        <img src="@/assets/images/ico.svg" class="logo" />
      </div>
    </div>
  </Transition>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const visible = ref(true)
const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 800)
  setTimeout(() => {
    router.push('/goodList')
  }, 1000)
})
</script>

<style lang="scss" scoped>
.page-box {
  position: relative;
  height: 100%;
  background: var(--CaniStore-fade, linear-gradient(180deg, #60c 0%, #12d861 124.03%));
  overflow: hidden;
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

  &::after {
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 2.86rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);

    .logo {
      width: 40.9%;
    }

    .name {
      text-align: center;
      font-size: 2.57143rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
