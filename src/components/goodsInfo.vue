<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  confirmLicenseOrder,
  createLicenseOrder,
  getLicenseByTrack
} from '@/canisters/space/api.js'
import { useRoute } from 'vue-router'
import { showLoading, hideLoading } from '@/components/loading/loading.js'
import { Principal } from '@dfinity/principal'
import { play as playAudio } from '@/service/AudioChunkPlayer.js'
import { icrc1Transfer } from '@/canisters/ledger/api.js'
import {
  enumToLabel,
  AssetType,
  UsageRights,
  LicensedMedia,
  RightPeriod,
  LicensedTerritory
} from '@/entity'
const props = defineProps({
  trackId: { type: Number, default: '' },
  audio_url: { type: String, default: '' },
  time: { type: [String, Number], default: '' },
  spaceId: { type: String, default: '' }
})
let media = ref(null)
const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const Emits = defineEmits(['buy-success', 'hideScrollBar', 'close'])
onBeforeUnmount(() => {
  media.value?.pause()
})
const trans = (dura) => {
  const check = (x) => (x < 10 ? `0${x}` : x)
  const min = Math.floor(dura / 60)
  const s = dura % 60
  return `${check(min)}:${check(s)}`
}
let currentTime = ref(0)
let percent = ref(0)
let mediaInfo = ref({
  state: 'init'
})
function buy() {
  payForLicense(props.spaceId, props.trackId, `pay for buy audio ${props.trackId}`)
}
function payForLicense(owner, trackId, memo) {
  let orderId = 0
  let amount
  showLoading()
  createLicenseOrder(trackId, memo, owner)
    .then((res) => {
      orderId = res[0].id
      amount = res[0].amount
      const subaccount = res[0].recipient
      return { amount, subaccount }
    })
    .then(({ amount, subaccount }) => {
      return icrc1Transfer(owner, subaccount, Number(amount)).then((res) => {
        if (res.Ok) {
          return res.Ok
        } else {
          console.error('transfer failed', res.Err)
          throw new Error('transfer failed')
        }
      })
    })
    .then(() => {
      return confirmLicenseOrder(orderId, owner).then((res) => {
        Emits('buy-success', {
          orderId,
          amount
        })
      })
    })
    .catch((err) => {
      showToast({
        className: 'toast',
        message: err.toString()
      })
    })
    .finally(() => {
      hideLoading()
    })
}
function pause() {
  media.value.pause()
  mediaInfo.value.state = 'pause'
}
let baseInfo = ref(null)

let showPrice = ref(true)
const route = useRoute()
onMounted(() => {
  getLicenseByTrack(props.trackId, Principal.fromText(route.query.canistoreId)).then((res) => {
    baseInfo.value = res[0]
    console.log('🚀 ~ getLicenseByTrack ~ baseInfo.value:', baseInfo.value)
  })
})
function play() {
  media.value = playAudio(props.audio_url)
  media.value.addEventListener('timeupdate', (e) => {
    currentTime.value = Math.floor(e.detail.currentTime)
    percent.value = `${(e.detail.currentTime * 100) / props.time}%`
  })
  media.value.addEventListener('ended', () => {
    mediaInfo.value.state = 'init'
  })
  media.value.addEventListener('canplaythrough', () => {
    mediaInfo.value.state = 'fullfilled'
  })
  mediaInfo.value.state = 'pending'
}
const purchase = () => {
  Emits('hideScrollBar')
  showPrice.value = false
}
</script>

