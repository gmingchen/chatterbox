<template>
  <el-dialog
    width="500px"
    title="个人信息"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-tabs tab-position="left" class="tabs">
      <el-tab-pane label="基础信息">
        <el-form
          :model="form"
          :rules="rules"
          ref="refBasicForm"
          label-width="80px">
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              :action="uploadApi()"
              :show-file-list="false"
              :on-success="uploadSuccessHandle"
              :headers="{
                [TOKEN_KEY]: token
              }">
              <img v-if="form.avatar" :src="form.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="form.nickname"
              placeholder="昵称"
              maxlength="20"
              show-word-limit />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
              <el-radio :label="2">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button class="width-full" type="primary" @click="basicSubmit()">
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form
          :model="form"
          :rules="rules"
          ref="refPasswordForm"
          label-width="80px">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="form.oldPassword" placeholder="旧密码" show-password />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" placeholder="新密码" show-password />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" placeholder="确认密码" show-password />
          </el-form-item>
          <el-form-item>
            <el-button class="width-full" type="primary" @click="passwordSubmit()">
              确认
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { uploadApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import { SUCCESS_CODE, TOKEN_KEY } from '@/utils/constants'

export default defineComponent({
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user.user)
    const token = computed(() => store.state.user.token.token)

    const refBasicForm = ref()
    const refPasswordForm = ref()
    const data = reactive({
      visible: true,
      form: {
        avatar: user.value.avatar,
        nickname: user.value.nickname,
        sex: user.value.sex,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    })
    const rules = reactive(function() {
      const checkConfirmPassword = (_rule, value, callback) => {
        if (data.form.newPassword !== value) {
          callback(new Error('新密码与确认密码不一致'))
        } else {
          callback()
        }
      }
      return {
        avatar: [{ required: true, message: '请上传头像', trigger: 'change' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: checkConfirmPassword, trigger: 'blur' }
        ]
      }
    }())

    const init = () => {
      data.visible = true
    }

    /**
     * 头像上传成功事件
     */
    const uploadSuccessHandle = (res, file) => {
      if (SUCCESS_CODE.includes(res.code)) {
        data.form.avatar = res.data.url
      } else {
        ElMessage({
          message: res.message,
          type: 'warning'
        })
      }
    }

    /**
     * 基础信息修改提交
     */
    const basicSubmit = () => {
      refBasicForm.value.validate(valid => {
        if (valid) {
          const params = {
            avatar: data.form.avatar,
            nickname: data.form.nickname,
            sex: data.form.sex
          }
          store.dispatch('user/editUserBasic', params).then(r => {
            if (r) {
              ElMessage({
                message: '修改成功!',
                type: 'success'
              })
              data.visible = false
            }
          })
        }
      })
    }

    /**
     * 密码修改提交
     */
    const passwordSubmit = () => {
      refPasswordForm.value.validate(valid => {
        if (valid) {
          const params = {
            old_password: data.form.oldPassword,
            new_password: data.form.newPassword,
            confirm_password: data.form.confirmPassword
          }
          store.dispatch('user/editUserPassword', params).then(r => {
            if (r) {
              ElMessage({
                message: '修改成功!',
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
      refPasswordForm.value.resetFields()
    }

    return {
      refBasicForm,
      refPasswordForm,
      ...toRefs(data),
      rules,
      init,
      uploadSuccessHandle,
      basicSubmit,
      passwordSubmit,
      dialogClosedHandle,
      uploadApi,
      token,
      TOKEN_KEY
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';

$avatarHeight: 70px;

.tabs {
  text-align: left;
  height: 280px;
}

::v-deep(.avatar-uploader) {
  .el-upload {
    border: 1px dashed $darkColor-7;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover {
      border-color: $activeColor;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: $avatarHeight;
    height: $avatarHeight;
    line-height: $avatarHeight;
    text-align: center;
  }
  .avatar {
    width: $avatarHeight;
    height: $avatarHeight;
    display: block;
  }
}
</style>
