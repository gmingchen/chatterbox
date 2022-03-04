<p align="center">
  <a href="https://github.com/vuejs/vue-next">
    <img src="https://img.shields.io/badge/vue-3.0-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-1.x-brightgreen.svg" alt="element-plus">
  </a>
</p>

[im-vue](https://github.com/gmingchen/im-vue)主要目的在于学习 __`vue3`__ + __`Element-plus`__,功能还未很完善,目前只支持好友私聊,还未支持群聊,后续会 __`持续迭代更新`__。

后端是基于 __`java`__ 的 __`springboot`__ __`netty`__。<br>

### 简介

[im-vue](https://github.com/gmingchen/im-vue) 是一个管理后台基础功能框架，基于 [vue3](https://github.com/vuejs/vue-next) 、 [element-plus](https://github.com/element-plus/element-plus) 实现。内置了好友私聊功能。

- [在线预览(备用-服务器比较low，访问有点慢！)](http://im.gumingchen.icu)

### 功能模块

- [x] 登录
- [x] 注册
- [x] 好友分组
- [x] 添加好友
- [x] 好友私聊
- [ ] 群聊

### 项目结构

```bash
vue3-src
├─api 接口模块
│
├─assets 静态资源模块
│  ├─icon svg图标
│  ├─images 图片
│  └─sass 样式
│ 
├─components 组件模块
│ 
├─router 动态
│ 
├─store vuex
│  ├─modules
│  │  ├─conversation 会话模块
│  │  ├─friend 好友模块
│  │  ├─message 消息模块
│  │  ├─status 侧边栏状态模块
│  │  ├─user 用户登录信息模块
│  │  └─websocket websocket模块
│  └─index 动态加载模块
│ 
├─types typescript接口
│ 
├─utils 工具模块
│  ├─constants 常量
│  ├─index 工具
│  ├─request axios二次封装
│  ├─storage 本地缓存工具
│  └─websocket websocket工具类
│
├─views 视图模块
│  ├─chat 聊天页
│  ├─login 登录页面

```

### 开发

```bash
# 克隆项目
git clone https://github.com/gmingchen/im-vue.git

# 进入项目目录
cd im-vue

# 安装依赖
npm install

# 启动服务
npm run dev   # 开发环境
npm run prod  # 正式环境
npm run test  # 测试环境

# 发布
npm run build:dev   # 开发环境
npm run build:prod  # 正式环境
npm run build:test  # 测试环境
```

### 联系方式

<table>
  <tr align="center">
    <td>公众号</td>
    <td>QQ交流群</td>
    <td>微信交流群</td>
    <td>微信</td>
    <td>QQ</td>
  </tr>
  <tr>
    <td>
      <img src="http://oss.gumingchen.icu/image/official-account-qr-code.jpg" width="200px" title="公众号" alt="公众号:loafer-man" />
    </td>
    <td>
      <img src="http://oss.gumingchen.icu/image/qq-group-qr-code.jpg" width="200px" title="QQ交流群" alt="QQ交流群:124371554" />
    </td>
    <td>
      <img src="http://oss.gumingchen.icu/image/wechat-group-qr-code.jpg?time=3" width="200px" title="微信交流群" alt="微信交流群:124371554" />
    </td>
    <td>
      <img src="http://oss.gumingchen.icu/image/wechat-qr-code-1.jpg" width="200px" title="微信" alt="微信:Gy1240235512" />
    </td>
    <td>
      <img src="http://oss.gumingchen.icu/image/qq-qr-code.jpg" width="200px" title="QQ" alt="QQ:1240235512" />
    </td>
  </tr>
</table>

### 其它开源项目

[java-im](https://github.com/gmingchen/java-im)

是[vue3-element-plus-im](https://github.com/gmingchen/vue3-element-plus-im)即时聊天系统的 __`java`__ 后端代码，__`springboot`__ 基于 [netty](https://github.com/netty/netty) 、 [shiro](https://github.com/apache/shiro) 实现。

[vue3-element-plus-admin](https://github.com/gmingchen/vue3-element-plus-admin)

是一个管理后台基础功能框架，基于 [vue3](https://github.com/vuejs/vue-next) 、 [element-plus](https://github.com/element-plus/element-plus) 和 [typescript](https://github.com/microsoft/TypeScript) 实现。内置了 i18n 国际化，动态路由，权限验证。-[私活神器]

[java-admin-base](https://github.com/gmingchen/java-admin-base)

是一个管理后台基础功能框架 [base-refactoring](https://github.com/gmingchen/vue3-element-plus-admin/tree/base-refactoring) 分支的后端代码，基于 __`java`__ 的 __`springboot`__

[nod-server](https://github.com/gmingchen/node-server)
是一个基于 node 开发的后端服务框架，只要你会 SQL 就也可以写接口了，再也不用看后端的脸色了。
