# Flash Sale Frontend — Space-Based Architecture

**Thành viên:** Trần Long Vũ & Hồ Quang Nhân

Hệ thống UI được thiết kế theo phong cách **Quiet Luxury**, tinh tế và hiện đại, kết nối với hệ thống backend SBA qua các dịch vụ phân tán.

## Tính năng
- **Trần Long Vũ (22717471):** 
    - **Home Page**: Hiển thị danh sách sản phẩm Dior Luxury với hiệu ứng hover và layout sang trọng.
    - **Product Details**: Trang chi tiết sản phẩm, chọn biến thể (size/color), xem thông tin chất liệu, xuất xứ.
    - **Shopping Cart**: Mini-cart dropdown và trang giỏ hàng, cập nhật số lượng trực tiếp.
- **Hồ Quang Nhân (22715701):**
    - **User Auth**: Hệ thống Đăng nhập/Đăng xuất bảo mật.
    - **Checkout Flow**: Quy trình thanh toán, nhập thông tin giao hàng.
    - **Inventory Sync**: Hiển thị trạng thái kho hàng thời gian thực (Flash Sale).
    - **Order History**: Xem lại các đơn hàng đã đặt.

## Công nghệ
- **ReactJS** + **Vite**
- **Tailwind CSS** (Quiet Luxury style)
- **Lucide React** (Icons)
- **Framer Motion** (Animations)

## Cách chạy
```bash
# Cài đặt dependencies
npm install

# Chạy môi trường phát triển
npm run dev
```

**Truy cập:** `http://localhost:5173`
