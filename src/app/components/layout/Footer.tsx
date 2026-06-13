import type { RefObject } from "react";
import { ShoppingBag, ChevronRight, MapPin, Phone, Mail } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: "home" | "login" | "register" | "admin") => void;
  setSelectedCategory: (category: string) => void;
  productsRef: RefObject<HTMLDivElement | null>;
  scrollTo: (ref: RefObject<HTMLDivElement | null>) => void;
}

export function Footer({ setCurrentPage, setSelectedCategory, productsRef, scrollTo }: FooterProps) {
  return (
    <footer className="bg-foreground text-background mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <span className="text-lg font-heading font-semibold">Lumière Beauty</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Thương hiệu mỹ phẩm cao cấp mang đến vẻ đẹp tự nhiên và sang trọng cho phái đẹp Việt Nam.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">Danh Mục Sản Phẩm</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {["Chăm Sóc Da", "Trang Điểm", "Làm Sạch", "Chống Nắng", "Dưỡng Môi", "Tinh Chất"].map(item => (
                <li
                  key={item}
                  className="flex items-center gap-1 hover:opacity-100 hover:text-primary cursor-pointer transition-colors"
                  onClick={() => { setSelectedCategory(item); setCurrentPage("home"); scrollTo(productsRef); }}
                >
                  <ChevronRight className="w-3 h-3" />{item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {["Chính sách đổi trả", "Hướng dẫn mua hàng", "Câu hỏi thường gặp", "Theo dõi đơn hàng", "Bảo mật thông tin"].map(item => (
                <li key={item} className="flex items-center gap-1 hover:opacity-100 cursor-pointer transition-colors">
                  <ChevronRight className="w-3 h-3" />{item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">Liên Hệ</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" /><span>123 Nguyễn Huệ, Q.1, TP. Hồ Chí Minh</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary shrink-0" /><span>1800 1234</span></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary shrink-0" /><span>hello@lumierebeauty.vn</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-sm opacity-50 text-center">
          © 2025 Lumière Beauty. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  );
}
