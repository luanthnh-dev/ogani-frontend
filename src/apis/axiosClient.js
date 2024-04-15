import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

axiosClient.interceptors.request.use((config) => {
  let token = localStorage.getItem('token') || null;

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    // if (error.response.status === 401) {
    //   localStorage.removeItem('token');
    // }

    return Promise.reject(
      Object.keys(error.response?.data).length === 0 ? `${error.code}: ${error.message}` : error.response?.data
    );
  }
);

export default axiosClient;
