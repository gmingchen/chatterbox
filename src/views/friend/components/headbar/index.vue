<template>
  <div class="headbar flex flex_a_i-center">
    <el-input v-model="keyword" placeholder="输入昵称或备注搜索"></el-input>
    <el-button class="margin_l-10" size="small" circle @click="addHandle">
      <el-icon size="14"><EpPlus /></el-icon>
    </el-button>
    <SearchDialog ref="refSearchDialog"></SearchDialog>
  </div>
</template>

<script setup>
const groupingStore = useGroupingStore()

const keyword = computed({
  get: () => groupingStore.keyword,
  set: value => groupingStore.keyword = value
})

const refSearchDialog = ref()

const addHandle = () => {
  refSearchDialog.value.open()
}

</script>

<style lang="scss" scoped>
.headbar {}
</style>
