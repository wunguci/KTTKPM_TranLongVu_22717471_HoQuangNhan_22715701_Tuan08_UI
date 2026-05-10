import React, { useState } from "react";
import {
  X,
  ShoppingCart,
  Star,
  Clock,
  ShieldCheck,
  Truck,
  RefreshCw,
} from "lucide-react";

const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!isOpen || !product) return null;

  const images = JSON.parse(product.imageUrls || "[]");
  // Kiểm tra sản phẩm đang giảm giá flash sale
  const isFlashSale =
    product.flashSalePrice &&
    Number(product.flashSalePrice) < Number(product.price);

  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* modal content */}
      <div className="relative w-full max-w-5xl bg-[#0a0a0a] border border-cyan-500/20 shadow-[0_0_100px_rgba(6,182,212,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-cyan-400 z-10 transition-colors p-2 hover:bg-cyan-500/5 rounded-full cursor-pointer"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[90vh] overflow-y-auto lg:overflow-hidden custom-scrollbar">
          {/* left: images */}
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-cyan-500/10 flex flex-col gap-6">
            <div className="aspect-4/5 overflow-hidden bg-[#050505] border border-cyan-500/5">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover animate-in fade-in duration-700"
              />
            </div>
            <div className="flex gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  className={`w-20 h-20 border transition-all duration-300 cursor-pointer ${
                    selectedImage === idx
                      ? "border-cyan-500 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      : "border-white/5 opacity-50 hover:opacity-100"
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* right: info */}
          <div className="p-8 lg:p-16 flex flex-col justify-between overflow-y-auto custom-scrollbar">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] tracking-[4px] uppercase text-cyan-500 font-black">
                  {product.categoryId}
                </span>
                <div className="flex items-center gap-1 text-cyan-400/60">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-bold">{product.rating}</span>
                  <span className="text-[10px] text-gray-600">
                    ({product.reviewCount} Reviews)
                  </span>
                </div>
              </div>

              <h2 className="text-4xl font-light tracking-tight text-white mb-6 uppercase leading-tight">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-4 mb-10">
                {isFlashSale ? (
                  <>
                    <span className="text-4xl font-light text-cyan-400">
                      {Number(product.flashSalePrice).toLocaleString()}{" "}
                      <span className="text-xs tracking-widest uppercase ml-1">
                        VND
                      </span>
                    </span>
                    <span className="text-lg text-gray-600 line-through font-light">
                      {Number(product.price).toLocaleString()}
                    </span>
                    <span className="bg-cyan-500 text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                      -
                      {Math.round(
                        (1 - product.flashSalePrice / product.price) * 100,
                      )}
                      % OFF
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-light text-cyan-400">
                    {Number(product.price).toLocaleString()}{" "}
                    <span className="text-xs tracking-widest uppercase ml-1">
                      VND
                    </span>
                  </span>
                )}
              </div>

              <p className="text-gray-400 font-light leading-relaxed mb-10 text-sm tracking-wide">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[2px] text-gray-600 font-bold">
                    Availability
                  </div>
                  <div className="text-sm text-cyan-400">
                    {product.stock} Units in Reserve
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] uppercase tracking-[2px] text-gray-600 font-bold">
                    Sold Units
                  </div>
                  <div className="text-sm text-white">
                    {product.soldCount} Successful Acquisitions
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-y border-cyan-500/5 py-8 mb-12">
                <div className="flex items-center gap-3 text-xs text-gray-500 font-light">
                  <ShieldCheck size={16} className="text-cyan-500" />
                  <span>2-Year International Warranty</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-light">
                  <Truck size={16} className="text-cyan-500" />
                  <span>Complimentary Global Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 font-light">
                  <RefreshCw size={16} className="text-cyan-500" />
                  <span>30-Day Bespoke Exchange Policy</span>
                </div>
              </div>
            </div>

            <button
              className="w-full py-6 bg-cyan-500 text-black text-[10px] font-black tracking-[4px] uppercase transition-all duration-500 hover:bg-cyan-400 hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98]  cursor-pointer"
              onClick={() => onAddToCart(product.id)}
              disabled={product.stock <= 0}
            >
              <ShoppingCart size={18} strokeWidth={2.5} />
              {product.stock > 0 ? "Initialize Acquisition" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
