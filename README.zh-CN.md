# Amber

[![Build Status](https://travis-ci.org/Mitscherlich/hexo-theme-amber.svg?branch=master)](https://travis-ci.org/Mitscherlich/hexo-theme-amber)

![Preview](docs/assets/Preview.png)

Hexo 博客主题 for [mitscherlich.me](https://mitscherlich.me).

> **⚠️ Note:** 这个主题虽然基于 Vue.js 开发，但并不能作为一个独立应用使用。你需要设置一个 Hexo 博客.

## 安装

通过本仓库:

```bash
$ git clone https://github.com/Mitscherlich/hexo-theme-amber.git themes/amber
$ cd themes/amber && yarn install --pure-lockfile
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

遵循安装流程即可，只是注意你需要同时运行 `hexo serve` 和 `yarn serve`. 否则你将获取不到博客数据.

```bash
$ cd /path/to/blog/theme/amber
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
