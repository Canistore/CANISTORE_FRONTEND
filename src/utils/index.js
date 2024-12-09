import { useUserStore } from '@/stores/user'
import { Principal } from '@dfinity/principal'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export function copy(text) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

export function getAudioDurationByFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = function (e) {
      const audioContext = new AudioContext()
      audioContext.decodeAudioData(e.target.result, function (buffer) {
        resolve(Math.round(buffer.duration))
      })
    }
    reader.readAsArrayBuffer(file)
  })
}
// bytes to readable string
export function bytesToSize(bytes) {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}

export function getFileSizeByUrl(url) {
  return fetch(url).then((res) => res.headers.get('Content-Length'))
}

export function fileUrl(fileId, ossId) {
  if (!ossId) {
    const userStore = useUserStore()
    ossId = userStore.store.spaces[0].oss_id
  }
  return `https://${ossId}.icp0.io/f/${fileId}`
}

/**
 * Convert seconds to --:-- format
 */
export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secondLeft = Math.floor(seconds % 60)
  return `${minutes}:${secondLeft < 10 ? '0' : ''}${secondLeft}`
}

export function time2LocalString(time, format = 'LL') {
  return dayjs(time * Math.pow(10, -6)).format(format)
}

/**
 * Convert canister type to a type that can be displayed on the page
 * @param {*} obj
 * @returns
 */
export function canisterType2CommonType(obj) {
  if (obj instanceof Array) {
    return obj.map((item) => {
      return canisterType2CommonType(item)
    })
  }

  if (typeof obj === 'bigint') {
    return Number(obj)
  }

  if (obj instanceof Principal) {
    return obj.toString()
  }

  if (obj && typeof obj === 'object') {
    const r = {}
    Object.keys(obj).map((key) => {
      r[key] = canisterType2CommonType(obj[key])
    })
    return r
  }

  return obj
}

export function timelineFormat(time) {
  if (Date.now() - Number(time) * Math.pow(10, -6) > 1000 * 60 * 60 * 24 * 30) {
    // More than a month displays date
    return dayjs(Number(time) * Math.pow(10, -6)).format('YYYY-MM-DD')
  } else {
    return dayjs(Number(time) * Math.pow(10, -6)).fromNow()
  }
}

export function formatExternalLink(url) {
  if (!url.startsWith('http')) {
    return 'https://' + url
  } else {
    return url
  }
}

// Determine if it is a mobile device
export function isMobile() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  return /android|iphone|ipad|ipod|windows phone/i.test(userAgent)
}

export function getYear(time) {
  return dayjs(time * Math.pow(10, -6)).year()
}
