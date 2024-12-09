<script>
export default {
  name: "vConnect"
}
</script>

<template>
<div class="grid-wrapper">
  <div class="item">
    <img src="../assets/images/349.svg">
  </div>
  <div class="item">
    <img src="../assets/images/350.svg">
  </div>
  <div class="item">
    <img src="../assets/images/351.svg">
  </div>
  <div class="item">
    <img src="../assets/images/352.svg">
  </div>
  <div class="item">
    <img src="../assets/images/353.svg">
  </div>
  <div class="item"></div>

</div>
</template>

<style scoped lang="scss">
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 33.3%);
  border-radius: 16px;
  background: #1A1A1A;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    border-bottom: 1px solid #4D4D4D;
    border-right: 1px solid #4D4D4D;
    &:nth-last-of-type(-n+3) {
      border-bottom: none;
    }
    &:nth-of-type(3n) {
      border-right: none;
    }
  }
}
</style>