<script setup>
import { ref } from 'vue'
const status = ref('pending')
const props = defineProps({
  src: { type: String, default: '' }
})
function setImageError() {
  status.value = 'error'
}
function setImageSuccess() {
  status.value = 'success'
}
</script>

<template>
  <img
    v-show="status == 'success'"
    class="img"
    :src="props.src"
    alt=""
    @load="setImageSuccess"
    @error="setImageError"
  />
  <img v-show="status == 'pending'" class="loading" src="../assets/images/icon-loading.png" />
  <p v-show="status === 'error'" class="error">Load Failed</p>
</template>

<style scoped lang="scss">
.img {
  width: 100%;
  aspect-ratio: 1;
  border-radius: inherit;
  object-fit: cover;
}
.loading {
  animation: loading 3s linear infinite;
}
.error {
  font-size: 12px;
  line-height: 1.2em;
  text-align: center;
}
</style>
