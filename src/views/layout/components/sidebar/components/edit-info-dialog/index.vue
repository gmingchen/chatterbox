<template>
  <el-dialog
    class="user-dialog"
    v-model="visible"
    width="350"
    :close-on-click-modal="false"
    draggable
    append-to-body>
    <UI :form="form" :loading="loading" @submit="submit"></UI>
  </el-dialog>
</template>

<script setup>
import UI from './ui/index.vue'

import { updateApi } from '@/api/user'

const userStore = useUserStore()

const visible = ref(false)

const form = ref({
  avatar: userStore.avatar,
  nickname: userStore.nickname,
  sex: userStore.sex,
})

const loading = ref(false)

const submit = async () => {
  loading.value = true
  const r = await updateApi(form.value)
  if (r) {
    await userStore.getUserInfo()
  }
  nextTick(() => {
    loading.value = false
  })
}

defineExpose({
  open: () => {
    visible.value = true
  }
})
</script>

<style lang="scss" scoped>
</style>
