import { setHeader, post, get, patch } from '../lib/request';

let authToken;

async function login(email, password) {
  return post('/v1/auth/signin', {
    data: {
      email,
      password
    }
  });
}

function getVideos() {
  return get('/v1/videos');
}

function getSignedOutputUrl(id, quality) {
  return get(`/v1/videos/${id}/outputs/${quality}`);
}

function setAuthToken(token) {
  authToken = token;
  setHeader('Authorization', `Bearer ${token}`);
}

export function getAuthToken() {
  return authToken;
}

export default {
  login,
  setAuthToken,
  getVideos,
  getSignedOutputUrl,
  changePassword(password) {
    return patch('/v1/users/me', {
      password
    });
  }
};
