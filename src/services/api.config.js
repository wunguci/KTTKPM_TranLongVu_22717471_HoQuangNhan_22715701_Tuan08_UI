const SERVER_IP = import.meta.env.VITE_SERVER_IP || 'localhost';

export const API_URLS = {
    PRODUCT: `http://${SERVER_IP}:${import.meta.env.VITE_PRODUCT_SERVICE_PORT || '8081'}`,
    CART: `http://${SERVER_IP}:${import.meta.env.VITE_CART_SERVICE_PORT || '8082'}`,
    ORDER: `http://${SERVER_IP}:${import.meta.env.VITE_ORDER_SERVICE_PORT || '8083'}`,
    INVENTORY: `http://${SERVER_IP}:${import.meta.env.VITE_INVENTORY_SERVICE_PORT || '8084'}`,
};
