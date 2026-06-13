import type { RefObject } from "react";
import { Search, Sparkles, ChevronRight, Star, Gift, Truck, Shield, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Navigation } from "../components/layout/Navigation";
import { Footer } from "../components/layout/Footer";
import { ChatBotWidget } from "../components/chatbot/ChatBotWidget";
import { ProductDetailDialog } from "../components/product/ProductDetailDialog";
import { CartDrawer } from "../components/cart/CartDrawer";
import { OrderDialog } from "../components/order/OrderDialog";
import type { CartItem, ChatMessage, OrderFormData, Product, UserType } from "../types";

type Page = "home" | "login" | "register" | "admin";

interface HomePageProps {
  currentPage: Page;
  currentUser: UserType | null;
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  openOrderForm: (product: Product) => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
  setCurrentPage: (page: Page) => void;
  handleLogout: () => void;
  productsRef: RefObject<HTMLDivElement | null>;
  promoRef: RefObject<HTMLDivElement | null>;
  brandRef: RefObject<HTMLDivElement | null>;
  contactRef: RefObject<HTMLDivElement | null>;
  scrollTo: (ref: RefObject<HTMLDivElement | null>) => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  removeFromCart: (productId: number) => void;
  updateCartQty: (productId: number, delta: number) => void;
  openCartCheckout: () => void;
  showOrderForm: boolean;
  setShowOrderForm: (value: boolean) => void;
  cartCheckout: boolean;
  orderProduct: Product | null;
  orderForm: OrderFormData;
  setOrderForm: (data: OrderFormData) => void;
  handleSubmitOrder: () => void;
  chatOpen: boolean;
  setChatOpen: (value: boolean) => void;
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (value: string) => void;
  handleSendMessage: () => void;
}

