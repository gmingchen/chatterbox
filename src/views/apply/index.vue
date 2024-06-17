<template>
  <div class="apply flex">
    <div class="flex flex_d-column">
      <el-scrollbar ref="refScrollbar" class="width-280 padding-n-10" @scroll="scrollHandle">
        <div ref="refInner">
          <ApplyCard
            v-for="item in list"
            :key="item.id"
            :apply="item">
          </ApplyCard>
          <div class="margin_t-10 height-20" v-show="loading">
            <Loading text="数据加载中"></Loading>
          </div>
        </div>
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

const loading = ref(false)
const finished = ref(false)

const getData = async () => {
  loading.value = true
  const list = await applyStore.getList()
  if (!list.length) {
    finished.value = true
  }
  nextTick(() => loading.value = false)
}

const refScrollbar = ref()
const refInner = ref()
const scrollHandle = ({ scrollTop }) => {
  const height = refInner.value.clientHeight - refScrollbar.value.wrapRef.clientHeight
  if (height >= scrollTop && !loading.value && list.value.length && !finished.value) {
    loading.value = true
    setTimeout(async () => {
      getData()
    }, 2000)
  }
}

onBeforeMount(async () => {
  loading.value = true
  getData()
  loading.value = false
})
</script>

<style lang="scss" scoped>
.apply {}
</style>
