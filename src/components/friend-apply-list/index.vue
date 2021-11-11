<template>
  <div>
    <apply-friend
      v-for="(item, index) in data"
      :key="index"
      :data="item"
      @accept="acceptHandle(item)"
      @refuse="refuseHandle(item)"
      @again="againHandle(item)" />
    <dialog-accept-friend ref="refAcceptFriend" v-if="visible" />
  </div>
</template>

<script>
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import ApplyFriend from '@/components/apply-friend'
import DialogAcceptFriend from '@/components/dialog-accept-friend'
import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  components: {
    ApplyFriend,
    DialogAcceptFriend
  },
  setup() {
    const store = useStore()

    const refAcceptFriend = ref()
    const visible = ref(true)

    const data = computed(() => store.state.friend.applys)

    /**
     * 同意好有请求弹窗
     */
    const acceptHandle = (val) => {
      visible.value = true
      nextTick(() => {
        refAcceptFriend.value.init(val)
      })
    }

    /**
     * 拒绝好友请求确认框
     */
    const refuseHandle = (val) => {
      ElMessageBox.confirm('是否拒绝对方的好友请求？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: val.id,
          status: 2
        }
        store.dispatch('friend/refuseApply', params).then(r => {
          if (r) {
            ElMessage({
              message: '已拒绝对方的好友请求！',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        //
      })
    }

    /**
     * 重新发起好友请求
     */
    const againHandle = (val) => {
      const params = {
        id: val.id,
        status: 0
      }
      store.dispatch('friend/againApply', params).then(r => {
        if (r) {
          ElMessage({
            message: '已重新申请添加对方为好友！',
            type: 'success'
          })
        }
      })
    }

    return {
      refAcceptFriend,
      visible,
      data,
      acceptHandle,
      refuseHandle,
      againHandle
    }
  }
})
</script>

<style>

</style>
