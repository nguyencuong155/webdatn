import { User } from "lucide-react";
import { Navigation } from "../components/layout/Navigation";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import type { RefObject } from "react";
import type { UserType } from "../types";

type Page = "home" | "login" | "register" | "admin";

interface LoginPageProps {
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
  loginEmail: string;
  setLoginEmail: (value: string) => void;
  loginPassword: string;
  setLoginPassword: (value: string) => void;
  handleLogin: () => void;
}

export function LoginPage(props: LoginPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={props.currentPage} currentUser={props.currentUser} cartCount={props.cartCount} showMobileMenu={props.showMobileMenu} setShowMobileMenu={props.setShowMobileMenu} setCurrentPage={props.setCurrentPage} setShowCart={props.setShowCart} handleLogout={props.handleLogout} productsRef={props.productsRef} promoRef={props.promoRef} brandRef={props.brandRef} contactRef={props.contactRef} scrollTo={props.scrollTo} />
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
            <div className="space-y-2"><Label htmlFor="login-email">Email</Label><Input id="login-email" type="email" placeholder="email@example.com" value={props.loginEmail} onChange={(e) => props.setLoginEmail(e.target.value)} /></div>
            <div className="space-y-2"><Label htmlFor="login-password">Mật Khẩu</Label><Input id="login-password" type="password" placeholder="••••••••" value={props.loginPassword} onChange={(e) => props.setLoginPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && props.handleLogin()} /></div>
            <div className="bg-secondary/50 rounded-lg p-3 text-xs text-muted-foreground space-y-1">
              <p className="font-medium">Tài khoản demo:</p>
              <p>Admin: admin@cosmetic.com / admin123</p>
              <p>User: user@example.com / user123</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full" onClick={props.handleLogin}>Đăng Nhập</Button>
            <p className="text-sm text-muted-foreground text-center">Chưa có tài khoản? <button className="text-primary font-medium hover:underline" onClick={() => props.setCurrentPage("register")}>Đăng ký ngay</button></p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
