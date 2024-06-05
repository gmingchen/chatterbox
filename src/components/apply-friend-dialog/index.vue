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
      <FromUI ref="refForm" class="flex-item_f-4" :form="form" :groupings="groupings" :loading="loading" @submit="apply"></FromUI>
    </div>
  </el-dialog>

</template>

<script setup>
import { ElMessage } from 'element-plus';

import FromUI from './components/form-ui/index.vue'

import { selectListApi } from '@/api/grouping'
import { applyFriendApi } from '@/api/apply'
import { getUserInfoApi } from '@/api/user'

const userStore = useUserStore()
const nickname = computed(() => userStore.nickname)

const visible = ref(false)

const loading = ref(false)

const id = ref(null)

const form = ref({
  remark: '',
  groupingId: '',
  content: '',
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
    form.value.content = `我是${ nickname.value }，想添加你为好友！`
  }
}

const apply = async () => {
  loading.value = true
  const params = { targetId: id.value, ...form.value}
  const r = await applyFriendApi(params)
  if (r) {
    ElMessage({
      message: '你的好友添加请求已经发送成功，正在等待对方确认~',
      type: 'success'
    })
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
  open: (userId) => {
    visible.value = true
    loading.value = false
    id.value = userId
    getUser()
    getList()
  }
})
</script>

<style lang="scss" scoped>
.apply-friend-dialog {}
</style>
./components/form-ui