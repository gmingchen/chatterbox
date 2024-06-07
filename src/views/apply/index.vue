<template>
  <div class="apply flex">
    <div class="flex flex_d-column">
      <el-scrollbar class="width-280 padding-n-10">
        <ApplyCard
          v-for="item in list"
          :key="item.id"
          :apply="item">
        </ApplyCard>
      </el-scrollbar>
    </div>
    <ApplyPanel class="flex-item_f-1"></ApplyPanel>
  </div>
</template>

<script setup>
import ApplyCard from './components/apply-card/index.vue'
import ApplyPanel from './components/apply-panel/index.vue'

defineOptions({
  name: 'Apply'
})

const applyStore = useApplyStore()
const list = computed(() => applyStore.list)

onBeforeMount(() => {
  applyStore.getList()
})
</script>

<style lang="scss" scoped>
.apply {}
</style>
