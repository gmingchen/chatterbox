<template>
  <div class="friend-panel padding-15 flex_d-column flex_a_i-center">
    <template v-if="active">
      <UserPanel class="user-panel margin_t-50" :user="active"></UserPanel>
      <div class="margin_t-10">
        <el-button type="primary" plain round @click="sendHandle">
          <el-icon class="margin_r-5"><EpPromotion /></el-icon>
          发送消息
        </el-button>
        <el-popconfirm
          width="160"
          confirm-button-text="确认"
          cancel-button-text="取消"
          title="确认删除该好友？"
          @confirm="deleteHandle">
          <template #reference>
            <el-button type="warning" plain round>
              <el-icon class="margin_r-5"><EpDelete /></el-icon>
              删除好友
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <Empty v-else></Empty>
  </div>
</template>

<script setup>
import { createApi } from '@/api/conversation'
import { deleteApi } from '@/api/friend'

const router = useRouter()

const groupingStore = useGroupingStore()

const conversationStore = useConversationStore()

const active = computed({
  get: () => groupingStore.active,
  set: value => groupingStore.active = value
})

const sendHandle = async () => {
  const { userId } = active.value
  const r = await createApi({ userId })
  if (r) {
    conversationStore.addConversation(r.data)
    conversationStore.setActive(r.data)
    router.push({ name: 'conversation' })
  }
}
const deleteHandle = async () => {
  const { userId } = active.value
  const r = await deleteApi({ userId })
  if (r) {
    active.value = null
    groupingStore.removeFriend(userId)
  }
}
</script>

<style lang="scss" scoped>
.friend-panel {
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);
  .user-panel {
    min-width: 100px;
    max-width: 470px;
  }
}
</style>
