<template>
  <div id="item-page">
    <div class="wall">
      <div class="banner">
        <div class="left" v-if="userStore.shortPid">
          <img src="../assets/images/home.svg" class="home-icon" @click="jump" />
          <div class="user-name">
            <span class="nickname">{{ userStore.shortPid }}</span>
          </div>
        </div>
        <img v-else src="@/assets/images/head-logo.svg" class="logo" @click="jump" />
        <div class="right">
          <img
            v-if="!userStore.shortPid"
            src="../assets/images/user.svg"
            alt=""
            @click="login"
            class="user-icon"
          />
          <img v-else src="../assets/images/logout.svg" @click="logout" />
        </div>
      </div>
      <div class="wall-content">
        <div class="round1"></div>
        <div class="user-info">
          <div class="left">
            <p class="call-nickName">{{ userInfo[0]?.handler }}</p>
            <p class="nickName">{{ userInfo[0]?.artist_name }}</p>
            <p class="desc">{{ userInfo[0]?.location }}</p>
            <p class="desc job">{{ nameToLabel(MusicProfessions, userInfo[0]?.music) }}</p>
          </div>
          <div class="right">
            <div class="img-wrapper">
              <v-image :src="userInfo[0]?.avatar || defaultAvatar"></v-image>
            </div>
          </div>
        </div>
      </div>
      <Transition name="fade">
        <div class="user-bio" v-show="showBio">
          <div class="user-details">
            {{ userInfo[0]?.bio }}
          </div>
          <div class="operation">
            <div class="website" @click="jumpWeb">
              <img src="../assets/images/web.svg" alt="" />website
            </div>
            <span @click="showMore = true">More</span>
          </div>
        </div>
      </Transition>
      <img
        src="../assets/images/pepicons-pop_angle-up.svg"
        class="stretch"
        :class="showBio ? '' : 'down'"
        @click="setShoBio"
      />
    </div>
    <div class="content-wrapper">
      <div v-if="showScrollBar" class="scroll-bar">
        <img src="../assets/images/left-arrow.png" @click="left" />
        <div class="tab-wrapper" id="tab">
          <div
            v-for="(item, key) in tabs"
            class="item"
            :key="key"
            :class="index === key ? 'active' : ''"
            @click="setIndex(key)"
          >
            {{ item.text }}
          </div>
        </div>
        <img src="../assets/images/right-arrow.png" @click="right" />
      </div>
      <goodsInfo
        v-if="showGoodInfo && tabs[index].text === 'Store'"
        :trackId="trackId"
        :space-id="spaceId"
        :audio_url="audio_url"
        :time="time"
        @close="closeGoodInfo"
        @buy-success="handleBuySuccess"
      ></goodsInfo>
      <vStore
        :pid="route.query.canistoreId"
        v-if="showVstore && tabs[index].text === 'Store'"
        @buy="handleBuyEvent($event)"
        @cert="handleCertEvent($event)"
      >
      </vStore>
      <v-post :pid="route.query.canistoreId" v-if="tabs[index].text === 'Post'"></v-post>
      <v-connect v-if="tabs[index].text === 'Connect'"></v-connect>
    </div>
  </div>
  <v-modal v-if="showSuccess">
    <div class="success-content">
      <div class="icon-wrapper">
        <img src="../assets/images/icon_success.png" alt="" />
      </div>
      <p class="title">License Obtained</p>
      <div class="desc">
        <p>Payment Hash Code:</p>
        <p class="meta">{{ orderId }}:{{ amount }}</p>
      </div>
      <div class="close-btn" @click="closeSuccessModal">Close</div>
    </div>
  </v-modal>
  <v-modal v-if="showMore">
    <div class="fail-content">
      <p class="title">Bio</p>
      <div class="content">
        {{ userInfo[0]?.bio }}
      </div>
      <div class="close-btn" @click="showMore = false">Close</div>
    </div>
  </v-modal>
  <Login ref="loginRef"></Login>
</template>

