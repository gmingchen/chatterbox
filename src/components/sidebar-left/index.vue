<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-08-11 20:12:34
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-08-31 20:53:26
-->
<template>
  <div class="bar-left">
    <el-scrollbar>
      <avatar />
      <ul>
        <li class="active-line" :style="{ top: (active - 1) * 70 + 'px' }" />
        <li
          v-for="(icon, index) in icons"
          :key="index"
          @click="clickHandle(index + 1)"
          :class="active === index + 1 ? 'active' : ''">
          <span class="unread" v-if="(index === 0 && unreadCount) || (index === 3 && applyCount) ">
            {{index === 0 ? unreadCount : applyCount}}
          </span>
          <span :class="`iconfont icon-${icon}`" />
        </li>
        <li @click="exitHandle">
          <span class="iconfont icon-exit" />
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, h } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Avatar from '@/components/avatar'
import { ElMessage, ElMessageBox, ElImage } from 'element-plus'

export default defineComponent({
  components: {
    Avatar
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const icons = reactive(['chat', 'friend', 'group', 'bell', 'contact'])
    const urls = reactive([
      { label: '公众号', url: 'http://139.196.182.46:8800/material/official-account-qr-code.jpg' },
      { label: 'QQ交流群', url: 'http://139.196.182.46:8800/material/qq-group-qr-code.jpg' },
      { label: '微信', url: 'http://139.196.182.46:8800/material/wechat-qr-code-1.jpg' },
      { label: 'QQ', url: 'http://139.196.182.46:8800/material/qq-qr-code.jpg' }
    ])

    const active = computed({
      get: () => {
        return store.state.status.active
      },
      set: (val) => {
        store.dispatch('status/setActive', val)
      }
    })

    const user = computed(() => store.state.user.user)

    // 消息未读数量
    const unreadCount = computed(() => store.getters['conversation/unreadCount'])

    // 好友申请 未处理数量
    const applyCount = computed(() => {
      let count = 0
      store.state.friend.applys.forEach(item => {
        if (item.applicant.id === user.value.id) {
          if (item.status === 2) {
            count += 1
          }
        } else {
          if (item.status === 0) {
            count += 1
          }
        }
      })
      return count
    })

    /**
     * 菜单点击事件
     */
    const clickHandle = (val) => {
      switch (val) {
        case 3:
          ElMessage({
            message: '群组/群聊功能正在开发中！',
            type: 'warning'
          })
          break
        case 5:
          ElMessageBox({
            title: `联系方式`,
            message: h(() => {
              const elements = []
              urls.forEach((item, index) => {
                elements.push(
                  <div style="flex: 1; padding: 0 10px">
                    <p>{item.label}</p>
                    <ElImage ref={`image-${ index }`} src={item.url} preview-src-list={[item.url]}></ElImage>
                  </div>
                )
              })
              return (
                <div style="display: flex; text-align:center;">{elements}</div>
              )
            }),
            confirmButtonText: '关闭',
            customStyle: { width: '800px' }
          }).then(() => {
            //
          }).catch(() => {
            //
          })
          break
        default:
          active.value = val
          break
      }
    }

    /**
     * 退出登录
     */
    const exitHandle = async () => {
      await store.dispatch('user/logout')
      router.push({ name: 'login' })
    }

    return {
      icons,
      active,
      unreadCount,
      applyCount,
      clickHandle,
      exitHandle
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
$height: 70px;

.bar-left {
  background-color: $darkColor-1;
  ul {
    position: relative;
    li {
      position: relative;
      z-index: 1;
      height: $height;
      line-height: $height;
      width: 100%;
      color: $darkColor-6;
      cursor: pointer;
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
      span {
        font-size: 30px;
      }
    }
    .active-line {
      position: absolute;
      z-index: 0;
      width: 100%;
      border-left: 4px solid $activeColor;
      transition: .3s;
      background-color: $darkColor-2;
    }
    .active {
      color: $lightColor-0;
    }
  }
}
</style>
