<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getMessageListByPid } from '@/canisters/index/api.js'
import Vloading from '@/components/vloading.vue'
import { play as playAudio } from '@/service/AudioChunkPlayer.js'
let initType = ref('list')
let noData = ref(false)
let percent = ref(0)

const setType = (type) => (initType.value = type)
const trans = (dura) => {
  const check = (x) => (x < 10 ? `0${x}` : x)
  const min = Math.floor(dura / 60)
  const s = dura % 60
  return `${check(min)}:${check(s)}`
}
onBeforeUnmount(() => {
  list.value.forEach((item) => {
    item[0].audio?.pause()
  })
})
let list = ref([])
let currentItem = ref([])
const Emits = defineEmits(['buy', 'cert'])
const props = defineProps({
  pid: { type: String, default: '' }
})
function getMess() {
  offset += LIMIT
  getPage(LIMIT, offset)
}
function buy(item) {
  Emits('buy', {
    id: item[0].msg_resource[0].resource_id,
    url: item[0]?.payload.audio_url,
    time: item[0].payload.duration
  })
}
const LIMIT = 10
let offset = 0
let loading = false

function getPage(limit, offset) {
  if (loading) {
    return
  }

  loading = true
  getMessageListByPid('MsgShareTrack', props.pid, limit, offset).then((res) => {
    if (!res.length) {
      noData.value = true
      return
    }
    if (res.length < LIMIT) {
      noData.value = true
    }
    res.forEach((item) => {
      item[0].playing = 'init'
    })
    list.value = list.value.concat(res)
    loading = false
  })
}
function showModal(item, index) {
  list.value.forEach((obj, idx) => {
    if (index != idx) {
      obj[0].showModal = false
    }
  })
  item[0].showModal = !item[0].showModal
}
function cert(item) {
  item.showModal = false
  Emits('cert', item)
}
function play(item) {
  if (item[0].msg_id !== currentItem.value[0]?.msg_id) {
    percent.value = 0
  }
  list.value.forEach((item) => {
    item[0].playing = 'init'
  })
  item[0].playing = 'pending'
  currentItem.value = item

  item[0].audio = playAudio(item[0]?.payload.audio_url)
  item[0].audio.addEventListener('canplaythrough', () => {
    currentItem.value[0].playing = 'fullfilled'
  })
  item[0].audio.addEventListener('ended', () => {
    currentItem.value[0].playing = 'init'
  })
  item[0].audio.addEventListener('timeupdate', (e) => {
    item[0].audio.currentTime = Math.floor(e.detail.currentTime)
    percent.value = `${(e.detail.currentTime / item[0].payload.duration) * 100}%`
  })
}
function pause(item) {
  item[0].playing = 'pause'
  item[0].audio.pause()
}
onMounted(() => {
  getPage(LIMIT, offset)
})
</script>

