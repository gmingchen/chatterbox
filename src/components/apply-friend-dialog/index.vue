<template>
  <el-dialog
    class="apply-friend-dialog"
    v-model="visible"
    width="400px"
    :close-on-click-modal="false"
    draggable>
    <FromUI :form="form" :groupings="groupings" :loading="loading" @submit="apply"></FromUI>
  </el-dialog>

</template>

<script setup>
import FromUI from './components/form-ui/index.vue'

import { selectListApi } from '@/api/grouping'
import { applyFriendApi } from '@/api/apply'

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
  }
}


const apply = async () => {
  loading.value = true
  console.log(123);
  // const params = { targetId: id.value, ...form.value}
  // const r = await applyFriendApi(params)
  // if (r) {
  // }
  nextTick(() => {
    loading.value = false
    visible.value = false
  })
}

defineExpose({
  open: (userId) => {
    visible.value = true
    id.value = userId
    getList()
  }
})
</script>

<style lang="scss" scoped>
.apply-friend-dialog {}
</style>
./components/form-ui