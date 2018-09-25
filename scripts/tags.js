/* eslint-disable */

const rUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/;

/**
* Fancybox tag
*
* Syntax:
*   {% fancybox slug /path/to/image [/path/to/thumbnail] [class] [title] %}
*/
hexo.extend.tag.register('fancybox', function (args) {
  const slug = args.shift(),
    original = args.shift();
  let thumbnail = '',
    tagClass = '';

  const tpl = config => `<a data-fancybox="gallery" href="${config.path}" title="${config.title}"><img class="${config.tagClass}" src="${config.path}" alt="${config.title}"></a>`

  if (args.length && rUrl.test(args[0])) {
    thumbnail = args.shift();
  }

  if (args.length && !rUrl.test(args[0])) {
    tagClass = args.shift();
  }

  const title = args.join(' ');

  const path = (thumbnail || original).startsWith('/') ? (thumbnail || original) : ('/assets/' + slug + '/' + (thumbnail || original))

  return tpl({ path, title, tagClass });
});

/**
* heimu tag
*
* Syntax:
*   {% heimu content %}
*/
hexo.extend.tag.register('heimu', function (args) {
  const content = args.shift();

  return `<span class="heimu">${content}</span>`;
});
