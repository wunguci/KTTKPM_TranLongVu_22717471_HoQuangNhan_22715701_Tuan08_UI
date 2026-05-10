import React, { useState } from 'react';
import { Check, X, Info } from 'lucide-react';

const fmt = (n) => Number(n).toLocaleString('vi-VN');

import { motion, AnimatePresence } from 'framer-motion';

/* toast */
const Toast = ({ message, type = 'success' }) => {
    const isError = type === 'error';
    const isSuccess = type === 'success';

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -20, x: '-50%' }}
                    className="fixed top-8 left-1/2 z-2000 pointer-events-none"
                >
                    <div className="flex items-center gap-4 px-6 py-4 bg-white/90 backdrop-blur-md border border-stone-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.12)] min-w-85">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                                isError
                                    ? 'bg-rose-50 text-rose-500'
                                    : isSuccess
                                      ? 'bg-emerald-50 text-emerald-500'
                                      : 'bg-blue-50 text-blue-500'
                            }`}
                        >
                            {isError ? (
                                <X size={18} strokeWidth={2.5} />
                            ) : isSuccess ? (
                                <Check size={18} strokeWidth={2.5} />
                            ) : (
                                <Info size={18} strokeWidth={2.5} />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[9px] tracking-[0.25em] text-stone-400 uppercase font-bold mb-0.5">
                                {isError
                                    ? 'Notification Error'
                                    : 'System Update'}
                            </p>
                            <p className="text-[13px] text-stone-800 font-medium leading-tight">
                                {message}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* modal */
const Modal = ({ product, isOpen, onClose, onAddToCart }) => {
    if (!product) return null;
    const imgs = JSON.parse(product.imageUrls || '[]');
    // xác định giá hiện tại nếu có flash sale
    const isSale =
        product.flashSalePrice &&
        Number(product.flashSalePrice) < Number(product.price);
    const displayPrice = isSale ? product.flashSalePrice : product.price;
    const disc = isSale
        ? Math.round((1 - product.flashSalePrice / product.price) * 100)
        : 0;

    return (
        <div
            className={`fixed inset-0 z-40 flex items-center justify-center bg-stone-950/70 backdrop-blur-sm transition-opacity duration-300 ${
                isOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
            }`}
            onClick={onClose}
        >
            <div
                className="relative bg-[#faf9f6] w-[92vw] max-w-3xl max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* image */}
                <div className="relative overflow-hidden bg-stone-100 h-64 md:h-auto">
                    <img
                        src={imgs[0] || 'https://via.placeholder.com/600x800'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    {isSale && (
                        <span className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1">
                            −{disc}%
                        </span>
                    )}
                </div>

                {/* info */}
                <div className="flex flex-col p-8 overflow-y-auto">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition-colors text-xl leading-none"
                    >
                        ✕
                    </button>

                    <p className="text-[10px] tracking-[0.2em] text-stone-400 uppercase mb-3">
                        {product.category || 'Collection'}
                    </p>
                    <h2 className="font-serif text-2xl text-stone-900 leading-snug mb-2">
                        {product.name}
                    </h2>
                    <div className="flex items-center gap-1 mb-5">
                        <span className="text-amber-400 text-sm">★</span>
                        <span className="text-xs text-stone-400">
                            {product.rating}
                        </span>
                    </div>

                    <p className="text-sm text-stone-500 leading-relaxed flex-1 mb-6">
                        {product.description}
                    </p>

                    <div className="mb-6">
                        {isSale && (
                            <p className="text-xs text-stone-400 line-through mb-0.5">
                                {fmt(product.price)} ₫
                            </p>
                        )}
                        <p
                            className={`text-3xl font-light tracking-tight ${
                                isSale ? 'text-rose-600' : 'text-stone-900'
                            }`}
                        >
                            {fmt(displayPrice)}{' '}
                            <span className="text-sm text-stone-400 font-normal">
                                ₫
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-stone-400 mb-4">
                        <span>
                            {product.stock > 0
                                ? `${product.stock} in stock`
                                : 'Sold out'}
                        </span>
                        {product.stock < 10 && product.stock > 0 && (
                            <span className="text-rose-500 font-semibold">
                                Low stock
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            onAddToCart(product.id);
                            onClose();
                        }}
                        disabled={product.stock <= 0}
                        className="w-full py-4 border border-stone-300 text-stone-800 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-stone-900 hover:text-white hover:border-stone-900 disabled:text-stone-300 disabled:border-stone-200 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, onAddToCart, onView }) => {
    const imgs = JSON.parse(product.imageUrls || '[]');
    const mainImage = imgs[0] || 'https://via.placeholder.com/600x800';
    const isSale =
        product.flashSalePrice &&
        Number(product.flashSalePrice) < Number(product.price);
    const disc = isSale
        ? Math.round((1 - product.flashSalePrice / product.price) * 100)
        : 0;
    const displayPrice = isSale ? product.flashSalePrice : product.price;

    return (
        <div className="group relative flex flex-col  bg-[#faf9f6] hover:bg-white hover:shadow-xl transition-all duration-500 overflow-hidden">
            {/* Image */}
            <div
                className="relative overflow-hidden bg-stone-100 cursor-pointer"
                style={{ aspectRatio: '3/4' }}
                onClick={() => onView(product)}
            >
                <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {isSale ? (
                        <span className="bg-rose-600 text-white text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1">
                            −{disc}%
                        </span>
                    ) : (
                        <span className="bg-stone-900 text-stone-100 text-[9px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1">
                            New
                        </span>
                    )}
                    {product.stock < 10 && product.stock > 0 && (
                        <span className="bg-amber-50 text-amber-700 text-[9px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1">
                            Low stock
                        </span>
                    )}
                </div>

                {/* quick view */}
                <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 backdrop-blur-sm text-stone-800 text-[9px] tracking-[0.25em] uppercase font-semibold px-5 py-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-stone-900 hover:text-white cursor-pointer">
                        Quick View
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-serif text-sm text-stone-900 leading-snug">
                        {product.name}
                    </h3>
                    <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
                        <span className="text-amber-400 text-[10px]">★</span>
                        <span className="text-[10px] text-stone-400">
                            {product.rating}
                        </span>
                    </div>
                </div>

                <p className="text-[10px] text-stone-400 leading-relaxed tracking-wide mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-end justify-between mt-auto mb-3">
                    <div>
                        {isSale && (
                            <p className="text-[10px] text-stone-400 line-through leading-none mb-0.5">
                                {fmt(product.price)} ₫
                            </p>
                        )}
                        <p
                            className={`text-lg font-light tracking-tight ${
                                isSale ? 'text-rose-600' : 'text-stone-900'
                            }`}
                        >
                            {fmt(displayPrice)}{' '}
                            <span className="text-[10px] text-stone-400 font-normal">
                                ₫
                            </span>
                        </p>
                    </div>
                    <p className="text-[9px] tracking-widest uppercase text-stone-400">
                        {product.stock > 0
                            ? `${product.stock} left`
                            : 'Sold out'}
                    </p>
                </div>

                <button
                    onClick={() => onAddToCart(product.id)}
                    disabled={product.stock <= 0}
                    className="w-full py-2.5 border rounded-4xl border-stone-300 text-stone-700 text-[9px] tracking-[0.25em] uppercase font-semibold hover:bg-stone-900 hover:text-white hover:border-stone-900 disabled:text-stone-300 disabled:border-stone-200 disabled:cursor-not-allowed transition-all duration-300"
                >
                    {product.stock > 0 ? 'Add to Cart' : 'Sold Out'}
                </button>
            </div>
        </div>
    );
};

const ProductPage = ({ products = [], message, onAddToCart }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const handleAddToCart = (id) => {
        const p = products.find((x) => x.id === id);
        onAddToCart?.(id);
        setToast(p ? `${p.name} added` : 'Added to cart');
        setTimeout(() => setToast(null), 2500);
    };

    return (
        <div className="w-full min-h-screen bg-[#f7f6f2] pt-8">
            <div className="w-full px-6 md:px-10 xl:px-16 py-6 border-b border-stone-100 flex items-center justify-between">
                <p className="text-[11px] tracking-[0.25em] text-stone-400 uppercase">
                    Những kiệt tác vượt thời gian
                </p>
                <p className="text-[11px] tracking-[0.25em] text-stone-400 uppercase hidden md:block">
                    Miễn phí vận chuyển cho đơn hàng trên 2.000.000 ₫
                </p>
            </div>

            <main className="px-20">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-4 gap-7">
                    {products.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onAddToCart={handleAddToCart}
                            onView={(prod) => {
                                setSelectedProduct(prod);
                                setIsModalOpen(true);
                            }}
                        />
                    ))}
                </div>
            </main>

            <Toast
                message={toast || message?.text}
                type={toast ? 'success' : message?.type}
            />

            <Modal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddToCart={handleAddToCart}
            />
        </div>
    );
};

export default ProductPage;
