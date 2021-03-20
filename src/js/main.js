function fetchDocument(documentName = 'default') {
  return http.get(`public/${documentName}.json`);
}

async function init() {
  let jsonDocument = DEFAULTS;

  try {
    jsonDocument = await fetchDocument();
  } catch (e) {
    console.log('[LOG] Error fetching data. Loading default', e);
  }

  const documentRootId = node.get(jsonDocument, 'meta.rootId');
  const rootDOM = document.getElementById(documentRootId);

  content.generateGlobalStyle(jsonDocument);

  ['header', 'body', 'footer'].forEach((section) => {
    const sectionDOM = document.createElement(
      node.get(jsonDocument, `data.${section}.tag`)
    );
    sectionDOM.setAttribute(
      'class',
      node.get(jsonDocument, `data.${section}.class`)
    );
    rootDOM.appendChild(sectionDOM);

    content.generate(sectionDOM, node.get(jsonDocument, `data.${section}`));
  });
}

init();
