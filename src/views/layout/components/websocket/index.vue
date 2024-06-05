<script>
import { ElMessage, ElNotification } from 'element-plus'

import { WEBSOCKET_TYPE } from '@enums/websocket'
import { notification } from '@utils'

export default defineComponent({
  render() { return '' },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const websocketStore = useWebsocketStore()
    const rootStore = useRootStore()
    const conversationStore = useConversationStore()

    const { response } = storeToRefs(websocketStore)

    /**
     * 聊天处理器
     * @param {*} data 
     */
    const chatHandler = (data) => {
      rootStore.addMessage(data)

      let content = '', icon = ''

      const { friend, group }  = data
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

    watch(() => response.value, (newVal) => {
      newVal = JSON.parse(JSON.stringify(newVal))
      const { type, body } = newVal
      if (type === WEBSOCKET_TYPE.PRIVATE_CHAT_MESSAGE) {
        chatHandler(body)
      } else if (type === WEBSOCKET_TYPE.GROUP_CHAT_MESSAGE) {
        chatHandler(body)
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