export function HomePage(props: HomePageProps) {
  const {
    currentPage, currentUser, filteredProducts, categories, selectedCategory, setSelectedCategory,
    searchQuery, setSearchQuery, selectedProduct, setSelectedProduct, addToCart, openOrderForm,
    showMobileMenu, setShowMobileMenu, setCurrentPage, handleLogout,
    productsRef, promoRef, brandRef, contactRef, scrollTo,
    cart, cartCount, cartTotal, showCart, setShowCart, removeFromCart, updateCartQty, openCartCheckout,
    showOrderForm, setShowOrderForm, cartCheckout, orderProduct, orderForm, setOrderForm, handleSubmitOrder,
    chatOpen, setChatOpen, chatMessages, chatInput, setChatInput, handleSendMessage,
  } = props;

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} currentUser={currentUser} cartCount={cartCount} showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} setCurrentPage={setCurrentPage} setShowCart={setShowCart} handleLogout={handleLogout} productsRef={productsRef} promoRef={promoRef} brandRef={brandRef} contactRef={contactRef} scrollTo={scrollTo} />

      <div className="bg-gradient-to-br from-secondary/50 via-accent/30 to-secondary/20 py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />Bộ Sưu Tập Xuân Hè 2025
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
            Vẻ Đẹp Tự Nhiên<br /><span className="text-primary">Sang Trọng & Tinh Tế</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Khám phá bộ sưu tập mỹ phẩm cao cấp, mang đến làn da rạng ngời và tự tin mỗi ngày
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Button size="lg" onClick={() => scrollTo(productsRef)} className="text-base px-8">Khám Phá Ngay<ChevronRight className="w-5 h-5 ml-1" /></Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo(brandRef)} className="text-base px-8">Về Chúng Tôi</Button>
          </div>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Tìm kiếm sản phẩm..." className="pl-10 bg-card h-12 shadow-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[{ label: "Sản phẩm", value: "200+" }, { label: "Khách hàng", value: "50.000+" }, { label: "Đánh giá 5 sao", value: "98%" }, { label: "Năm kinh nghiệm", value: "10+" }].map(stat => (
              <div key={stat.label}><div className="text-xl md:text-2xl font-heading font-bold">{stat.value}</div><div className="text-xs md:text-sm opacity-80">{stat.label}</div></div>
            ))}
          </div>
        </div>
      </div>

      <div ref={productsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Sản Phẩm Nổi Bật</h2>
          <p className="text-muted-foreground">Được yêu thích nhất bởi hàng nghìn khách hàng</p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 justify-center flex-wrap">
          {categories.map((category) => (
            <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)} className="whitespace-nowrap">
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30" onClick={() => setSelectedProduct(product)}>
              <div className="aspect-square overflow-hidden bg-secondary/20 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.badge && <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">{product.badge}</div>}
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{product.category}</p>
                <h3 className="font-heading font-semibold text-base mb-2 leading-snug">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}<span className="text-xs text-muted-foreground ml-1">(4.9)</span></div>
                <p className="text-primary font-bold text-lg">{product.price.toLocaleString("vi-VN")} ₫</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div ref={promoRef} className="bg-gradient-to-r from-secondary/40 to-accent/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10"><h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Ưu Đãi Đặc Biệt</h2><p className="text-muted-foreground">Không bỏ lỡ những deal hấp dẫn nhất tháng này</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ icon: Gift, title: "Mua 2 Tặng 1", desc: "Áp dụng tất cả sản phẩm Chăm Sóc Da từ 500K", color: "text-rose-500", bg: "bg-rose-50" }, { icon: Truck, title: "Miễn Phí Giao Hàng", desc: "Đơn hàng từ 399.000đ", color: "text-blue-500", bg: "bg-blue-50" }, { icon: Shield, title: "Cam Kết Chính Hãng", desc: "100% sản phẩm chính hãng", color: "text-green-500", bg: "bg-green-50" }].map(item => (
              <Card key={item.title} className="text-center p-6 hover:shadow-lg transition-shadow border-border/50">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}><item.icon className={`w-7 h-7 ${item.color}`} /></div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3><p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div ref={brandRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6"><Sparkles className="w-4 h-4" />Về Chúng Tôi</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Hành Trình Vì Vẻ Đẹp<br /><span className="text-primary">Tự Nhiên</span></h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">Lumière Beauty được thành lập với sứ mệnh mang đến những sản phẩm chăm sóc sắc đẹp chất lượng cao, an toàn và phù hợp với làn da người Việt.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=400&fit=crop" alt="About 1" className="rounded-2xl object-cover w-full h-64 shadow-lg" />
            <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop" alt="About 2" className="rounded-2xl object-cover w-full h-64 mt-8 shadow-lg" />
          </div>
        </div>
      </div>

      <div ref={contactRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10"><h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Liên Hệ Với Chúng Tôi</h2><p className="text-muted-foreground">Luôn sẵn sàng hỗ trợ bạn 7 ngày / tuần</p></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[{ icon: Phone, title: "Hotline", value: "1800 1234", sub: "Miễn phí" }, { icon: Mail, title: "Email", value: "hello@lumierebeauty.vn", sub: "Phản hồi trong 2 giờ" }, { icon: MapPin, title: "Showroom", value: "123 Nguyễn Huệ, Q.1", sub: "TP. Hồ Chí Minh" }].map(contact => (
            <Card key={contact.title} className="p-6 text-center hover:shadow-md transition-shadow border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3"><contact.icon className="w-6 h-6 text-primary" /></div>
              <div className="font-semibold mb-1">{contact.title}</div><div className="text-primary font-medium text-sm mb-1">{contact.value}</div><div className="text-xs text-muted-foreground">{contact.sub}</div>
            </Card>
          ))}
        </div>
      </div>

      <ChatBotWidget chatOpen={chatOpen} setChatOpen={setChatOpen} chatMessages={chatMessages} chatInput={chatInput} setChatInput={setChatInput} handleSendMessage={handleSendMessage} />
      <ProductDetailDialog selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} addToCart={addToCart} openOrderForm={openOrderForm} />
      <OrderDialog showOrderForm={showOrderForm} setShowOrderForm={setShowOrderForm} cartCheckout={cartCheckout} cart={cart} cartTotal={cartTotal} orderProduct={orderProduct} orderForm={orderForm} setOrderForm={setOrderForm} handleSubmitOrder={handleSubmitOrder} />
      <CartDrawer showCart={showCart} setShowCart={setShowCart} cart={cart} cartCount={cartCount} cartTotal={cartTotal} removeFromCart={removeFromCart} updateCartQty={updateCartQty} openCartCheckout={openCartCheckout} />
      <Footer setCurrentPage={setCurrentPage} setSelectedCategory={setSelectedCategory} productsRef={productsRef} scrollTo={scrollTo} />
    </div>
  );
}
