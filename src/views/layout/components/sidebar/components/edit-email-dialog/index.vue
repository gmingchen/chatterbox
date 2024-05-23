<template>
  <el-dialog
    class="user-dialog"
    v-model="visible"
    width="350"
    :close-on-click-modal="false"
    draggable>
    <UI :form="form" :loading="loading" @send="sendCaptcha" @submit="submit"></UI>
  </el-dialog>
</template>

<script setup>
import UI from './ui/index.vue'

import { updateEmailCaptchaApi, updateEmailApi } from '@/api/user'

const userStore = useUserStore()

const visible = ref(false)

const form = ref({
  originalEmail: '1240235512@qq.com',
  newEmail: '1240235512@qq.com',
  captcha: '',
})

const loading = ref(false)

const sendCaptcha = () => {
  const params = {
    email: form.value.newEmail
  }
  updateEmailCaptchaApi(params)
}

const submit = async () => {
  loading.value = true
  const r = await updateEmailApi(form.value)
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
