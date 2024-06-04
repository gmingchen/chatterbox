<script>
import { ElMessage, ElNotification } from 'element-plus'

import { useWebsocketStore } from '@/stores/modules/websocket'

import { WEBSOCKET_TYPE } from '@enums/websocket'

export default defineComponent({
  render() { return '' },
  setup() {
    const websocketStore = useWebsocketStore()
    const rootStore = useRootStore()

    const { response } = storeToRefs(websocketStore)

    watch(() => response.value, (newVal) => {
      const { type, body } = newVal
      switch (type) {
        case WEBSOCKET_TYPE.PRIVATE_CHAT_MESSAGE:
        case WEBSOCKET_TYPE.GROUP_CHAT_MESSAGE:
          rootStore.addMessage(body)
          break;
        default:
          break;
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
