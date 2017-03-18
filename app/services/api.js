import { setHeader, post, get, patch } from '../lib/request';
import config from '../../config';
import { API_REQUEST } from '../modules/api';

let authToken;

export function createUrl(path) {
  return `${config.get('api.baseURL')}${path}`;
}

async function login(email, password) {
  return post('/v1/auth/signin', {
    data: {
      email,
      password
    }
  });
}

export function getVideosUrl() {
  return createUrl('/v1/videos');
}

function getSignedOutputUrl(id, quality) {
  return get(createUrl(`/v1/videos/${id}/outputs/${quality}`));
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
  getSignedOutputUrl,
  changePassword(password) {
    return patch(createUrl('/v1/users/me'), {
      password
    });
  }
};
