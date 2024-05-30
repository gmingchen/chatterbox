<template>
  <div class="friend flex">
    <div class="flex flex_d-column">
      <Headbar class="padding-n-10"></Headbar>
      <el-scrollbar class="width-280 padding-n-10">
        <el-collapse v-model="collapseActive">
          <el-collapse-item v-for="group in list" :key="group.id" :title="group.name" :name="group.fixed ? 'default' : group.id">
            <FriendCard
              class="card"
              v-for="friend in group.friends"
              :key="friend.id"
              :friend="friend"
              @click="clickHandle(friend)">
            </FriendCard>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </div>
    <FriendPanel class="flex-item_f-1"></FriendPanel>
  </div>
</template>

<script setup>
import Headbar from './components/headbar/index.vue'
import FriendCard from './components/friend-crad/index.vue'
import FriendPanel from './components/friend-panel/index.vue'

defineOptions({
  name: 'Friend'
})

const groupingStore = useGroupingStore()

const list = computed(() => groupingStore.filterList)

const collapseActive = ref('default')

const active = computed({
  get: () => groupingStore.active,
  set: value => groupingStore.active = value
})


const clickHandle = (row) => {
  active.value = row
}

onBeforeMount(() => {
  groupingStore.getList()
})
</script>

<style lang="scss" scoped>
.friend {
  .card:hover {
    background-color: var(--card-hover-background-color);
  }
  .card + .card {
    margin-top: 4px;
  }
  ::v-deep(.el-collapse) {
    border: none;
    .el-collapse-item__header {
      height: 30px;
      border: none;
    }
    .el-collapse-item__wrap {
      border: none;
      .el-collapse-item__content {
        line-height: unset;
        padding: 0;
      }
    }
    
  }
}
</style>
