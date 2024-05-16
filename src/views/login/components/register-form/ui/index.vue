<template>
  <el-form
    ref="refForm"
    :model="form"
    :rules="rules"
    label-width="auto"
    v-loading="loading">
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="form.nickname" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="form.sex" >
        <el-radio 
          v-for="item in sexList" 
          :key="item.value" 
          :value="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <CaptchaInput v-model="form.captcha" :disabled="!form.email"></CaptchaInput>
    </el-form-item>
    <el-button class="width-full" type="primary" @click="submit">注册</el-button>
  </el-form>
</template>

<script setup>
import { sexList } from '@enums/user'
import { props, rules } from './index.js' 

const emits = defineEmits(['submit'])

defineProps(props)

const refForm = ref()

const submit = async () => {
  try {
    await refForm.value.validate()
    emits('submit')
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped>
</style>