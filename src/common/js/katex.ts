/**
 * copy from https://gist.github.com/kb10uy/d412dc92a034b892c17c461fa2f63a3d
 * Thx [@kb10uy](https://gist.github.com/kb10uy)
 */

import katex from 'katex';

interface IKaTeXAutoRenderSurround {
  display: boolean;
  test: RegExp;
}

interface IKaTeXAutoRenderOption {
  // delimiters
  surronds: IKaTeXAutoRenderSurround[];
  // tag names which are excluded
  ignoreTags: string[];
  // error callback
  error: (msg: any, err: any) => void;
}

// the default option is same with auto-render.js
const DefaultOptions: IKaTeXAutoRenderOption = {
  surronds: [
    { test: /\$(.+?)\$/, display: false },
    { test: /\$\$(.+?)\$\$/, display: true },
    { test: /\\\[(.+?)\\\]/, display: true },
    { test: /\\\((.+?)\\\)/, display: false },
  ],
  ignoreTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
  error: (msg, err) => {
    // tslint:disable-next-line:no-console
    console.log(msg, err);
  },
};

function renderElement(element: HTMLElement, options: IKaTeXAutoRenderOption): void {
  for (const child of Array.from(element.childNodes)) {
    switch (child.nodeType) {
      case 1:
        if (options.ignoreTags.indexOf(child.nodeName.toLowerCase()) !== -1) {
          continue;
        }
        renderElement(child as HTMLElement, options);
        break;
      case 3:
        const newElement = renderText(child as HTMLElement, options);
        element.replaceChild(newElement, child);
        break;
      default:
        continue;
    }
  }
}

function renderText(element: Element, options: IKaTeXAutoRenderOption): DocumentFragment {
  const fragment = document.createDocumentFragment();
  let restText = element.textContent || '';

  while (true) {
    let match = null;
    let surrond = null;
    for (const sr of options.surronds) {
      match = sr.test.exec(restText);
      surrond = sr;
      if (match) {
        break;
      }
    }
    if (!match) {
      break;
    }
    fragment.appendChild(document.createTextNode(restText.substr(0, match.index)));

    const result = document.createElement('span');
    const renderOption = Object.assign({}, options, {
      displayMode: surrond!.display,
    });
    katex.render(match[1], result , renderOption);
    fragment.appendChild(result);

    restText = restText.substr(match.index + match[0].length);
  }
  fragment.appendChild(document.createTextNode(restText));

  return fragment;
}

export function renderMathInElement(element: HTMLElement, options?: Partial<IKaTeXAutoRenderOption>): void {
  if (!element) {
    throw new Error('No element provided to render.');
  }

  const fullOptions = Object.assign({}, DefaultOptions , options);
  renderElement(element, fullOptions);
}
