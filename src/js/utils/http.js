const http = {
  get(url) {
    return fetch(url).then((response) => {
      if ((response.status >= 200 && response.status <= 399) || !response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    });
  },
};
