<template>
  <el-popover trigger="click" placement="top" :width="322" popper-class="expression-popover">
    <el-scrollbar height="200">
    <div class="expression padding-n-10 cursor-pointer flex flex_w-wrap">
      <div
        class="wrap width-30 height-30 flex_j_c-center flex_a_i-center font-size-20"
        v-for="item in list"
        :key="item.id"
        @click="selectHandle(item)">{{ item.content }}</div>
    </div>
  </el-scrollbar>
    <template #reference>
      <el-icon class="cursor-pointer" size="20" >
        <EpPictureRounded></EpPictureRounded>
      </el-icon>
    </template>
  </el-popover>
</template>

<script setup>
const emits = defineEmits(['select'])

const expressionStore = useExpressionStore()

const list = computed(() => expressionStore.list)

const selectHandle = ({ content }) => {
  emits('select', content)
}

onBeforeMount(() => {
  if (!list.value.length) {
    expressionStore.getList()
  }
})
</script>

<style>
.expression-popover {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>
.expression {
  .wrap {
    border-radius: var(--el-border-radius-base);
    &:hover {
      background-color: var(--tabbar-hover-color);
    }
  }
}

</style>
