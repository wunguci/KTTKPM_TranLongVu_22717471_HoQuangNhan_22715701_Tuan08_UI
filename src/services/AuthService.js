import axios from 'axios';
import { API_URLS } from './api.config';

const API_URL = API_URLS.USER;

export const AuthService = {
    login: async (username, password) => {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    register: async (username, password) => {
        const response = await axios.post(`${API_URL}/register`, { username, password });
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};
