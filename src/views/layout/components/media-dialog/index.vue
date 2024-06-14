<template>
  <el-dialog
    class="user-dialog"
    v-model="visible"
    width="300"
    :close-on-click-modal="false"
    draggable
    append-to-body
    :show-close="false"
    :close-on-press-escape="false">
    <div class="height-400 flex_d-column flex_j_c-space-between">
      <UserBox :avatar="active.avatar" :name="active.name"></UserBox>
      <Status :active="active"></Status>
      <Operation :active="active"></Operation>
    </div>
  </el-dialog>
</template>

<script setup>
import UserBox from './components/user-box/index.vue'
import Status from './components/status/index.vue'
import Operation from './components/operation/index.vue'

const mediaStore = useMediaStore()

const visible = computed({
  get: () => mediaStore.visible,
  set: (value) => mediaStore.visible = value
})
const active = computed(() => mediaStore.active || {})

defineExpose({
})
</script>

<style lang="scss">
.user-dialog {
}
</style>
