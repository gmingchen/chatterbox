<p align="center">
  <a href="https://chatterbox.gumingchen.icu">
    <img src="https://chatterbox.gumingchen.icu/resource/static/logo-black.png" alt="chatterbox" width="200px">
  </a>
</p>

<h1>
  <p align="center" style="font-size:40px;font-weight: bold">
    Chatterbox（话匣子）
  </p>
</h1>

<p align="center">
  <a href="https://github.com/vuejs/vue-next">
    <img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-2.x-brightgreen.svg" alt="element-plus">
  </a>
</p>

<p align="center">
  <a href="https://github.com/gmingchen/chatterbox">
    <img src="https://img.shields.io/github/stars/gmingchen/chatterbox.svg?logo=github&color=brightgreen">
  </a>
  <a href="https://github.com/gmingchen/chatterbox">
    <img src="https://img.shields.io/github/forks/gmingchen/chatterbox.svg?logo=github&color=brightgreen">
  </a>
  <a href="https://gitee.com/shychen/chatterbox">
    <img src="https://gitee.com/shychen/chatterbox/badge/star.svg?theme=dark">
  </a>
  <a href="https://gitee.com/shychen/chatterbox">
    <img src="https://gitee.com/shychen/chatterbox/badge/fork.svg?theme=dark">
  </a>
</p>

### 简介 

🎈[Chatterbox（话匣子）](https://github.com/gmingchen/chatterbox)是`im-vue`重构后的即时聊天系统🆕。

🎃目前前端只有基于 [vue3](https://github.com/vuejs/vue-next)、[element-plus](https://github.com/element-plus/element-plus) 实现的相关内容，后续会分别实现 `react`、`h5`版本。
🤿后端是基于 __`java`__ 的 __`springboot`__ 、 __`netty`__  实现。

🔔比较关键的技术点是通过 `Websocket` 实现了消息的实时传递 和 通过 `RTCPeerConnection` 实现语音通话、视频通话。

[![Star History](https://api.star-history.com/svg?repos=gmingchen/chatterbox&type=Date)](https://api.star-history.com/svg?repos=gmingchen/chatterbox&type=Date)

###### 已内置如下功能：
- [X] 邮箱登录、注册、个人信息编辑
- [X] 用户搜索
- [X] 好友申请
- [X] 好友私聊、群聊
  - [X] 文字消息
  - [X] 图片消息
  - [X] 音频消息
  - [X] 文件消息
- [X] 好友通话
  - [X] 语音通话
  - [X] 视频通话

🏷️🏷️🏷️后续会 __`持续迭代更新`__，点个 ⭐star 不错过更多的功能更新😎。

### 在线预览
> ☀️
> [👉 在线预览 👀](https://chatterbox.gumingchen.icu)
>
> 服务器比较low，访问有点慢！等有条件了再加配！😬
>
> 如果觉得还不错的话，请点个 ⭐star 支持一下吧，这将是对我最大的支持和鼓励☕！
> 🌙

> ⚠️
> 如果想要旧版本相关内容请移步👉` [old分支](https://github.com/gmingchen/chatterbox/tree/old)
> 🛑

#### 演示图片

<table>
  <tr>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/login.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/conversation.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/message.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/friend.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/search.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/add-friend.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/call.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/accept.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/ing.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/video.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://chatterbox.gumingchen.icu/resource/demo/apply.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
</table>

### 开发
> ⚠️
> 前提条件: 已安装 18.3 或更高版本的 Node.js `
> 建议不要用直接使用 cnpm 安装，可以通过配置 registry 来解决 npm 安装速度慢或中断的问题。
> 🛑
```bash

# 克隆项目
git clone https://github.com/gmingchen/chatterbox.git

# 进入项目目录
cd chatterbox

# 安装依赖
npm install

# 启动服务
npm run dev

# 发布
npm run build
```

### 关于作者
Hi there, I'm [Slipper](https://github.com/gmingchen)（拖孩）👋. Thank you for your attention ⭐!
I'm a code enthusiast who has been working in the IT industry for many years.
I like open source and all interesting things and want to try to do it.
I want to be an interesting person and create something that can be remembered by others.
If you want to write code with me, you can contact me for internal promotion.

- 🔭 I’m currently working on [万店掌](https://www.ovopark.com/)
- 📫 How to reach me: ```🐧1240235512``` ```🛰️Gy1240235512``` ```📪gumingchen@foxmail.com```
- 🌏 How to follow me: [Github](https://github.com/gmingchen) [Gitee](https://gitee.com/shychen) [掘金](https://juejin.cn/user/4103845398710846) [简书](https://www.jianshu.com/u/81a5a02678d3)
- ❤️ I like playing 🎮, sleeping in 🛌 and coding 👨‍💻.

![Github stats](https://github-readme-stats.vercel.app/api?username=gmingchen&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515&include_all_commits=true&hide=["contribs"])

<table>
  <tr align="center">
    <td>公众号</td>
    <td>个人微信</td>
    <td>交流群</td>
    <td>摸鱼群</td>
  </tr>
  <tr>
    <td>
      <img src="https://admin.gumingchen.icu/file/static/official-account-qr-code.jpg" width="200px" title="公众号" alt="公众号:loafer-man" />
    </td>
    <td>
      <img src="https://chatterbox.gumingchen.icu/resource/static/wechat-qr-code.png" width="200px" title="微信" alt="微信:Gy1240235512" />
    </td>
    <td>
      <img src="https://chatterbox.gumingchen.icu/resource/static/chatterbox-wechat-group.jpg" width="200px" title="交流群" alt="交流群" />
    </td>
    <td>
      <img src="https://chatterbox.gumingchen.icu/resource/static/fish.jpg" width="200px" title="摸鱼群" alt="摸鱼群" />
    </td>
  </tr>
</table>

> 🤑
> 如果有需要完整代码的可以加作者微信📨，联系作者👦
> 🎯不免费，有偿💸获取完整代码
> 📃开发文档暂时没有编写，空闲了会补上的哦🎮
> 💰

### 捐赠
>💖
>如果你觉得这个项目帮助到了你，你可以帮作者买一杯热饮表示鼓励 ☕
>🦀🦀

<table>
  <tr align="center">
    <td>微信捐赠</td>
    <td>支付宝捐赠</td>
  </tr>
  <tr>
    <td>
      <img src="https://chatterbox.gumingchen.icu/resource/static/wechat-collection-code.jpg" width="200px" title="微信捐赠" alt="微信捐赠" />
    </td>
    <td>
      <img src="https://chatterbox.gumingchen.icu/resource/static/ali-collection-code.jpg" width="200px" title="支付宝捐赠" alt="支付宝捐赠" />
    </td>
  </tr>
</table>

### 其它开源项目

[vue3-element-plus-admin](https://github.com/gmingchen/vue3-element-plus-admin)

是一个管理后台基础功能框架，基于 [vue3](https://github.com/vuejs/vue-next) 、 [element-plus](https://github.com/element-plus/element-plus) 和 [typescript](https://github.com/microsoft/TypeScript) 实现。内置了 i18n 国际化，动态路由，权限验证。-[私活神器]

[java-admin-base](https://github.com/gmingchen/java-admin-base)

是一个管理后台基础功能框架 [base-refactoring](https://github.com/gmingchen/vue3-element-plus-admin/tree/base-refactoring) 分支的后端代码，基于 __`java`__ 的 __`springboot`__

[nod-server](https://github.com/gmingchen/node-server)
是一个基于 node 开发的后端服务框架，只要你会 SQL 就也可以写接口了，再也不用看后端的脸色了。
