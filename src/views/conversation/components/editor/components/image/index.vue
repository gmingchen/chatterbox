<template>
  <Upload
    :accept="accept.join(',')"
    :show-file-list="false"
    :action="uploadImageUrl()"
    :before-upload="beforeUploadHandle"
    @on-success="successHandle">
    <el-icon class="cursor-pointer" size="20" >
      <EpPicture></EpPicture>
    </el-icon>
  </Upload>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { uploadImageUrl } from '@/api/file'

const emits = defineEmits(['select'])

const accept = ['IMAGE/JPG', 'IMAGE/PNG', 'IMAGE/GIF', 'IMAGE/JPEG']

const beforeUploadHandle = (file) => {
  const { type } = file
  if (accept.includes(type.toUpperCase())) {
    return true
  }
  ElMessage({
    message: '请上传正确类型的文件~',
    type: 'warning'
  })
  return false
}

const successHandle = (data) => {
  emits('select', data)
}
</script>

<style lang="scss" scoped>
.image {}
</style>
