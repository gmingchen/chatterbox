<script>
import { ElMessage, ElNotification } from 'element-plus'

import { useWebsocketStore } from '@/stores/modules/websocket'

import { WEBSOCKET_TYPE } from '@enums/websocket'
import { notificationPermission } from '@utils'

export default defineComponent({
  render() { return '' },
  setup() {
    const websocketStore = useWebsocketStore()
    const rootStore = useRootStore()

    const { response } = storeToRefs(websocketStore)

    watch(() => response.value, (newVal) => {
      const { type, body } = newVal
      if (type === WEBSOCKET_TYPE.PRIVATE_CHAT_MESSAGE) {
        
        rootStore.addMessage(body)
        const title = '有一条新消息'
        const content = `${ body.message.nickname }给你发来一条消息`
        const image = body.message.avatar
        const data = JSON.parse(JSON.stringify(newVal))
        const onclick = ({ target: data }) => {
          console.log('111', data);
        }
        notificationPermission(title, content, image, data, onclick)
      } else if (type === WEBSOCKET_TYPE.GROUP_CHAT_MESSAGE) {
        const title = '有一条新消息'
        const { avatar, name } = body.group
        const content = `${ name }有一条新消息`
        const image = avatar
        const data = JSON.parse(JSON.stringify(newVal))
        const onclick = (event) => {
          console.log('111', event.target.data);
        }
        notificationPermission(title, content, image, data, onclick)
      }
      console.log(newVal);
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
