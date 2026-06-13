import { Package, ShoppingCart, Users, MessageSquare, Tag, Plus, Edit, Trash2 } from "lucide-react";
import { Navigation } from "../components/layout/Navigation";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { ProductForm } from "../components/admin/ProductForm";
import type { RefObject } from "react";
import type { ChatLog, Order, Product, UserType } from "../types";

type Page = "home" | "login" | "register" | "admin";

interface AdminPageProps {
  currentPage: Page;
  currentUser: UserType | null;
  cartCount: number;
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
  setCurrentPage: (page: Page) => void;
  setShowCart: (value: boolean) => void;
  handleLogout: () => void;
  productsRef: RefObject<HTMLDivElement | null>;
  promoRef: RefObject<HTMLDivElement | null>;
  brandRef: RefObject<HTMLDivElement | null>;
  contactRef: RefObject<HTMLDivElement | null>;
  scrollTo: (ref: RefObject<HTMLDivElement | null>) => void;
  products: Product[];
  users: UserType[];
  orders: Order[];
  chatLogs: ChatLog[];
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  showProductDialog: boolean;
  setShowProductDialog: (value: boolean) => void;
  handleSaveProduct: (productData: Partial<Product>) => void;
  handleDeleteProduct: (id: number) => void;
  handleDeleteUser: (id: number) => void;
  handleDeleteOrder: (id: number) => void;
  categoryList: string[];
  newCategoryName: string;
  setNewCategoryName: (value: string) => void;
  editingCategory: string | null;
  setEditingCategory: (value: string | null) => void;
  editingCategoryValue: string;
  setEditingCategoryValue: (value: string) => void;
  handleAddCategory: () => void;
  handleSaveCategory: (oldName: string) => void;
  handleDeleteCategory: (name: string) => void;
}

export function AdminPage(props: AdminPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={props.currentPage} currentUser={props.currentUser} cartCount={props.cartCount} showMobileMenu={props.showMobileMenu} setShowMobileMenu={props.setShowMobileMenu} setCurrentPage={props.setCurrentPage} setShowCart={props.setShowCart} handleLogout={props.handleLogout} productsRef={props.productsRef} promoRef={props.promoRef} brandRef={props.brandRef} contactRef={props.contactRef} scrollTo={props.scrollTo} />

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

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-heading font-semibold">Quản Lý Sản Phẩm ({props.products.length})</h2>
              <Button onClick={() => { props.setEditingProduct(null); props.setShowProductDialog(true); }}><Plus className="w-4 h-4 mr-2" />Thêm Sản Phẩm</Button>
            </div>
            <div className="grid gap-3">
              {props.products.map((product) => (
                <Card key={product.id} className="border-border/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-primary font-bold">{product.price.toLocaleString("vi-VN")} ₫</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => { props.setEditingProduct(product); props.setShowProductDialog(true); }}><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="destructive" onClick={() => props.handleDeleteProduct(product.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <h2 className="text-xl font-heading font-semibold">Quản Lý Đơn Hàng ({props.orders.length})</h2>
            <div className="grid gap-3">
              {props.orders.length === 0 ? (
                <Card><CardContent className="p-10 text-center text-muted-foreground">Chưa có đơn hàng nào</CardContent></Card>
              ) : props.orders.map((order) => (
                <Card key={order.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div><h3 className="font-semibold">Đơn hàng #{order.id}</h3><p className="text-sm text-muted-foreground">{order.date}</p></div>
                      <div className="flex items-center gap-2"><span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">{order.status}</span><Button size="sm" variant="destructive" onClick={() => props.handleDeleteOrder(order.id)}><Trash2 className="w-4 h-4" /></Button></div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      <p><span className="text-muted-foreground">Khách hàng:</span> {order.userName}</p>
                      <p><span className="text-muted-foreground">SĐT:</span> {order.phone}</p>
                      <p><span className="text-muted-foreground">Sản phẩm:</span> {order.productName}</p>
                      <p><span className="text-muted-foreground">Số lượng:</span> {order.quantity}</p>
                      <p className="col-span-2"><span className="text-muted-foreground">Địa chỉ:</span> {order.address}</p>
                      <p><span className="text-muted-foreground">Tổng:</span> <span className="text-primary font-bold">{order.total.toLocaleString("vi-VN")} ₫</span></p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <h2 className="text-xl font-heading font-semibold">Quản Lý Người Dùng ({props.users.length})</h2>
            <div className="grid gap-3">
              {props.users.map((user) => (
                <Card key={user.id} className="border-border/50">
                  <CardContent className="flex justify-between items-center p-4">
                    <div><h3 className="font-semibold">{user.name}</h3><p className="text-sm text-muted-foreground">{user.email}</p><span className="text-xs bg-secondary px-2 py-1 rounded-full">{user.isAdmin ? "Admin" : "Khách hàng"}</span></div>
                    <Button size="sm" variant="destructive" onClick={() => props.handleDeleteUser(user.id)}><Trash2 className="w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chats" className="space-y-4">
            <h2 className="text-xl font-heading font-semibold">Lịch Sử Chat ({props.chatLogs.length})</h2>
            {props.chatLogs.length === 0 ? <Card><CardContent className="p-10 text-center text-muted-foreground">Chưa có lịch sử chat</CardContent></Card> : props.chatLogs.map(log => (
              <Card key={log.id}><CardContent className="p-4"><h3 className="font-semibold">{log.userName}</h3><p className="text-sm text-muted-foreground">{log.date}</p><p className="text-sm mt-2">{log.messages.length} tin nhắn</p></CardContent></Card>
            ))}
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <h2 className="text-xl font-heading font-semibold">Quản Lý Danh Mục</h2>
            <div className="flex gap-2">
              <Input placeholder="Tên danh mục mới" value={props.newCategoryName} onChange={(e) => props.setNewCategoryName(e.target.value)} />
              <Button onClick={props.handleAddCategory}>Thêm</Button>
            </div>
            <div className="grid gap-3">
              {props.categoryList.map((cat) => (
                <Card key={cat}>
                  <CardContent className="p-4 flex items-center justify-between gap-3">
                    {props.editingCategory === cat ? (
                      <>
                        <Input value={props.editingCategoryValue} onChange={(e) => props.setEditingCategoryValue(e.target.value)} />
                        <Button onClick={() => props.handleSaveCategory(cat)}>Lưu</Button>
                      </>
                    ) : (
                      <>
                        <span className="font-medium">{cat}</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => { props.setEditingCategory(cat); props.setEditingCategoryValue(cat); }}><Edit className="w-4 h-4" /></Button>
                          <Button size="sm" variant="destructive" onClick={() => props.handleDeleteCategory(cat)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={props.showProductDialog} onOpenChange={props.setShowProductDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>{props.editingProduct ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}</DialogTitle></DialogHeader>
          <ProductForm product={props.editingProduct} onSave={props.handleSaveProduct} onCancel={() => { props.setShowProductDialog(false); props.setEditingProduct(null); }} availableCategories={props.categoryList} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
