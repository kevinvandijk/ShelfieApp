import apisauce from 'apisauce';
import Reactotron from 'reactotron';
import config from '../../config';

const api = apisauce.create({
  baseURL: config.get('api.baseURL')
});
let authToken;

api.addMonitor(Reactotron.apiLog);

async function login(email, password) {
  return api.post('/auth/login', {
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
