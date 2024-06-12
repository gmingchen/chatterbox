<template>
  <div class="voice-call" @click="call">
    <el-icon class="cursor-pointer" size="20" >
      <EpPhone></EpPhone>
    </el-icon>
  </div>
</template>

<script setup>
import { voiceApi } from '@/api/media'

const props = defineProps({
  userId: {
    type: Number,
    default: () => 0
  }
})

let connection = null

const call = async () => {
  console.log(props.userId);
  if (props.userId === 2) {
    offerHandler()
  } else {
    answerHandler()
  }
}

const offerHandler = async () => {
  const offer = await connection.createOffer()
  connection.setLocalDescription(offer);
  // 将 offer 信息 发送给对方
  // 请求接口
  const params = {
    description: JSON.stringify(offer),
    userId: props.userId
  } 
  voiceApi(params)
  console.log(offer);
}
const answerHandler = async () => {
  const answer = await connection.createAnswer()
  connection.setLocalDescription(answer);
   // 将 answer 信息 发送给对方
  // 请求接口 
  console.log(answer);
}

const remoteHandler = (description) => {
  connection.setRemoteDescription(description)
}

const channelHandler = (channel) => {
  channel.onopen = () => {
    console.log('open');
  }
  channel.onclose = () =>{ 
    console.log('close');
  }
  channel.onmessage = (e) => {
    console.log('message', e);
  }
}

const start = () => {
  connection = new RTCPeerConnection()
  connection.ondatachannel = (event) => {
    const { channel } = event
    channelHandler(channel)
  }
  const channel = connection.createDataChannel('channel')
  channelHandler(channel)
}

onBeforeMount(() => {
  start()
})
</script>

<style lang="scss" scoped>
.voice-call {}
</style>
