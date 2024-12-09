<template>
  <div id="homePage">
    <div class="light-box">
      <div class="light"></div>
      <div class="light"></div>
    </div>
    <HeadCom></HeadCom>
    <div class="content">
      <div class="search-wrapper" style="display: none">
        <img src="../assets/images/add.png" class="search-icon" />
        <input type="text" placeholder="search" />
      </div>
      <div class="list-wrapperr" id="list" v-if="goodList.length">
        <div class="item-wrapper" :key="good.msg_id" v-for="good in goodList" @click="jump(good)">
          <div class="list-item">
            <div class="avator">
              <v-image :src="good[0].user?.avatar || defaultAvatar"></v-image>
            </div>
            <div class="user-info">
              <div class="nickName">
                <span>{{ good[0].user?.artist_name }}</span>
                <span class="time">{{ timelineFormat(good[0].time) }}</span>
              </div>
              <p class="email">{{ good[0].user?.handler }}</p>
              <p class="content">{{ good[0].payload.content }}</p>
            </div>
          </div>
        </div>
        <vloading @load-more="getMess" :space-height="footerHeight" :no-data="noData"></vloading>
      </div>
      <van-skeleton v-else :row="10" style="display: block">
        <template #template>
          <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 10px">
            <van-skeleton-image />
            <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
          </div>
          <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 10px">
            <van-skeleton-image />
            <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
          </div>
          <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 10px">
            <van-skeleton-image />
            <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
          </div>
          <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 10px">
            <van-skeleton-image />
            <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
          </div>
          <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 10px">
            <van-skeleton-image />
            <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
          </div>
        </template>
      </van-skeleton>
    </div>
  </div>
</template>

<style scoped lang="scss">
#homePage {
  display: flex;
  flex-direction: column;
  height: 100%;
  mix-blend-mode: screen;
  background-color: #262626;
}

.light-box {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .light {
    position: absolute;
    width: 437px;
    height: 437px;
    border-radius: 437px;
    background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(102, 0, 204, 0.8) 0%,
      rgba(102, 0, 204, 0.8) 100%
    );
    filter: blur(130px);

    &:nth-of-type(1) {
      top: -200px;
      left: -200px;
    }

    &:nth-of-type(2) {
      right: -390px;
      top: 374px;
    }
  }
}
.banner {
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
  .left {
    display: flex;
    align-items: center;
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
.content {
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1;
  .search-wrapper {
    position: relative;
    padding: 1.71rem 24px 24px 24px;
    width: 100%;
    background: #262626;
    .search-icon {
      position: absolute;
      left: 2.14rem;
      top: 50%;
      transform: translate(0, -50%);
    }
    input {
      width: 100%;
      padding: 0.86rem 1rem 0.86rem 3.43rem;
      color: #808080;
      background: rgb(5, 5, 5);
      border-radius: 1.71429rem/50%;
      border: 1px solid #60c;
      outline: none;
    }
  }
  .list-wrapperr {
    flex: 1;
    overflow: auto;
    padding-bottom: 2rem;
    // background: linear-gradient(180deg, #262626, #60c 100%);
    .item-wrapper {
      padding: 0.57rem 1.71rem;
    }
    .list-item {
      display: flex;
      padding: 1.14rem;
      border-radius: 1.14286rem;
      background: rgb(5, 5, 5);
      .avator {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 50%;
        background: #fff;
        margin-right: 1.14rem;
        padding: 10px;
        object-fit: cover;
      }
      .user-info {
        flex: 1;
        .nickName {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          font-size: 1.42857rem;
          font-weight: 700;

          img {
            margin-left: 5px;
          }
          .time {
            font-weight: 700;
            font-size: 1rem;
            color: rgba(18, 216, 97, 1);
          }
        }
        .email {
          color: #808080;
        }
        .content {
          word-break: break-word;
        }
      }
    }
  }
}
</style>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import vloading from '../components/vloading.vue'
import { useUserStore } from '@/stores/user.js'
import Login from '@/components/login/LoginCom.vue'
import { getMessageList } from '@/canisters/index/api.js'
import { getUserInfos } from '@/canisters/user/api.js'
import { timelineFormat } from '@/utils'
import vImage from '../components/vImage.vue'
import defaultAvatar from '@/assets/images/default-avatar.svg'
import HeadCom from '../components/head/HeadCom.vue'

const router = useRouter()
const userStore = useUserStore()
const loginRef = ref()
let noData = ref(false)
let goodList = ref([])

let isLgoin = ref(false)
let isLoading = false
let footerHeight = ref(0)
let offset = 0
let perSize = 10
const getMess = (el, containerHeight) => {
  offset += perSize
  getMessage()
}
const jump = (item) => {
  router.push(`/itemInfo?canistoreId=${item[1].toString()}&userId=${item[0].payload.user_pid}`)
}

function logout() {
  userStore.logout()
  isLgoin.value = false
}
function login() {
  loginRef.value.open().then(() => {
    isLgoin.value = true
  })
}
function getMessage() {
  if (isLoading) {
    return
  }

  getMessageList('MsgUserPost', perSize, offset).then((res) => {
    if (!res.length) {
      noData.value = true
      return
    }
    isLoading = true
    getUserInfos(res.map((item) => item[0].caller)).then((users) => {
      users.forEach((item, index) => {
        res[index][0].user = item
      })
      res.forEach((item) => {
        item[0].time = item[0].payload.created_at
      })
      goodList.value = goodList.value.concat(res)
      if (res.length < perSize) {
        noData.value = true
      }
      isLoading = false
    })
  })
}
onMounted(() => {
  footerHeight.value = document.getElementsByClassName('footer')[0].getBoundingClientRect().height

  userStore.isLogin().then((res) => {
    isLgoin.value = res
  })
  getMessage()
})
</script>
