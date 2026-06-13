import { Package } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import type { CartItem, OrderFormData, Product } from "../../types";

interface OrderDialogProps {
  showOrderForm: boolean;
  setShowOrderForm: (value: boolean) => void;
  cartCheckout: boolean;
  cart: CartItem[];
  cartTotal: number;
  orderProduct: Product | null;
  orderForm: OrderFormData;
  setOrderForm: (data: OrderFormData) => void;
  handleSubmitOrder: () => void;
}

export function OrderDialog({ showOrderForm, setShowOrderForm, cartCheckout, cart, cartTotal, orderProduct, orderForm, setOrderForm, handleSubmitOrder }: OrderDialogProps) {
  return (
    <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="font-heading text-xl">Thông Tin Đặt Hàng</DialogTitle></DialogHeader>

        {cartCheckout ? (
          <div className="bg-secondary/40 rounded-xl p-3 space-y-2 max-h-40 overflow-y-auto mb-1">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-3">
                <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-md object-cover shrink-0" />
                <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate">{item.product.name}</p><p className="text-xs text-muted-foreground">x{item.quantity}</p></div>
                <p className="text-primary font-bold text-sm shrink-0">{(item.product.price * item.quantity).toLocaleString("vi-VN")} ₫</p>
              </div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between font-bold text-sm"><span>Tổng cộng</span><span className="text-primary">{cartTotal.toLocaleString("vi-VN")} ₫</span></div>
          </div>
        ) : orderProduct && (
          <div className="flex items-center gap-3 bg-secondary/40 rounded-xl p-3 mb-1">
            <img src={orderProduct.image} alt={orderProduct.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate">{orderProduct.name}</p><p className="text-primary font-bold">{orderProduct.price.toLocaleString("vi-VN")} ₫</p></div>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label htmlFor="order-name">Họ và Tên *</Label><Input id="order-name" placeholder="Nguyễn Văn A" value={orderForm.name} onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })} /></div>
            <div className="space-y-1.5"><Label htmlFor="order-phone">Số Điện Thoại *</Label><Input id="order-phone" placeholder="0901 234 567" value={orderForm.phone} onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })} /></div>
          </div>
          <div className="space-y-1.5"><Label htmlFor="order-address">Địa Chỉ Giao Hàng *</Label><Input id="order-address" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành" value={orderForm.address} onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })} /></div>
          {!cartCheckout && orderProduct && (
            <div className="space-y-1.5">
              <Label htmlFor="order-qty">Số Lượng</Label>
              <Input id="order-qty" type="number" min={1} className="text-center w-24" value={orderForm.quantity} onChange={(e) => setOrderForm({ ...orderForm, quantity: Math.max(1, parseInt(e.target.value) || 1) })} />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="order-notes">Ghi Chú</Label>
            <textarea id="order-notes" className="w-full px-3 py-2 rounded-md border border-border bg-input-background text-sm min-h-[80px] resize-none focus:outline-none focus:ring-1 focus:ring-ring" placeholder="Ghi chú thêm..." value={orderForm.notes} onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })} />
          </div>
        </div>

        <DialogFooter className="gap-2 mt-2">
          <Button variant="outline" onClick={() => setShowOrderForm(false)}>Hủy</Button>
          <Button onClick={handleSubmitOrder} className="px-8"><Package className="w-4 h-4 mr-2" />Xác Nhận Đặt Hàng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
