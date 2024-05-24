<template>
  <div class="message-panel flex flex_d-column">
      <template v-if="active && active.id">
        <div class="header padding-15">{{ name }}</div>
        <el-scrollbar ref="refScrollbar" @scroll="scrollHandle">
          <div ref="refInner" class="flex-item_f-1 padding-15">
            <Loading text="消息加载中" v-show="loading"></Loading>
            <div class="message-wrap" v-for="item in messages" :key="item.id" >
              <Message :message="item" :reverse="item.userId === userId"></Message>
            </div>
          </div>
        </el-scrollbar>
        <Editor class="editor"></Editor>
      </template>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/modules/user';
import Message from '../message/index.vue'
import Editor from '..//editor/index.vue'

const conversationStore = useConversationStore()
const roomStore = useRoomStore()
const userStore = useUserStore()

const loading = ref(false)
const finished = ref(false)

const active = computed(() => conversationStore.active)

const name = computed(() => {
  if (active.value) {
    const { friend, group } = active.value
    if (friend) {
      return friend.nickname
    }
    if (group) {
      return group.name
    }
  }
  
  return ''
})

const messages = computed(() => {
  if (active.value) {
    const { roomId } = active.value
    const room = roomStore.list.find(room => room.id === roomId)
    if (room) {
      return room.messages
    }
  }
  return []
})

const userId = computed(() => userStore.id) 


const refScrollbar = ref()
const refInner = ref()

const getData = async () => {
  loading.value = true

  const { roomId } = active.value
  let lastId = ''
  if (messages.value.length) {
    lastId = messages.value[0].id
  }
  const list = await roomStore.getList(roomId, lastId)
  if (!list.length) {
    finished.value = true
  }

  nextTick(() => loading.value = false)
}

watch(active, async () => {
  await getData()
  // 滚动到底部
  refScrollbar.value.setScrollTop(refInner.value.clientHeight)
})

const scrollHandle = async ({ scrollTop }) => {
  if (scrollTop < 100 && !loading.value && !finished.value) {
    loading.value = true
    setTimeout(async () => {
      const height = refInner.value.clientHeight
      await getData()
      refScrollbar.value.setScrollTop(refInner.value.clientHeight - height)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.message-panel {
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);
  .header {
    border-bottom: 1px solid var(--wrap-background-color);
  }
  .message-wrap + .message-wrap {
    margin-top: 20px;
  }
  .editor {
    border-radius: var(--el-border-radius-round);
    border-top: 1px solid var(--wrap-background-color);
  }
}
</style>
