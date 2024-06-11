<template>
  <el-dialog
    class="apply-friend-dialog"
    v-model="visible"
    width="600px"
    :close-on-click-modal="false"
    draggable
    append-to-body
    :before-close="beforeClose">
    <div class="flex_j_c-space-between flex_a_i-center">
      <UserPanel class="margin_r-30 flex-item_f-3" :user="user"></UserPanel>
      <FromUI ref="refForm" class="flex-item_f-4" :form="form" :groupings="groupings" :loading="loading" @submit="pass"></FromUI>
    </div>
  </el-dialog>

</template>

<script setup>
import { ElMessage } from 'element-plus';

import FromUI from './components/form-ui/index.vue'

import { APPLY_STATUS } from '@enums/apply'

import { selectListApi } from '@/api/grouping'
import { reviewFriendApi } from '@/api/apply'
import { getUserInfoApi } from '@/api/user'

const visible = ref(false)
const loading = ref(false)

const id = ref(null)
const userId = ref(null)
const form = ref({
  remark: '',
  groupingId: '',
})

const groupings = ref([])
const getList = async () => {
  const r = await selectListApi()
  if (r) {
    groupings.value = r.data
    form.value.groupingId = r.data[0].id
  }
}

const user = ref({})
const getUser = async () => {
  const r = await getUserInfoApi({ id: id.value })
  if (r) {
    user.value = r.data
  }
}

const applyStore = useApplyStore()
const groupingStore = useGroupingStore()
const pass = async () => {
  loading.value = true
  const params = { 
    id: id.value,
    status: APPLY_STATUS.PASS,
    ...form.value
  }
  const r = await reviewFriendApi(params)
  if (r) {
    applyStore.setStatus(id.value, APPLY_STATUS.PASS)
    groupingStore.addFriend(r.data)
  }
  nextTick(() => {
    loading.value = false
    visible.value = false
  })
}

const refForm = ref()
const beforeClose = (done) => {
  refForm.value.reset()
  done()
}

defineExpose({
  open: (data) => {
    visible.value = true
    loading.value = false
    id.value = data.id
    userId.value = data.userId
    getUser()
    getList()
  }
})
</script>

<style lang="scss" scoped>
.apply-friend-dialog {}
</style>