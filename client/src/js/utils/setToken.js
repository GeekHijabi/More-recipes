import axios from 'axios';

/**
 * @param {string} token
 * @returns {null} description
 */
export default function setToken(token) {
  localStorage.setItem('token', token);
  if (token) {
    axios.defaults.headers.common['x-token'] = `${token}`;
    return true;
  }
}
