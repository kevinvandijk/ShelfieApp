import apisauce from 'apisauce';
import Reactotron from 'reactotron';

const api = apisauce.create({
  baseUrl: ''
});

export const addMonitor = api.addMonitor(Reactotron.apiLog);
