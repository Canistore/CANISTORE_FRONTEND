<script setup>
import { onMounted} from "vue";

const Emits = defineEmits(['loadMore'])
const props = defineProps({
  noData: { type: Boolean, default: false },
  spaceHeight: {
    type: Number,
    default: 0,
    required: true
  }
})
const checkInView = (el) => {
  if (props.noData) {
    return
  }
  const Rect = el.getBoundingClientRect()

  if (Rect.top < window.innerHeight - props.spaceHeight) {
    Emits('loadMore')
  }
}
onMounted(() => {
  const loadingEle = document.getElementById('loading')
  let el = loadingEle
  while (window.getComputedStyle(el).overflow !== 'auto') {
    el = el.parentElement
  }
  el.addEventListener('scroll', () => {
    checkInView(document.getElementById('loading'))
  })
})
</script>

<template>
  <div class="loading" id="loading" v-if="!props.noData">
    <img src="../assets/images/loading.png" class="load-icon" />
  </div>
  <div class="no-more"  id="loading" v-else>No More</div>
</template>

<style scoped lang="scss">
.loading {
  display: flex;
  justify-content: center;
  color: #808080;
  width: 100%;
  .load-icon {
    animation: loading 3s linear infinite;
  }
}
.no-more {
  width: 100%;
  padding: 10px 0;
  text-align: center;
}

</style>