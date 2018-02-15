// let localStorage = {};

const localStorage = {
  setItem(key, value) {
    return Object.assign(localStorage, { [key]: value });
  },
  getItem(key) {
    return localStorage[key];
  },
  removeItem(key) {
    return delete localStorage[key]; //eslint-disable-line
  },
  clear() {
    return {};
  }
};

export default localStorage;
