<template>
  <div class="apply-panel padding-15 flex_d-column flex_a_i-center">
    <template v-if="active">
      <Panel class="panel margin_t-50" :image="image" :title="title" :list="list"></Panel>
      <div class="margin_t-10">
        <template v-if="active.status === APPLY_STATUS.AUDIT">
          <el-button type="primary" plain round @click="reviewHandle(APPLY_STATUS.PASS)">
            <el-icon class="margin_r-5"><EpCircleCheckFilled /></el-icon>
            接受
          </el-button>
          <el-popconfirm
            width="190"
            confirm-button-text="确认"
            cancel-button-text="取消"
            title="确认拒绝该好友申请？"
            @confirm="reviewHandle(APPLY_STATUS.REJECT)">
            <template #reference>
              <el-button type="warning" plain round>
                <el-icon class="margin_r-5"><EpCircleCloseFilled /></el-icon>
                拒绝
              </el-button>
            </template>
          </el-popconfirm>
        </template>
        <template v-if="active.status === APPLY_STATUS.PASS">
          <el-button type="primary" plain round @click="sendHandle">
            <el-icon class="margin_r-5"><EpPromotion /></el-icon>
            发送消息
          </el-button>
        </template>
      </div>
    </template>
    <Empty v-else></Empty>
    <PassDialog ref="refPassDialog"></PassDialog>
  </div>
</template>

<script setup>
import { dayjs } from 'element-plus'

import PassDialog from '../pass-dialog/index.vue'
import { APPLY_STATUS, applyStatusList } from '@enums/apply'
import { sexList } from '@enums/user'

import { createApi } from '@/api/conversation'
import { reviewFriendApi } from '@/api/apply'

const applyStore = useApplyStore()
const active = computed({
  get: () => applyStore.active,
  set: (value) => applyStore.setActive(value)
})
const image = computed(() => {
  const { user } = active.value
  if (user) {
    return active.value.user.avatar
  }
  return ''
})
const title = computed(() => {
  const { user } = active.value
  if (user) {
    return active.value.user.nickname
  }
  return ''
})
const list = computed(() => {
  let result = []
  const { user, content, status, createdAt } = active.value
  if (user) {
    const sexItem = sexList.find(item => item.value === user.sex)
    const statusItem = applyStatusList.find(item => item.value === status)
    result = [
      { label: '性别', value: sexItem ? sexItem.label : '-' },
      { label: '好友申请', value: content || '-' },
      { label: '审核状态', value: statusItem ? statusItem.label : '-' },
      { label: '申请时间', value: dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss') || '-' },
    ]
  }

  return result
})

const refPassDialog = ref()
const reviewHandle = async (status) => {
  const { id, userId } = active.value
  if (status === APPLY_STATUS.PASS) {
    refPassDialog.value.open({ id, userId })
  } else if (status === APPLY_STATUS.REJECT) {
    const r = await reviewFriendApi({ id, status})
    if (r) {
      applyStore.setStatus(id, APPLY_STATUS.REJECT)
    }
  }
}

const router = useRouter()
const conversationStore = useConversationStore()
const sendHandle = async () => {
  const { userId } = active.value
  const r = await createApi({ userId })
  if (r) {
    conversationStore.addConversation(r.data)
    conversationStore.setActive(r.data)
    router.push({ name: 'conversation' })
  }
}


</script>

<style lang="scss" scoped>
.apply-panel {
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);
  .panel {
    min-width: 100px;
    max-width: 470px;
  }
}
</style>
