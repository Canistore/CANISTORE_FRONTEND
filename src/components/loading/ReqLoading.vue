<template>
  <div class="loading-box">
    <div class="mask"></div>
    <div class="main">
      <div class="loader"></div>
      <div class="tips">Loading</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  gap: 1rem;

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .tips {
    color: #fff;
    text-align: center;
    font-size: 14px;
  }
  .main {
    width: 40%;
    aspect-ratio: 1;
    border-radius: 10%;
    background: rgba(0, 0, 0, 0.7);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
}
.loader {
  position: relative;
  width: 55px;
  height: 35px;
  background-repeat: no-repeat;
  background-image: linear-gradient(180deg, #fff 0%, #fff 124.03%),
    linear-gradient(180deg, #fff 0%, #fff 124.03%), linear-gradient(180deg, #fff 0%, #fff 124.03%),
    linear-gradient(180deg, #fff 0%, #fff 124.03%), linear-gradient(180deg, #fff 0%, #fff 124.03%),
    linear-gradient(180deg, #fff 0%, #fff 124.03%);
  background-size: 5px 40px;
  background-position:
    0px center,
    10px center,
    20px center,
    30px center,
    40px center,
    50px center;
  animation: spikeUp 1s linear infinite alternate;
}
@keyframes spikeUp {
  0% {
    background-size: 5px 30px;
  }
  16% {
    background-size:
      5px 35px,
      5px 30px,
      5px 30px,
      5px 30px,
      5px 30px,
      5px 30px;
  }
  33% {
    background-size:
      5px 30px,
      5px 35px,
      5px 30px,
      5px 30px,
      5px 30px,
      5px 30px;
  }
  50% {
    background-size:
      5px 30px,
      5px 30px,
      5px 35px,
      5px 30px,
      5px 30px,
      5px 30px;
  }
  66% {
    background-size:
      5px 30px,
      5px 30px,
      5px 30px,
      5px 35px,
      5px 30px,
      5px 30px;
  }
  83% {
    background-size:
      5px 30px,
      5px 30px,
      5px 30px,
      5px 30px,
      5px 35px,
      5px 30px;
  }
  100% {
    background-size:
      5px 30px,
      5px 30px,
      5px 30px,
      5px 30px,
      5px 30px,
      5px 35px;
  }
}
</style>
