<template>
  <div class="container">
    <sidebar class="sidebar" />
    <Content class="content" />
  </div>
</template>

<script>
import { defineComponent, watch, computed, h } from 'vue'
import Sidebar from '@/components/sidebar'
import Content from '@/components/content'
import { useStore } from 'vuex'
import { ElNotification, ElAvatar, ElMessage } from 'element-plus'
import { Howl } from 'howler'

export default defineComponent({
  components: {
    Sidebar,
    Content
  },
  setup() {
    const store = useStore()

    const friend = computed(() => store.state.conversation.active)

    const response = computed(() => {
      return store.state.websocket.response
    })

    const urls = [
      require('@/assets/mp3/dingdong.mp3'),
      require('@/assets/mp3/keke.mp3'),
      require('@/assets/mp3/pig.mp3'),
      require('@/assets/mp3/xiuxiu.mp3')
    ]

    watch(() => response, async (newVal, _oldVal) => {
      if (newVal.value) {
        let title = ''
        let tips = ''
        let sound
        switch (newVal.value.type) {
          case 0: // 心跳
            break
          case 1: // 聊天消息
            if (friend.value && friend.value.id === newVal.value.responseBody.message.from) {
              // 添加消息
              store.dispatch('message/pushPrivateMessage', newVal.value.responseBody.message)
              store.dispatch('message/updateScrollBottom')
              // 设置消息已读
              await store.dispatch('message/updatePrivateMessageStatus', [newVal.value.responseBody.message.id])
            }
            store.dispatch('conversation/updateConversationPrivateMessage', newVal.value.responseBody.message)
            sound = new Howl({
              src: [urls[0]]
            })
            break
          case 2: // ack 确认消息
            if (friend.value.id === newVal.value.responseBody.message.to) {
              store.dispatch('message/updatePrivateMessage', newVal.value.responseBody.message)
            }
            // 更新聊天会话最近消息
            store.dispatch('conversation/updateConversationPrivateMessage', newVal.value.responseBody.message)
            break
          case 3: // 异常消息
            ElMessage({
              message: newVal.value.message,
              type: 'warning'
            })
            break
          case 4: // 好友申请
            title = '好友申请'
            tips = '申请添加您为好友！'
            sound = new Howl({
              src: [urls[1]]
            })
            break
          case 5: // 好友同意
            title = '好友同意'
            tips = '同意添加您为好友！'
            store.dispatch('friend/getGroups')
            sound = new Howl({
              src: [urls[2]]
            })
            break
          case 6: // 好友拒绝
            title = '好友拒绝'
            tips = '拒绝添加您为好友！'
            sound = new Howl({
              src: [urls[2]]
            })
            break
          case 7: // 好友删除
            store.dispatch('friend/getGroups')
            break
        }
        if ([4, 5, 6].includes(newVal.value.type)) {
          store.dispatch('friend/getApplys')
          const avatar = newVal.value.responseBody.user.avatar || ''
          const nickname = newVal.value.responseBody.user.nickname || ''
          const username = newVal.value.responseBody.user.username || ''
          ElNotification({
            title: title,
            dangerouslyUseHTMLString: true,
            message: h(() => {
              return (
                <div class="width-full">
                  <div style="display: flex">
                    <ElAvatar size={54} src={avatar} />
                    <div class="margin_l-10" style="flex: 1;">
                      <p>{nickname}</p>
                      <p>{username}</p>
                    </div>
                  </div>
                  <p>{tips}</p>
                </div>
              )
            }),
            showClose: false,
            duration: 4000
          })
        }
        if (sound) {
          sound.play()
        }
      }
    }, { deep: true })

    return {}
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
.container {
  display: flex;
  margin: 0 auto;
  padding: 50px 0px;
  height: 100%;
  width: 80%;
  min-width: 850px;
  background-color: $backgroundColor;
  .sidebar {
    width: calc(100% / 3);
    min-width: 350px;
  }
  .content {
    flex: 1;
  }
}
</style>
