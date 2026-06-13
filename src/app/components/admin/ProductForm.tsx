import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { Product } from "../../types";

interface ProductFormProps {
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onCancel: () => void;
  availableCategories: string[];
}

export function ProductForm({ product, onSave, onCancel, availableCategories }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    category: product?.category || availableCategories[0] || "",
    image: product?.image || "",
    description: product?.description || "",
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label>Tên Sản Phẩm</Label><Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
      <div className="space-y-2"><Label>Giá (VNĐ)</Label><Input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} /></div>
      <div className="space-y-2">
        <Label>Danh Mục</Label>
        <select className="w-full px-3 py-2 rounded-md border border-border bg-input-background text-sm" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
          {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div className="space-y-2"><Label>URL Hình Ảnh</Label><Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} /></div>
      <div className="space-y-2">
        <Label>Mô Tả</Label>
        <textarea className="w-full px-3 py-2 rounded-md border border-border bg-input-background text-sm min-h-[90px] resize-none focus:outline-none focus:ring-1 focus:ring-ring" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>
      <div className="flex gap-3 justify-end"><Button variant="outline" onClick={onCancel}>Hủy</Button><Button onClick={() => onSave(formData)}>Lưu</Button></div>
    </div>
  );
}
