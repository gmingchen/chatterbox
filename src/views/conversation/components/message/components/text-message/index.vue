<template>
  <pre class="text-message padding-10">{{ text }}</pre>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: () => ''
  }
})
</script>

<style lang="scss" scoped>
.text-message {
  margin: 0;
  white-space: pre-wrap;
  font-family: unset;
  font-size: unset;
  background-color: var(--card-hover-background-color);
  border-radius: var(--el-border-radius-round);
  border-top-left-radius: 2px;
  max-width: 70%;
}
.reverse .text-message {
  border-top-left-radius: var(--el-border-radius-round);
  border-top-right-radius: 2px;
}
</style>
