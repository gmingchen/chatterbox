<template>
  <el-form
    ref="refForm"
    :model="form"
    :rules="rules"
    label-width="auto"
    :disabled="loading">
    <el-form-item label="备注" prop="remark">
      <el-input v-model="form.remark" maxlength="50" />
    </el-form-item>
    <el-form-item label="分组" prop="groupingId">
      <el-select v-model="form.groupingId" placeholder="请选择分组">
        <el-option
          v-for="grouping in groupings"
          :key="grouping.id"
          :label="grouping.name"
          :value="grouping.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="申请内容" prop="content">
      <el-input v-model="form.content" type="textarea" resize="none" :rows="2" maxlength="100" show-word-limit />
    </el-form-item>
    <el-button class="width-full" type="primary" @click="submit" :loading="loading">申请</el-button>
  </el-form>
</template>

<script setup>
import { props, rules } from './index.js' 

const emits = defineEmits(['submit'])

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