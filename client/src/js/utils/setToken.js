import axios from 'axios';

/**
 * @param {string} token
 * @returns {null} description
 */
export default function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
    axios
      .defaults
      .headers
      .post['Content-Type'] = 'application/x-www-form-urlencoded';
    return true;
  }
  delete axios.defaults.headers.common['x-token'];
}
