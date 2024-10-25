<template>
  <div class="publicize flex_d-column flex_j_c-flex-end flex_a_i-center">
    <div class="box width-34 height-34 padding-4 cursor-pointer" v-for="(item, index) in list" :key="index" @click="clickHandle(item)">
      <el-popover
        v-if="item.image"
        ref="popover"
        placement="right"
        :title="item.label"
        trigger="click">
        <template #reference>
          <el-image :src="item.logo"></el-image>
        </template>
        <el-image :src="item.image" :preview-src-list="[item.image]"></el-image>
      </el-popover>
      <el-image v-else :src="item.logo"></el-image>
    </div>
  </div>
</template>

<script setup>
import group from '@/assets/images/group.png'
import wechat from '@/assets/images/wechat.png'
import wechatQrCode from '@/assets/images/wechat-qr-code.png'
import officialAccount from '@/assets/images/official-account.png'
import officialAccountQrCode from '@/assets/images/official-account-qr-code.png'
import github from '@/assets/images/github.png'
import gitee from '@/assets/images/gitee.png'

const list = [
  { label: '微信群', logo: group, image: 'https://chatterbox.gumingchen.icu/resource/static/chatterbox-wechat-group.jpg' },
  { label: '微信', logo: wechat, image: wechatQrCode },
  { label: '公众号', logo: officialAccount, image: officialAccountQrCode },
  { label: 'Github源码', logo: github, url: 'https://github.com/gmingchen/chatterbox' },
  { label: 'Gitee源码', logo: gitee, url: 'https://gitee.com/shychen/chatterbox' },
]

const clickHandle = (row) => {
  if (row.url) {
    window.open(row.url)
  }
}
</script>

<style lang="scss" scoped>
.publicize {
  .box {
    background-color: white;
    border-radius: var(--box-border-radius);
  }  
  .box + .box {
    margin-top: 10px;
  }
}
</style>
