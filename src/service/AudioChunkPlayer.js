class AudioChunkPlayer extends EventTarget {
  static CHUNK_SIZE = 256 * 1024 * 5 // 1.25M

  constructor(url) {
    super()
    this.url = url
    this.offset = 0
    this.chunkIndex = -1 // The index of the currently playing chunk, -1 means not yet played
    this.isPaused = true
    this.audioData = null
    this.frame = null
    this.audioDataCopy = null

    this.audioContext = new AudioContext() || new webkitAudioContext()
    this.currentSourceNode = this.audioContext.createBufferSource()
  }

  async play() {
    // Screen lock - prevent screen off
    this.wakeLock = await navigator.wakeLock?.request('screen')
    this.isPaused = false
    // Get the size of the audio file
    this.fileSize = await getFileSize(this.url)
    await this.loadNextSourceNode()
    this.playNextSourceNode()
    this.time = Date.now()
    // Trigger time update event
    this.updatePlaybackTime()
  }

  pause() {
    // Release screen lock
    this.wakeLock?.release()
    clearTimeout(this.updateTimer)
    this.isPaused = true

    const event = new CustomEvent('paused')
    this.dispatchEvent(event)

    if (this.currentSourceNode) {
      this.currentSourceNode.stop()
    }
  }

  updatePlaybackTime() {
    if (this.currentSourceNode.buffer) {
      const event = new CustomEvent('timeupdate', {
        detail: { currentTime: (Date.now() - this.time) / 1000 }
      })
      this.dispatchEvent(event)
    } else {
      return cancelAnimationFrame(this.frame)
    }

    if (!this.isPaused) {
      this.frame = requestAnimationFrame(() => {
        this.updatePlaybackTime()
      })
    } else {
      return cancelAnimationFrame(this.frame)
    }
  }

  async loadNextSourceNode() {
    // Check if the end of the file has been reached

    if (this.offset >= this.fileSize) {
      return
    }

    // Load and decode the next chunk
    const chunk = await fetchChunk(this.url, this.offset, AudioChunkPlayer.CHUNK_SIZE)
    this.audioData = concatArrayBuffers(this.audioData, chunk)
    const tempAudioData = this.audioData.slice(0)
    const audioBuffer = await this.audioContext.decodeAudioData(tempAudioData)
    this.nextSourceNode = this.audioContext.createBufferSource()
    this.nextSourceNode.buffer = audioBuffer

    // Update offset
    this.offset = this.offset + AudioChunkPlayer.CHUNK_SIZE
  }

  playNextSourceNode() {
    this.chunkIndex++
    if (!this.nextSourceNode) {
      // The next chunk does not exist, then end
      const event = new CustomEvent('ended')
      this.dispatchEvent(event)
      return
    }

    if (0 === this.chunkIndex) {
      const event = new CustomEvent('canplaythrough')
      this.dispatchEvent(event)
    }

    const playOffset = this.currentSourceNode.buffer?.duration || 0
    this.currentSourceNode = this.nextSourceNode
    this.nextSourceNode = null

    this.currentSourceNode.connect(this.audioContext.destination)
    this.currentSourceNode.start(0, playOffset)
    this.loadNextSourceNode()

    this.currentSourceNode.onended = () => {
      if (this.offset > this.fileSize) {
        const event = new CustomEvent('ended')
        this.dispatchEvent(event)
        cancelAnimationFrame(this.frame)
        return
      }
      if (!this.isPaused) {
        this.playNextSourceNode()
      }
    }
  }
}

async function fetchChunk(url, offset, chunkSize) {
  const response = await fetch(url, {
    headers: {
      Range: `bytes=${offset}-${offset + chunkSize - 1}`
    }
  })

  if (response.status === 206) {
    // 206 means partial content
    const arrayBuffer = await response.arrayBuffer()
    return arrayBuffer
  } else {
    console.error('Failed to load audio chunk', response.status)
  }
}

async function getFileSize(url) {
  const response = await fetch(url, {
    headers: {
      Range: 'bytes=0-1'
    }
  })

  if (response.ok) {
    const contentLength = response.headers.get('content-range').split('/').pop()
    return parseInt(contentLength, 10) // Return file size
  } else {
    console.error('Failed to get file information', response.status)
    return null // Handle error case
  }
}

function concatArrayBuffers(buffer1, buffer2) {
  if (!buffer1) {
    return buffer2
  }
  if (!buffer2) {
    return buffer1
  }
  buffer1 = buffer1.slice(0)
  buffer2 = buffer2.slice(0)
  // Create a new ArrayBuffer, the size of which is the sum of the two input buffers
  const newBuffer = new ArrayBuffer(buffer1.byteLength + buffer2.byteLength)

  // Create a Uint8Array view for the new buffer
  const newUint8Array = new Uint8Array(newBuffer)

  // Copy the data from the first buffer to the new buffer
  newUint8Array.set(new Uint8Array(buffer1), 0)

  // Copy the data from the second buffer to the new buffer
  newUint8Array.set(new Uint8Array(buffer2), buffer1.byteLength)

  return newBuffer
}

export function play(url) {
  const player = new AudioChunkPlayer(url)
  player.play()
  return player
}
