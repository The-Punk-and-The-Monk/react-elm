<!--
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 10:19:05
 * @LastEditTime: 2020-09-07 06:55:28
 * @FilePath: /react-elm/README.md
 * @Description:
-->

# 仿 elm 手机端项目

## demo 地址

http://elm.linfeng.space
(服务器到期被销毁。。。论文结束再续。。）

请使用 chrome 的手机模式(Pixel2)预览

## 说明

非网课项目, 自己从头写的

### 目标

> 尝试用 react 模仿[bailicangdu](https://github.com/bailicangdu)的 elm 前端项目[vue2-elm](https://github.com/bailicangdu/vue2-elm), 后端使用该作者的项目[node-elm](https://github.com/bailicangdu/node-elm)在本地部署.

### 动机

> 学习前端, 跟着网上的视频教程敲的项目只有一两个页面, 而且太"顺利"了, 整个流程都是安排好的, 所以需要自己从头敲个项目练手, 从环境配置到 webpack 打包到项目上线走一遍, 先创造问题, 在解决问题的过程中学习.

### dependencies

```json
{
  "dependencies": {
    "@ant-design/icons": "^4.2.1",
    "antd": "^4.4.3",
    "antd-mobile": "^2.3.3",
    "axios": "^0.19.2",
    "immutable": "^4.0.0-rc.12",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-loadable": "^5.5.0",
    "react-redux": "^7.2.0",
    "react-router-dom": "^5.2.0",
    "redux": "^4.0.5",
    "redux-immutable": "^4.0.0",
    "redux-thunk": "^2.3.0",
    "styled-components": "^5.1.1"
  }
}
```

## 项目展示

### 地址

> 地址: http://elm.linfeng.space

> 注 1: 本来后端打算使用作者[bailicangdu](https://github.com/bailicangdu)的项目[node-elm](https://github.com/bailicangdu/node-elm)在服务器部署, 但是图片啥的请求不到..., 对这个方面不了解就不敢去折腾, 所以接口请求都转发到了[node-elm](https://github.com/bailicangdu/node-elm)项目提供的接口地址, 默默感谢[bailicangdu](https://github.com/bailicangdu)大佬.
>
> 注 2: 可能需要科学上网,
>
> 注 3: 开发环境使用的是 chrome 版本 版本 84.0.4147.105（正式版本） （64 位）的手机模式查看页面.
>
> 注 4: 由于录屏软件的原因, 录屏拖动的时候会有抖动

### 首页

<img src="./readme.assets/img/首页.gif" alt="首页" width="300">

### shop

#### 商品列表

<img src="./readme.assets/img/shop滚动.gif" alt="shop滚动" width="300">

#### 购物车

<img src="./readme.assets/img/shop购物车.gif" alt="shop购物车" width="300">

#### 评论

<img src="./readme.assets/img/shop评论.gif" alt="shop评论" width="300">

### 地址

<img src="./readme.assets/img/城市选择页.gif" alt="城市选择页" width="300">

<img src="./readme.assets/img/详细地址选择页.gif" alt="详细地址选择页" width="300">

### 登录注册

<img src="./readme.assets/img/登录注册.gif" alt="登录注册" width="300">

## 进度

### 2020.7.28

#### 首页

包括图片加载态, list 加载态, 滚动的处理,

#### 地址选择页

#### 一些公用组件

### 2020.8.1

#### 7 个页面

首页, 商家分类页, 商铺首页, 城市选择页, 详细地址选择页, 用户首页, 登录页

#### 尝试上线

### 2020.8.2

完善商铺首页, 抽出一些组件, 完善项目上线

### 2020.8.3

回头补习基础, 准备秋招, 可能没时间了

### 阶段总结:

相比[node-elm](https://github.com/bailicangdu/node-elm)

在数据交互方面, 个人认为整个项目相对比较难的地方可能就是购物车中的数量在 menu-sider, list, shoppingCart 几个位置的同步了.
还有一个应该是提交订单时的地址选择跟优惠券等, 这个暂时没时间去做了.

在页面效果方面, 做了加载数据跟加载页面时的反馈, list 的无限加载. 相比[node-elm](https://github.com/bailicangdu/node-elm)少了一个添加到购物车时"+"的动画效果, 但是多做了商店首页的吸顶 banner 还有 banner 与 menu-sider 的选中项的同步.

### 2020.8.13

样式调整, 图片懒加载

### 2020.9.6

经过几次面试,暴露出很多问题,改进中

1. 原本做的叫分包加载 -> 改为异步加载
2. list 的无限加载, 在列表长度过长时, 带来性能问题 -> 改为限制真实 dom 数量, 并用空 div 占位, 撑开滚动条
3. 稍微做了点移动端适配.
