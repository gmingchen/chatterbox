<template>
  <div class="message-panel flex flex_d-column">
    <template v-if="active && active.id">
      <div class="header padding-15">{{ name }}</div>
      <el-scrollbar ref="refScrollbar" @scroll="scrollHandle">
        <div ref="refInner" class="flex-item_f-1 padding-15">
          <Loading class="loading" text="消息加载中" v-show="loading"></Loading>
          <div class="message-wrap" v-for="item in messages" :key="item.id" >
            <Message :message="item" :reverse="item.userId === userId"></Message>
          </div>
        </div>
      </el-scrollbar>
      <Editor class="editor"></Editor>
    </template>
    <Empty v-else></Empty>
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

const scrollTop = ref(0)
const refScrollbar = ref()
const refInner = ref()

const getData = async () => {
  loading.value = true

  const { roomId } = active.value
  let lastId = ''
  if (messages.value.length) {
    lastId = messages.value[0].id
  }
  const list = await roomStore.getMessageList(roomId, lastId)
  if (!list.length) {
    finished.value = true
  }

  nextTick(() => loading.value = false)
}

/**
 * 滚动条滚动到底部
 */
const scrollToBottom = () => {
  const scrollTop = refInner.value.clientHeight - refScrollbar.value.wrapRef.clientHeight
  refScrollbar.value.setScrollTop(scrollTop)
}

watch(active, async () => {
  if (!messages.value.length) {
    await getData()
  }
  nextTick(() => {
    scrollToBottom()
  })
})

watch(messages, () => {
  if (refScrollbar.value) {
    nextTick(() => {
      const difference = refInner.value.clientHeight - refScrollbar.value.wrapRef.clientHeight - refScrollbar.value.wrapRef.scrollTop
      if (difference < refScrollbar.value.wrapRef.clientHeight) {
        scrollToBottom()
      }
    })
  }
}, { deep: true })

const scrollHandle = async (scroll) => {
  scrollTop.value = scroll.scrollTop
  if (scroll.scrollTop < 1 && !loading.value && !finished.value) {
    loading.value = true
    setTimeout(async () => {
      const height = refInner.value.clientHeight
      await getData()
      const top = refInner.value.clientHeight - height
      scrollTop.value = top
      refScrollbar.value.setScrollTop(top)
    }, 1000)
  }
  
}

onActivated(() => {
  // 每次激活 设置当前会话消息已读
  if (active.value) {
    conversationStore.setRead(active.value.id)
    nextTick(() => {
      refScrollbar.value.setScrollTop(scrollTop.value)
    })
  }
})
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
