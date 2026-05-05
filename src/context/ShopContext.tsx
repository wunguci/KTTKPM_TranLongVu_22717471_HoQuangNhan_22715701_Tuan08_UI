import { createContext, useContext, useMemo, useState } from "react";
import { initialProducts, type Product } from "../data/products";

export type CartItem = Product & {
  qty: number;
  subtotal: number;
};

type ShopContextValue = {
  products: Product[];
  cartItems: CartItem[];
  total: number;
  orderMessage: string;
  addToCart: (id: number) => void;
  changeQty: (id: number, delta: number) => void;
  checkout: () => void;
  clearMessage: () => void;
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [orderMessage, setOrderMessage] = useState("");

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({
          ...product,
          qty: cart[product.id],
          subtotal: cart[product.id] * product.price,
        })),
    [cart, products],
  );

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.subtotal, 0),
    [cartItems],
  );

  const addToCart = (id: number) => {
    const product = products.find((item) => item.id === id);
    if (!product || product.stock === 0) {
      return;
    }

    setCart((prev) => {
      const current = prev[id] ?? 0;
      if (current >= product.stock) {
        return prev;
      }
      return { ...prev, [id]: current + 1 };
    });
    setOrderMessage("");
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] ?? 0) + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
    setOrderMessage("");
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      setOrderMessage("Giỏ hàng trống. Vui lòng thêm sản phẩm.");
      return;
    }

    setProducts((prev) =>
      prev.map((product) => {
        const qty = cart[product.id] ?? 0;
        return {
          ...product,
          stock: Math.max(product.stock - qty, 0),
        };
      }),
    );
    setCart({});
    setOrderMessage(`Checkout thành công. Mã đơn #FS-${Date.now() % 100000}`);
  };

  const clearMessage = () => {
    setOrderMessage("");
  };

  const value = {
    products,
    cartItems,
    total,
    orderMessage,
    addToCart,
    changeQty,
    checkout,
    clearMessage,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }
  return context;
};
