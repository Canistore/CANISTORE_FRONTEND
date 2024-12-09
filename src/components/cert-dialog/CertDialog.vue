<template>
  <van-overlay :show="!!info && !!userInfo">
    <div class="container" v-if="info">
      <img class="icon" src="./certificate.svg" />
      <div class="title">Creator Certification</div>
      <div class="body">
        <div class="text">{{ bytesToSize(info.file_size) }},{{ info.file_format }} format</div>
        <div class="text">{{ time2LocalString(info.created, 'LLL') }}</div>
        <div class="text">Digital Fingerprint:<br />{{ info.cert_hex[0] }}</div>
        <div class="text">
          <span>{{ info.copyright }} {{ userInfo[0].artist_name }}</span>
        </div>
        <div class="button-box">
          <button @click="emit('close')">Close</button>
          <button @click="copyInfo" class="primary">Copy Info</button>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { getTrackInfo } from '@/canisters/space/api'
import { getUserInfos } from '@/canisters/user/api.js'
import { copy, time2LocalString, canisterType2CommonType, getYear } from '@/utils'
import { showLoading, hideLoading } from '@/components/loading/loading'
import { Principal } from '@dfinity/principal'
import { bytesToSize } from '@/utils'

const info = ref()
const userInfo = ref()
const props = defineProps(['id', 'spaceId', 'userId'])
const emit = defineEmits(['close'])

function copyInfo() {
  copy(`Certificate ID: ${info.value.cert_key[0]}\nDigital Fingerprint: ${info.value.cert_hex[0]}`)
  showToast('Copied')
}

function load() {
  showLoading()
  const promises = []
  promises.push(
    getUserInfos([Principal.fromText(props.userId)]).then((res) => {
      userInfo.value = res
    })
  )
  promises.push(
    getTrackInfo(props.id, props.spaceId).then((res) => {
      info.value = canisterType2CommonType(res)
      info.value.copyright = `©${getYear(info.value.created)}`
    })
  )
  Promise.all(promises).finally(() => {
    hideLoading()
  })
}

onBeforeMount(() => {
  load()
})
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  border-radius: 10px;
  background: linear-gradient(180deg, #12d861 0%, #60c 100%);
  box-shadow: 0px 0px 30px 0px #12d861;
  overflow: hidden;
  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  gap: 1.5rem;
  .icon {
    width: 4rem;
  }
  .title {
    text-align: center;
    font-size: 14px;
    font-weight: 700;
  }
  .body {
    width: 80%;
    word-break: break-all;
    .text {
      font-size: 12px;
      font-weight: 400;
      margin: 10px 0;
      span {
        font-weight: 700;
      }
    }

    .button-box {
      display: flex;
      gap: 1.4rem;
      margin-top: 2rem;

      button {
        flex: 1;
        line-height: 40px;
        font-size: 14px;
        font-weight: 700;

        border-radius: 8px;
        border: 1px solid #fff;
        background-color: transparent;

        &.primary {
          border: 1px solid #000;
          color: #0a0a0a;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
