import { setHeader, post, get, patch } from '../lib/request';
import config from '../../config';
import { API_REQUEST } from '../modules/api';

let authToken;

export function createUrl(path) {
  return `${config.get('api.baseURL')}${path}`;
}

export function getLoginUrl() {
  return createUrl('/v1/auth/signin');
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
  setAuthToken,
  getSignedOutputUrl,
  changePassword(password) {
    return patch(createUrl('/v1/users/me'), {
      password
    });
  }
};
