<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-14 15:05:25
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-26 17:02:11
-->
<template>
  <div class="message">
    <div class="message-header ellipse-1">
      <div class="name">{{user.nickname}}</div>
      <div class="icon-btn-box">
        <span :class="`iconfont icon-${detailVisible ? 'right' : 'left'}`" @click="detailHandle" />
      </div>
    </div>
    <message-list class="message-group" />
    <message-input class="message-input" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MessageList from '@/components/message-list'
import MessageInput from '@/components/message-input'

export default defineComponent({
  components: {
    MessageList,
    MessageInput
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    detailVisible: [Boolean]
  },
  setup(_props, { emit }) {
    const detailHandle = () => {
      emit('on-detail')
    }

    return {
      detailHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';

$height: 50px;

@mixin pseudo {
  content: '';
  position: absolute;
  top: 21px;
  height: 8px;
  width: 8px;
  border-top: 2px solid $darkColor-6;
  border-right: 2px solid $darkColor-6;
  cursor: pointer;
}

.message {
  display: flex;
  flex-flow: column;
  border-right: 1px solid $darkColor-7;
  overflow: hidden;
  &-header {
    position: relative;
    padding: 0 0 0 20px;
    height: $height;
    border-bottom: 1px solid $darkColor-7;
    display: flex;
    line-height: $height;
    .name {
      flex: 1;
      text-align: left;
      color: $darkColor-8;
      font-weight: bold;
    }
    .icon-btn-box {
      width: 30px;
      color: $darkColor-6;
      .iconfont {
        cursor: pointer;
        &:hover {
          color: $activeColor;
        }
      }
    }
  }
  &-group {
    flex: 1;
  }
  &-input {
    border-top: 1px solid $darkColor-7;
    height: 140px;
  }
}

</style>
