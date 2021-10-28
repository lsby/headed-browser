# 有头浏览器

一个"有头"浏览器, 支持使用 js 代码控制浏览器行为, 实现爬虫, 自动化测试等功能.

其实是 electron 的简单封装.

## 演示

![testgif](./doc/testgif.gif)

## 快速开始

```
npm i
npm run dev
```

选择 `test` 文件夹内的`猫猫测试.js`, 点击运行代码.

## API

- sleep: 延时给定时间
- runJs: 在浏览器线程运行一段 js 代码, 并返回计算值, 下面对浏览器线程操作的函数都是对它的封装.
- getHtml: 通过 selector 选择第一个元素, 获得其 outhtml.
- click: selector 选择一个元素, 点击它
- alert: 弹出提示
