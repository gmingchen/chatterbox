<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-18 10:08:51
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-31 10:58:46
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
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const store = useStore()

    const groups = computed(() => store.getters['friend/selectGroups'])

    const refForm = ref()
    const data = reactive({
      visible: false,
      form: {
        id: '',
        groupId: ''
      },
      user: {}
    })
    const rules = reactive(function() {
      return {
        groupId: [{ required: true, message: '请选择分组', trigger: 'change' }]
      }
    }())

    const init = (val) => {
      data.form.id = val.id
      data.user = val.applicant
      data.visible = true
    }

    const submit = () => {
      refForm.value.validate(valid => {
        if (valid) {
          const params = {
            id: data.form.id,
            group_id: data.form.groupId
          }
          store.dispatch('friend/acceptApply', { params, user: data.user }).then(r => {
            if (r) {
              ElMessage({
                message: '已接受对方的好友请求!',
                type: 'success'
              })
              data.visible = false
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
