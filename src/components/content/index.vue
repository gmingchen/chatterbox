<template>
  <div class="content">
    <transition name="el-fade-in-linear" mode="out-in">
      <content-message
        :user="user"
        :detailVisible="detailVisible"
        class="content-message"
        v-if="user.conversationId"
        @on-detail="detailHandle" />
    </transition>
    <content-details :user="user" class="content-details width-220" v-if="user.conversationId && detailVisible" />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import ContentMessage from '@/components/content-message'
import ContentDetails from '@/components/content-details'

export default defineComponent({
  components: {
    ContentMessage,
    ContentDetails
  },
  setup() {
    const store = useStore()

    const user = computed(() => {
      return store.state.conversation.active || {}
    })

    const detailVisible = ref(false)

    const detailHandle = () => {
      detailVisible.value = !detailVisible.value
    }

    return {
      user,
      detailVisible,
      detailHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
.content {
  display: flex;
  background-color: $lightColor-2;
  &-message {
    flex: 1
  }
}
</style>
