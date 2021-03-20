const node = {
  get(jsonDocument, path = '', defaults = DEFAULTS) {
    return get(jsonDocument, path, get(defaults, path, ''));
  },
};
