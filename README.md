# 有头浏览器

一个"有头"浏览器, 可以支持使用js代码控制浏览器行为, 实现爬虫, 自动化测试等需求.

其实是 electron 的简单封装.

## 演示

![testgif](https://user-images.githubusercontent.com/7814085/139321861-9c89fe1d-da97-4de6-a661-0ba01cc2a0b2.gif)

## 快速开始

```
npm i
npm run dev
```

选择test文件夹内的`猫猫测试.js`, 点击运行代码.

## API

- runJs: 在浏览器线程运行一段js代码, 并返回计算值.
- getHtml: 通过selector选择第一个元素, 获得其outhtml.
- sleep: 延时给定时间
- click: selector选择一个元素, 点击它
- alert: 弹出提示
