import axios from 'axios';

// when we are using the same url for browser and server, we don't need inform it

/* 
  client => http://localhost:3000
  server => http://localhost:3000/api

  just pass ´/api´ into crete axios instance and it will work
*/

export const api = axios.create({
  baseURL: '/api',
});
