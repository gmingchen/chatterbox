<template>
  <el-dialog
    class="search-dialog"
    v-model="visible"
    width="660px"
    :close-on-click-modal="false"
    draggable
    append-to-body>
    <el-tabs v-model="active" type="card">
      <el-tab-pane label="找好友" name="user">
        <UserListPanel></UserListPanel>
      </el-tab-pane>
      <!-- <el-tab-pane label="找群聊" name="group">
        <GroupListPanel></GroupListPanel>
      </el-tab-pane> -->
    </el-tabs>
  </el-dialog>
</template>

<script setup>
import UserListPanel from './components/user-list-panel/index.vue'
import GroupListPanel from './components/group-list-panel/index.vue'

const visible = ref(false)

const active = ref('user')

const list = ref({})

defineExpose({
  open: (value) => {
    visible.value = true
    active.value = value || 'user'
  }
})
</script>

<style lang="scss">
.user-dialog {
}
</style>
