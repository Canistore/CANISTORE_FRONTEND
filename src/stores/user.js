import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Principal } from '@dfinity/principal'
import { login as loginApi, profile } from '@/canisters/user/api.js'
import { getClient } from '@/canisters/connect.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const store = ref({})
    const pid = computed(() => {
      return Principal.fromText(store.value.pid)
    })
    const shortPid = computed(() => {
      let r = ''
      if (store.value.pid) {
        r = store.value.pid.slice(0, 5) + '...' + store.value.pid.slice(-3)
      }
      return r
    })

    async function isLogin() {
      const client = await getClient()
      return await client.isAuthenticated()
    }

    async function login() {
      const res = await loginApi()
      const userinfo = {
        bio: res.bio,
        nft: res.nft,
        pid: res.pid.toString(),
        created: Number(res.created),
        email: res.email,
        website: res.website,
        artist_name: res.artist_name,
        genre: res.genre,
        location: res.location,
        avatar: res.avatar,
        confirm_agreement: res.confirm_agreement
      }
      return (store.value = userinfo)
    }

    function logout() {
      store.value = {}
      window.localStorage.clear()
      return getClient().then((authClient) => {
        return authClient.logout()
      })
    }

    async function refresh() {
      const res = await profile()
      const userinfo = {
        bio: res.bio,
        nft: res.nft,
        pid: res.pid.toString(),
        created: Number(res.created),
        email: res.email,
        website: res.website,
        artist_name: res.artist_name,
        genre: res.genre,
        location: res.location,
        avatar: res.avatar,
        confirm_agreement: res.confirm_agreement
      }
      return (store.value = userinfo)
    }

    return { store, login, logout, refresh, isLogin, pid, shortPid }
  },
  {
    persist: true
  }
)
