<template>
  <div class="panel text-align-center">
    <el-avatar :src="image" :size="80">
      {{ title }}
    </el-avatar>
    <div class="font-size-16 margin_t-20 flex_j_c-center flex_a_i-center" v-if="title">
      <span>{{ title }}</span>
    </div>
    <div class="margin_t-10 flex flex_j_c-space-between flex_w-wrap" v-if="list.length">
      <div class="cell flex flex_a_i-center flex_s-0 padding-10" v-for="item in list" :key="item.label">
        <div class="label">{{ item.label }}：</div>
        <div class="value flex_j_c-center flex_a_i-center">
          <span>{{ item.value}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    default: () => ''
  },
  title: {
    type: String,
    default: () => ''
  },
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped>
.panel {
  .cell, .label, .value {
    flex-shrink: 0;
  }
}
</style>
