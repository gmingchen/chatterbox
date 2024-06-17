<template>
  <div 
    class="tab width-50 height-50 cursor-pointer flex_d-column flex_j_c-center flex_a_i-center"
    :class="active ? 'active' : ''"
    @click="clickHandle">
      <el-icon size="26">
        <slot></slot>
      </el-icon>
      <div class="margin_t-4" v-if="label">{{ label }}</div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';

const props = defineProps({
  label: {
    type: String,
    default: () => ''
  },
  value: {
    type: String,
    default: () => ''
  },
  before: {
    type: Function,
    default: () => () => {}
  }
})

const route = useRoute()
const router = useRouter()
const active = computed(() => route.name === props.value)

const clickHandle = async () => {
  if (props.value === 'group') {
    ElMessage({ message: '功能正在开发中哦~~~', type: 'warning',})
    return
  }
  if (props.value) {
    await props.before()
    router.push({ name: props.value })
  }
}
</script>

<style lang="scss" scoped>
.tab {
  text-align: center;
  font-size: 12px;
  border-radius: var(--box-border-radius);
  &:hover {
    background-color: var(--tabbar-hover-color)
  }
  &.active {
    color: var(--el-color-primary);
    background-color: var(--tabbar-background-color);
  }
  & + & {
    margin-top: 10px;
  }
  &:last-child {
    margin-top: 30px;
  }
}
</style>
