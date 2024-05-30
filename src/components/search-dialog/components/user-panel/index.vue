<template>
  <div class="user-panel">
    <div class="header flex">
      <el-input class="keyword-input margin_r-10" v-model="keyword" placeholder="输入昵称或邮箱搜索"></el-input>
      <el-button type="primary" plain @click="searchHandle" :disabled="!keyword">查找</el-button>
    </div>
    <div class="content margin_t-10 flex_w-wrap">
      <Card v-for="item in list" :key="item.id" :image="item.avatar" :name="item.nickname" :sex="item.sex"></Card>
    </div>
  </div>
</template>

<script setup>
import Card from '../card/index.vue'

import { getUserListApi } from '@/api/user'

const keyword = ref('')
const page = reactive({
  current: 1,
  size: 10,
  total: 0
})

const list = ref([])

const getList = async () => {
  const { current, size } = page
  const params = {
    keyword: keyword.value,
    current,
    size
  }
  const r = await getUserListApi(params)
  if (r) {
    if (current === 1) {
      list.value = r.data.list
    } else {
      list.value.push(r.data.list)
    }
    page.total = r.data.total
  }
}

const searchHandle = () => {
  page.current = 1
  getList()
}

const nextPage = () => {
  page.current += 1
  getList()
}
</script>

<style lang="scss" scoped>
.user-panel {
  .header {
    .keyword-input {
      width: 200px;
    }
  }
  .content {}
}
</style>
