<template>
  <div class="user-panel">
    <div class="header flex">
      <el-input class="keyword-input margin_r-10" v-model="keyword" placeholder="输入昵称或邮箱搜索"></el-input>
      <el-button type="primary" plain @click="searchHandle" :disabled="!keyword || loading">查找</el-button>
    </div>
    <el-scrollbar ref="refScrollbar" class="margin_t-10" height="250px" @scroll="scrollHandle">
      <div ref="refInner" class="flex_w-wrap">
        <UserCard
          class="margin_r-5 margin_b-5"
          v-for="item in list"
          :key="item.id"
          :user="item"
          @click="applyHandle(item)">
        </UserCard>
        <div class="margin_t-10 width-full height-20" v-show="loading">
          <Loading text="数据加载中"></Loading>
        </div>
        <Empty text="暂无数据" absolute v-show="!loading && list.length === 0"></Empty>
      </div>
    </el-scrollbar>
    <ApplyFriendDialog ref="refApplyFriendDialog"></ApplyFriendDialog>
  </div>
</template>

<script setup>
import UserCard from '../user-card/index.vue'

import { getUserListApi } from '@/api/user'

const loading = ref(false)
const keyword = ref('')
const page = reactive({
  current: 1,
  size: 20,
  total: 0
})
const list = ref([])

const getList = async () => {
  loading.value = true

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
    } else if (r.data.list.length) {
      list.value.push(...r.data.list)
    }
    page.total = r.data.total
  }

  nextTick(() => loading.value = false)
}

const searchHandle = () => {
  page.current = 1
  getList()
}

const nextPage = () => {
  page.current += 1
  getList()
}

const refScrollbar = ref()
const refInner = ref()
const scrollHandle = ({ scrollTop }) => {
  const height = refInner.value.clientHeight - refScrollbar.value.wrapRef.clientHeight
  if (scrollTop === height && !loading.value && list.value.length < page.total) {
    loading.value = true
    setTimeout(async () => {
      nextPage()
    }, 2000)
  }
}

const refApplyFriendDialog = ref()
const applyHandle = ({ id }) => {
  refApplyFriendDialog.value.open(id)
}
</script>

<style lang="scss" scoped>
.user-panel {
  .header {
    .keyword-input {
      width: 200px;
    }
  }
}
</style>
