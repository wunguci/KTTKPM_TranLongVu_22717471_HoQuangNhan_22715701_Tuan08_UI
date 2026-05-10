import React, { useState, useEffect } from 'react';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { ProductService } from './services/ProductService';
import { CartService } from './services/CartService';

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchCart();
        const interval = setInterval(fetchProducts, 3000);
        return () => clearInterval(interval);
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await ProductService.getProducts();
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products', err);
        }
    };

    const fetchCart = async () => {
        try {
            const data = await CartService.getCart();
            setCart(data);
        } catch (err) {
            console.error('Error fetching cart', err);
        }
    };

    const addToCart = async (productId) => {
        try {
            await CartService.addToCart(productId);
            setMessage({ type: 'success', text: 'Đã thêm vào giỏ hàng!' });
            fetchCart();
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.response?.data?.error || 'Lỗi thêm vào giỏ',
            });
        }
    };

    const checkout = async () => {
        setLoading(true);
        try {
            const res = await CartService.checkout();
            setMessage({
                type: 'success',
                text: `Đặt hàng thành công! Mã đơn: ${res.orderId}`,
            });
            fetchCart();
            fetchProducts();
        } catch (err) {
            setMessage({
                type: 'error',
                text: err.response?.data?.error || 'Đặt hàng thất bại',
            });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 5000);
        }
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col">
            <Header 
                cart={cart} 
                total={total} 
                loading={loading} 
                onCheckout={checkout} 
            />
            
            <main className="">
                <ProductPage 
                    products={products}
                    message={message}
                    onAddToCart={addToCart}
                />
            </main>

            <Footer />
        </div>
    );
}

export default App;
