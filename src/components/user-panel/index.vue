<template>
  <div class="user-panel text-align-center">
    <el-avatar :src="user.avatar" :size="80">
      {{ user.nickname }}
    </el-avatar>
    <div class="font-size-16 margin_t-20 flex_j_c-center flex_a_i-center">
      <span>{{ user.nickname }}</span>
      <el-button v-if="edit" class="margin_l-5" size="small" circle @click="editHandle(EDIT_TYPE.INFO)">
        <EpEditPen></EpEditPen>
      </el-button>
    </div>
    <div class="margin_t-10 flex flex_j_c-space-between flex_w-wrap">
      <div class="cell flex flex_a_i-center flex_s-0 padding-10" v-for="item in list" :key="item.label">
        <div class="label">{{ item.label }}：</div>
        <div class="value flex_j_c-center flex_a_i-center">
          <span>{{ item.value || '-' }}</span>
          <el-button v-if="edit && item.label === '邮箱'" class="margin_l-5" size="small" circle @click="editHandle(EDIT_TYPE.EMAIL)">
            <EpEditPen></EpEditPen>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dayjs } from 'element-plus'
import { sexList, EDIT_TYPE } from '@enums/user'

const emits = defineEmits(['edit'])

const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  },
  edit: {
    type: Boolean,
    default: () => false
  }
})

const list = computed(() => {
  const { email, sex, lastAt, createdAt } = props.user

  const sexItem = sexList.find(item => item.value === sex)
  const duration = dayjs(new Date()).diff(dayjs(createdAt), 'day') + '天'
  return [
    { label: '邮箱', value: email },
    { label: '性别', value: sexItem.label },
    { label: '最后登录时间', value: lastAt },
    { label: '加入Chatterbox', value: duration },
  ]
})

const editHandle = (type) => {
  emits('edit', type)
}
</script>

<style lang="scss" scoped>
.user-panel {
  .cell, .label, .value {
    flex-shrink: 0;
  }
}
</style>
