<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-18 10:08:51
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-31 20:25:19
-->
<template>
  <el-dialog
    width="500px"
    title="添加好友"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      label-width="80px">
      <el-form-item label="帐号" prop="username">
        <el-input v-model="form.username" placeholder="帐号" />
      </el-form-item>
      <el-form-item label="分组" prop="groupId">
        <el-select v-model="form.groupId" placeholder="请选择分组" class="width-full">
          <el-option
            v-for="item in groups"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="width-full" type="primary" @click="submit()">
          确认
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { addApi } from '@/api/friend'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const store = useStore()

    const groups = computed(() => store.getters['friend/selectGroups'])

    const refForm = ref()
    const data = reactive({
      visible: false,
      form: {
        username: '',
        groupId: ''
      }
    })
    const rules = reactive(function() {
      return {
        username: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
        groupId: [{ required: true, message: '请选择分组', trigger: 'change' }]
      }
    }())

    const init = () => {
      data.visible = true
    }

    const submit = () => {
      refForm.value.validate(valid => {
        if (valid) {
          const params = {
            username: data.form.username,
            group_id: data.form.groupId
          }
          addApi(params).then(r => {
            if (r) {
              ElMessage({
                message: '已申请添加对方为好友！',
                type: 'success'
              })
              data.visible = false
              store.dispatch('friend/getApplys')
            }
          })
        }
      })
    }

    /**
     * @description: 弹窗关闭动画结束时的回调
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const dialogClosedHandle = () => {
      refForm.value.resetFields()
    }

    return {
      refForm,
      groups,
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';

</style>
