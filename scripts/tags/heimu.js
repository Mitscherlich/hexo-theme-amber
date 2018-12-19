const heimu = (args) => {
  const content = args.shift();
  return `<span class="heimu">${content}</span>`;
};

/**
 * heimu tag
 *
 * Syntax:
 *   {% heimu content %}
 */
hexo.extend.tag.register('heimu', heimu, { ends: false });
