<script setup>
import { onBeforeMount, ref } from 'vue'
import { getMessageListByPid } from '@/canisters/index/api.js'
import { timelineFormat } from '@/utils'
import Vloading from '@/components/vloading.vue'
const props = defineProps({
  pid: { type: String, default: '' }
})
let loading = false
let noData = ref(false)
const LIMIT = 10
let offset = 0
let list = ref([])

/**
 * Pagination
 * @param limit Number of items per page
 * @param offset Offset value
 */
function getMess() {
  offset += LIMIT
  getPage(LIMIT, offset)
}

function getPage(limit, offset) {
  if (loading) {
    return
  }
  loading = true
  getMessageListByPid('MsgUserPost', props.pid, limit, offset).then((res) => {
    if (!res.length) {
      noData.value = true
      return
    }
    if (res.length < LIMIT) {
      noData.value = true
    }
    list.value = list.value.concat(res)
  })
}
onBeforeMount(() => {
  getPage(LIMIT, offset)
})
</script>

<template>
  <div class="wrapper" v-if="list.length">
    <div class="list-item" v-for="item in list" :key="item[0].msg_id">
      <p class="time">{{ timelineFormat(item[0].payload.created_at) }}</p>
      <div class="content">
        {{ item[0].payload.content }}
      </div>
    </div>
    <vloading :space-height="0" @load-more="getMess" :no-data="noData"></vloading>
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
</template>

<style scoped lang="scss">
.wrapper {
  padding: 0 16px;
  border-radius: 16px;
  background: #1a1a1a;
  overflow: auto;
  .list-item {
    padding: 16px;
    border-bottom: 1px solid #4d4d4d;
    .time {
      margin-bottom: 2px;
      font-weight: 700;
      color: var(--CaniStore-purple, #a077f0);
    }
    &:nth-last-of-type(1) {
      border-bottom: none;
    }
    .content {
      word-break: break-word;
    }
  }
}
</style>
