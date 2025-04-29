import axios from 'axios';

const publicFetch = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export { publicFetch };
