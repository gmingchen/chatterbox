<template>
  <el-form
    ref="refForm"
    :model="form"
    :rules="rules"
    label-width="auto"
    label-position="left"
    :disabled="loading">
    <el-form-item label="原邮箱" prop="originalEmail">
      <el-input v-model="form.originalEmail" />
    </el-form-item>
    <el-form-item label="新邮箱" prop="newEmail">
      <el-input v-model="form.newEmail" />
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <CaptchaInput v-model="form.captcha" :disabled="!isEmail(form.newEmail)" @send="emits('send')"></CaptchaInput>
    </el-form-item>
    <el-button class="width-full" type="primary" @click="submit" :loading="loading">保存</el-button>
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