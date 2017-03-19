import config from '../../config';

export function createUrl(path) {
  return `${config.get('api.baseURL')}${path}`;
}

export function getLoginUrl() {
  return createUrl('/v1/auth/signin');
}

export function getVideosUrl() {
  return createUrl('/v1/videos');
}

export function getOutputUrl(id, quality) {
  return createUrl(`/v1/videos/${id}/outputs/${quality}`);
}
