import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { ProductService } from './services/ProductService';
import { CartService } from './services/CartService';
import { AuthService } from './services/AuthService';

const Toast = ({ message, type = 'success' }) => {
    if (!message) return null;
    const isError = type === 'error';

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 20, x: '-50%' }}
                className="fixed bottom-10 left-1/2 z-[10000] pointer-events-none"
            >
                <div className="flex items-center gap-4 px-6 py-4 bg-white shadow-2xl border border-stone-200 min-w-[340px]">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        isError ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'
                    }`}>
                        {isError ? <X size={20} /> : <Check size={20} />}
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase font-bold">
                            {isError ? 'Lỗi hệ thống' : 'Thông báo'}
                        </p>
                        <p className="text-sm text-stone-900 font-medium">
                            {message}
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

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
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const checkout = async () => {
        const user = AuthService.getCurrentUser();
        if (!user) {
            setMessage({
                type: 'error',
                text: 'Bạn cần đăng nhập để thực hiện thanh toán!',
            });
            setTimeout(() => setMessage(null), 5000);
            return;
        }

        setLoading(true);
        console.log('Starting checkout...');
        try {
            const res = await CartService.checkout();
            console.log('Checkout success:', res);
            setMessage({
                type: 'success',
                text: `Đặt hàng thành công! Mã đơn: ${res.orderId}`,
            });
            await fetchCart();
            await fetchProducts();
        } catch (err) {
            console.error('Checkout error:', err);
            setMessage({
                type: 'error',
                text: err.response?.data?.error || 'Đặt hàng thất bại',
            });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(null), 6000);
        }
    };

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const handleUserChange = () => {
        fetchCart();
    };

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col">
            <Header 
                cart={cart} 
                total={total} 
                loading={loading} 
                onCheckout={checkout} 
                onUserChange={handleUserChange}
            />
            
            <main className="">
                <ProductPage 
                    products={products}
                    onAddToCart={addToCart}
                />
            </main>

            <Toast 
                message={message?.text} 
                type={message?.type} 
            />

            <Footer />
        </div>
    );
}

export default App;
