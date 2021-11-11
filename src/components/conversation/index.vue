<template>
  <div class="conversation">
    <span class="unread" v-if="data.unread_count">
      {{data.unread_count}}
    </span>
    <span class="close-btn iconfont icon-fork" @click.stop="closeHandle" />
    <div class="wrap">
      <el-avatar class="portrait margin_r-10" :size="40" :src="data.to.avatar" />
      <div class="content">
        <p class="nickname ellipse-1">
          {{data.to.nickname}}
        </p>
        <div class="message-box" v-if="data.message">
          <span class="message ellipse-1">
            <span v-if="data.message.type === 1">{{data.message.content}}</span>
            <span v-if="data.message.type === 2">[图片]</span>
          </span>
          <span class="time">{{data.message.createdAt}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['onClose'],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const closeHandle = () => {
      emit('onClose', props.data)
    }
    return {
      closeHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';

$height: 70px;
$distance: 5px;

.conversation {
  position: relative;
  height: $height;
  padding: 15px 20px;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  .unread {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 0px 6px;
    font-size: 12px;
    line-height: 18px;
    color: white;
    border-radius: 10px;
    background-color: red;
  }
  .close-btn {
    position: absolute;
    top: $distance;
    right: -20px;
    font-size: 12px;
    color: $darkColor-6;
    transition: .2s;
    &:hover {
      color: $warmColor;
    }
  }
  .wrap {
    display: flex;
    .content {
      flex: 1;
      .nickname {
        margin: 0;
        color: $lightColor-1;
        line-height: 21px;
      }
      .message-box {
        padding-top: 3px;
        font-size: 12px;
        color: $darkColor-6;
        display: flex;
        .message {
          flex: 1;
        }
        .time {
          padding-left: 10px;
        }
      }
    }
  }
  &:hover {
    background-color: $darkColor-3;
    .close-btn {
      right: $distance;
    }
  }
}
</style>
