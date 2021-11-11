<template>
  <div>
    <conversation
      v-for="(item, index) in data"
      :key="index"
      :data="item"
      @click="clickHandle(index, item)"
      @on-close="closeHandle" />
  </div>
</template>

<script>
import { defineComponent, reactive, computed, onMounted, onActivated, watch, ref } from 'vue'
import Conversation from '@/components/conversation'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    Conversation
  },
  props: {
    keywords: {
      type: [Number, String, Boolean],
      required: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    /* 根据关键字过滤聊天会话 */
    const data = computed(() => {
      return store.getters['conversation/conversations'](props.keywords)
    })

    /**
     * 会话点击事件
     */
    const clickHandle = (_index, val) => {
      store.dispatch('conversation/setActive', val.to.id)
    }

    /**
     * 会话删除事件
     */
    const closeHandle = (val) => {
      store.dispatch('conversation/deleteConversation', val.id).then(r => {
        if (r) {
          ElMessage({
            message: '删除会话成功!',
            type: 'success'
          })
        }
      })
    }

    return {
      data,
      clickHandle,
      closeHandle
    }
  }
})
</script>

<style>

</style>
