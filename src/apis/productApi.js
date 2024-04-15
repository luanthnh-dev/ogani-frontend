import axiosClient from './axiosClient';

const PRODUCT_API = {
  findAllProduct: async ({ name = '', sort = '' }) => {
    let url = '/product/';
    if (name) {
      url += `?name=${name}`;
      if (sort) {
        url += `&sort=${sort}`;
      }
    } else if (sort) {
      url += `?sort=${sort}`;
    }

    const res = await axiosClient.get(url);
    return res;
  },
  findProductById: async (productId) => {
    const res = await axiosClient.get(`/product/${productId}/`);
    return res;
  },
  findLatestProducts: async () => {
    const res = await axiosClient.get(`/latest-products/`);
    return res;
  },
  findTopRatedProductsAPIView: async () => {
    const res = await axiosClient.get(`/top-rated-products/`);
    return res;
  },
  findReviewProductsAPIView: async () => {
    const res = await axiosClient.get(`/review-products/`);
    return res;
  },
};

export default PRODUCT_API;
