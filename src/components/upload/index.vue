<template>
  <el-upload
    ref="refUpload"
    :headers="{
      [AUTH_KEY]: token
    }"
    v-bind="$attrs"
    :on-success="successHandle">
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </el-upload>
</template>

<script setup>
import { ElMessage } from 'element-plus'

import { AUTH_KEY, SUCCESS_CODE } from '@constants'
import useBindExposed from '@/hooks/bind-exposed'

const emits = defineEmits(['on-success'])

const refUpload = ref()

const authStore = useAuthStore()

const token = computed(() => authStore.token)

const successHandle = (r) => {
  const { code, data, message } = r
  if (SUCCESS_CODE.includes(code)) {
    emits('on-success', data)
  } else {
    ElMessage({
      message: message,
      type: 'warning'
    })
  }
}

onMounted(() => {
  useBindExposed(refUpload)
})
</script>

<style lang="scss" scoped>
</style>
