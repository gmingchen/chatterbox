<template>
  <div class="sidebar width-80 padding-20-n flex_d-column flex_a_i-center">
    <Avatar @click="openUserDialog"></Avatar>
    <Tabbar class="margin_t-20 flex-item_f-1"></Tabbar>
    <Publicize class="flex-item_f-1"></Publicize>
    <UserDialog ref="refUserDialog" :user="user" edit @edit="openEditDialog"></UserDialog>
    <EditInfoDialog ref="refEditInfoDialog"></EditInfoDialog>
    <EditEmailDialog ref="refEditEmailDialog"></EditEmailDialog>
  </div>
</template>

<script setup>
import Publicize from '../publicize/index.vue'
import Tabbar from '../tabbar/index.vue'
import EditInfoDialog from '../edit-info-dialog/index.vue'
import EditEmailDialog from '../edit-email-dialog/index.vue'

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
    console.log(156);
  }
  console.log(type, EDIT_TYPE.EMAIL);
}
</script>

<style lang="scss" scoped>
.sidebar {

}
</style>
