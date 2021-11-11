<template>
  <div class="bar-right">
    <div class="header">
      <el-input
        size="mini"
        class="search-input margin_r-10"
        prefix-icon="el-icon-search"
        placeholder="请输入名称或ID搜索"
        v-model="keywords" />
      <span class="icon-btn iconfont icon-plus" @click="addHandle" />
      <span class="iconfont icon-refresh icon-btn margin_l-5" @click="refresh" />
    </div>
    <el-scrollbar class="body">
      <transition name="el-fade-in-linear" mode="out-in">
        <keep-alive>
          <component :is="view" :key="active" :keywords="keywords" />
        </keep-alive>
      </transition>
    </el-scrollbar>
    <dialog-add-friend ref="refAddFriend" v-if="friendVisible" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, nextTick, computed, watch } from 'vue'
import { useStore } from 'vuex'
import ConversationList from '@/components/conversation-list'
import FriendList from '@/components/friend-list'
import ApplyList from '@/components/apply-list'
import DialogAddFriend from '@/components/dialog-add-friend'

export default defineComponent({
  components: {
    ConversationList,
    FriendList,
    ApplyList,
    DialogAddFriend
  },
  setup() {
    const store = useStore()

    const refAddFriend = ref()
    const refAddGroup = ref()

    const data = reactive({
      friendVisible: false,
      keywords: '',
      groupActive: ''
    })

    const active = computed(() => {
      return store.state.status.active
    })

    watch(() => active.value, (_newVal, _oldVal) => {
      data.keywords = ''
    })

    const view = computed(() => {
      let result = ''
      switch (active.value) {
        case 1:
          result = 'conversation-list'
          break
        case 2:
          result = 'friend-list'
          break
        case 3:
          result = 'group'
          break
        case 4:
          result = 'apply-list'
          break
      }
      return result
    })

    /**
     * 添加事件 好友 / 群组
     */
    const addHandle = () => {
      switch (active.value) {
        case 1:
        case 2:
        case 4:
          data.friendVisible = true
          nextTick(() => {
            refAddFriend.value.init()
          })
          break
      }
    }

    /**
     * 刷新
     */
    const refresh = () => {
      switch (active.value) {
        case 1:
          store.dispatch('conversation/getConversations')
          break
        case 2:
          store.dispatch('friend/getGroups')
          break
        case 4:
          store.dispatch('friend/getApplys')
          break
      }
    }

    return {
      refAddFriend,
      refAddGroup,
      active,
      view,
      ...toRefs(data),
      addHandle,
      refresh
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
@import '@/assets/sass/_animation.scss';

$height: 50px;

.bar-right {
  flex: 1;
  .header {
    height: $height;
    padding: 10px 10px 10px 20px;
    display: flex;
    border-bottom: 1px solid $darkColor-1;
    .search-input {
      flex: 1;
    }
    ::v-deep(.search-input input) {
      color: $darkColor-6;
      background-color: $darkColor-1;
      border-radius: 30px;
      border: none;
      &::-webkit-input-placeholder {
        color: $darkColor-6;
        font-size: 12px;
      }
    }
    .icon-btn {
      height: 30px;
      width: 30px;
      line-height: 30px;
      color: $darkColor-6;
      border-radius: 50%;
      background-color: $darkColor-1;
      cursor: pointer;
      animation: rotateAgainst360 .3s ease-out 0s;
      &:hover {
        color: $activeColor;
        animation: rotateAlong360 .4s ease-out 0s;
      }
    }
  }
  .body {
    height: calc(100% - 50px);
    ::v-deep(.el-scrollbar__bar.is-vertical) {
      display: none!important;
    }
  }
}
</style>
