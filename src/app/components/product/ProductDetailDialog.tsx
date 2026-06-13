import { Star, Truck, ShoppingCart, Package } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import type { Product } from "../../types";

interface ProductDetailDialogProps {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  openOrderForm: (product: Product) => void;
}

export function ProductDetailDialog({ selectedProduct, setSelectedProduct, addToCart, openOrderForm }: ProductDetailDialogProps) {
  return (
    <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
      <DialogContent className="max-w-2xl">
        {selectedProduct && (
          <>
            <DialogHeader><DialogTitle className="font-heading text-2xl">{selectedProduct.name}</DialogTitle></DialogHeader>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square rounded-xl overflow-hidden bg-secondary/20">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <div><p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Danh Mục</p><span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">{selectedProduct.category}</span></div>
                <div><p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Giá Niêm Yết</p><p className="text-3xl font-heading font-bold text-primary">{selectedProduct.price.toLocaleString("vi-VN")} ₫</p></div>
                <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}<span className="text-sm text-muted-foreground ml-1">4.9 (128 đánh giá)</span></div>
                <div><p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Mô Tả</p><p className="text-sm leading-relaxed text-muted-foreground">{selectedProduct.description}</p></div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Truck className="w-4 h-4 text-green-500" /><span>Miễn phí giao hàng đơn từ 399.000đ</span></div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setSelectedProduct(null)}>Đóng</Button>
              <Button variant="secondary" onClick={() => addToCart(selectedProduct)}><ShoppingCart className="w-4 h-4 mr-2" />Thêm Vào Giỏ</Button>
              <Button onClick={() => openOrderForm(selectedProduct)}><Package className="w-4 h-4 mr-2" />Đặt Hàng Ngay</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
