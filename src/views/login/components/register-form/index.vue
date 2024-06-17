<template>
  <UI :form="form" :loading="loading" @send="sendCaptcha" @submit="register"></UI>
</template>

<script setup>
import UI from './ui/index.vue'
import { SEX } from '@enums/user'

import { registerCaptchaApi } from '@/api/auth'

const router = useRouter()

const authStore = useAuthStore()

const form = ref({
  avatar: '',
  nickname: '',
  sex: SEX.MALE,
  email: '',
  captcha: '',
})

const loading = ref(false)

const sendCaptcha = () => {
  const params = {
    email: form.value.email
  }
  registerCaptchaApi(params)
}

const register = async () => {
  loading.value = true
  const r = await authStore.register(form.value)
  if (r) {
    router.push({ name: 'conversation' })
  }
  nextTick(() => {
    loading.value = false
  })
}

</script>

<style lang="scss" scoped>
</style>
