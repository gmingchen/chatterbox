<template>
  <div class="friend-container">
    <el-dropdown trigger="contextmenu" placement="right-start" @command="commandHandle">
      <div class="conversation">
        <div class="icon-btn-group">
          <span class="iconfont icon-fork" @click.stop="removeHandle" />
        </div>
        <div class="wrap">
          <el-avatar class="avatar margin_r-10" :size="40" :src="data.avatar" />
          <div class="content">
            <p class="nickname ellipse-1">
              {{data.nickname}}
            </p>
            <div class="message-box">
              <span class="message ellipse-1">{{data.username}}</span>
            </div>
          </div>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="move">移动好友</el-dropdown-item>
          <el-dropdown-item command="remove">删除好友</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

  </div>
</template>

<script>
import { defineComponent, ref, h, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox, ElSelect, ElOption } from 'element-plus'

export default defineComponent({
  emits: ['onClick'],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore()

    const groupId = ref(props.data.group_id)
    const groups = computed(() => store.getters['friend/selectGroups'])

    /**
     * 移动好友
     */
    const moveHandle = () => {
      ElMessageBox({
        title: `移动好友到`,
        message: h(() => {
          const options = []
          groups.value.forEach(item => {
            options.push(
              <ElOption label={item.name} value={item.id}></ElOption>,
            )
          })
          return (
            <ElSelect class="width-full" v-model={groupId.value}>
              {options}
            </ElSelect>
          )
        }),
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        store.dispatch('friend/moveFriend', { friend: props.data, groupId: groupId.value }).then(r => {
          if (r) {
            ElMessage({
              message: '移动好友成功！',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        //
      })
    }

    /**
     * 删除好友
     */
    const removeHandle = () => {
      ElMessageBox.confirm(`此操作将永久删除该好友，是否继续？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('friend/deleteFriend', props.data).then(r => {
          if (r) {
            ElMessage({
              message: '删除好友成功！',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        //
      })
    }

    /**
     * 下拉指令
     */
    const commandHandle = (val) => {
      switch (val) {
        case 'move':
          moveHandle()
          break
        case 'remove':
          removeHandle()
          break
        default:
          break
      }
    }

    return {
      moveHandle,
      removeHandle,
      commandHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
@import '@/assets/sass/_animation.scss';

$height: 70px;
$distance: 5px;

::v-deep(.el-dropdown) {
  width: 100%!important;
}
.friend-container {
  height: $height;
}
.conversation {
  position: relative;
  height: $height;
  padding: 15px 20px;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  .icon-btn-group {
    position: absolute;
    top: $distance;
    right: -30px;
    color: $darkColor-6;
    transition: .2s;
    .iconfont {
      font-size: 12px;
    }
    .icon-fork:hover {
      color: $warmColor;
    }
    .icon-set:hover {
      color: $activeColor;
    }
  }
  .wrap {
    display: flex;
    .content {
      flex: 1;
      .nickname {
        margin: 0;
        color: $lightColor-1;
        line-height: 21px;
      }
      .message-box {
        padding-top: 3px;
        font-size: 12px;
        color: $darkColor-6;
        display: flex;
        .message {
          flex: 1;
        }
      }
    }
  }
  &:hover {
    background-color: $darkColor-3;
    .icon-btn-group {
      right: $distance;
    }
  }
}
.el-dropdown-menu__item:hover:not(:last-child) {
  color: $activeColor;
}
.el-dropdown-menu__item:hover:last-child{
  color: $warmColor;
}
</style>