<template>
  <div class="wrapper" v-if="baseInfo">
    <div
      class="info-item audio-item"
      :style="{ backgroundSize: mediaInfo.state !== 'init' ? `${percent} 100%` : 0 }"
    >
      <div class="name em">{{ baseInfo.source.Track.name }}</div>
      <div class="right">
        {{ trans(currentTime) }} ｜ {{ trans(props.time) }}
        <img
          v-if="mediaInfo.state === 'init' || mediaInfo.state === 'pause'"
          src="../assets/images/icon-play.png"
          @click="play"
        />
        <img
          src="../assets/images/icon-loading.png"
          v-show="mediaInfo.state === 'pending'"
          class="state loading"
        />
        <img
          src="../assets/images/icon-pause.png"
          class="state"
          v-show="mediaInfo.state === 'fullfilled'"
          @click="pause()"
        />
      </div>
    </div>
    <div class="info-item">
      <div class="name">Asset Type</div>
      <div class="right">
        {{ enumToLabel(AssetType, baseInfo.asset_type) }}
      </div>
    </div>
    <div class="info-item">
      <div class="name">Usage Rights</div>
      <div class="right">
        {{ enumToLabel(UsageRights, baseInfo.usage_rights) }}
      </div>
    </div>
    <div class="info-item">
      <div class="name">Licensed Media</div>
      <div class="right">
        {{ enumToLabel(LicensedMedia, baseInfo.licensed_media) }}
      </div>
    </div>
    <div class="info-item">
      <div class="name">Licensed Territory</div>
      <div class="right">
        {{ enumToLabel(LicensedTerritory, baseInfo.licensed_territory) }}
      </div>
    </div>
    <div class="info-item">
      <div class="name">Right Period</div>
      <div class="right">
        {{ enumToLabel(RightPeriod, baseInfo.right_period) }}
      </div>
    </div>
    <div v-if="showPrice" class="info-item">
      <div class="name">
        Status
        <div class="dot"></div>
        Secured
      </div>
      <div class="right em1">{{ Number(baseInfo.fee[0]) / Math.pow(10, 8) }} ICP</div>
    </div>
  </div>
  <div v-if="!showPrice" class="email-content">
    <p class="title">Usage Contract</p>
    <p class="desc">Email to receive legal documents and audio files</p>
    <input type="text" v-model="email" class="email-input" />
    <p class="price">{{ Number(baseInfo.fee[0]) / Math.pow(10, 8) }} ICP</p>
  </div>
  <div class="btn-groups">
    <div class="btn-item">
      <div class="close" @click="$emit('close')">
        <img src="../assets/images/close.png" />
      </div>
      <div class="buy" @click="buy">Purchase</div>
    </div>
    <div v-if="false" class="btn-item">
      <div class="close">
        <img src="../assets/images/close.png" @click="$emit('close')" />
      </div>
      <div class="proceed" @click="buy">Proceed</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  border-radius: 16px;
  background: #1a1a1a;
  .audio-item {
    padding: 16px 0;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background: linear-gradient(90deg, #6600cc 0%, #12d861 100%);
    background-repeat: no-repeat;
  }
  .info-item {
    display: flex;
    justify-content: space-between;
    padding: 16px 16px;
    color: #cccccc;
    border-bottom: 1px dashed #4d4d4d;
    .state {
      width: 24px;
      height: 24px;
    }
    .loading {
      width: 24px;
      height: 24px;
      animation: loading 3s linear infinite;
    }
    &:nth-of-type(1) {
      border-bottom: 1px solid #4d4d4d;
    }
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    &:nth-last-of-type(2) {
      border-bottom: 1px solid #4d4d4d;
    }
    .name {
      display: flex;
      align-items: center;
    }
    .dot {
      margin-right: 3px;
      margin-left: 3px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #12d861;
    }
    .em1 {
      color: white;
      font-size: 18px;
      font-weight: 700;
    }
    .right {
      display: flex;
      align-items: center;
    }
  }
}
.email-content {
  margin-top: 32px;
  .title {
    font-size: 15px;
    font-weight: 500;
    color: white;
  }
  .desc {
    margin-bottom: 24px;
    color: #808080;
  }
  .email-input {
    margin-bottom: 24px;
    padding: 16px;
    width: 100%;
    color: white;
    border: 1px solid #60c;
    outline: none;
    border-radius: 16px;
    background-color: transparent;
  }
  .price {
    padding-right: 16px;
    font-weight: 700;
    font-size: 24px;
    text-align: right;
  }
}
.btn-groups {
  width: 100%;
  margin: 32px auto;
  .btn-item {
    display: flex;
    justify-content: space-between;
    .close {
      display: flex;
      align-items: center;
      padding: 8px 24px;
      color: white;
      border-radius: 16px;
      background-color: #f65656;
    }
    .proceed,
    .buy {
      display: flex;
      align-items: center;
      padding: 15px 32px;
      font-size: 20px;
      border-radius: 16px;
      background-color: #10bc55;
    }
    .proceed {
      background-color: var(--CaniStore-purple-01, #8a6bc7);
    }
  }
}
</style>
