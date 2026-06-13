import { useState, useRef } from "react";
import {
  ShoppingBag, Search, User, Menu, X, LogOut, MessageCircle, Send, Minimize2,
  Package, Users, ShoppingCart, MessageSquare, Trash2, Edit, Plus, Star,
  Phone, Mail, MapPin, ChevronRight, Sparkles, Shield, Truck, Gift, Tag, Minus
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Label } from "./components/ui/label";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  badge?: string;
}

interface UserType {
  id: number;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

interface Order {
  id: number;
  userId: number;
  userName: string;
  productId: number;
  productName: string;
  quantity: number;
  total: number;
  date: string;
  status: string;
  phone: string;
  address: string;
  notes: string;
}

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatLog {
  id: number;
  userId: number;
  userName: string;
  messages: ChatMessage[];
  date: string;
}

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  quantity: number;
  notes: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Kem Dưỡng Ẩm Cao Cấp", price: 850000, category: "Chăm Sóc Da", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", description: "Kem dưỡng ẩm cao cấp với chiết xuất thiên nhiên, giúp da mịn màng và tươi trẻ.", badge: "Bán Chạy" },
  { id: 2, name: "Serum Vitamin C", price: 1200000, category: "Chăm Sóc Da", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop", description: "Serum vitamin C giúp làm sáng da, mờ thâm nám và chống lão hóa hiệu quả.", badge: "Mới" },
  { id: 3, name: "Son Môi Lì Luxury", price: 650000, category: "Trang Điểm", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop", description: "Son môi lì cao cấp, màu sắc chuẩn, lâu trôi và dưỡng môi tốt." },
  { id: 4, name: "Nước Hoa Hồng", price: 450000, category: "Chăm Sóc Da", image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&h=400&fit=crop", description: "Nước hoa hồng cân bằng pH, se khít lỗ chân lông và cấp ẩm cho da." },
  { id: 5, name: "Phấn Nền Cushion", price: 780000, category: "Trang Điểm", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop", description: "Phấn nền cushion che phủ hoàn hảo, tự nhiên và lâu trôi suốt 12 giờ.", badge: "Hot" },
  { id: 6, name: "Mascara Dài Mi", price: 520000, category: "Trang Điểm", image: "https://images.unsplash.com/photo-1631214524020-7e18db7f7e5c?w=400&h=400&fit=crop", description: "Mascara giúp mi dài và cong vút tự nhiên, không lem, không vón cục." },
  { id: 7, name: "Sữa Rửa Mặt Gentle", price: 350000, category: "Làm Sạch", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop", description: "Sữa rửa mặt dịu nhẹ, làm sạch sâu mà không làm khô da." },
  { id: 8, name: "Kem Chống Nắng SPF50", price: 550000, category: "Chăm Sóc Da", image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=400&h=400&fit=crop", description: "Kem chống nắng SPF50 bảo vệ da khỏi tia UV, không gây bết dính." },
];

const initialUsers: UserType[] = [
  { id: 1, email: "admin@cosmetic.com", password: "admin123", name: "Admin", isAdmin: true },
  { id: 2, email: "user@example.com", password: "user123", name: "Nguyễn Thị Mai", isAdmin: false },
];

function ProductForm({ product, onSave, onCancel, availableCategories }: {
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
  availableCategories: string[];
}) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    category: product?.category || availableCategories[0] || "",
    image: product?.image || "",
    description: product?.description || "",
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Tên Sản Phẩm</Label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Giá (VNĐ)</Label>
        <Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} />
      </div>
      <div className="space-y-2">
        <Label>Danh Mục</Label>
        <select className="w-full px-3 py-2 rounded-md border border-border bg-input-background text-sm" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
          {availableCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label>URL Hình Ảnh</Label>
        <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label>Mô Tả</Label>
        <textarea className="w-full px-3 py-2 rounded-md border border-border bg-input-background text-sm min-h-[90px] resize-none focus:outline-none focus:ring-1 focus:ring-ring" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={onCancel}>Hủy</Button>
        <Button onClick={() => onSave(formData)}>Lưu</Button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "login" | "register" | "admin">("home");
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất Cả");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn về mỹ phẩm hôm nay?", isUser: false, timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
    setSelectedProduct(null);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateCartQty = (productId: number, delta: number) => {
    setCart(prev => prev
      .map(i => i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i)
      .filter(i => i.quantity > 0)
    );
  };

  // Order form state
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [cartCheckout, setCartCheckout] = useState(false);
  const [orderForm, setOrderForm] = useState<OrderFormData>({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    notes: "",
  });

  // Admin state
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [orders, setOrders] = useState<Order[]>([]);
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductDialog, setShowProductDialog] = useState(false);

  // Category state
  const [categoryList, setCategoryList] = useState<string[]>(["Chăm Sóc Da", "Trang Điểm", "Làm Sạch"]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingCategoryValue, setEditingCategoryValue] = useState("");

  // Login/Register state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Section refs for scroll navigation
  const productsRef = useRef<HTMLDivElement>(null);
  const promoRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setShowMobileMenu(false);
  };

  const categories = ["Tất Cả", ...categoryList];

  const handleAddCategory = () => {
    const name = newCategoryName.trim();
    if (!name) { toast.error("Vui lòng nhập tên danh mục!"); return; }
    if (categoryList.includes(name)) { toast.error("Danh mục đã tồn tại!"); return; }
    setCategoryList([...categoryList, name]);
    setNewCategoryName("");
    toast.success("Thêm danh mục thành công!");
  };

  const handleSaveCategory = (oldName: string) => {
    const name = editingCategoryValue.trim();
    if (!name) { toast.error("Tên danh mục không được để trống!"); return; }
    if (name !== oldName && categoryList.includes(name)) { toast.error("Danh mục đã tồn tại!"); return; }
    setCategoryList(categoryList.map(c => c === oldName ? name : c));
    setProducts(products.map(p => p.category === oldName ? { ...p, category: name } : p));
    setEditingCategory(null);
    toast.success("Cập nhật danh mục thành công!");
  };

  const handleDeleteCategory = (name: string) => {
    const inUse = products.some(p => p.category === name);
    if (inUse) { toast.error(`Không thể xóa! Danh mục "${name}" đang được dùng bởi sản phẩm.`); return; }
    setCategoryList(categoryList.filter(c => c !== name));
    toast.success("Xóa danh mục thành công!");
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Tất Cả" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogin = () => {
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    if (user) {
      setCurrentUser(user);
      setCurrentPage(user.isAdmin ? "admin" : "home");
      toast.success(`Xin chào, ${user.name}!`);
      setLoginEmail("");
      setLoginPassword("");
    } else {
      toast.error("Email hoặc mật khẩu không đúng!");
    }
  };

  const handleRegister = () => {
    if (users.some(u => u.email === registerEmail)) {
      toast.error("Email đã tồn tại!");
      return;
    }
    if (!registerName || !registerEmail || !registerPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    const newUser: UserType = {
      id: users.length + 1,
      email: registerEmail,
      password: registerPassword,
      name: registerName,
      isAdmin: false,
    };
    setUsers([...users, newUser]);
    toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
    setCurrentPage("login");
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
    toast.success("Đã đăng xuất!");
  };

  const openOrderForm = (product: Product) => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để đặt hàng!");
      setCurrentPage("login");
      return;
    }
    setCartCheckout(false);
    setOrderProduct(product);
    setOrderForm({ name: currentUser.name, phone: "", address: "", quantity: 1, notes: "" });
    setShowOrderForm(true);
    setSelectedProduct(null);
  };

  const openCartCheckout = () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để đặt hàng!");
      setCurrentPage("login");
      return;
    }
    if (cart.length === 0) { toast.error("Giỏ hàng trống!"); return; }
    setCartCheckout(true);
    setOrderProduct(null);
    setOrderForm({ name: currentUser.name, phone: "", address: "", quantity: 1, notes: "" });
    setShowCart(false);
    setShowOrderForm(true);
  };

  const handleSubmitOrder = () => {
    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng!");
      return;
    }
    if (!currentUser) return;
    const date = new Date().toLocaleDateString("vi-VN");
    if (cartCheckout) {
      const newOrders: Order[] = cart.map((item, idx) => ({
        id: orders.length + idx + 1,
        userId: currentUser.id,
        userName: currentUser.name,
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
        date,
        status: "Đang xử lý",
        phone: orderForm.phone,
        address: orderForm.address,
        notes: orderForm.notes,
      }));
      setOrders(prev => [...prev, ...newOrders]);
      setCart([]);
      toast.success(`Đặt ${newOrders.length} sản phẩm thành công! Chúng tôi sẽ liên hệ sớm.`);
    } else {
      if (!orderProduct) return;
      const newOrder: Order = {
        id: orders.length + 1,
        userId: currentUser.id,
        userName: currentUser.name,
        productId: orderProduct.id,
        productName: orderProduct.name,
        quantity: orderForm.quantity,
        total: orderProduct.price * orderForm.quantity,
        date,
        status: "Đang xử lý",
        phone: orderForm.phone,
        address: orderForm.address,
        notes: orderForm.notes,
      };
      setOrders(prev => [...prev, newOrder]);
      toast.success(`Đặt hàng ${orderProduct.name} thành công! Chúng tôi sẽ liên hệ sớm.`);
    }
    setShowOrderForm(false);
    setOrderProduct(null);
    setCartCheckout(false);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMessage: ChatMessage = {
      id: chatMessages.length + 1,
      text: chatInput,
      isUser: true,
      timestamp: new Date(),
    };
    setChatMessages([...chatMessages, userMessage]);
    setChatInput("");

    if (currentUser) {
      const existingLog = chatLogs.find(log => log.userId === currentUser.id);
      if (existingLog) {
        setChatLogs(chatLogs.map(log =>
          log.userId === currentUser.id
            ? { ...log, messages: [...log.messages, userMessage] }
            : log
        ));
      } else {
        setChatLogs([...chatLogs, {
          id: chatLogs.length + 1,
          userId: currentUser.id,
          userName: currentUser.name,
          messages: [userMessage],
          date: new Date().toLocaleDateString("vi-VN"),
        }]);
      }
    }

    setTimeout(() => {
      const responses = [
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ hỗ trợ bạn ngay.",
        "Chào bạn! Bạn cần tư vấn về sản phẩm nào ạ?",
        "Hiện tại chúng tôi đang có nhiều ưu đãi hấp dẫn, bạn hãy khám phá nhé!",
      ];
      const botMessage: ChatMessage = {
        id: chatMessages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
      toast.success("Cập nhật sản phẩm thành công!");
    } else {
      const newProduct: Product = {
        id: products.length + 1,
        name: productData.name || "",
        price: productData.price || 0,
        category: productData.category || "Chăm Sóc Da",
        image: productData.image || "",
        description: productData.description || "",
      };
      setProducts([...products, newProduct]);
      toast.success("Thêm sản phẩm thành công!");
    }
    setShowProductDialog(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success("Xóa sản phẩm thành công!");
  };

  const handleDeleteUser = (id: number) => {
    if (id === currentUser?.id) {
      toast.error("Không thể xóa tài khoản hiện tại!");
      return;
    }
    setUsers(users.filter(u => u.id !== id));
    toast.success("Xóa người dùng thành công!");
  };

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter(o => o.id !== id));
    toast.success("Xóa đơn hàng thành công!");
  };

  // Navigation
  const Navigation = () => (
    <nav className="sticky top-0 z-50 bg-card/95 border-b border-border backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage("home")}>
            <ShoppingBag className="w-7 h-7 text-primary" />
            <span className="text-xl font-heading font-semibold tracking-wide">Lumière Beauty</span>
          </div>

          {currentPage === "home" && (
            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => setCurrentPage("home")} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Trang Chủ</button>
              <button onClick={() => scrollTo(productsRef)} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Sản Phẩm</button>
              <button onClick={() => scrollTo(promoRef)} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Khuyến Mãi</button>
              <button onClick={() => scrollTo(brandRef)} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Về Chúng Tôi</button>
              <button onClick={() => scrollTo(contactRef)} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Liên Hệ</button>
              {currentUser?.isAdmin && (
                <button onClick={() => setCurrentPage("admin")} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Quản Trị</button>
              )}
            </div>
          )}

          {currentPage !== "home" && (
            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => setCurrentPage("home")} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Trang Chủ</button>
              {currentUser?.isAdmin && (
                <button onClick={() => setCurrentPage("admin")} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Quản Trị</button>
              )}
            </div>
          )}

          <div className="hidden md:flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 rounded-md hover:bg-secondary transition-colors"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{currentUser.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Đăng Xuất
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setCurrentPage("login")}>
                  <User className="w-4 h-4 mr-1" />
                  Đăng Nhập
                </Button>
                <Button size="sm" onClick={() => setCurrentPage("register")}>Đăng Ký</Button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setShowCart(true)} className="relative p-2 rounded-md hover:bg-secondary transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-4 space-y-1">
            <button onClick={() => { setCurrentPage("home"); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 rounded-md hover:bg-secondary">Trang Chủ</button>
            {currentPage === "home" && (
              <>
                <button onClick={() => scrollTo(productsRef)} className="block w-full text-left px-3 py-2 rounded-md hover:bg-secondary">Sản Phẩm</button>
                <button onClick={() => scrollTo(promoRef)} className="block w-full text-left px-3 py-2 rounded-md hover:bg-secondary">Khuyến Mãi</button>
                <button onClick={() => scrollTo(brandRef)} className="block w-full text-left px-3 py-2 rounded-md hover:bg-secondary">Về Chúng Tôi</button>
                <button onClick={() => scrollTo(contactRef)} className="block w-full text-left px-3 py-2 rounded-md hover:bg-secondary">Liên Hệ</button>
              </>
            )}
            {currentUser?.isAdmin && (
              <button onClick={() => { setCurrentPage("admin"); setShowMobileMenu(false); }} className="block w-full text-left px-3 py-2 rounded-md hover:bg-secondary">Quản Trị</button>
            )}
            <div className="pt-2 border-t border-border space-y-2">
              {currentUser ? (
                <>
                  <div className="text-sm text-muted-foreground px-3 py-1">{currentUser.name}</div>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => { handleLogout(); setShowMobileMenu(false); }}>
                    <LogOut className="w-4 h-4 mr-2" />Đăng Xuất
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => { setCurrentPage("login"); setShowMobileMenu(false); }}>
                    <User className="w-4 h-4 mr-2" />Đăng Nhập
                  </Button>
                  <Button size="sm" className="w-full" onClick={() => { setCurrentPage("register"); setShowMobileMenu(false); }}>Đăng Ký</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-foreground text-background mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <span className="text-lg font-heading font-semibold">Lumière Beauty</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Thương hiệu mỹ phẩm cao cấp mang đến vẻ đẹp tự nhiên và sang trọng cho phái đẹp Việt Nam.
            </p>
            <div className="flex gap-3 mt-4">
              {["FB", "IG", "TK"].map(s => (
                <div key={s} className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary hover:bg-primary hover:text-white cursor-pointer transition-colors">{s}</div>
              ))}
            </div>
          </div>

          {/* Mục lục - Sản phẩm */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">Danh Mục Sản Phẩm</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {["Chăm Sóc Da", "Trang Điểm", "Làm Sạch", "Chống Nắng", "Dưỡng Môi", "Tinh Chất"].map(item => (
                <li key={item} className="flex items-center gap-1 hover:opacity-100 hover:text-primary cursor-pointer transition-colors" onClick={() => { setSelectedCategory(item.includes("Tất") ? "Tất Cả" : item); setCurrentPage("home"); scrollTo(productsRef); }}>
                  <ChevronRight className="w-3 h-3" />{item}
                </li>
              ))}
            </ul>
          </div>

          {/* Mục lục - Hỗ trợ */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2 text-sm opacity-70">
              {["Chính sách đổi trả", "Hướng dẫn mua hàng", "Câu hỏi thường gặp", "Theo dõi đơn hàng", "Bảo mật thông tin", "Điều khoản sử dụng"].map(item => (
                <li key={item} className="flex items-center gap-1 hover:opacity-100 cursor-pointer transition-colors">
                  <ChevronRight className="w-3 h-3" />{item}
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">Liên Hệ</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>123 Nguyễn Huệ, Q.1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>1800 1234 (Miễn phí)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@lumierebeauty.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm opacity-50">
          <p>© 2025 Lumière Beauty. Bảo lưu mọi quyền.</p>
          <p>Thiết kế với ❤ cho phái đẹp Việt Nam</p>
        </div>
      </div>
    </footer>
  );

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-secondary/50 via-accent/30 to-secondary/20 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-primary" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Bộ Sưu Tập Xuân Hè 2025
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight">
            Vẻ Đẹp Tự Nhiên<br />
            <span className="text-primary">Sang Trọng & Tinh Tế</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Khám phá bộ sưu tập mỹ phẩm cao cấp, mang đến làn da rạng ngời và tự tin mỗi ngày
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Button size="lg" onClick={() => scrollTo(productsRef)} className="text-base px-8">
              Khám Phá Ngay
              <ChevronRight className="w-5 h-5 ml-1" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo(brandRef)} className="text-base px-8">
              Về Chúng Tôi
            </Button>
          </div>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 bg-card h-12 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Sản phẩm", value: "200+" },
              { label: "Khách hàng", value: "50.000+" },
              { label: "Đánh giá 5 sao", value: "98%" },
              { label: "Năm kinh nghiệm", value: "10+" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-xl md:text-2xl font-heading font-bold">{stat.value}</div>
                <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div ref={productsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Sản Phẩm Nổi Bật</h2>
          <p className="text-muted-foreground">Được yêu thích nhất bởi hàng nghìn khách hàng</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 justify-center flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="aspect-square overflow-hidden bg-secondary/20 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                    {product.badge}
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">{product.category}</p>
                <h3 className="font-heading font-semibold text-base mb-2 leading-snug">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">(4.9)</span>
                </div>
                <p className="text-primary font-bold text-lg">
                  {product.price.toLocaleString("vi-VN")} ₫
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Promotions Section */}
      <div ref={promoRef} className="bg-gradient-to-r from-secondary/40 to-accent/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Ưu Đãi Đặc Biệt</h2>
            <p className="text-muted-foreground">Không bỏ lỡ những deal hấp dẫn nhất tháng này</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Gift, title: "Mua 2 Tặng 1", desc: "Áp dụng tất cả sản phẩm Chăm Sóc Da từ 500K", color: "text-rose-500", bg: "bg-rose-50" },
              { icon: Truck, title: "Miễn Phí Giao Hàng", desc: "Đơn hàng từ 399.000đ - giao nhanh 2 giờ nội thành", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: Shield, title: "Cam Kết Chính Hãng", desc: "100% sản phẩm nhập khẩu chính ngạch, có tem CO/CQ", color: "text-green-500", bg: "bg-green-50" },
            ].map(item => (
              <Card key={item.title} className="text-center p-6 hover:shadow-lg transition-shadow border-border/50">
                <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>

          {/* Promo Banner */}
          <div className="mt-8 bg-primary rounded-2xl p-8 text-primary-foreground text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white translate-y-1/2 -translate-x-1/4" />
            </div>
            <div className="relative">
              <div className="text-3xl md:text-5xl font-heading font-bold mb-2">Giảm 20%</div>
              <div className="text-lg opacity-90 mb-4">Cho đơn hàng đầu tiên khi đăng ký tài khoản</div>
              <Button variant="secondary" size="lg" onClick={() => setCurrentPage("register")} className="font-semibold">
                Đăng Ký Ngay
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About / Brand Section */}
      <div ref={brandRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Về Chúng Tôi
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Hành Trình Vì Vẻ Đẹp<br />
              <span className="text-primary">Tự Nhiên</span>
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Lumière Beauty được thành lập năm 2015 với sứ mệnh mang đến những sản phẩm chăm sóc sắc đẹp chất lượng cao, an toàn và phù hợp với làn da người Việt.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Chúng tôi hợp tác với các thương hiệu uy tín từ Hàn Quốc, Pháp và Nhật Bản để mang đến bộ sưu tập đa dạng, đáp ứng mọi nhu cầu làm đẹp.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Sản phẩm", value: "200+" },
                { label: "Thương hiệu đối tác", value: "30+" },
                { label: "Cửa hàng", value: "15+" },
                { label: "Nhân viên", value: "100+" },
              ].map(stat => (
                <div key={stat.label} className="bg-secondary/40 rounded-xl p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=400&fit=crop" alt="About 1" className="rounded-2xl object-cover w-full h-64 shadow-lg" />
            <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop" alt="About 2" className="rounded-2xl object-cover w-full h-64 mt-8 shadow-lg" />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-muted-foreground">Luôn sẵn sàng hỗ trợ bạn 7 ngày / tuần</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Phone, title: "Hotline", value: "1800 1234", sub: "Miễn phí • 8:00 – 22:00" },
            { icon: Mail, title: "Email", value: "hello@lumierebeauty.vn", sub: "Phản hồi trong 2 giờ" },
            { icon: MapPin, title: "Showroom", value: "123 Nguyễn Huệ, Q.1", sub: "TP. Hồ Chí Minh" },
          ].map(contact => (
            <Card key={contact.title} className="p-6 text-center hover:shadow-md transition-shadow border-border/50">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <contact.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="font-semibold mb-1">{contact.title}</div>
              <div className="text-primary font-medium text-sm mb-1">{contact.value}</div>
              <div className="text-xs text-muted-foreground">{contact.sub}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <Card className="w-80 sm:w-96 h-[480px] flex flex-col shadow-2xl border-primary/20">
            <CardHeader className="bg-primary text-primary-foreground flex flex-row items-center justify-between py-3 px-4 rounded-t-lg">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <CardTitle className="text-base">Hỗ Trợ Trực Tuyến</CardTitle>
              </div>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setChatOpen(false)}>
                <Minimize2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm ${msg.isUser ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="p-3 border-t border-border">
              <div className="flex gap-2 w-full">
                <Input
                  placeholder="Nhập tin nhắn..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSendMessage} className="shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg hover:scale-105 transition-transform" onClick={() => setChatOpen(true)}>
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>

      {/* Product Detail Modal */}
      <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-square rounded-xl overflow-hidden bg-secondary/20">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Danh Mục</p>
                    <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">{selectedProduct.category}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Giá Niêm Yết</p>
                    <p className="text-3xl font-heading font-bold text-primary">
                      {selectedProduct.price.toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                    <span className="text-sm text-muted-foreground ml-1">4.9 (128 đánh giá)</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Mô Tả</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{selectedProduct.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="w-4 h-4 text-green-500" />
                    <span>Miễn phí giao hàng đơn từ 399.000đ</span>
                  </div>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setSelectedProduct(null)}>Đóng</Button>
                <Button variant="secondary" onClick={() => addToCart(selectedProduct)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Thêm Vào Giỏ
                </Button>
                <Button onClick={() => openOrderForm(selectedProduct)}>
                  <Package className="w-4 h-4 mr-2" />
                  Đặt Hàng Ngay
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Form Dialog */}
      <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Thông Tin Đặt Hàng</DialogTitle>
          </DialogHeader>

          {/* Summary */}
          {cartCheckout ? (
            <div className="bg-secondary/40 rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto mb-1">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-md object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                  </div>
                  <p className="text-primary font-bold text-sm shrink-0">{(item.product.price * item.quantity).toLocaleString("vi-VN")} ₫</p>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between font-bold text-sm">
                <span>Tổng cộng</span>
                <span className="text-primary">{cartTotal.toLocaleString("vi-VN")} ₫</span>
              </div>
            </div>
          ) : orderProduct && (
            <div className="flex items-center gap-3 bg-secondary/40 rounded-xl p-3 mb-1">
              <img src={orderProduct.image} alt={orderProduct.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{orderProduct.name}</p>
                <p className="text-primary font-bold">{orderProduct.price.toLocaleString("vi-VN")} ₫</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="order-name">Họ và Tên *</Label>
                <Input id="order-name" placeholder="Nguyễn Văn A" value={orderForm.name} onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="order-phone">Số Điện Thoại *</Label>
                <Input id="order-phone" placeholder="0901 234 567" value={orderForm.phone} onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="order-address">Địa Chỉ Giao Hàng *</Label>
              <Input id="order-address" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" value={orderForm.address} onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })} />
            </div>
            {!cartCheckout && orderProduct && (
              <div className="space-y-1.5">
                <Label htmlFor="order-qty">Số Lượng</Label>
                <div className="flex items-center gap-3">
                  <Button type="button" variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={() => setOrderForm({ ...orderForm, quantity: Math.max(1, orderForm.quantity - 1) })}>−</Button>
                  <Input id="order-qty" type="number" min={1} className="text-center w-20" value={orderForm.quantity} onChange={(e) => setOrderForm({ ...orderForm, quantity: Math.max(1, parseInt(e.target.value) || 1) })} />
                  <Button type="button" variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={() => setOrderForm({ ...orderForm, quantity: orderForm.quantity + 1 })}>+</Button>
                  <span className="text-sm text-muted-foreground">= <span className="text-primary font-bold">{(orderProduct.price * orderForm.quantity).toLocaleString("vi-VN")} ₫</span></span>
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="order-notes">Ghi Chú</Label>
              <textarea id="order-notes" className="w-full px-3 py-2 rounded-md border border-border bg-input-background text-sm min-h-[80px] resize-none focus:outline-none focus:ring-1 focus:ring-ring" placeholder="Ghi chú thêm (màu sắc, yêu cầu đặc biệt...)" value={orderForm.notes} onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })} />
            </div>
          </div>

          <DialogFooter className="gap-2 mt-2">
            <Button variant="outline" onClick={() => setShowOrderForm(false)}>Hủy</Button>
            <Button onClick={handleSubmitOrder} className="px-8">
              <Package className="w-4 h-4 mr-2" />
              Xác Nhận Đặt Hàng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[60] flex">
          {/* Backdrop */}
          <div className="flex-1 bg-black/40" onClick={() => setShowCart(false)} />
          {/* Panel */}
          <div className="w-full max-w-md bg-card flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-lg">Giỏ Hàng</h2>
                {cartCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
                )}
              </div>
              <button onClick={() => setShowCart(false)} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Giỏ hàng trống</p>
                    <p className="text-sm text-muted-foreground mt-1">Hãy thêm sản phẩm vào giỏ để bắt đầu!</p>
                  </div>
                  <Button onClick={() => setShowCart(false)}>Tiếp Tục Mua Sắm</Button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 bg-secondary/30 rounded-xl p-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-snug">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{item.product.category}</p>
                      <p className="text-primary font-bold text-sm">{item.product.price.toLocaleString("vi-VN")} ₫</p>
                    </div>
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button onClick={() => removeFromCart(item.product.id)} className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-1">
                        <button onClick={() => updateCartQty(item.product.id, -1)} className="p-1 hover:text-primary transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateCartQty(item.product.id, 1)} className="p-1 hover:text-primary transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-border px-5 py-4 space-y-3">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Tạm tính ({cartCount} sản phẩm)</span>
                  <span>{cartTotal.toLocaleString("vi-VN")} ₫</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Phí giao hàng</span>
                  <span className="text-green-600 font-medium">{cartTotal >= 399000 ? "Miễn phí" : "30.000 ₫"}</span>
                </div>
                <div className="flex justify-between items-center font-heading font-bold text-lg border-t border-border pt-3">
                  <span>Tổng Cộng</span>
                  <span className="text-primary">{(cartTotal + (cartTotal >= 399000 ? 0 : 30000)).toLocaleString("vi-VN")} ₫</span>
                </div>
                <Button className="w-full h-11 text-base" onClick={openCartCheckout}>
                  <Package className="w-4 h-4 mr-2" />
                  Thanh Toán
                </Button>
                <button onClick={() => setShowCart(false)} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                  ← Tiếp tục mua sắm
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );

  // Login Page
  const LoginPage = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-heading">Đăng Nhập</CardTitle>
            <p className="text-sm text-muted-foreground">Chào mừng bạn trở lại Lumière Beauty</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" placeholder="email@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Mật Khẩu</Label>
              <Input id="login-password" type="password" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleLogin()} />
            </div>
            <div className="bg-secondary/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
              <p className="font-medium">Tài khoản demo:</p>
              <p>Admin: admin@cosmetic.com / admin123</p>
              <p>User: user@example.com / user123</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full" onClick={handleLogin}>Đăng Nhập</Button>
            <p className="text-sm text-muted-foreground text-center">
              Chưa có tài khoản?{" "}
              <button className="text-primary font-medium hover:underline" onClick={() => setCurrentPage("register")}>Đăng ký ngay</button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );

  // Register Page
  const RegisterPage = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-heading">Đăng Ký Tài Khoản</CardTitle>
            <p className="text-sm text-muted-foreground">Nhận ngay ưu đãi 20% cho đơn đầu tiên</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">Họ Tên</Label>
              <Input id="register-name" placeholder="Nguyễn Văn A" value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input id="register-email" type="email" placeholder="email@example.com" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Mật Khẩu</Label>
              <Input id="register-password" type="password" placeholder="••••••••" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full" onClick={handleRegister}>Đăng Ký</Button>
            <p className="text-sm text-muted-foreground text-center">
              Đã có tài khoản?{" "}
              <button className="text-primary font-medium hover:underline" onClick={() => setCurrentPage("login")}>Đăng nhập</button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );

  // Admin Page
  const AdminPage = () => (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-heading font-bold mb-2">Quản Trị Hệ Thống</h1>
        <p className="text-muted-foreground mb-8">Lumière Beauty Admin Dashboard</p>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="products"><Package className="w-4 h-4 mr-1" />Sản Phẩm</TabsTrigger>
            <TabsTrigger value="orders"><ShoppingCart className="w-4 h-4 mr-1" />Đơn Hàng</TabsTrigger>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-1" />Người Dùng</TabsTrigger>
            <TabsTrigger value="chats"><MessageSquare className="w-4 h-4 mr-1" />Chat Logs</TabsTrigger>
            <TabsTrigger value="categories"><Tag className="w-4 h-4 mr-1" />Danh Mục</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading font-semibold">Quản Lý Sản Phẩm ({products.length})</h2>
              <Button onClick={() => { setEditingProduct(null); setShowProductDialog(true); }}>
                <Plus className="w-4 h-4 mr-2" />Thêm Sản Phẩm
              </Button>
            </div>
            <div className="grid gap-3">
              {products.map((product) => (
                <Card key={product.id} className="border-border/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-primary font-bold">{product.price.toLocaleString("vi-VN")} ₫</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => { setEditingProduct(product); setShowProductDialog(true); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-xl font-heading font-semibold">Quản Lý Đơn Hàng ({orders.length})</h2>
            <div className="grid gap-3">
              {orders.length === 0 ? (
                <Card><CardContent className="p-10 text-center text-muted-foreground">Chưa có đơn hàng nào</CardContent></Card>
              ) : (
                orders.map((order) => (
                  <Card key={order.id} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">Đơn hàng #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">{order.status}</span>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteOrder(order.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                        <p><span className="text-muted-foreground">Khách hàng:</span> {order.userName}</p>
                        <p><span className="text-muted-foreground">SĐT:</span> {order.phone}</p>
                        <p><span className="text-muted-foreground">Sản phẩm:</span> {order.productName}</p>
                        <p><span className="text-muted-foreground">Số lượng:</span> {order.quantity}</p>
                        <p className="col-span-2"><span className="text-muted-foreground">Địa chỉ:</span> {order.address}</p>
                        {order.notes && <p className="col-span-2"><span className="text-muted-foreground">Ghi chú:</span> {order.notes}</p>}
                        <p><span className="text-muted-foreground">Tổng tiền:</span> <span className="text-primary font-bold">{order.total.toLocaleString("vi-VN")} ₫</span></p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <h2 className="text-xl font-heading font-semibold">Quản Lý Người Dùng ({users.length})</h2>
            <div className="grid gap-3">
              {users.map((user) => (
                <Card key={user.id} className="border-border/50">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.isAdmin ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                          {user.isAdmin ? "Quản trị viên" : "Người dùng"}
                        </span>
                      </div>
                    </div>
                    {user.id !== currentUser?.id && (
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Chat Logs Tab */}
          <TabsContent value="chats" className="space-y-4">
            <h2 className="text-xl font-heading font-semibold">Nhật Ký Chat ({chatLogs.length})</h2>
            <div className="grid gap-3">
              {chatLogs.length === 0 ? (
                <Card><CardContent className="p-10 text-center text-muted-foreground">Chưa có nhật ký chat nào</CardContent></Card>
              ) : (
                chatLogs.map((log) => (
                  <Card key={log.id} className="border-border/50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          {log.userName.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-base">{log.userName}</CardTitle>
                          <p className="text-xs text-muted-foreground">{log.date} • {log.messages.length} tin nhắn</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {log.messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${msg.isUser ? "bg-primary/10 text-foreground" : "bg-secondary"}`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading font-semibold">Quản Lý Danh Mục ({categoryList.length})</h2>
            </div>

            {/* Add new category */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <p className="text-sm font-medium mb-3 text-primary">Thêm Danh Mục Mới</p>
                <div className="flex gap-3">
                  <Input
                    placeholder="Nhập tên danh mục..."
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddCategory}>
                    <Plus className="w-4 h-4 mr-2" />Thêm
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category list */}
            <div className="grid gap-3">
              {categoryList.map((cat) => {
                const count = products.filter(p => p.category === cat).length;
                return (
                  <Card key={cat} className="border-border/50">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Tag className="w-4 h-4 text-primary" />
                      </div>
                      {editingCategory === cat ? (
                        <Input
                          className="flex-1"
                          value={editingCategoryValue}
                          onChange={(e) => setEditingCategoryValue(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSaveCategory(cat)}
                          autoFocus
                        />
                      ) : (
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold">{cat}</p>
                          <p className="text-xs text-muted-foreground">{count} sản phẩm</p>
                        </div>
                      )}
                      <div className="flex gap-2 shrink-0">
                        {editingCategory === cat ? (
                          <>
                            <Button size="sm" onClick={() => handleSaveCategory(cat)}>Lưu</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingCategory(null)}>Hủy</Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" onClick={() => { setEditingCategory(cat); setEditingCategoryValue(cat); }}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteCategory(cat)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => { setShowProductDialog(false); setEditingProduct(null); }}
            availableCategories={categoryList}
          />
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <>
      {currentPage === "home" && <HomePage />}
      {currentPage === "login" && <LoginPage />}
      {currentPage === "register" && <RegisterPage />}
      {currentPage === "admin" && <AdminPage />}
    </>
  );
}
