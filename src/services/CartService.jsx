import axios from 'axios';
import { API_URLS } from './api.config';

export const CartService = {
    getCart: async () => {
        const res = await axios.get(`${API_URLS.CART}/cart`);
        return res.data;
    },
    addToCart: async (productId, quantity = 1) => {
        const res = await axios.post(`${API_URLS.CART}/cart/add`, {
            productId,
            quantity,
        });
        return res.data;
    },
    checkout: async () => {
        const res = await axios.post(`${API_URLS.ORDER}/checkout`);
        return res.data;
    }
};
