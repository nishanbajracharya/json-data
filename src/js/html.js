const html = {
  createStyle(value, dom = document.head) {
    const style = document.createElement('style');
    style.textContent = value;
    dom.appendChild(style);
  },
  createStyleLink(path, dom = document.head) {
    const stylePath = document.createElement('link');
    stylePath.setAttribute('rel', 'stylesheet');
    stylePath.setAttribute('href', path);
    dom.appendChild(stylePath);
  },
  generate(content, props) {
    return compileHTML(content, props);
  },
  setAttributes(dom, attributes = {}) {
    dom &&
      Object.keys(attributes).forEach((attribute) => {
        dom.setAttribute(attribute, attributes[attribute]);
      });
  },
};