<style scoped lang="scss">
#item-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
}
.wall {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  border-radius: 0px 0px 24px 24px;
  background: linear-gradient(180deg, #60c 0%, #12d861 124.03%);
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 24px;
    width: 100%;
    .home-icon {
      width: 28px;
      height: 28px;
    }
    .left {
      display: flex;
      align-items: center;
      width: 60%;
      .user-name {
        display: flex;
        align-items: center;
        max-height: 60%;
        margin-left: 0.57rem;
        padding-left: 0.57rem;
        border-left: 1px solid rgba(255, 255, 255, 0.6);
        .nickname {
          margin-left: 10px;
        }
      }
    }
    .logo {
      height: 54px;
    }
    .user-icon {
      width: 32px;
      height: 32px;
    }
  }
  .wall-content {
    position: relative;
    flex: 1;
    padding: 0 24px 0 24px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
    .round1 {
      position: absolute;
      top: 111px;
      left: -184px;
      width: 434px;
      height: 434px;
      border-radius: 31rem;
      background: linear-gradient(180deg, rgba(106, 0, 186, 0.5) 0%, rgba(106, 0, 186, 0) 100%);
      mix-blend-mode: multiply;
      filter: blur(15px);
      pointer-events: none;
    }
    .user-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .left {
        min-width: 40%;
        font-size: 16px;
        .call-nickName {
          font-size: 20px;
          font-weight: 700;
        }
        .nickName {
          font-size: 32px;
          line-height: 50px;
          font-weight: 700;
        }
        .desc {
          font-size: 16px;
        }
        .job {
          margin-top: 16px;
        }
      }
      .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 1;
        .img-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 110px;
          object-fit: cover;
          border-radius: 50%;
          aspect-ratio: 1;
          background-color: #fff;
          padding: 10px;
        }
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    max-height: 200px;
    overflow: hidden;
    transition: all 0.3s ease;
    transform-origin: top center;
  }

  .fade-enter-from,
  .fade-leave-to {
    max-height: 0;
  }

  .user-bio {
    display: flex;
    flex-direction: column;
    padding: 0 24px 24px 24px;

    .user-details {
      margin: 16px 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .operation {
      display: flex;
      justify-content: space-between;
      .website {
        display: flex;
        align-items: center;
        border-radius: 15px/50%;
        padding: 6px 13px;
        background: rgba(229, 229, 229, 0.3);
        img {
          margin-right: 4px;
        }
      }
    }
  }
  .stretch {
    width: 50px;
    position: absolute;
    left: 50%;
    bottom: -6px;
    transform: translate(-50%, 0);
  }
  .down {
    transform: translate(-50%, 0) rotate(180deg) !important;
  }
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 24px 24px 24px;
  max-height: 200vh;
}
.fail-content {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction: column;
  width: 74.4%;
  padding: 24px;
  border-radius: 10px;
  background-color: white;
  transform: translate(-50%, -50%);
  color: black;
  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .content {
    flex: 1;
    font-size: 12px;
    min-height: 150px;
    max-height: 500px;
    overflow: auto;
    word-break: break-word;
  }
  .close-btn {
    margin-top: 30px;
    padding: 10px 0;
    text-align: center;
    border-radius: 8px;
    border: 1px solid black;
  }
}
.success-content {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 74.4%;
  padding: 24px;
  border-radius: 10px;
  background: linear-gradient(180deg, #12d861 0%, #60c 100%);
  box-shadow: 0px 0px 30px 0px #12d861;
  transform: translate(-50%, -50%);
  .icon-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
  }
  .title {
    margin-bottom: 24px;
    font-size: 24px;
    text-align: center;
  }
  .meta {
    margin-bottom: 32px;
    word-break: break-word;
  }
  .close-btn {
    padding: 10px 0;
    text-align: center;
    border-radius: 8px;
    border: 1px solid white;
  }
}
.scroll-bar {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 24px;
  background: #1a1a1a;
  z-index: 1;
  .tab-wrapper {
    display: flex;
    flex: 1;
    overflow: scroll;
    transition: all linear 300ms;
    scroll-snap-type: x mandatory;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .item {
    position: relative;
    display: flex;
    justify-content: center;
    min-width: 33.33%;
    scroll-snap-align: center;
  }
  .active {
    &:after {
      position: absolute;
      left: 50%;
      bottom: 0;
      content: '';
      width: 60%;
      height: 2px;
      background-color: #a077f0;
      transform: translate(-50%);
    }
  }
}
</style>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import goodsInfo from '@/components/goodsInfo.vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { getUserInfosBySpaceIds } from '@/canisters/user/api.js'
import defaultAvatar from '@/assets/images/default-avatar.svg'
import VModal from '@/components/vModal.vue'
import VPost from '@/components/vPost.vue'
import vStore from '@/components/vStore.vue'
import Login from '@/components/login/LoginCom.vue'
import VConnect from '@/components/vConnect.vue'
import { Principal } from '@dfinity/principal'
import { open as openCertDialog } from '@/components/cert-dialog'
import { nameToLabel, MusicProfessions } from '@/entity'
const userStore = useUserStore()
const route = useRoute()
let index = ref(0)
let orderId = ref('')
let amount = ref(0)
let showMore = ref(false)
let userInfo = ref([])
let showVstore = ref(true)
let showScrollBar = ref(true)
let showGoodInfo = ref(false)
let showSuccess = ref(false)
let loginRef = ref(null)
let showBio = ref(false)
const router = useRouter()
let trackId = ref('')
let audio_url = ref('')
let spaceId = ref('')
let time = ref('')
import { formatExternalLink } from '@/utils/index.js'
import VImage from '@/components/vImage.vue'
function closeSuccessModal() {
  showSuccess.value = false
  showGoodInfo.value = false
  showVstore.value = true
}
function handleBuySuccess(e) {
  orderId.value = e.orderId
  amount.value = e.amount
  showSuccess.value = true
}
onMounted(() => {
  getUserInfosBySpaceIds([route.query.canistoreId]).then((res) => {
    userInfo.value = res
    spaceId.value = userInfo.value[0].spaces[0].space_id.toString()
    userInfo.value[0].music = res[0].music_content_type
      .map((item) => {
        return Object.keys(item)
      })
      .join('/')
  })
})
function closeGoodInfo() {
  showGoodInfo.value = false
  showVstore.value = true
}
function setShoBio() {
  showBio.value = !showBio.value
}
function jumpWeb() {
  window.open(formatExternalLink(userInfo.value[0].website), '_blank')
}
function login() {
  loginRef.value.open().then(() => {
    isLgoin.value = true
  })
}
const handleHideScrollBar = () => {
  showScrollBar.value = false
}
const jump = () => {
  router.push('/goodList')
}
const handleBuyEvent = (ev) => {
  trackId.value = Number(ev.id)
  audio_url.value = ev.url
  time.value = ev.time
  showVstore.value = false
  showGoodInfo.value = true
}
const handleCertEvent = (ev) => {
  openCertDialog(ev.msg_resource[0].resource_id, route.query.userId, route.query.canistoreId)
}
const setIndex = (key) => {
  index.value = key
  showGoodInfo.value = false
  showVstore.value = true
  document.getElementById('item-page').scrollTop = 0
}
const right = () => {
  if (index.value >= tabs.value.length - 1) {
    return
  }
  index.value++
  const unitLeft = document.getElementById('tab').clientWidth / 3
  document.getElementById('tab').scrollLeft = unitLeft * index.value
}
const left = () => {
  if (index.value <= 0) {
    return
  }
  index.value--
  const unitLeft = document.getElementById('tab').clientWidth / 3
  document.getElementById('tab').scrollLeft = unitLeft * index.value
}
let isLgoin = ref(false)
let tabs = ref([{ text: 'Store' }, { text: 'Post' }, { text: 'Connect' }])

function logout() {
  userStore.logout()
}
</script>
