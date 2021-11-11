<template>
  <el-card
    class="login-card width-450"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.2)">
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      class="padding-n-20">
      <el-form-item>
        <span class="font_s-18">即时通讯</span>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入账户" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item>
        <el-button class="width-full" type="primary" @click="submit()">
          {{ step === 1 ? '登录' : '注册' }}
        </el-button>
      </el-form-item>
      <span class="tip" v-show="step === 1">
        没有账号？立即
        <el-button type="text" @click="stepChangeHandle()" class="font_s-12">
          注册
        </el-button>
      </span>
      <span class="tip" v-show="step === 2">
        使用已有账号
        <el-button type="text" @click="stepChangeHandle()" class="font_s-12">
          登录
        </el-button>
      </span>
    </el-form>
  </el-card>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const refForm = ref()
    const data = reactive({
      loading: false,
      step: 1, // 阶段 1-登录 2-注册
      form: {
        username: '',
        password: ''
      }
    })
    const rules = reactive(function() {
      return {
        username: [
          { required: true, message: '账户不能为空', trigger: 'blur' },
          { pattern: /^[0-9A-Za-z]{6,12}$/, message: '请输入6-12位字母或数字或字母数字的组合' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }())

    const stepChangeHandle = () => {
      data.step = data.step === 1 ? 2 : 1
    }

    /**
     * @description: 登录注册表单提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(async valid => {
        if (valid) {
          data.loading = true
          if (data.step === 1) {
            await store.dispatch('user/login', data.form).then(r => {
              if (r) {
                router.push({ name: 'chat' })
              }
            })
          } else if (data.step === 2) {
            await store.dispatch('user/register', data.form).then(r => {
              if (r) {
                ElMessage({
                  message: '注册成功!',
                  type: 'success'
                })
                stepChangeHandle()
              }
            })
          }
          data.loading = false
        } else {
          return false
        }
      })
    }

    return {
      refForm,
      ...toRefs(data),
      rules,
      stepChangeHandle,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .tip {
    font-size: 12px;
    color: $darkColor-5;
  }
}
</style>
