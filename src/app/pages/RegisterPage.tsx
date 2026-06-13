import { User } from "lucide-react";
import { Navigation } from "../components/layout/Navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import type { RefObject } from "react";
import type { UserType } from "../types";

type Page = "home" | "login" | "register" | "admin";

interface RegisterPageProps {
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
  registerName: string;
  setRegisterName: (value: string) => void;
  registerEmail: string;
  setRegisterEmail: (value: string) => void;
  registerPassword: string;
  setRegisterPassword: (value: string) => void;
  handleRegister: () => void;
}

export function RegisterPage(props: RegisterPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={props.currentPage} currentUser={props.currentUser} cartCount={props.cartCount} showMobileMenu={props.showMobileMenu} setShowMobileMenu={props.setShowMobileMenu} setCurrentPage={props.setCurrentPage} setShowCart={props.setShowCart} handleLogout={props.handleLogout} productsRef={props.productsRef} promoRef={props.promoRef} brandRef={props.brandRef} contactRef={props.contactRef} scrollTo={props.scrollTo} />
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3"><User className="w-7 h-7 text-primary" /></div>
            <CardTitle className="text-2xl font-heading">Đăng Ký Tài Khoản</CardTitle>
            <p className="text-sm text-muted-foreground">Nhận ngay ưu đãi 20% cho đơn đầu tiên</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="register-name">Họ Tên</Label><Input id="register-name" placeholder="Nguyễn Văn A" value={props.registerName} onChange={(e) => props.setRegisterName(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="register-email">Email</Label><Input id="register-email" type="email" placeholder="email@example.com" value={props.registerEmail} onChange={(e) => props.setRegisterEmail(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="register-password">Mật Khẩu</Label><Input id="register-password" type="password" placeholder="••••••••" value={props.registerPassword} onChange={(e) => props.setRegisterPassword(e.target.value)} /></div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full" onClick={props.handleRegister}>Đăng Ký</Button>
            <p className="text-sm text-muted-foreground text-center">Đã có tài khoản? <button className="text-primary font-medium hover:underline" onClick={() => props.setCurrentPage("login")}>Đăng nhập</button></p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
