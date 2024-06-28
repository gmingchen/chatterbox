<template>
  <el-image class="width-26 cursor-pointer" :src="QQ" @click="clickHandle">
  </el-image>
</template>

<script setup>
import { ElLoading } from 'element-plus'

import QQ from '@/assets/images/qq.png'

import { parseJson2Param, parseParam2Json } from '@utils'
import { useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

const clickHandle = () => {
  const params = {
    which: 'Login',
    display: 'pc',
    client_id: '102121863',
    response_type: 'token',
    scope: 'all',
    redirect_uri: 'https://chatterbox.gumingchen.icu/login'
  }
  const url = 'https://graph.qq.com/oauth2.0/show?' + parseJson2Param(params)
  window.open(url, '_self')
}

const grantCallback = async () => {
  const path = route.fullPath.replace('#', '?')
  const accessToken = parseParam2Json(path).access_token
  if (accessToken) {
    const loading = ElLoading.service({
      text: 'QQ授权登录中...'
    })
    router.replace({ name: route.name })
    const r = await authStore.qqLogin({ accessToken })
    if (r) {
      loading.close()
      router.push({ name: 'conversation' })
    }
  }
}

onBeforeMount(() => {
  grantCallback()
})
</script>

<style lang="scss" scoped>
</style>
