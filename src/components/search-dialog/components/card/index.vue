<template>
  <div class="card width-150 flex_a_i-center">
    <el-avatar :size="50" :src="image"></el-avatar>
    <div class="flex-item_f-1 margin_l-10">
      <el-tooltip
        class="box-item"
        :content="name"
        placement="top-start"
        :show-after="1000"
      >
        <div class="name ellipse">{{ name }}</div>
      </el-tooltip>
      
      <div class="margin_t-4 flex_j_c-space-between flex_a_i-center">
        <div class="sex">{{ sexLabel }}</div>
        <el-button type="primary" link round @click.stop="addHandle"><el-icon size="14"><EpPlus /></el-icon></el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SEX, sexList } from '@enums/user'

const emits = defineEmits(['add'])

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

const addHandle = () => {
  emits('add')
}

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
