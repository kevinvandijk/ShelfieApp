import apisauce from 'apisauce';
import Reactotron from 'reactotron';
import config from '../../config';

const api = apisauce.create({
  baseURL: config.get('api.baseURL')
});

api.addMonitor(Reactotron.apiLog);

async function login(email, password) {
  return api.post('/auth/login', {
    email,
    password
  });
}

export default {
  login
};
