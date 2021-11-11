<template>
  <group :data="data" @on-add="addGroup" @on-delete="deleteGroup">
    <template v-slot="{ row }">
      <div>
        <friend
          v-for="(item, index) in row.friends"
          :key="index"
          :data="item"
          @click="clickHandle(item)" />
      </div>
    </template>
  </group>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Group from '@/components/group'
import Friend from '@/components/friend'
import { ElMessage } from 'element-plus'

export default defineComponent({
  emits: ['onClick', 'onRemove'],
  components: {
    Group,
    Friend
  },
  props: {
    keywords: {
      type: [Number, String, Boolean],
      required: false
    }
  },
  setup(props) {
    const store = useStore()

    /* 根据关键字过滤好友、分组 */
    const data = computed(() => {
      return store.getters['friend/groups'](props.keywords)
    })

    /**
     * 添加分组
     */
    const addGroup = async (value) => {
      const r = await store.dispatch('friend/addGroup', value)
      if (r) {
        ElMessage({
          message: '添加分组成功!',
          type: 'success'
        })
      }
    }

    /**
     * 删除分组
     */
    const deleteGroup = async (value) => {
      const r = await store.dispatch('friend/deleteGroup', value)
      if (r) {
        ElMessage({
          message: '删除分组成功!',
          type: 'success'
        })
      }
    }

    /**
     * 好友点击事件
     */
    const clickHandle = (item) => {
      store.dispatch('conversation/setActive', item.user_id)
    }

    return {
      data,
      addGroup,
      deleteGroup,
      clickHandle
    }
  }
})
</script>

<style>

</style>
