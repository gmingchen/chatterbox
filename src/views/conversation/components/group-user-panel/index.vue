<template>
  <div class="group-user-panel">
    <el-scrollbar ref="refScrollbar" @scroll="scrollHandle">
      <div ref="refInner" class="padding-n-5">
        <div
          class="wrap padding-5 cursor-pointer flex flex_a_i-center"
          v-for="item in users"
          :key="item.id"
          @click="clickHandle(item)">
          <el-avatar :src="item.avatar" :size="30"></el-avatar>
          <div class="flex-item_f-1 font-size-12 margin_l-10 ellipse">{{ item.roomUserNickname || item.nickname }}</div>
        </div>
        <div class="margin_t-10 width-full height-20" v-show="loading">
          <Loading text="数据加载中"></Loading>
        </div>
      </div>
    </el-scrollbar>
    <ApplyFriendDialog ref="refApplyFriendDialog"></ApplyFriendDialog>
  </div>
</template>

<script setup>
const conversationStore = useConversationStore()
const roomStore = useRoomStore()

const active = computed(() => conversationStore.active)

const users = computed(() => {
  if (active.value) {
    const { roomId } = active.value
    const room = roomStore.list.find(room => room.id === roomId)
    if (room) {
      return room.users
    }
  }
  return []
})

const loading = ref(false)
const finished = ref(false)

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
    finished.value = true
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
    getData()
  }
})
</script>

<style lang="scss" scoped>
.group-user-panel {
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);
  .wrap {
    border-radius: var(--box-border-radius);
    color: var(--el-color-info-dark-2);
    &:hover {
      background-color: var(--card-hover-background-color);
    }
    &:first-child {
      margin-top: 10px;
    }
  }
}
</style>
