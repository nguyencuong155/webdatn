import type { Product, UserType } from "../types";

export const initialProducts: Product[] = [
  { id: 1, name: "Kem Dưỡng Ẩm Cao Cấp", price: 850000, category: "Chăm Sóc Da", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", description: "Kem dưỡng ẩm cao cấp với chiết xuất thiên nhiên, giúp da mịn màng và tươi trẻ.", badge: "Bán Chạy" },
  { id: 2, name: "Serum Vitamin C", price: 1200000, category: "Chăm Sóc Da", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop", description: "Serum vitamin C giúp làm sáng da, mờ thâm nám và chống lão hóa hiệu quả.", badge: "Mới" },
  { id: 3, name: "Son Môi Lì Luxury", price: 650000, category: "Trang Điểm", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop", description: "Son môi lì cao cấp, màu sắc chuẩn, lâu trôi và dưỡng môi tốt." },
  { id: 4, name: "Nước Hoa Hồng", price: 450000, category: "Chăm Sóc Da", image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop", description: "Nước hoa hồng cân bằng pH, se khít lỗ chân lông và cấp ẩm cho da." },
  { id: 5, name: "Phấn Nền Cushion", price: 780000, category: "Trang Điểm", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", description: "Phấn nền cushion che phủ hoàn hảo, tự nhiên và lâu trôi suốt 12 giờ.", badge: "Hot" },
  { id: 6, name: "Mascara Dài Mi", price: 520000, category: "Trang Điểm", image: "https://cf.shopee.vn/file/104e3407f0884cfe92503954320f7071", description: "Mascara giúp mi dài và cong vút tự nhiên, không lem, không vón cục." },
  { id: 7, name: "Sữa Rửa Mặt Gentle", price: 350000, category: "Làm Sạch", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", description: "Sữa rửa mặt dịu nhẹ, làm sạch sâu mà không làm khô da." },
  { id: 8, name: "Kem Chống Nắng SPF50", price: 550000, category: "Chăm Sóc Da", image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=400&fit=crop", description: "Kem chống nắng SPF50 bảo vệ da khỏi tia UV, không gây bết dính." },
];

export const initialUsers: UserType[] = [
  { id: 1, email: "admin@cosmetic.com", password: "admin123", name: "Admin", isAdmin: true },
  { id: 2, email: "user@example.com", password: "user123", name: "Nguyễn Thị Mai", isAdmin: false },
];

export const initialCategories = ["Chăm Sóc Da", "Trang Điểm", "Làm Sạch"];
