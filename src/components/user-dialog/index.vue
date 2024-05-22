<template>
  <el-dialog
    class="user-dialog"
    v-model="visible"
    width="500"
    :close-on-click-modal="false"
    draggable>
    <UserPanel :user="user" v-bind="$attrs"></UserPanel>
  </el-dialog>
</template>

<script setup>

const visible = ref(false)

const user = ref({})

defineExpose({
  open: (data) => {
    visible.value = true
    user.value = data
  }
})
</script>

<style lang="scss">
.user-dialog {
}
</style>
