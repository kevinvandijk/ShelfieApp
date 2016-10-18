import { setHeader, post, get } from '../lib/request';

async function login(email, password) {
  return post('/auth/login', {
    email,
    password
  });
}

function setAuthToken(token) {
  setHeader('Authorization', `Bearer ${token}`);
}

export default {
  login,
  setAuthToken
};
