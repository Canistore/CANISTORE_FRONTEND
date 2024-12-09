<script>
export default {
  name: "vModal"
}
</script>

<template>
  <div class="modal">
    <slot></slot>
  </div>mod
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,.7);
  z-index: 999;
}
</style>