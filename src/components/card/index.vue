<template>
  <div class="card padding-10 cursor-pointer flex flex_a_i-center" :class="active ? 'active' : ''">
    <el-avatar :src="image">{{ labelFormat }}</el-avatar>
    <div class="flex-item_f-1 margin-n-10">
      <div class="label ellipse" v-if="label">
        <el-tooltip :content="label" placement="top-start" :show-after="1000">
          <span>{{ label }}</span>
        </el-tooltip>
      </div>
      <div class="content margin_t-4 ellipse" v-if="content">{{ content }}</div>
    </div>
    <div class="tips">{{ tips }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
  },
  label: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: () => '',
  },
  tips: {
    type: String,
    default: () => '',
  },
  active: {
    type: Boolean,
    default: () => false
  }
})

const labelFormat = computed(() => {
  const { label } = props
  const length = 3
  if (label && label.length > length) {
    return label.slice(0, length)
  }
  return label
})
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);
  &.active, &:hover {
    background-color: var(--card-hover-background-color);
  }
  & + & {
    margin-top: 4px;
  }
  .content, .tips {
    font-size: 12px;
    color: var(--el-color-info-dark-2);
  }
}
</style>
