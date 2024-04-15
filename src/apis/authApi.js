import axiosClient from './axiosClient';

const AUTH_API = {
  login: async (user) => {
    const res = await axiosClient.post('/jwt/create', user);

    return res;
  },
  register: async (user) => await axiosClient.post('/users/', user),
  logout: async () => await axiosClient.get(`/users/logout`),
};

export default AUTH_API;
