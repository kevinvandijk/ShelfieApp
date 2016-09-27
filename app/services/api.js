import config from '../../config';
import { Alert } from 'react-native';
let authToken;

async function post(path, body) {
  const url = `${config.get('api.baseURL')}${path}`;
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(response => {
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

async function login(email, password) {
  return post('/auth/login', {
    email,
    password
  });
}

function setAuthToken(token) {
  authToken = token;
}

export default {
  login,
  setAuthToken
};
