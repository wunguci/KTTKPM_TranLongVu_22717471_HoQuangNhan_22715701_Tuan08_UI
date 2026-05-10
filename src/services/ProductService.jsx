import axios from 'axios';
import { API_URLS } from './api.config';

export const ProductService = {
    getProducts: async () => {
        const res = await axios.get(`${API_URLS.PRODUCT}/products`);
        return res.data;
    }
};
