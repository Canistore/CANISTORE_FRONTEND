import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMessageKeys } from '@/canisters/index/api.js'

export const useMessageStore = defineStore(
  'message',
  () => {
    const store = ref({})

    function loadMessageKeys() {
      return getMessageKeys().then((res) => {
        return (store.value.messageKeys = res)
      })
    }

    return { store, loadMessageKeys }
  },
  {
    persist: true
  }
)
