<template>
  <UI :form="form" :loading="loading" @send="sendCaptcha" @submit="login"></UI>
</template>

<script setup>
import UI from './ui/index.vue'

import { loginCaptchaApi } from '@/api/auth'

const authStore = useAuthStore()

const router = useRouter()

const form = ref({
  email: '',
  captcha: '',
})

const loading = ref(false)

const sendCaptcha = () => {
  const params = {
    email: form.value.email
  }
  loginCaptchaApi(params)
}

const login = async () => {
  loading.value = true
  const r = await authStore.login(form.value)
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
