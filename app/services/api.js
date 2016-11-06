import { setHeader, post, get, patch } from '../lib/request';

async function login(email, password) {
  return post('/auth/login', {
    email,
    password
  });
}

function getVideos() {
  return get('/1/videos');
}

function getSignedOutputUrl(id, quality) {
  return get(`/1/videos/${id}/outputs/${quality}`);
}

function setAuthToken(token) {
  setHeader('Authorization', `Bearer ${token}`);
}

export default {
  login,
  setAuthToken,
  getVideos,
  getSignedOutputUrl,
  swapFBToken(fbToken) {
    return post('/auth/exchange/facebook', fbToken);
  },
  changePassword(password) {
    return patch('/1/users/me', {
      password
    });
  }
};
