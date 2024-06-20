<template>
  <div class="brand flex_j_c-center flex_a_i-center">
    <el-image class="width-48 margin_r-10" :src="Logo"></el-image>
    <span v-for="(character, index) in name" :key="index" :class="`character-${ index }`">{{ character }}</span>
  </div>
</template>

<script setup>
import Logo from '@/assets/images/logo.png'

const name = ref('Chatterbox')
</script>

<style lang="scss" scoped>
.brand {
  font-family: 'JoinedUp';
  position: relative;
  span {
    position: relative;
    display: inline-block;
    animation: wavyAnimate 1.5s ease-in-out infinite;
  }
  @for $i from 0 through 10 {
    .character-#{$i} {
      animation-delay: calc(0.1s * $i);
    }
  }
  @keyframes wavyAnimate {
    0%,45%,100%{
      transform: translateY(0);
    }
    90%{
      transform: translateY(-4px);
    }
  }
}
</style>
