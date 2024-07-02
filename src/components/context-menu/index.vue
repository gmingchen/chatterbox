<template>
  <div ref="refContainer">
    <slot></slot>
    <Teleport to="body">
      <div
        ref="refContextMenu"
        v-if="visible && menus.length"
        class="context-menu min-width-100 padding-5 cursor-pointer"
        :style="{ top: y + 'px', left: x + 'px', }">
        <div
          class="menu-item padding-5"
          v-for="item in menus"
          :key="item.label"
          @click="selectHandle(item)">
          {{ item.label }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
const emits = defineEmits(['select'])
const props = defineProps({
  menus: {
    type: Array,
    default: () => []
  }
})

const refContainer = ref()
const refContextMenu = ref()

const x = ref(0)
const y = ref(0)
const visible = ref(false)

const preventDefault = (e) => {
  e.preventDefault();
  e.stopPropagation();
}

const open = (e) => {
  preventDefault(e)
  x.value = e.clientX
  y.value = e.clientY
  visible.value = true
  
  nextTick(() => {
    if (refContextMenu.value) {
      refContextMenu.value.addEventListener('contextmenu', preventDefault)
    }
  })
}
const close = () => {
  if (refContextMenu.value) {
    refContextMenu.value.removeEventListener('contextmenu', preventDefault)
  }
  visible.value = false
}

const selectHandle = (row) => {
  emits('select', row)
  close()
}

onMounted(() => {
  refContainer.value.addEventListener('contextmenu', open)
  window.addEventListener('click', close, true)
  window.addEventListener('contextmenu', close, true)
  window.addEventListener('mousewheel', close);
})
onBeforeUnmount(() => {
  refContainer.value.removeEventListener('contextmenu', open)
  
  window.removeEventListener('click', close)
  window.removeEventListener('contextmenu', close)
  window.removeEventListener('mousewheel', close);
})
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  background-color: var(--wrap-background-color);
  box-shadow: var(--el-box-shadow-light);
  border-radius: var(--el-border-radius-base);
  .menu-item {
    font-size: 12px;
    &:hover {
      background-color: var(--card-hover-background-color);
      border-radius: var(--el-border-radius-base);
    }
  }
  .menu-item + .menu-item {
    margin-top: 5px;
  }
}
</style>
