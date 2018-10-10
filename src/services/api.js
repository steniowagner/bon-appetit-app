import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.114:3001/bon-appetit/api/v1',
});

export default api;
