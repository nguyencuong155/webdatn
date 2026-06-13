import { X, ShoppingCart, Trash2, Minus, Plus, Package } from "lucide-react";
import { Button } from "../ui/button";
import type { CartItem } from "../../types";

interface CartDrawerProps {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  removeFromCart: (productId: number) => void;
  updateCartQty: (productId: number, delta: number) => void;
  openCartCheckout: () => void;
}

export function CartDrawer({ showCart, setShowCart, cart, cartCount, cartTotal, removeFromCart, updateCartQty, openCartCheckout }: CartDrawerProps) {
  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-[60] flex">
      <div className="flex-1 bg-black/40" onClick={() => setShowCart(false)} />
      <div className="w-full max-w-md bg-card flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-semibold text-lg">Giỏ Hàng</h2>
            {cartCount > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
          </div>
          <button onClick={() => setShowCart(false)} className="p-1.5 rounded-md hover:bg-secondary transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center"><ShoppingCart className="w-8 h-8 text-muted-foreground" /></div>
              <div><p className="font-semibold text-lg">Giỏ hàng trống</p><p className="text-sm text-muted-foreground mt-1">Hãy thêm sản phẩm vào giỏ để bắt đầu!</p></div>
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
                  <button onClick={() => removeFromCart(item.product.id)} className="p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                  <div className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-1">
                    <button onClick={() => updateCartQty(item.product.id, -1)} className="p-1 hover:text-primary transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                    <button onClick={() => updateCartQty(item.product.id, 1)} className="p-1 hover:text-primary transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-border px-5 py-4 space-y-3">
            <div className="flex justify-between items-center text-sm text-muted-foreground"><span>Tạm tính ({cartCount} sản phẩm)</span><span>{cartTotal.toLocaleString("vi-VN")} ₫</span></div>
            <div className="flex justify-between items-center text-sm text-muted-foreground"><span>Phí giao hàng</span><span className="text-green-600 font-medium">{cartTotal >= 399000 ? "Miễn phí" : "30.000 ₫"}</span></div>
            <div className="flex justify-between items-center font-heading font-bold text-lg border-t border-border pt-3"><span>Tổng Cộng</span><span className="text-primary">{(cartTotal + (cartTotal >= 399000 ? 0 : 30000)).toLocaleString("vi-VN")} ₫</span></div>
            <Button className="w-full h-11 text-base" onClick={openCartCheckout}><Package className="w-4 h-4 mr-2" />Thanh Toán</Button>
            <button onClick={() => setShowCart(false)} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-1">← Tiếp tục mua sắm</button>
          </div>
        )}
      </div>
    </div>
  );
}
