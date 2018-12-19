/**
 * Mostly use hexo-tag-dplayer
 */
'use strict';

/* eslint-disable */

const urlFn = require('url');
// const log = require('hexo-log')({ name: 'hexo-tag-dplayer', debug: false });
const conf = hexo.config['hexo-tag-dplayer'] || {};
let counter = 0;

/**
 * Embed DPlayer(https://github.com/DIYgod/DPlayer) in Hexo posts/pages.
 * Syntax:
 *  {% dplayer key=value ... %}
 */
hexo.extend.tag.register('dplayer', function (args) {

  const def = conf['default'] || {};

  let id = 'dplayer' + (counter++), opt = {};

  for (let i in args) {
    const k = args[i].split('=')[0];
    let v = args[i].split('=').length < 2 ? 'true' : args[i].slice(args[i].indexOf('=') + 1);
    if (['autoplay', 'loop', 'screenshot', 'hotkey', 'mutex', 'dmunlimited'].indexOf(k) >= 0) {
      // bool
      v = v.toLowerCase();
      opt[k] = ['true', 'yes', '1', 'y', 'on', ''].indexOf(v) >= 0;
    } else if (['preload', 'theme', 'lang', 'logo', 'url', 'pic', 'thumbnails', 'vidtype', 'suburl', 'subtype', 'subbottom', 'subcolor', 'subcolor', 'id', 'api', 'token', 'addition', 'dmuser', 'width', 'height', 'code'].indexOf(k) >= 0) {
      // string
      opt[k] = v.toString();
    } else if (['volume', 'maximum'].indexOf(k) >= 0) {
      // number
      opt[k] = Number(v) || undefined;
    } else if (['yet not implemented'].indexOf(k) >= 0) {
      // native
      continue;
    }
  }

  const width = opt.width || def.width,
    height = opt.height || def.height;
  let url = opt.url || def.url;
  let raw = '<div id="' + id + '" class="dplayer hexo-tag-dplayer-mark" style="margin-bottom: 20px;' + (width ? ' width:' + width + ';' : '') + (height ? ' height:' + height + ';' : '') + '">';
  if (url != undefined) {
    if (hexo.config['post_asset_folder'] == true) {
      // for #10, if post_asset_folder is enable, regard url as relative url
      if (!(url.startsWith('http') || url.startsWith('/'))) {
        let PostAsset = hexo.model('PostAsset');
        let asset = PostAsset.findOne({ post: this._id, slug: url });
        if (!asset) return 'bad asset path...';
        opt.url = urlFn.resolve(hexo.config.root, asset.path);
      }
    }
    raw += '<script>(function(){let player = ' +
      JSON.stringify({
        // element: "document.getElementById('')",
        container: "document.getElementById('')",
        autoplay: 'autoplay',
        theme: 'theme',
        loop: 'loop',
        lang: 'lang',
        screenshot: 'screenshot',
        hotkey: 'hotkey',
        preload: 'preload',
        logo: 'logo',
        volume: 'volume',
        mutex: 'mutex',
        video: {
          url: 'url',
          pic: 'pic',
          thumbnails: 'thumbnails',
          type: 'vidtype',
        },
        subtitle: {
          url: 'suburl',
          type: 'subtype',
          fontSize: 'subsize',
          bottom: 'subbottom',
          color: 'subcolor',
        },
        danmaku: {
          id: 'id',
          api: 'api',
          token: 'token',
          maximum: 'maximum',
          addition: ['addition'],
          user: 'dmuser',
          unlimited: 'dmunlimited',
        },
        icons: 'icons',
        contextmenu: 'menu',
      }, (k, v) => {
        // log.debug("k",k,"v",v,"?",opt[k],"?a", def[k])
        if (typeof v === 'string') {
          if (v !== "document.getElementById('')") {
            return opt[v] || def[v];
          } else {
            return v;
          }
        } else if (k === "subtitle" && !(opt.suburl || def.suburl)) {
          return undefined;
        } else if (k === "danmaku" && !(opt.api || def.api)) {
          return undefined;
        } else if (k === "addition" && !(opt.addition || def.addition)) {
          return undefined;
        } else {
          return v;
        }
      }).replace("\"document.getElementById('')\"", 'document.getElementById("' + id + '")') +
      ';window.dplayers||(window.dplayers=[]);window.dplayers.push(player);' + (opt.code || def.code || '') + '})()</script></div>';
    // console.log(opt.code,def.code,(opt.code || def.code || ''));
  }
  else {
    raw += '<p>no url specified, no dplayer _(:3」∠)_</p>';
  }
  return raw;
});
