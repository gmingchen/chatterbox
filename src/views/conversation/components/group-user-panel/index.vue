<template>
  <div class="group-user-panel flex_d-column">
    <div class="header padding-10 flex flex_a_i-baseline">
      <div>群成员</div>
      <div class="margin-n-5">·</div>
      <div>{{ count.online }} / {{ count.total }}</div>
    </div>
    <el-scrollbar ref="refScrollbar" class="flex-item_f-1" @scroll="scrollHandle">
      <div ref="refInner" class="padding-n-5">
        <TransitionGroup tag="div" name="move">
          <GroupUser 
            v-for="item in users"
            :key="item.id"
            :avatar="item.avatar"
            :name="item.roomUserNickname || item.nickname"
            :online="item.online"
            @click="clickHandle(item)">
          </GroupUser>
        </TransitionGroup>
        <div class="margin_t-10 width-full height-20" v-show="loading">
          <Loading text="数据加载中"></Loading>
        </div>
      </div>
    </el-scrollbar>
    <ApplyFriendDialog ref="refApplyFriendDialog"></ApplyFriendDialog>
  </div>
</template>

<script setup>
import GroupUser from '../group-user/index.vue'

const conversationStore = useConversationStore()
const roomStore = useRoomStore()

const active = computed(() => conversationStore.active)

const count = computed(() => {
  const result = {
    total: 0,
    online: 0
  }
  if (active.value) {
    const { roomId } = active.value
    const room = roomStore.list.find(room => room.id === roomId)
    if (room) {
      const { userTotalCount, userOnlineCount } = room
      result.total = userTotalCount
      result.online = userOnlineCount
    }
  }
  return result
})

const users = computed(() => {
  if (active.value) {
    const { roomId } = active.value
    const room = roomStore.list.find(room => room.id === roomId)
    if (room) {
      const list = [...room.users]
      return list.sort((a, b) => {
        return b.online - a.online
      })
    }
  }
  return []
})

const loading = ref(false)
const finished = ref(false)

const getCount = async () => {
  roomStore.getUserCount(active.value.roomId)
}

const getData = async () => {
  loading.value = true

  const { roomId } = active.value
  let lastId = ''
  const length = users.value.length
  if (length) {
    lastId = users.value[length - 1].roomUserId
  }

  const list = await roomStore.getUserList(roomId, lastId)
  if (!list.length) {
    // finished.value = true
  } else {
    // 自动加载人员
    getData()
  }

  nextTick(() => loading.value = false)
}

const refScrollbar = ref()
const refInner = ref()
const scrollHandle = ({ scrollTop }) => {
  const height = refInner.value.clientHeight - refScrollbar.value.wrapRef.clientHeight
  if (height >= scrollTop && !loading.value && users.value.length && !finished.value) {
    loading.value = true
    setTimeout(async () => {
      getData()
    }, 2000)
  }
}

const refApplyFriendDialog = ref()
const clickHandle = ({ id }) => {
  refApplyFriendDialog.value.open(id)
}

onBeforeMount(() => {
  if (!users.value.length) {
    getCount()
    getData()
  }
})
</script>

<style lang="scss" scoped>
.group-user-panel {
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);
  .header {
    font-size: 12px;
    border-bottom: 1px solid var(--wrap-background-color);
  }
}
</style>
