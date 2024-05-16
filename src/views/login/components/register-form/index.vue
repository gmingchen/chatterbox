<template>
  <UI :form="form" :loading="loading" @submit="login"></UI>
</template>

<script setup>
import UI from './ui/index.vue'

const form = ref({
  avatar: '',
  nickname: '',
  sex: '',
  email: '',
  captcha: '',
})

const loading = ref(false)

const login = () => {
  console.log('login');
}

</script>

<style lang="scss" scoped>
</style>
