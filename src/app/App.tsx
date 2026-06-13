import { useRef, useState, type RefObject } from "react";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AdminPage } from "./pages/AdminPage";
import { initialCategories, initialProducts, initialUsers } from "./data/mockData";
import type { CartItem, ChatLog, ChatMessage, Order, OrderFormData, Product, UserType } from "./types";

type Page = "home" | "login" | "register" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [users, setUsers] = useState<UserType[]>(initialUsers);
  const [orders, setOrders] = useState<Order[]>([]);
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất Cả");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn về mỹ phẩm hôm nay?", isUser: false, timestamp: new Date() },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

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

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductDialog, setShowProductDialog] = useState(false);

  const [categoryList, setCategoryList] = useState<string[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingCategoryValue, setEditingCategoryValue] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const productsRef = useRef<HTMLDivElement>(null);
  const promoRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setShowMobileMenu(false);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const categories = ["Tất Cả", ...categoryList];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Tất Cả" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
    setSelectedProduct(null);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQty = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleLogin = () => {
    const user = users.find((u) => u.email === loginEmail && u.password === loginPassword);
    if (!user) {
      toast.error("Email hoặc mật khẩu không đúng!");
      return;
    }

    setCurrentUser(user);
    setCurrentPage(user.isAdmin ? "admin" : "home");
    toast.success(`Xin chào, ${user.name}!`);
    setLoginEmail("");
    setLoginPassword("");
  };

  const handleRegister = () => {
    if (!registerName || !registerEmail || !registerPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (users.some((u) => u.email === registerEmail)) {
      toast.error("Email đã tồn tại!");
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

    if (cart.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

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
      const newOrders: Order[] = cart.map((item, index) => ({
        id: orders.length + index + 1,
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

      setOrders((prev) => [...prev, ...newOrders]);
      setCart([]);
      toast.success(`Đặt ${newOrders.length} sản phẩm thành công!`);
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

      setOrders((prev) => [...prev, newOrder]);
      toast.success(`Đặt hàng ${orderProduct.name} thành công!`);
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

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    if (currentUser) {
      const existingLog = chatLogs.find((log) => log.userId === currentUser.id);
      if (existingLog) {
        setChatLogs(
          chatLogs.map((log) =>
            log.userId === currentUser.id
              ? { ...log, messages: [...log.messages, userMessage] }
              : log
          )
        );
      } else {
        setChatLogs([
          ...chatLogs,
          {
            id: chatLogs.length + 1,
            userId: currentUser.id,
            userName: currentUser.name,
            messages: [userMessage],
            date: new Date().toLocaleDateString("vi-VN"),
          },
        ]);
      }
    }

    setTimeout(() => {
      const responses = [
        "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ hỗ trợ bạn ngay.",
        "Bạn có thể cho tôi biết loại da của bạn để tư vấn sản phẩm phù hợp hơn.",
        "Hiện tại chúng tôi đang có nhiều ưu đãi hấp dẫn, bạn hãy khám phá nhé!",
      ];
      const botMessage: ChatMessage = {
        id: Date.now(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...productData } : p)));
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
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Xóa sản phẩm thành công!");
  };

  const handleDeleteUser = (id: number) => {
    if (id === currentUser?.id) {
      toast.error("Không thể xóa tài khoản hiện tại!");
      return;
    }
    setUsers(users.filter((u) => u.id !== id));
    toast.success("Xóa người dùng thành công!");
  };

  const handleDeleteOrder = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id));
    toast.success("Xóa đơn hàng thành công!");
  };

  const handleAddCategory = () => {
    const name = newCategoryName.trim();
    if (!name) {
      toast.error("Vui lòng nhập tên danh mục!");
      return;
    }
    if (categoryList.includes(name)) {
      toast.error("Danh mục đã tồn tại!");
      return;
    }
    setCategoryList([...categoryList, name]);
    setNewCategoryName("");
    toast.success("Thêm danh mục thành công!");
  };

  const handleSaveCategory = (oldName: string) => {
    const name = editingCategoryValue.trim();
    if (!name) {
      toast.error("Tên danh mục không được để trống!");
      return;
    }
    if (name !== oldName && categoryList.includes(name)) {
      toast.error("Danh mục đã tồn tại!");
      return;
    }
    setCategoryList(categoryList.map((category) => (category === oldName ? name : category)));
    setProducts(products.map((product) => (product.category === oldName ? { ...product, category: name } : product)));
    setEditingCategory(null);
    toast.success("Cập nhật danh mục thành công!");
  };

  const handleDeleteCategory = (name: string) => {
    const inUse = products.some((product) => product.category === name);
    if (inUse) {
      toast.error(`Không thể xóa! Danh mục "${name}" đang được dùng bởi sản phẩm.`);
      return;
    }
    setCategoryList(categoryList.filter((category) => category !== name));
    toast.success("Xóa danh mục thành công!");
  };

  const commonPageProps = {
    currentPage,
    currentUser,
    cartCount,
    showMobileMenu,
    setShowMobileMenu,
    setCurrentPage,
    setShowCart,
    handleLogout,
    productsRef,
    promoRef,
    brandRef,
    contactRef,
    scrollTo,
  };

  return (
    <>
      <Toaster />
      {currentPage === "home" && (
        <HomePage
          {...commonPageProps}
          products={products}
          filteredProducts={filteredProducts}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
          openOrderForm={openOrderForm}
          cart={cart}
          cartTotal={cartTotal}
          showCart={showCart}
          removeFromCart={removeFromCart}
          updateCartQty={updateCartQty}
          openCartCheckout={openCartCheckout}
          showOrderForm={showOrderForm}
          setShowOrderForm={setShowOrderForm}
          cartCheckout={cartCheckout}
          orderProduct={orderProduct}
          orderForm={orderForm}
          setOrderForm={setOrderForm}
          handleSubmitOrder={handleSubmitOrder}
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
        />
      )}

      {currentPage === "login" && (
        <LoginPage
          {...commonPageProps}
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          handleLogin={handleLogin}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage
          {...commonPageProps}
          registerName={registerName}
          setRegisterName={setRegisterName}
          registerEmail={registerEmail}
          setRegisterEmail={setRegisterEmail}
          registerPassword={registerPassword}
          setRegisterPassword={setRegisterPassword}
          handleRegister={handleRegister}
        />
      )}

      {currentPage === "admin" && (
        <AdminPage
          {...commonPageProps}
          products={products}
          users={users}
          orders={orders}
          chatLogs={chatLogs}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          showProductDialog={showProductDialog}
          setShowProductDialog={setShowProductDialog}
          handleSaveProduct={handleSaveProduct}
          handleDeleteProduct={handleDeleteProduct}
          handleDeleteUser={handleDeleteUser}
          handleDeleteOrder={handleDeleteOrder}
          categoryList={categoryList}
          newCategoryName={newCategoryName}
          setNewCategoryName={setNewCategoryName}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
          editingCategoryValue={editingCategoryValue}
          setEditingCategoryValue={setEditingCategoryValue}
          handleAddCategory={handleAddCategory}
          handleSaveCategory={handleSaveCategory}
          handleDeleteCategory={handleDeleteCategory}
        />
      )}
    </>
  );
}
