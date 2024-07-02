<template>
  <div class="audio-message width-100 padding-10 flex flex_a_i-center cursor-pointer" @click="clickHandle">
    <div class="icon margin-n-10" :class="playing ? 'play' : ''">
      <div class="arc"></div>
      <div class="arc"></div>
      <div class="arc"></div>
    </div>
    <span v-if="duration" class="font-size-12">{{ duration }}''</span>
    <audio ref="refAudio" :src="audio" @loadedmetadata="loadHandle" @play="playHandle" @pause="pauseHandle"></audio>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';

defineProps({
  audio: {
    type: String,
    default: () => ''
  }
})
const refAudio = ref()

const loading = ref(true)
const duration = ref('')
const playing = ref(false)

const play = () => {
  if (loading.value) {
    return ElMessage({ 
      message: '语音加载中，请稍后播放~',
      type: 'warning',
      duration: 3000
    })
  }
  const audios = document.getElementsByTagName('audio')
  for (let i = 0; i < audios.length; i++) {
    const audio = audios[i];
    audio.pause()
  }
  refAudio.value.currentTime = 0
  refAudio.value.play()
}

const clickHandle = () => {
  if (playing.value) {
    refAudio.value.pause()
  } else {
    play()
  }
}

const loadHandle = async () => {
  loading.value = false
  const audio = refAudio.value;
  while (audio.duration === Infinity) {
    await new Promise(r => setTimeout(r, 200));
    audio.currentTime = 10000000 * Math.random();
  }
  duration.value = Math.ceil(audio.duration);
}

const playHandle = () => {
  playing.value = true
}

const pauseHandle = () => {
  playing.value = false
}

defineExpose({ play })
</script>

<style lang="scss" scoped>
@keyframes arc-flicker {
  0% {
    border: none;
  }
}
.audio-message {
  background-color: var(--card-hover-background-color);
  border-radius: var(--el-border-radius-round);
  border-top-left-radius: 2px;
  .icon {
    height: 18px;
    width: 18px;
    clip-path: polygon(0 50%, 100% 0, 100% 100%);
    position: relative;
    .arc {
      position: absolute;
      border-radius: 50%;
      border: 2px solid var(--el-text-color-primary);
      border-left: none;
      top: 50%;
      left: -100%;
      transform: translateY(calc(-50%));
      &:nth-child(1) {
        height: calc(200% / 6 * 4);
        width: calc(200% / 6 * 4);
      }
      &:nth-child(2) {
        height: calc(200% / 6 * 5);
        width: calc(200% / 6 * 5);
      }
      &:nth-child(3) {
        height: 200%;
        width: 200%;
      }
    }
    
  }
  .icon.play {
    .arc:nth-child(2) {
      animation: arc-flicker 1s infinite steps(3, start);
    }
    .arc:nth-child(3) {
      animation: arc-flicker 1s infinite steps(3, end);
    }
  }
}
.reverse .audio-message {
  flex-direction: row-reverse;
  border-top-left-radius: var(--el-border-radius-round);
  border-top-right-radius: 2px;
  .icon {
    transform:scaleX(-1);
  }
}
</style>
