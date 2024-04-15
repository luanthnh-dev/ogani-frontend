import axiosClient from './axiosClient';

const USER_API = {
  getUserCurrent: async () => {
    const res = await axiosClient.get(`/users/me/`);
    return res;
  },
  uploadAvatar: async (fromData) => await axiosClient.post(`/users/upload-avatar`, fromData),
};

export default USER_API;
