function generateHTML(content = '', props = {}) {
  var template = Handlebars.compile(content);
  return template(props);
}
