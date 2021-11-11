<template>
  <div class="details">
    <div class="friend-details-box padding_t-20">
      <el-avatar :size="160" :src="user.avatar" />
      <p class="nickname">{{user.nickname}}</p>
      <el-divider content-position="right" />
      <p class="remove" @click="removeHandle">删除好友</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { deleteApi } from '@/api/friend'
import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    /**
     * 删除好友
     */
    const removeHandle = () => {
      ElMessageBox.confirm(`此操作将永久删除该好友，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const friend = {
          ...props.user,
          user_id: props.user.id
        }
        store.dispatch('friend/deleteFriend', friend).then(r => {
          if (r) {
            ElMessage({
              message: '已删除好友！',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        //
      })
    }

    return {
      removeHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
.details {
  background-color: $lightColor-0;
  .friend-details-box {
    .nickname {
      font-size: 20px;
      color: $darkColor-8;
      font-weight: bold;
    }
    .remove {
      font-size: 14px;
      color: $warmColor;
      cursor: pointer;
    }
  }
}
</style>