<template>
  <div class="content">
    <div class="top" v-if="list.length">
      <div class="mode">
        <img
          v-show="initType === 'list'"
          src="../assets/images/Grid.png"
          @click="setType('grid')"
        />
        <img
          v-show="initType === 'grid'"
          src="../assets/images/Listpl.png"
          @click="setType('list')"
        />
        <!-- <div class="data-info">Subscribe 0.5 ICP</div> -->
      </div>
      <div class="list" v-if="initType === 'list'">
        <div
          class="list-item"
          v-for="item in list"
          :key="item[0].msg_id"
          :style="{ backgroundSize: item[0].playing !== 'init' ? `${percent} 100%` : 0 }"
        >
          <div class="name">{{ item[0].payload.name }}</div>
          <div class="meta">
            <span v-show="item[0].playing !== 'fullfilled'">{{
              trans(item[0].payload.duration)
            }}</span>
            <span v-show="item[0].playing === 'fullfilled'">{{
              trans(item[0].payload.duration - item[0].audio?.currentTime)
            }}</span>
            <img
              src="../assets/images/icon-play.png"
              class="state"
              v-show="item[0].playing === 'init' || item[0].playing === 'pause'"
              @click="play(item)"
            />
            <img
              src="../assets/images/icon-loading.png"
              v-show="item[0].playing === 'pending'"
              class="state loading"
            />
            <img
              src="../assets/images/icon-pause.png"
              class="state"
              @click="pause(item)"
              v-show="item[0].playing === 'fullfilled'"
            />
            <img src="../assets/images/more_vert.png" @click="showModal(item)" />
            <div class="modal" v-show="item[0].showModal">
              <div class="item" @click="buy(item)">
                <img src="../assets/images/menu.png" />
                License
              </div>
              <div class="item" @click="cert(item[0])">
                <img src="../assets/images/proicons_document.svg" />
                Cert
              </div>
            </div>
          </div>
        </div>
        <vloading :space-height="0" @load-more="getMess" :no-data="noData"></vloading>
      </div>
      <div class="grid-wrapper" v-if="initType === 'grid'">
        <div
          class="grid-item"
          v-for="item in list"
          :style="{ backgroundImage: `url(${item[0].payload.cover_image})` }"
          :key="item[0].msg_id"
        >
          <p class="title">{{ item[0].payload.name }}</p>
          <div class="play-wrapper">
            <div
              class="meta"
              :style="{ backgroundSize: item[0].playing !== 'init' ? `${percent} 100%` : 0 }"
            >
              <div class="play">
                <span v-show="item[0].playing !== 'fullfilled'">{{
                  trans(item[0].payload.duration)
                }}</span>
                <span v-show="item[0].playing === 'fullfilled'">{{
                  trans(item[0].payload.duration - item[0].audio?.currentTime)
                }}</span>
                <img
                  src="../assets/images/icon-play.png"
                  v-show="item[0].playing === 'init' || item[0].playing === 'pause'"
                  @click="play(item)"
                />
                <img
                  src="../assets/images/icon-loading.png"
                  v-show="item[0].playing === 'pending'"
                  class="state loading"
                />
                <img
                  src="../assets/images/icon-pause.png"
                  class="state"
                  v-show="item[0].playing === 'fullfilled'"
                  @click="pause(item)"
                />
              </div>
              <img src="../assets/images/more_vert.png" alt="" @click="showModal(item)" />
              <div class="modal" v-show="item[0].showModal">
                <div class="item" @click="buy(item)">
                  <img src="../assets/images/menu.png" />
                  License
                </div>
                <div class="item" @click="cert(item[0])">
                  <img src="../assets/images/Share.png" />
                  Share
                </div>
              </div>
            </div>
          </div>
        </div>
        <vloading :space-height="0" @load-more="getMess" :no-data="noData"></vloading>
      </div>
    </div>
    <van-skeleton v-else style="display: block">
      <template #template>
        <div
          style="
            display: flex;
            justify-content: space-between;
            height: 40px;
            background-color: #2f2f2f;
            width: 100%;
            margin-top: 10px;
          "
        >
          <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            height: 40px;
            background-color: #2f2f2f;
            width: 100%;
            margin-top: 10px;
          "
        >
          <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            height: 40px;
            background-color: #2f2f2f;
            width: 100%;
            margin-top: 10px;
          "
        >
          <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            height: 40px;
            background-color: #2f2f2f;
            width: 100%;
            margin-top: 10px;
          "
        >
          <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            height: 40px;
            background-color: #2f2f2f;
            width: 100%;
            margin-top: 10px;
          "
        >
          <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            height: 40px;
            background-color: #2f2f2f;
            width: 100%;
            margin-top: 10px;
          "
        >
          <van-skeleton-paragraph style="height: inherit; margin-top: 0" />
        </div>
      </template>
    </van-skeleton>
    <!-- <div class="time-state">
      <div class="left">Daily free listen time 20 mins</div>
      <div class="right">16:23</div>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  .top {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-bottom: 20px;
  }
  .mode {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    img {
      width: 24px;
      height: 24px;
    }
    .data-info {
      padding: 6px 12px;
      font-size: 14px;
      font-weight: bold;
      border-radius: 16px;
      background: linear-gradient(180deg, #60c 0%, #12d861 128.81%);
    }
  }
  .list {
    position: relative;
    border-radius: 16px;
    background: #1a1a1a;
    .list-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      height: 56px;
      padding: 16px;
      border-bottom: 1px solid#4D4D4D;
      background: linear-gradient(90deg, #6600cc 0%, #12d861 100%);
      background-repeat: no-repeat;
      &:nth-last-of-type(1) {
        border: none;
      }
      .meta {
        position: relative;
        display: flex;
        align-items: center;
        .state {
          margin: 0 24px 0 10px;
          width: 24px;
          height: 24px;
        }
        .loading {
          width: 24px;
          height: 24px;
          animation: loading 3s linear infinite;
        }
        .modal {
          position: absolute;
          bottom: 0;
          padding: 8px;
          border-radius: 8px 0px 8px 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(2.5px);
          transform: translateY(100%);
          z-index: 1;
          .item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            gap: 8px;
            font-size: 12px;
            img {
              width: 20px;
            }
          }
          .item:nth-last-of-type(1) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .grid-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 16px;
    border-radius: 16px;
    background: #1a1a1a;
    .grid-item {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 16px;
      width: 48%;
      aspect-ratio: 1;
      background-image: url('../assets/images/icon-loading.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      .title {
        padding: 8px;
        background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0) 100%);
      }
      .play-wrapper {
        position: relative;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 100%);
        .meta {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          width: 100%;
          background: linear-gradient(90deg, #6600cc 0%, #12d861 100%);
          background-repeat: no-repeat;

          .play {
            display: flex;
            align-items: center;
          }
          .loading {
            width: 24px;
            height: 24px;
            animation: loading 3s linear infinite;
          }
          .state {
            width: 24px;
            height: 24px;
          }
          .modal {
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 1;
            padding: 8px;
            border-radius: 8px 0px 8px 8px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(2.5px);
            transform: translateY(100%);
          }
        }
      }
    }
  }
  .time-state {
    display: flex;
    justify-content: space-between;
    padding: 11px 16px;
    border-radius: 8px;
    color: black;
    background: #a077f0;
  }
}
</style>
