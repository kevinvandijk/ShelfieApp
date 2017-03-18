import { setHeader, post, get, patch } from '../lib/request';
import config from '../../config';
import { API_REQUEST } from '../modules/api';

let authToken;

function createUrl(path) {
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

function getVideos() {
  const url = createUrl('/v1/videos');
  return {
    type: API_REQUEST,
    payload: {
      url,
      method: 'GET'
    }
  };
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
  getVideos,
  getSignedOutputUrl,
  changePassword(password) {
    return patch(createUrl('/v1/users/me'), {
      password
    });
  }
};
