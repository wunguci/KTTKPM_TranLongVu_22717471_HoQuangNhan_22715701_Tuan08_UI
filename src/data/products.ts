export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  sla: string;
};

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Chuột Gaming Pulse X1",
    price: 349000,
    stock: 120,
    category: "Gear",
    sla: "5 ms",
  },
  {
    id: 2,
    name: "Bàn phím Cơ Noir TKL",
    price: 990000,
    stock: 64,
    category: "Gear",
    sla: "6 ms",
  },
  {
    id: 3,
    name: "Tai nghe Studio Lite",
    price: 1290000,
    stock: 42,
    category: "Audio",
    sla: "4 ms",
  },
  {
    id: 4,
    name: "SSD 1TB Flash Pro",
    price: 1890000,
    stock: 30,
    category: "Storage",
    sla: "3 ms",
  },
  {
    id: 5,
    name: "Máy chiếu Pocket Beam",
    price: 2790000,
    stock: 18,
    category: "Lifestyle",
    sla: "7 ms",
  },
  {
    id: 6,
    name: "Camera An ninh 2K",
    price: 1190000,
    stock: 55,
    category: "Home",
    sla: "5 ms",
  },
];
