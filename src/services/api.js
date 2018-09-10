import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.25.2:3000/bon-appetit/api/v1',
});

export default api;
