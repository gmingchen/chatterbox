<template>
  <div class="login flex_d-column flex-item_f-1 flex_j_c-center flex_a_i-center" @click="click">
    <div>Chatterbox</div>
    <transition name="el-zoom-in-center" mode="out-in">
      <div class="form-wrap" v-if="show">
        <LoginForm></LoginForm>
      </div>
      <div class="form-wrap" v-else>
        <RegisterForm></RegisterForm>
      </div>
    </transition>
  </div>
</template>

<script setup>
import LoginForm from './components/login-form/index.vue'
import RegisterForm from './components/register-form/index.vue'

const show = ref(true)

const click = () => {
  show.value = !show.value
  console.log(123);
}
</script>

<style lang="scss" scoped>
.login {
  .form-wrap {
    box-shadow: var(--el-box-shadow);
  }
}
</style>
