<template>
  <el-scrollbar class="message-group-box" ref="refScrollbar" @scroll="scrollHandle">
    <div ref="refInner">
      <el-icon v-show="loading"><loading /></el-icon>
      <span class="tips" v-show="!loading && list.length >= page.total">暂无更多</span>
      <message
        v-show="!loading"
        v-for="(item, index) in list"
        :key="index"
        :data="item"
        class="margin-20-n" />
    </div>
  </el-scrollbar>
</template>
<script>
import { defineComponent, onMounted, computed, watch, ref, reactive, nextTick } from 'vue'
import { useStore } from 'vuex'
import Message from '@/components/message'

export default defineComponent({
  components: {
    Message
  },
  setup() {
    const store = useStore()
    const refScrollbar = ref()
    const refInner = ref()

    const friend = computed(() => store.state.conversation.active)

    const list = computed(() => {
      return store.state.message.privateMessages || []
    })
    const scrollBottom = computed(() => {
      return store.state.message.scrollBottom
    })

    const loading = ref(false)
    const page = reactive({
      current: 1,
      size: 10,
      total: 0,
      pages: 1
    })

    /**
     * 获取消息
     */
    const getMessage = async (clear) => {
      loading.value = true
      if (clear) {
        page.current = 1
        page.total = 0
        page.pages = 1
      }
      const params = {
        current: page.current,
        size: page.size,
        friend_id: friend.value.id,
        times: store.state.message.privateMessages.length && !clear ? store.state.message.privateMessages[store.state.message.privateMessages.length - 1].created_at : ''
      }
      const r = await store.dispatch('message/getPrivateMessages', { params, clear })
      loading.value = false
      if (r) {
        // 到滚动条底部
        if (clear) {
          store.dispatch('message/updateScrollBottom')
        }
        page.total = r.data.total
        page.pages = r.data.pages
      }

      return r
    }

    /**
     * 滚动条事件 滚动到顶部
     */
    const scrollHandle = ({ scrollTop }) => {
      const height = refInner.value.clientHeight
      if (!loading.value && scrollTop === 0 && list.value.length < page.total) {
        page.current++
        getMessage(false).then(r => {
          if (r) {
            nextTick(() => {
              refScrollbar.value.setScrollTop(refInner.value.clientHeight - height)
            })
          }
        })
      }
    }

    watch(() => friend.value, (newVal, _oldVal) => {
      if (newVal) {
        getMessage(true)
      }
    }, { deep: true })

    watch(() => scrollBottom.value, (_newVal, _oldVal) => {
      nextTick(() => {
        refScrollbar.value.setScrollTop(refInner.value.clientHeight)
      })
    })

    onMounted(() => {
      getMessage(true)
    })

    return {
      refScrollbar,
      refInner,
      list,
      loading,
      page,
      scrollHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
.message-group-box {
  padding: 0 20px;
}
.tips {
  font-size: 12px;
  color: $darkColor-6;
}
</style>
