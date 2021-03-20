const CONTENT = {
  tag: 'div',
  class: 'content',
  contents: '',
  attributes: {},
  props: {},
};

const DEFAULTS = {
  meta: {
    rootId: 'app',
    style: '',
    stylePaths: [],
  },
  data: {
    header: { ...CONTENT, class: 'header' },
    body: { ...CONTENT, class: 'body' },
    footer: { ...CONTENT, class: 'footer' },
  },
};
