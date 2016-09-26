import config from '../../config';
let authToken;

async function post(path, body) {
  return fetch(`${config.get('api.baseURL')}/${path}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    return {
      payload: json
    };
  })
  .catch(error => {
    const metadata = {
      error,
      baseUrl: config.get('api.baseURL'),
      path,
      body
    };

    if (__DEV__) console.log('Network error', metadata); // eslint-disable-line

    return {
      error: true,
      payload: error,
      metadata
    };
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
