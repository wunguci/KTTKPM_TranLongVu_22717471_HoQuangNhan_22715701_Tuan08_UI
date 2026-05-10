import axios from 'axios';
import { API_URLS } from './api.config';
import { AuthService } from './AuthService';

const getHeaders = () => {
    const user = AuthService.getCurrentUser();
    return user ? { 'x-user-id': user.username } : { 'x-user-id': 'user1' };
};

export const CartService = {
    getCart: async () => {
        const res = await axios.get(`${API_URLS.CART}/cart`, { headers: getHeaders() });
        return res.data;
    },
    addToCart: async (productId, quantity = 1) => {
        const res = await axios.post(`${API_URLS.CART}/cart/add`, {
            productId,
            quantity,
        }, { headers: getHeaders() });
        return res.data;
    },
    checkout: async () => {
        const res = await axios.post(`${API_URLS.ORDER}/checkout`, {}, { headers: getHeaders() });
        return res.data;
    }
};
