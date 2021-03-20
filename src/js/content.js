const content = {
  generateGlobalStyle(jsonDocument) {
    html.createStyle(node.get(jsonDocument, 'meta.style'));

    node.get(jsonDocument, 'meta.stylePaths').forEach((path) => {
      html.createStyleLink(path);
    });
  },
  generate(parentDOM, contentBlock) {
    const attributes = node.get(contentBlock, 'attributes', CONTENT);
    html.setAttributes(parentDOM, attributes);

    const contents = node.get(contentBlock, 'contents', CONTENT);
    const props = node.get(contentBlock, 'props', CONTENT);

    if (!contents) return;

    if (typeof contents === 'string') {
      parentDOM.innerHTML = html.generate(contents, props);

      return;
    }

    contents.forEach((content) => {
      const contentDOM = document.createElement(
        node.get(content, 'tag', CONTENT)
      );
      contentDOM.setAttribute('class', node.get(content, 'class', CONTENT));
      this.generate(contentDOM, content);

      parentDOM.appendChild(contentDOM);
    });
  },
};
