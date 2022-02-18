> **🔊:** MAINTAINER NEEDED<br />
> Currently, I'm not focusing on this project anymore. Since it a little bit out of date and Vue.js 3 is coming soon next year, if you're also interested in this theme, please [contact me](mailto:mitscherlich36@gmail.com) and I'll transfer this repo to you.

# hexo-theme-amber

[![Build Status][ci-badge]][ci-url]
[![juejin][juejin-img]][juejin-url]
[![MIT License][license-badge]](LICENSE)

[ci-badge]: https://travis-ci.org/Mitscherlich/hexo-theme-amber.svg?branch=develop
[ci-url]: https://travis-ci.org/Mitscherlich/hexo-theme-amber
[juejin-img]: https://badge.juejin.im/entry/5c1b515ff265da61193bcc21/likes.svg?style=flat
[juejin-url]: https://juejin.im/post/5c1b4b69f265da611c26ef7c
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg

Hexo theme based on Vue.js and Bootstrap for [mitscherlich.me](https://mitscherlich.me).

![Preview](https://raw.githubusercontent.com/Mitscherlich/hexo-theme-amber/develop/docs/assets/Preview.png)

Language: :us:<a title="Chinese" href="README.zh-CN.md">:cn:</a>

> **⚠️ Note:** This theme cannot be use as a individual Vue.js spa. You need to setup a Hexo blog.

## Install

via npm/yarn/pnpm:

```bash
$ npm i --save hexo-theme-amber
# or yarn
$ yarn add hexo-theme-amber
# or pnpm
$ pnpm add hexo-theme-amber
```

Then modify you `_config.yml`:

```yml
# ...
## Theme
theme: amber  # this enable your theme config
# ...
```

Enjoy your writing!

```bash
$ hexo clean && hexo serve
```

## Develop

This theme provide prebuild static assets on default branch. You may need to checkout [`develop`](https://github.com/Mitscherlich/hexo-theme-amber/tree/develop) branch if you want to custom the theme. There is no difference with Vue development you are familiar with:

```bash
$ git clone https://github.com/Mitscherlich/hexo-theme-amber.git -b develop themes/amber-dev
$ cd themes/amber-dev && npm install # Also, yarn will be ok
```

Just follow the installation, but notice that you have to run both `hexo serve` and `yarn serve` at the same time. Otherwise you will not get the posts data.

```bash
$ cd /path/to/blog/theme/amber-dev
$ yarn serve
```

Then open another terminal:

```bash
$ cd /path/to/blog
$ hexo clean && hexo serve --port 4000
```

**Note:** hexo server must running on port `4000`. You may need to modifiy the `vue.config.js` under theme root if using other specific port.

## License

[MIT](LICENSE)
