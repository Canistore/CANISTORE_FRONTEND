<template>
  <div class="container">
    <div class="decoration-box">
      <div class="light" style="left: -246px; top: -50px"></div>
      <div class="light" style="right: -446px; top: 0"></div>
      <div class="light" style="left: 30%; bottom: 0"></div>
      <img
        src="./img/line.svg"
        style="position: absolute; right: 0; top: 0"
        alt="Pic"
        class="pic"
      />
    </div>

    <div class="main">
      <div class="info-box">
        <div class="info">
          <img src="./img/logo.svg" class="logo" />
          <div class="title-box">
            <div>We are Excited to Announce</div>
            <div>CaniStore App</div>
            <div>Get on Today</div>
          </div>
          <div class="desc-box">
            <div class="title">Protect & manage copyrights</div>
            <div class="desc">
              empowers creators to licence and<br />
              securely store their content on the blockchain
            </div>
          </div>
        </div>

        <div class="qr-box">
          <img src="./img/qr.svg" alt="QR" class="qr" />
          <div class="tips">Mobile Access</div>
          <div class="addr">https://canistore.app</div>
        </div>
      </div>
      <div class="pic-box">
        <div class="box">
          <img src="./img/a.svg" style="left: 31vw; top: 48vh; width: 8vw" alt="Pic" class="pic" />
          <img src="./img/b.svg" style="left: -18vw; top: 0vh; width: 11vw" alt="Pic" class="pic" />
          <img src="./img/b.svg" style="left: 5vw; top: 79vh; width: 3vw" alt="Pic" class="pic" />
          <img src="./img/c.svg" style="left: -9vw; top: 25vh; width: 8vw" alt="Pic" class="pic" />
          <img src="./img/d.svg" style="left: 31vw; top: 27vh; width: 8vw" alt="Pic" class="pic" />
          <img src="./img/e.svg" style="left: -38vw; top: 46vh; width: 4vw" alt="Pic" class="pic" />
          <img src="./img/g.svg" style="left: -8vw; top: 59vh; width: 8vw" alt="Pic" class="pic" />
          <img src="./img/h.png" style="left: 9vw; top: 66vh; width: 9vw" alt="Pic" class="pic" />
          <img
            src="./img/i.svg"
            style="left: 24vw; top: 61vh; width: 8vw; opacity: 0.7"
            alt="Pic"
            class="pic"
          />
          <img src="./img/j.svg" style="left: 24vw; top: 0vh; width: 8vw" alt="Pic" class="pic" />
          <div class="box-pic">
            <img src="./img/g-1.svg" alt="Pic" class="pic" />
            <div class="text" style="left: -4vw; top: 41vh">Protect & Prove<br />Ownership</div>
            <div class="text" style="left: 13vw; top: 47vh">Direct to<br />Community</div>
            <div class="text" style="left: 24vw; top: 37vh">Licensing Protocol</div>
            <div class="text" style="left: 20vw; top: 17vh">Manage Copyrights</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { isMobile } from '@/utils/index.js'
const router = useRouter()
if (isMobile()) {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.container {
  background: #000;
  color: #fff;
  position: relative;
  height: 100%;
  overflow: hidden;
  line-height: 1.5em;

  .decoration-box {
    position: absolute;
    width: 100%;
    height: 100%;
    .light {
      position: absolute;
      z-index: 1;
      width: 646px;
      height: 646px;
      border-radius: 646px;
      background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(80, 217, 85, 0.35) 0%,
        rgba(80, 217, 85, 0.35) 100%
      );

      filter: blur(130px);

      @for $i from 1 through 3 {
        &:nth-child(#{$i}) {
          animation: breathing 5s infinite ease-in-out;
          animation-delay: #{$i * 1}s; // The animation delay time of each light increases gradually
        }
      }

      @keyframes breathing {
        0%,
        100% {
          opacity: 0.5;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.2);
        }
      }
    }
  }

  .main {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 100%;
    z-index: 10;

    .info-box {
      padding: 60px 0 60px 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;

      .info {
        .logo {
          height: 92px;
        }

        .title-box {
          margin-top: 48px;
          line-height: 1.2em;
          > div {
            margin-bottom: 10px;
          }
          :nth-child(1) {
            font-size: 36px;
            font-weight: 700;
          }
          :nth-child(2) {
            margin: 50px 0;
            font-size: 70px;
            font-weight: 900;
          }
          :nth-child(3) {
            font-size: 40px;
            line-height: 40px; /* 100% */
          }
        }

        .desc-box {
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.8em;
          margin-top: 48px;

          > div {
            margin-bottom: 10px;
          }
          .title {
            font-size: 28px;
            font-weight: 700;
          }
          .desc {
            font-size: 20px;
            font-weight: 400;
          }
        }
      }

      .qr-box {
        line-height: 2em;
        .qr {
          width: 216px;
        }
        .tips {
          padding-left: 48px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 20px;
          font-weight: 400;
        }
        .addr {
          color: #fff;
          padding-left: 48px;
          font-size: 28px;
          font-weight: 700;
        }
      }
    }

    .pic-box {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      .box {
        position: relative;
        .box-pic {
          > .pic {
            height: 72vh;
          }
          .text {
            position: absolute;
            display: inline-block;
            padding: 20px 0;
            width: 200px;
            text-align: center;
            border-radius: 16px;
            background: linear-gradient(
              180deg,
              rgba(5, 62, 198, 0.5) 0%,
              rgba(80, 217, 85, 0.5) 100%
            );
            color: #fff;
            backdrop-filter: blur(2px);
            font-size: 16px;
            font-weight: 700;
          }
        }
        > .pic {
          position: absolute;
          animation: float 3s ease-in-out infinite;

          // Random delay effect
          &:nth-of-type(3n + 1) {
            animation-delay: 0.2s;
          }
          &:nth-of-type(3n + 2) {
            animation-delay: 0.6s;
          }
          &:nth-of-type(3n) {
            animation-delay: 1.2s;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px); // Float up 10px
          }
          100% {
            transform: translateY(0);
          }
        }
      }
    }
  }
}
</style>
