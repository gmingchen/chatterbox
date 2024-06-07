<template>
  <div class="apply-panel padding-15 flex_d-column flex_a_i-center">
    <template v-if="active">
      <Panel></Panel>
    </template>
    <Empty v-else></Empty>
    {{ active }}
  </div>
</template>

<script setup>
const applyStore = useApplyStore()
const active = computed({
  get: () => applyStore.active || {},
  set: (value) => applyStore.setActive(value)
})
</script>

<style lang="scss" scoped>
.apply-panel {
  background-color: var(--card-background-color);
  border-radius: var(--box-border-radius);
}
</style>
