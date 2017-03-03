import { setHeader, post, get, patch } from '../lib/request';

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
  setHeader('Authorization', `Bearer ${token}`);
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
