import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AuthService } from '../services/AuthService';

const UserMenu = ({ onUserChange }) => {
    const [user, setUser] = useState(AuthService.getCurrentUser());
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const data = await AuthService.login(username, password);
                setUser(data);
                setShowModal(false);
                if (onUserChange) onUserChange(data);
            } else {
                await AuthService.register(username, password);
                setIsLogin(true);
                setError('Registration successful! Please login.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication failed');
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        setUser(null);
        if (onUserChange) onUserChange(null);
    };

    const modalContent = showModal ? (
        <div
            className="fixed inset-0 w-screen h-screen bg-stone-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
        >
            <div
                className="bg-[#fcfaf7] w-full max-w-md rounded-sm p-10 shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-stone-100 rounded-full -mr-16 -mt-16 opacity-50" />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="font-serif text-3xl text-stone-900 mb-2">
                                {isLogin ? 'Đăng nhập' : 'Tham gia'}
                            </h2>
                            <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase">
                                {isLogin
                                    ? 'Chào mừng bạn quay lại'
                                    : 'Trở thành một phần của Atelier'}
                            </p>
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="text-stone-400 hover:text-stone-900 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {error && (
                        <div
                            className={`p-4 mb-6 text-[11px] tracking-wide ${error.includes('successful') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
                        >
                            {error.toUpperCase()}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[9px] tracking-[0.2em] text-stone-400 uppercase">
                                Tên tài khoản
                            </label>
                            <input
                                type="text"
                                className="w-full bg-transparent border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors text-sm"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[9px] tracking-[0.2em] text-stone-400 uppercase">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                className="w-full bg-transparent border-b border-stone-200 py-2 text-stone-900 focus:outline-none focus:border-stone-900 transition-colors text-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-stone-900 text-white text-[10px] tracking-[0.3em] uppercase py-4 mt-4 hover:bg-stone-800 transition-all duration-300 shadow-lg shadow-stone-200"
                        >
                            {isLogin ? 'Xác nhận' : 'Đăng ký ngay'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[10px] tracking-[0.15em] text-stone-400 uppercase hover:text-stone-900 transition-colors"
                        >
                            {isLogin
                                ? 'Bạn chưa có tài khoản? Đăng ký'
                                : 'Đã có tài khoản? Quay lại đăng nhập'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <div className="relative">
            {user ? (
                <div className="flex items-center gap-6 pl-8 border-l border-stone-200">
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-3">
                            <span className="font-serif text-sm text-stone-900 font-medium">
                                {user.username}
                            </span>
                            <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center shadow-lg shadow-stone-200">
                                <span className="text-[11px] text-white font-bold">
                                    {user.username.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-[9px] tracking-[0.2em] text-stone-400 uppercase hover:text-red-500 transition-colors duration-300 font-bold"
                    >
                        đăng xuất
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowModal(true)}
                    className="text-[10px] tracking-[0.3em] text-stone-900 uppercase font-bold border-stone-900 pb-0.5 hover:text-stone-500 hover:border-stone-500 transition-all duration-300"
                >
                    Đăng nhập
                </button>
            )}

            {showModal && createPortal(modalContent, document.body)}
        </div>
    );
};

export default UserMenu;
