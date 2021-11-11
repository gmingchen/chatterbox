<template>
  <div class="portrait-container">
    <el-popover
      placement="right"
      :width="200"
      trigger="click">
      <template #reference>
        <el-avatar class="portrait" :size="50" :src="user.avatar" />
      </template>
      <div class="info-popover">
        <span class="edit iconfont icon-set" @click="editHandle" />
        <el-avatar :size="70" :src="user.avatar" />
        <div class="nickname-box ellipse-1">
          <el-tooltip effect="dark" placement="top" :content="user.nickname">
            <span>{{user.nickname}}</span>
          </el-tooltip>
        </div>
      </div>
    </el-popover>
  </div>
  <dialog-edit-information ref="refDialog" v-if="visible" />
</template>

<script>
import { defineComponent, nextTick, ref, computed } from 'vue'
import { useStore } from 'vuex'
import DialogEditInformation from '@/components/dialog-edit-information'

export default defineComponent({
  components: {
    DialogEditInformation
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user.user)

    const refDialog = ref()
    const visible = ref(false)
    const editHandle = () => {
      visible.value = true
      nextTick(() => {
        refDialog.value.init()
      })
    }
    return {
      user,
      refDialog,
      visible,
      editHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
@import '@/assets/sass/_animation.scss';

.portrait-container {
  padding: 15px 0;
  .portrait {
    cursor: pointer;
  }
}
.info-popover {
  text-align: center;
  position: relative;
  .edit {
    position: absolute;
    right: 0;
    font-size: 12px;
    cursor: pointer;
    animation: rotateAgainst360 .3s ease-out 0s;
    &:hover {
      color: $activeColor;
      animation: rotateAlong360 .4s ease-out 0s;
    }
  }
  .nickname-box {
    font-size: 14px;
    color: $darkColor-4;
    max-width: 100px;
    margin: 0 auto;
  }
}
</style>
