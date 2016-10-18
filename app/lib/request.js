import config from '../../config';
import { stringify } from 'qs';
import { Alert } from 'react-native';

let headers = {};

export async function request(method, path, options) {
  const url = `${config.get('api.baseURL')}${path}`;
  console.log('url', url);
  const body = options.body ? JSON.stringify(options.body) : null;

  return fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers
    },
    ...body
  })
  .then(response => {
    // If error, transform it into FSAA compliant error
    if (response.status >= 300) {
      return {
        error: true,
        payload: response,
        metadata: {
          url,
          body
        }
      };
    }
    // Else return payload
    return response.json().then(json => {
      return {
        payload: json
      };
    });
  })
  .catch(error => {
    const metadata = {
      url,
      body
    };

    return {
      error: true,
      payload: error,
      metadata
    };
  })
  .then(result => {
    if (result.error) {
      if (__DEV__) console.log('Network error', result); // eslint-disable-line
      if (config.get('api.showAlerts')) {
        Alert.alert('Network error');
      }
    }

    return result;
  });
}

export function setHeader(key, value) {
  headers = {
    ...headers,
    [key]: value
  };
}

export async function post(path, body) {
  return request('POST', path, { body });
}

export async function patch(path, body) {
  return request('PATCH', path, { body });
}

export async function destroy(path) {
  return request('DELETE', path);
}

export async function get(path, params) {
  return request('GET', path, stringify(params));
}
