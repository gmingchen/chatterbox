<template>
  <el-form
    ref="refForm"
    :model="form"
    :rules="rules"
    label-width="auto"
    :disabled="loading">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <CaptchaInput
        v-model="form.captcha"
        :disabled="!isEmail(form.email)"
        :readonly="loading" 
        @send="emits('send')">
      </CaptchaInput>
    </el-form-item>
    <el-button class="width-full" type="primary" @click="submit" :loading="loading">登录</el-button>
  </el-form>
</template>

<script setup>
import { isEmail } from '@utils/regular.js'
import { props, rules } from './index.js' 

const emits = defineEmits(['submit', 'send'])

defineProps(props)

const refForm = ref()

const submit = async () => {
  try {
    await refForm.value.validate()
    emits('submit')
  } catch (error) {
    console.warn(error);
  }
}
</script>

<style lang="scss" scoped>
</style>