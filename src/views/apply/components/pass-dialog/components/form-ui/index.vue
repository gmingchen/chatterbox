<template>
  <el-form
    ref="refForm"
    :model="form"
    :rules="rules"
    label-width="auto"
    label-position="top"
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
    <el-button class="width-full" type="primary" plain @click="submit" :loading="loading">接受</el-button>
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

defineExpose({
  reset: () => refForm.value.resetFields()
})
</script>

<style lang="scss" scoped>
</style>