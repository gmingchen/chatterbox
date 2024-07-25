<template>
  <el-dialog
    class="promote"
    v-model="visible"
    width="500"
    :close-on-click-modal="false"
    append-to-body
    :show-close="false"
    :close-on-press-escape="false">
    <div>
      <div class="flex_a_i-center">
        <div class="flex-item_f-1 text-align-center" v-for="(item, index) in list" :key="index">
          <el-image class="image" :src="item.image" :preview-src-list="[item.image]" fit="contain"></el-image>
          <div>{{ item.label }}</div>
        </div>
      </div>
      <div class="margin-20-n">
        💖 如果你觉得这个项目帮助到了你，可以扫码加群与大佬们一起探讨、关注公众号支持一下作者🦀🦀
        <br><br>
        🚀 如果遇到消息发送、加载过慢等问题皆是服务器带宽问题☹️☹️，终究是被贫穷打败😭😭
      </div>
      <div class="flex_j_c-center flex_a_i-center">
        <el-checkbox v-model="checked" label="不再显示" />
        <el-button class="margin_l-10" type="primary" plain @click="closeHandle">关闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import officialAccountQrCode from '@/assets/images/official-account-qr-code.png'
import { StorageType } from '@enums'
import { get, set } from '@utils/storage.js'

const visible = ref(false)
const checked = ref(false)
const key = ref('promote')

const list = ref([
  { label: '微信群', image: 'https://chatterbox.gumingchen.icu/resource/static/chatterbox-wechat-group.png' },
  { label: '公众号', image: officialAccountQrCode },
])

const init = () => {
  const value = get(key.value, StorageType.LOCAL)
  console.log(!value);
  if (!value) {
    visible.value = true
  }
}

const closeHandle = () => {
  if (checked.value) {
    set(key.value, true, StorageType.LOCAL)
  }
  visible.value = false
}

onBeforeMount(() => {
  init()
})
</script>

<style lang="scss">
.promote {
  .image {
    height: 200px;
    width: 200px;
  }
}
</style>
