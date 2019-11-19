> **🔊:** 维护者募集中<br />
> 目前我的工作重心不在这个项目上，所以它现在看起来有点旧了。由于明年 Vue.js 3 即将发布，如果你对这个项目感兴趣并愿意用 Vue3 重构这个主题，请[联系我](mailto:mitscherlich36@gmail.com)将此仓库转移给你进行维护。

# hexo-theme-amber

[![Build Status][ci-badge]][ci-url]
[![juejin][juejin-img]][juejin-url]
[![MIT License][license-badge]](LICENSE)

[ci-badge]: https://travis-ci.org/Mitscherlich/hexo-theme-amber.svg?branch=develop
[ci-url]: https://travis-ci.org/Mitscherlich/hexo-theme-amber
[juejin-img]: https://badge.juejin.im/entry/5c1b515ff265da61193bcc21/likes.svg?style=flat
[juejin-url]: https://juejin.im/post/5c1b4b69f265da611c26ef7c
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg

![Preview](https://raw.githubusercontent.com/Mitscherlich/hexo-theme-amber/develop/docs/assets/Preview.png)

语言: <a title="English" href="README.md">:us:</a>:cn:

Hexo 博客主题 for [mitscherlich.me](https://mitscherlich.me).

> **⚠️ Note:** 这个主题虽然基于 Vue.js 开发，但并不能作为一个独立应用使用。你需要设置一个 Hexo 博客.

> 本主题已加入 [EasyHexo](https://easyhexo.github.io/Easy-Hexo/2-Theme-use-and-config/2-9-hexo-theme-amber/) 文档，请浏览已访问更详细的指南

## 安装

通过本仓库:

```bash
$ git clone https://github.com/Mitscherlich/hexo-theme-amber.git themes/amber
```

接着修改你博客的 `_config.yml`:

```yml
# ...
## Theme
theme: amber  # 启用主题
# ...
```

开始享受吧!

```bash
$ hexo clean && hexo serve
```

## 开发

本仓库的默认分支提供了预编译的静态文件，如果你想自定义主题，请从 [`develop`](https://github.com/Mitscherlich/hexo-theme-amber/tree/develop) 分支获取代码，接下来的一切和你所熟悉的 `Vue` 开发并无二异：

```bash
$ git clone https://github.com/Mitscherlich/hexo-theme-amber.git -b develope themes/amber-dev
$ cd themes/amber-dev && npm install # 当然，你也可使用 yarn
```

只是注意你需要同时运行 `hexo serve` 和 `yarn serve`. 否则你将获取不到博客数据.

```bash
$ cd /path/to/blog/theme/amber-dev
$ yarn serve
```

再打开一个终端:

```bash
$ cd /path/to/blog
$ hexo clean && hexo serve --port 4000
```

**Note:** 你的 Hexo 博客必须运行在 `4000` 端口上. 如果使用其他端口，你需要修改主题目录下的 `vue.config.js` 文件.

## 许可证

[MIT](LICENSE)
