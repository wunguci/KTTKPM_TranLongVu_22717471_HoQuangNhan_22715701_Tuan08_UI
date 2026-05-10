import { useState, useRef, useEffect } from 'react';
import { ShoppingBag, X, CreditCard } from 'lucide-react';

const fmt = (n) => Number(n).toLocaleString('vi-VN');

const CartBox = ({ cart = [], total, loading, onCheckout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-stone-500 hover:text-stone-900 transition-colors duration-200 cursor-pointer"
          aria-label={`Cart (${cart?.length || 0} items)`}
        >
          <ShoppingBag size={22} strokeWidth={1.5} />
          {(cart?.length || 0) > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-stone-900 text-[#f7f6f2] text-[9px] font-semibold rounded-full flex items-center justify-center leading-none">
              {cart.length > 99 ? "99+" : cart.length}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute top-[calc(100%+1rem)] right-0 w-90 bg-[#faf9f6] border border-stone-200 shadow-xl z-1000">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
              <div>
                <p className="font-serif text-base text-stone-900 leading-none">
                  Your Selection
                </p>
                <p className="text-[9px] tracking-[0.25em] text-stone-400 uppercase mt-1">
                  {cart?.length || 0}{" "}
                  {(cart?.length || 0) === 1 ? "piece" : "pieces"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-stone-800 transition-colors p-1 cursor-pointer"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {(cart?.length || 0) === 0 ? (
                <div className="py-16 flex flex-col items-center gap-3 text-stone-300">
                  <ShoppingBag size={32} strokeWidth={1} />
                  <p className="text-[9px] tracking-[0.3em] uppercase text-stone-400">
                    Nothing here yet
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between px-6 py-4 border-b border-stone-100 last:border-0 group"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-stone-800 group-hover:text-stone-600 transition-colors">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-stone-400 tracking-wide">
                        {item.quantity} × {fmt(item.price)} ₫
                      </p>
                    </div>
                    <p className="text-sm font-light text-stone-700 shrink-0 ml-4">
                      {fmt(item.price * item.quantity)} ₫
                    </p>
                  </div>
                ))
              )}
            </div>

            {(cart?.length || 0) > 0 && (
              <div className="px-6 py-5 border-t border-stone-100">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-[10px] tracking-[0.2em] text-stone-400 uppercase">
                    Total
                  </span>
                  <span className="font-serif text-xl text-stone-900">
                    {fmt(total)}{" "}
                    <span className="text-xs text-stone-400 font-sans font-normal">
                      ₫
                    </span>
                  </span>
                </div>
                <button
                  onClick={() => {
                    onCheckout();
                    setIsOpen(false);
                  }}
                  disabled={loading}
                  className="w-full py-3.5 border border-stone-300 text-stone-800 text-[10px] tracking-[0.25em] uppercase font-medium hover:bg-stone-900 hover:text-white hover:border-stone-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard size={14} strokeWidth={1.5} />
                  {loading ? "Processing..." : "Checkout"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
};

export default CartBox;
