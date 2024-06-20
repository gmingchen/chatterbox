<template>
  <div class="login flex_d-column flex-item_f-1 flex_j_c-center flex_a_i-center">
    <transition name="el-zoom-in-center" mode="out-in">
      <Panel v-if="visible">
        <LoginForm></LoginForm>
        <el-button class="margin_t-18 width-full" @click="changeHandle">未有账号？去注册</el-button>
        <!-- <Other class="margin_t-20"></Other> -->
      </Panel>
      <Panel v-else>
        <RegisterForm></RegisterForm>
        <el-button class="margin_t-18 width-full" @click="changeHandle">已有账号？去登录</el-button>
      </Panel>
    </transition>
  </div>
</template>

<script setup>
import Panel from './components/panel/index.vue'
import LoginForm from './components/login-form/index.vue'
import RegisterForm from './components/register-form/index.vue'
import Other from './components/other/index.vue'

const visible = ref(true)

const changeHandle = () => {
  visible.value = !visible.value
}
</script>

<style lang="scss" scoped>
.login {
}
</style>
