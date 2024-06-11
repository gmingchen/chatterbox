<script>
import { ElMessage, ElNotification } from 'element-plus'

import { WEBSOCKET_TYPE } from '@enums/websocket'
import { APPLY_TYPE } from '@enums/apply'
import { notification } from '@utils'
import { useApplyStore } from '@/stores/modules/apply'

export default defineComponent({
  render() { return '' },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const websocketStore = useWebsocketStore()
    const rootStore = useRootStore()
    const conversationStore = useConversationStore()
    const applyStore = useApplyStore()
    const groupingStore = useGroupingStore()

    const { response } = storeToRefs(websocketStore)

    /**
     * 聊天处理器
     * @param {*} data 
     */
    const chatHandler = (data) => {
      // 判断是否需要设置未读消息
      if (route.name === 'conversation' && conversationStore.active && conversationStore.active.id === data.id) {
        rootStore.addMessage(data)
      } else {
        rootStore.addUnreadMessage(data)
      }

      const { friend, group }  = data
      let content = '', icon = ''
      if (friend) {
        const { nickname, avatar } = friend
        content = `${ nickname }给你发来一条消息`
        icon = avatar
      } else if (group) {
        const { name, avatar } = group
        content = `${ name }有一条新消息`
        icon = avatar
      }
      
      if (route.name !== 'conversation') {
        const title = '有一条新消息'
        const onclick = () => {
          conversationStore.setActive(data)
          router.push({ name: 'conversation' })
        }
        notification(title, content, icon, data, onclick)
      }
    }
    /**
     * 申请处理器-好友申请、
     * @param {*} data 
     */
    const applyHandler = (data) => {
      applyStore.addApply(data)

      const { type, user: { nickname, avatar } } = data
      let content = '', icon = avatar
      if (type === APPLY_TYPE.FRIEND) {
        content = `${ nickname }添加你为好友`
      }

      if (route.name !== 'apply') {
        const title = '有一条新申请'
        const onclick = () => {
          applyStore.setActive(data)
          router.push({ name: 'apply' })
        }
        notification(title, content, icon, data, onclick)
      }
      ElMessage({ message: content, type: 'success' })
    }
    /**
     * 通过好友申请处理器
     * @param {*} data 
     */
    const passFirendApplyHandler = (data) => {
      groupingStore.addFriend(data)
      
      const { nickname, avatar } = data.friends[0]
      const content = `${ nickname }通过了你的好友申请`
      const icon = avatar

      if (route.name !== 'friend') {
        const title = '有一条新通知'
        const onclick = () => {
          rootStore.setActive(data)
          router.push({ name: 'friend' })
        }
        notification(title, content, icon, data, onclick)
      }
      
      ElMessage({ message: content, type: 'success' })
    }

    watch(() => response.value, (newVal) => {
      newVal = JSON.parse(JSON.stringify(newVal))
      const { type, body } = newVal
      if (type === WEBSOCKET_TYPE.PRIVATE_CHAT_MESSAGE) {
        chatHandler(body)
      } else if (type === WEBSOCKET_TYPE.GROUP_CHAT_MESSAGE) {
        chatHandler(body)
      } else if (type === WEBSOCKET_TYPE.FRIEND_APPLY) {
        applyHandler(body)
      } else if (type === WEBSOCKET_TYPE.PASS_FRIEND_APPLY) {
        passFirendApplyHandler(body)
      }
    }, { deep: true })

    onBeforeMount(() => {
      websocketStore.init()
    })
    onUnmounted(() => {
      websocketStore.close()
    })
    return {}
  }
})
</script>
