import CartBox from './CartBox';

const Header = ({ cart, total, loading, onCheckout }) => {
    return (
        <header className="w-full border-b border-stone-200 bg-[#f7f6f2]/90 backdrop-blur sticky top-0 z-100">
            <div className="w-full px-6 md:px-10 xl:px-16 py-4 flex items-center justify-between">
                <div className="flex flex-col cursor-pointer group">
                    <span className="font-serif text-xl text-stone-900 leading-none group-hover:text-stone-600 transition-colors duration-300">
                        Atelier
                    </span>
                    <span className="text-[9px] tracking-[0.3em] text-stone-400 uppercase mt-1">
                        High-Speed Data Grid
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {['Bộ Sưu Tập', 'Về Chúng Tôi', 'Bảo Quản'].map((item) => (
                        <button
                            key={item}
                            className="text-[10px] tracking-[0.2em] text-stone-400 uppercase hover:text-stone-900 transition-colors duration-200 cursor-pointer"
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                <CartBox
                    cart={cart}
                    total={total}
                    loading={loading}
                    onCheckout={onCheckout}
                />
            </div>
        </header>
    );
};

export default Header;
