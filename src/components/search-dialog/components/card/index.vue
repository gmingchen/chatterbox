<template>
  <div class="card flex_a_i-center">
    <el-avatar :size="60" :src="image"></el-avatar>
    <div class="flex-item_f-1 margin_l-10">
      <div class="name">{{ name }}</div>
      <div class="sex margin_t-4">{{ sexLabel }}</div>
      <el-button type="primary" plain circle ><el-icon><EpPlus /></el-icon></el-button>
    </div>
  </div>
</template>

<script setup>
import { SEX, sexList } from '@enums/user'

const props = defineProps({
  image: {
    type: String,
    default: () => ''
  },
  name: {
    type: String,
    default: () => ''
  },
  sex: {
    type: Number,
    default: () => SEX.UNKNOWN
  }
})

const sexLabel = computed(() => {
  const sexItem = sexList.find(item => item.value === props.sex)
  return sexItem ? sexItem.label : ''
})

</script>

<style lang="scss" scoped>
.card {
  padding: 4px 10px;
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);
  .sex {
    font-size: 12px;
    color: var(--el-color-info-dark-2);
  }
}
</style>
