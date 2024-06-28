<template>
  <div class="send-status flex_a_i-center">
    <Loading v-if="message.sendStatus === MESSAGE_SEND_STATUS.PENDING"></Loading>
    <el-icon v-else-if="message.sendStatus === MESSAGE_SEND_STATUS.FAIL" class="fail-icon cursor-pointer">
      <EpWarningFilled />
    </el-icon>
  </div>
</template>

<script setup>
import { MESSAGE_SEND_STATUS } from '@enums/message'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.send-status {
  .fail-icon {
    color: var(--el-color-warning);
    font-size: 18px;
  }
}
</style>
