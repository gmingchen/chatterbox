<template>
  <div class="message-panel flex flex_d-column">
    <template v-if="active && active.id">
      <div class="header flex_a_i-center">
        <Avatar :src="avatar" :name="name" :size="36"></Avatar>
        <span class="margin_l-10">{{ name }}</span>
      </div>
      <el-scrollbar ref="refScrollbar" @scroll="scrollHandle">
        <div ref="refInner" class="flex-item_f-1 padding-15">
          <Loading class="loading" text="消息加载中" v-show="loading"></Loading>
          <div v-for="(messages, key) in list">
            <div class="date margin-20-n">{{ key }}</div>
            <div class="message-wrap" v-for="item in messages" :key="item.id">
              <Message :message="item" :reverse="item.userId === userId" @avatar-click="avatarClickHandle(item)"></Message>
            </div>
          </div>
          
        </div>
      </el-scrollbar>
      <Editor></Editor>
    </template>
    <Empty v-else></Empty>
    <ApplyFriendDialog ref="refApplyFriendDialog"></ApplyFriendDialog>
  </div>
</template>

<script setup>
import { dayjs } from 'element-plus'
import Message from '../message/index.vue'
import Editor from '../editor/index.vue'

import { timeFormat } from '@utils'

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

const avatar = computed(() => {
  if (active.value) {
    const { friend, group } = active.value
    if (friend) {
      return friend.avatar
    }
    if (group) {
      return group.avatar
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

const list = computed(() => {
  const groups = {}
  let lastKey = null
  if (messages.value.length) {
    messages.value.reduce((pre, cur, index, array) => {
      let key = null
      const time = 60 * 60 * 1000
      if (dayjs(pre.createdAt).valueOf() + time > dayjs(cur.createdAt).valueOf()) {
        key = lastKey || timeFormat(pre.createdAt)
      } else {
        key = timeFormat(cur.createdAt)
      }
      lastKey = key
      if (!Object.hasOwnProperty.call(groups, key)) {
        groups[key] = []
      }
      groups[key].push(cur)
      return cur
    })
  }
  return groups
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
  finished.value = false
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
    // setTimeout(async () => {
      const height = refInner.value.clientHeight
      await getData()
      const top = refInner.value.clientHeight - height
      scrollTop.value = top
      refScrollbar.value.setScrollTop(top)
    // }, 1000)
  }
  
}

const refApplyFriendDialog = ref()
const avatarClickHandle = ({ userId }) => {
  refApplyFriendDialog.value.open(userId)
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
    padding: 10px 15px;
    border-bottom: 1px solid var(--wrap-background-color);
  }
  .date {
    text-align: center;
    font-size: 12px;
    color: var(--el-color-info-dark-2);
  }
  .message-wrap + .message-wrap {
    margin-top: 20px;
  }
}
</style>
