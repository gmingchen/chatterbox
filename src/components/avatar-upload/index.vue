<template>
  <Upload
    class="avatar-upload height-80 width-80"
    :accept="IMAGE_ACCEPT.join(',')"
    :show-file-list="false"
    :action="uploadAvatarUrl()"
    :before-upload="beforeUploadHandle"
    @on-success="successHandle">
    <el-image v-if="value" :src="value" fit="cover" />
    <el-icon class="icon" v-else>
      <EpPlus />
    </el-icon>
  </Upload>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import useModel from '@/hooks/model'

import { IMAGE_ACCEPT } from '@constants/file'
import { uploadAvatarUrl } from '@/api/file'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    required: true,
    default: () => ''
  }
})

const value = useModel(props)

const beforeUploadHandle = (file) => {
  const { type } = file
  if (IMAGE_ACCEPT.includes(type.toUpperCase())) {
    return true
  }
  
  ElMessage({
    message: '请上传正确类型的文件~',
    type: 'warning'
  })
  return false
}

const successHandle = (data) => {
  value.value = data
}
</script>

<style lang="scss" scoped>
.avatar-upload {
  ::v-deep(.el-upload) {
    height: 100%;
    width: 100%;
    border: 1px dashed var(--el-border-color);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    .icon {
      font-size: 28px;
      color: var(--el-text-color-regular);
      text-align: center;
    }
    &:hover {
      border-color: var(--el-border-color-hover);
    }
  }
}


</style>
