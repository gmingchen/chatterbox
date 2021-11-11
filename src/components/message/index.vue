<template>
  <div class="message-container">
    <div :class="`message-wrap ${data.from === currentUser.id ? 'message-wrap_sender' : 'message-wrap_recipient'}`">
      <el-avatar class="avatar width-50" :size="50" :src="data.from === currentUser.id ? currentUser.avatar : friend.avatar" />
      <div class="message-box">
        <div class="details">
          <span class="nickname">{{data.from === currentUser.id ? currentUser.nickname : friend.nickname}}</span>
          <span class="time">{{data.createdAt}}</span>
        </div>
        <div class="content margin_t-10">
          <span v-if="data.type === 1">{{data.content}}</span>
          <el-image
            v-if="data.type === 2"
            style="width: 100px; height: 100px"
            :src="data.url"
            :preview-src-list="[data.url]" />
          <div class="loading-icon-box" v-show="data.loading">
            <el-icon class="loading-icon"><loading /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    data: {
      type: Object
    }
  },
  setup() {
    const store = useStore()
    const currentUser = computed(() => store.state.user.user)
    const friend = computed(() => store.state.conversation.active)
    return {
      currentUser,
      friend
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';

.message-container {
  .message-wrap {
    display: flex;
    &_recipient {
      flex-direction: row;
      .message-box {
        margin-left: 10px;
        .details {
          flex-direction: row;
          .nickname {
            margin-right: 10px;
          }
        }
        .content {
          flex-direction: row;
          position: relative;
          span::before {
            content: '';
            position: absolute;
            left: -10px;
            border-right: 5px solid $activeColor;
            border-top: 5px solid transparent;
            border-left: 5px solid transparent;
            border-bottom: 5px solid transparent;
          }
        }
      }
    }
    &_sender {
      flex-direction: row-reverse;
      .message-box {
        margin-right: 10px;
        .details {
          flex-direction: row-reverse;
          .nickname {
            margin-left: 10px;
          }
        }
        .content {
          flex-direction: row-reverse;
          span::before {
            content: '';
            position: absolute;
            right: -10px;
            border-left: 5px solid $activeColor;
            border-top: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid transparent;
          }
          .loading-icon-box {
            position: relative;
            .loading-icon {
              position: absolute;
              top: 50%;
              right: 5px;
              transform: translateY(-50%);
            }
          }
        }
      }

    }
    .message-box {
      flex: 1;
      .details {
        display: flex;
        font-size: 12px;
        .nickname {
          color: $darkColor-9;
        }
        .time {
          color: $darkColor-6;
        }
      }
      .content {
        display: flex;
        span {
          position: relative;
          padding: 10px;
          font-size: 14px;
          color: $lightColor-0;
          text-align: left;
          background-color: $activeColor;
          border-radius: 4px;
          max-width: 50%;
        }
      }
    }
  }
}
</style>
