<template>
  <div class="friend flex">
    <el-scrollbar class="width-280 padding-n-10">
      <el-collapse v-model="active">
        <el-collapse-item v-for="group in list" :key="group.id" :title="group.name" :name="group.id">
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
</template>

<script setup>
import FriendCard from './components/friend-crad/index.vue'

defineOptions({
  name: 'Friend'
})
const groupingStore = useGroupingStore()

const active = ref()

const list = computed(() => groupingStore.list)

const clickHandle = (row) => {
  console.log(row);
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
