<template>
  <div class="sidebar width-80 flex_d-column flex_a_i-center">
    <Avatar class="avatar" @click="openUserDialog"></Avatar>
    <el-scrollbar class="width-full flex_d-column flex_a_i-center" view-class="min-height-full flex_d-column">
      <Tabbar class="margin_t-20 flex-item_f-1"></Tabbar>
      <Publicize class="margin_t-20"></Publicize>
    </el-scrollbar>
    <UserDialog ref="refUserDialog" :user="user" edit @edit="openEditDialog"></UserDialog>
    <EditInfoDialog ref="refEditInfoDialog"></EditInfoDialog>
    <EditEmailDialog ref="refEditEmailDialog"></EditEmailDialog>
  </div>
</template>

<script setup>
import Publicize from './components/publicize/index.vue'
import Tabbar from './components/tabbar/index.vue'
import EditInfoDialog from './components/edit-info-dialog/index.vue'
import EditEmailDialog from './components/edit-email-dialog/index.vue'

import { EDIT_TYPE } from '@enums/user'

const userStore = useUserStore()

const user = computed(() => {
  const { id, nickname, avatar, sex, email, lastAt, createdAt } = userStore
  return { id, nickname, avatar, sex, email, lastAt, createdAt }
})

const refUserDialog = ref()

const openUserDialog = () => {
  refUserDialog.value.open(user.value)
}

const refEditInfoDialog = ref()
const refEditEmailDialog = ref()

const openEditDialog = (type) => {
  if (type === EDIT_TYPE.INFO) {
    refEditInfoDialog.value.open()
  } else if (type === EDIT_TYPE.EMAIL) {
    refEditEmailDialog.value.open()
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  .avatar {
    flex-shrink: 0;
  }
}
</style>
