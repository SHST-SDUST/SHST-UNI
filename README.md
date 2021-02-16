# SHST-UNI

![show](https://cdn.jsdelivr.net/gh/WindrunnerMax/SHST@dev/SHST-UNI/static/SHST-WX.jpg)

### 配置相关

```javascript
// SHST-UNI/App.vue

url            // 后台请求域名
tips           // 公告本地标识
header         // 请求头信息
openid         // OPENID信息
version        // 版本号
curTerm        // 当前学期
initData       // 初始化数据信息
userFlag       // 用户登录状态
colorList      // 颜色方案
curTermStart   // 开学日期
ajax()         // 网络请求封装 回调
toast()        // 弹窗提示
extend()       // 深拷贝与浅拷贝
request()      // 网络请求封装 Promise
```


### 目录结构

[关于UNIAPP重构以及类的封装文档](https://blog.touchczy.top/#/MiniProgram/%E5%B1%B1%E7%A7%91%E5%B0%8F%E7%AB%99%E5%B0%8F%E7%A8%8B%E5%BA%8F)

```
SHST-UNI                              // 山科小站总目录
    ├── components                    // 组件封装
    │   ├── headslot.vue              // 带solt的标题布局
    │   ├── layout.vue                // 卡片式布局
    │   ├── list.vue                  // 展示用list布局
    │   ├── sentence.vue              // 每日一句封装
    │   └── weather.vue               // 天气封装
    ├── modules                       // 模块化封装
    │   ├── cookies.js                // Cookies操作
    │   ├── copy.js                   // 深浅拷贝
    │   ├── datetime.js               // 时间日期操作
    │   ├── event-bus.js              // 事件总线
    │   ├── global-data.js            // 全局变量
    │   ├── loading.js                // 加载提示
    │   ├── operate-limit.js          // 防抖与节流
    │   ├── regex.js                  // 正则匹配
    │   ├── request.js                // 网络请求
    │   ├── toast.js                  // 消息提示
    │   └── update.js                 // 自动更新
    ├── pages                         // 页面
    │   ├── ext                       // 拓展组
    │   ├── home                      // Tabbar、辅助组
    │   ├── lib                       // 图书馆功能组
    │   ├── sdust                     // 科大组
    │   ├── study                     // 学习组
    │   └── user                      // 用户组
    ├── static                        // 静态资源
    │   ├── camptour                  // 校园导览静态资源
    │   └── img                       // 图标等静态资源
    ├── unpackage                     // 打包文件
    ├── utils                         // 辅助功能
    │   ├── amap-wx.js                // 高德地图SDK
    │   └── md5.js                    // MD5引入
    ├── vector                        // 部署封装
    │   ├── resources                 // 资源文件
    │   │   ├── camptour              // 校园导览配置文件
    │   │   ├── asse.mini.wxss        // 公共样式库
    │   │   └── iconfont.wxss         // 字体图标
    │   ├── dispose.js                // 部署小程序
    │   └── pub-fct.js                 // 公有方法
    ├── App.vue                       // App全局样式以及监听
    ├── main.js                       // 挂载App，Vue初始化入口文件
    ├── manifest.json                 // 配置Uniapp打包等信息
    ├── pages.json                    // 路由
    └── uni.scss                      // 内置的常用样式变量
```

### 小程序
![show](https://cdn.jsdelivr.net/gh/WindrunnerMax/SHST@dev/SHST-UNI/static/show.jpg)

## 更新日志


### 3.5.4 () []
1. 增加scss样式库
2. 修复按钮样式的兼容问题

### 3.5.3 (2021-01-19) [2d90d1b]
1. 修复图床图片资源问题
2. 修复校园导览部分细节
3. 缓存控制对象全面部署
4. 添加Mixin全局静态横切
5. 修复IOS对于Date对象兼容问题

### 3.5.2 (2021-01-16) [d9c8108]
1. 修正文字的描述信息
2. 修复每日一句接口问题
3. 增加缓存控制对象封装
4. 广告组件加入后端控制展示

### 3.5.1 (2020-12-08) [8a4c4f6]
1. 修复校历抛出的异常
2. 修复自定义课表保存逻辑问题
3. 添加事件总线一次性触发订阅
4. 修复初始化失败后无法继续操作的问题

### 3.5.0 (2020-11-22) [fcb9837]
1. 解决初始化状态问题
2. 修复校历假期颜色问题
3. 自定义添加课表项目功能

### 3.4.1 (2020-10-25) [dedd1dd]
1. 天气组件样式修正
2. 加入公告仅弹出情况
3. 处理课表新的数据结构
4. 去除教室课表与蹭课查询广告位

### 3.4.0 (2020-10-24) [14e7fba]
1. 加入轮播图
2. 天气样式修改
3. 加入弹出式公告
4. 修复校内公告图片显示问题
5. 适配济南校区空教室查询功能


### 3.3.6 (2020-10-07) [1274bff]
1. 增加校内公告功能
2. 修复赞赏列表的点击样式问题

### 3.3.5 (2020-10-06) [b709338]
1. 广告组件以及兼容处理
2. 修正共享课表数据拉取失败问题
3. 修正登录页记住密码问题
4. 修正校园卡加载失败的提示

### 3.3.4 (2020-09-19) [a148f57]
1. 简单语句内联处理
2. 修复测试账号问题
3. 按教室查询课程功能
4. 按课程名与教师名蹭课查询功能

### 3.3.3 (2020-09-12) [1d2d58c]
1. 处理异常数据触发的信息提示
2. 修复网络请求地址异常的问题

### 3.3.2 (2020-09-10) [a3efb5a]
1. 修复校历开学日期问题
2. 修复共享课表刷新问题
3. 修复教室查询请求失败问题
4. 修复首页公告无法打开问题
5. 修复绑定教务系统无跳转问题

### 3.3.1 (2020-09-01) [657e456]
1. 解决样式冲突问题
2. 修正公共样式文件问题
3. 解决同时段课程信息覆盖问题

### 3.3.0 (2020-08-31) [fa83285]
1. 修正变量命名规范
2. 增加防抖与节流模块
3. 完善request模块封装
4. 修正cookies模块功能
5. 修正组件订阅登录事件
6. 冗余处理，压缩代码体积
7. 完善ES6标准模块导入导出
8. 配合后端服务统一判定标识

### 3.2.2 (2020-04-16) [02078ab]
1. Promise与async/await
2. 增加测试账号的功能
3. 重写图书馆爬虫方案
4. 增加ES6标准模块导出
5. 自定义课表配色功能

### 3.2.1 (2020-03-25) [c4241dc]
1. 更新校历UI
2. 更新课表配色方案

### 3.2.0 (2020-02-08) [7d18649]
1. 修复link样式问题
2. 修改静态资源路径
3. App增加科大公告功能
4. App页面填充算法优化

### 3.1.3 (2020-02-05) [4d74161]
1. 小程序课表时间修正
2. App布局Flex样式修正

### 3.1.2 (2020-01-28) [064c506]
1. App Nvue/Weex Finish

### 3.1.1 (2019-12-30) [c544ff4]
1. 山科小站App完成

### 3.1.0 (2019-12-28) [e2cf6a7]
1. 山科小站迎新重构完成
2. 山科小站教务重构完成

### 3.0.0 (2019-08-31) [ccff764]
1. 赞赏列表
2. 课表全面缓存
3. 校园导览修正

### 2.9.3 (2019-08-26) [d7c93b0]
1. 修复图书馆借阅超期显示问题

### 2.9.2 (2019-08-20) [808fc0f]
1. 小程序接入公众号

### 2.9.1 (2019-08-16) [166793e]
1. 公众号消息功能

### 2.8.3 (2019-08-15) [b83401a]
1. 跳转迎新版
2. 图标数据修正

### 2.8.2 (2019-08-13) [b1a81b4]
1. 公众号组件
2. Onlunch Event

### 2.8.1 (2019-08-07) [cb8dbac]
1. 订阅发布模式

### 2.7.5 (2019-08-06) [2796d27]
1. 待办事项缓存

### 2.7.4 (2019-08-03) [1404bc3]
1. 字体图标iconfont
2. 增加赞赏功能

### 2.7.3 (2019-08-02) [1f8eae3]
1. Redis存储
2. 增加后台管理功能
3. 修复校园卡与图书馆问题

### 2.7.2 (2019-07-30) [0167719]
1. 校园卡查询功能

### 2.7.1 (2019-07-27) [9618313]
1. 校园导览功能完成
2. 动态公告功能
3. HTTP请求类请求头处理，响应头处理
4. 小程序目录结构处理
5. 后端冗余处理

### 2.6.2 (2019-07-23) [f429f44]
1. 校园导览优化定位逻辑
2. 解决注销切换用户问题

### 2.6.1 (2019-07-21) [d69a6f6]
1. 校园导览功能上线

### 2.5.6 (2019-07-17) [316818d]
1. API更新
2. 解决分享引起的问题

### 2.5.5 (2019-07-16) [0c6cd5d]
1. QQ小程序 山科小站--迎新专版

### 2.5.4 (2019-07-15) [f22f000]
1. 添加自定义组件
2. About界面重构

### 2.5.3 (2019-07-10) [d25a95e]
1. 添加公告红点
2. 重构日历功能
3. API兼容处理(暂)

### 2.5.2 (2019-07-07) [34c257c]
1. 更新Python版本API
2. 添加PHP版本API
3. 添加Java版本API

### 2.5.1 (2019-07-06) [36fcf0f]
1. 统一版本号
2. 启用备用域名
3. 版本更新功能
4. Application层
5. 优化Http请求类结构
6. 修复App的foreach问题

### 2.4.5 (2019-07-02) [c0d33f6]
1. 缓存用户信息
2. 封装的时间日期修复，拓展Date原型addDate方法
3. 更改结构，加入dispose.js公共数据处理方法

### 2.4.4 (2019-06-27) [0f65966]
1. 因后台逻辑问题共享课表只显示周次
2. 处理Toast执行顺序问题
3. 考试安排功能

### 2.4.3 (2019-06-25) [a64d565]
1. 部分加载提示载入封装网络请求的Complete中
2. 空教室排序
3. 登陆时显示密码开关

### 2.4.2 (2019-06-24) [d813066]
1. 优化APP请求逻辑
2. 修复版本号问题

### 2.4.1 (2019-06-22) [85a5d31]
1. 登录逻辑更改
2. 优化封装网络请求

### 2.3.2 (2019-06-21) [59cecbd]
1. 查询教室功能优化

### 2.3.1 (2019-06-19) [a0b96cf]
1. 近7天空教室查询功能
2. 修复部分冗余

### 2.2.5 (2019-06-18) [e38c011]
1. 目录结构整理
2. 修复时间与登录BUG

### 2.2.4 (2019-06-16) [3f97a7b]
1. 使用Storage存储部分数据

### 2.2.3 (2019-06-15) [3c09247]
1. 更新前后端逻辑，减少对强智的请求

### 2.2.2 (2019-06-13) [74ec7d2]
1. 代码目录结构
2. user界面重构
3. 修复一些登录的问题

### 2.2.1 (2019-06-11) [ed5f91b]
1. 减少服务器负载，本地处理数据

### 2.1.2 (2019-06-09) [1b33ddf]
1. 待办安排功能

### 2.1.1 (2019-06-08) [f141520]
1. 图标颜色问题
2. 修复主页用户未授权的问题
3. 增加放假安排功能

### 2.0.5 (2019-06-07) [c59e024]
1. 修复GET请求编码问题(小程序+APP)

### 2.0.4 (2019-05-26) [d00a5b0]
1. 微信小程序提供游客模式，完善校历和嵙地图功能

### 2.0.3 (2019-05-23)[ace5f30]
1. 微信小程序完成教室，成绩，共享课表，图书馆，借阅，地图，校历，链接

### 2.0.2 (2019-05-22)[3353a8a]
1. 微信小程序完成课表、用户

### 2.0.1 (2019-05-21) [3f51c42]
1. 微信小程序开发(WXSA)
2. 完成微信小程序登录、今日课程、天气

### 1.3.9 (2019-05-18) [B0aaa8b]
1. 增加近三天天气功能，点击图标查看今日天气状态

### 1.3.8 (2019-05-17) [1d4f1e3]
1. 优化颜色算法
2. 修复课表因课重复而覆盖问题

### 1.3.7 (2019-05-11) [56522c5]
1. 移除部分功能

### 1.3.6 (2019-05-09) [3f9c6da]
1. 关闭伪静态(增加index.php)

### 1.3.5 (2019-05-05) [a12bf8c]
1. 增加情侣课表功能
2. 折叠图书馆功能块

### 1.3.4 (2019-05-04) [821b4b2]
1. 修复图书检索为GET方式
2. 课表优化代码，加入背景颜色

### 1.3.3 (2019-05-03) [e3d83f2]
1. 增加链接分享功能

### 1.3.2 (2019-05-01) [7b4b712]
1. 整理代码结构
2. 完善图书馆检索与借阅查询功能
3. 学校图书馆对外网开放时间大约在 7:00 - 20:00 ，图书功能在此时间段正常使用

### 1.3.1 (2019-04-30) [642c52f]
1. 优化部分代码结构
2. 建立SDUST分支(嵙分支，后期commit基本于此分支)
3. 加入图书馆检索图书功能
4. 加入借阅信息查询功能

### 1.2.2 (2019-04-28) [cc2f702]
1. 优化代码结构，建立配置静态类

### 1.2.1 (2019-04-20) [80c3102]
1. 内网穿透，恢复使用

### 1.2.0 (2019-04-11) [9903ae4]
1. 增加兼容模式(兼容模式是非异步的，可能会稍有卡顿)
2. 增加 更新日志 与 公告
3. 使用localStorage作为本地存储

### 1.1.1 (2019-04-10) [02b4603]
1. 增加Github入口

### 1.1.0 (2019-03-11) [f041eb2]
1. 更改数据获取方式为异步
2. 增加成绩查询与绩点计算功能

### 1.0.0 (2019-03-05) [-------]
1. 最早是因为智校园无法使用，我无法查询自习室，在J7爬了四层楼未找到自习室，遂回宿舍封装了此Web
2. 由于最初版本仅为自用，并未使用Git管理代码，所以无commit
3. 服务端未保存任何信息，账号与密码全部以cookies保存在本地
