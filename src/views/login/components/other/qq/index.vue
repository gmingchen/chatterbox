<template>
  <el-image class="width-26 cursor-pointer" :src="QQ" @click="clickHandle">
  </el-image>
</template>

<script setup>
import QQ from '@/assets/images/qq.png'

let QC = window.QC
// const qqInit = () => {
//   const script = document.createElement('script')
//   script.src = 'http://connect.qq.com/qc_jssdk.js'
//   script['data-callback'] = true
//   script.onload = () => { 
//     QC = window.QC; 
//   }
//   document.head.appendChild(script);
// }

const clickHandle = () => {
  QC.Login.showPopup();
}

/**
 * QQ登录成功回调
 */
const callback = () => {
  QC.Login.getMe((openId, accessToken) => {
    console.log(123);
  })
}

</script>

<style lang="scss" scoped>
</style>
