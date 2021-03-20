function fetchDocument(documentName = 'default') {
  return fetch(`${documentName}.json`).then((response) => response.json());
}

function getNode(jsonDocument, path = '', defaults = DEFAULTS) {
  return get(jsonDocument, path, get(defaults, path, ''));
}

async function init() {
  const jsonDocument = await fetchDocument();

  const documentRootId = getNode(jsonDocument, 'meta.rootId');
  const rootDOM = document.getElementById(documentRootId);

  generateGlobalStyle(jsonDocument);

  ['header', 'body', 'footer'].forEach((section) => {
    const sectionDOM = document.createElement(
      getNode(jsonDocument, `data.${section}.tag`)
    );
    sectionDOM.setAttribute(
      'class',
      getNode(jsonDocument, `data.${section}.class`)
    );
    rootDOM.appendChild(sectionDOM);

    generateContents(sectionDOM, getNode(jsonDocument, `data.${section}`));
  });
}

function generateGlobalStyle(jsonDocument) {
  const head = document.head;

  const style = document.createElement('style');
  style.textContent = getNode(jsonDocument, 'meta.style');
  head.appendChild(style);

  getNode(jsonDocument, 'meta.stylePaths').forEach((path) => {
    const stylePath = document.createElement('link');
    stylePath.setAttribute('rel', 'stylesheet');
    stylePath.setAttribute('href', path);
    head.appendChild(stylePath);
  });
}

function generateContents(parentDOM, contentBlock) {
  const attributes = getNode(contentBlock, 'attributes', CONTENT);
  setAttributes(parentDOM, attributes);

  const contents = getNode(contentBlock, 'contents', CONTENT);
  const props = getNode(contentBlock, 'props', CONTENT);

  if (!contents) return;

  if (typeof contents === 'string') {
    parentDOM.innerHTML = generateHTML(contents, props);

    return;
  }

  contents.forEach((content) => {
    const contentDOM = document.createElement(getNode(content, 'tag', CONTENT));
    contentDOM.setAttribute('class', getNode(content, 'class', CONTENT));
    generateContents(contentDOM, content);

    parentDOM.appendChild(contentDOM);
  });
}

function setAttributes(dom, attributes = {}) {
  dom &&
    Object.keys(attributes).forEach((attribute) => {
      dom.setAttribute(attribute, attributes[attribute]);
    });
}

init();
