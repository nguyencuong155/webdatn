import type { RefObject } from "react";
import { ShoppingBag, ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import type { UserType } from "../../types";

type Page = "home" | "login" | "register" | "admin";

interface NavigationProps {
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
}

export function Navigation({
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
}: NavigationProps) {
  return (
    <nav className="sticky top-0 z-50 bg-card/95 border-b border-border backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage("home")}>
            <ShoppingBag className="w-7 h-7 text-primary" />
            <span className="text-xl font-heading font-semibold tracking-wide">Lumière Beauty</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => setCurrentPage("home")} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Trang Chủ</button>
            {currentPage === "home" && (
              <>
                <button onClick={() => scrollTo(productsRef)} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Sản Phẩm</button>
                <button onClick={() => scrollTo(promoRef)} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Khuyến Mãi</button>
                <button onClick={() => scrollTo(brandRef)} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Về Chúng Tôi</button>
                <button onClick={() => scrollTo(contactRef)} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Liên Hệ</button>
              </>
            )}
            {currentUser?.isAdmin && (
              <button onClick={() => setCurrentPage("admin")} className="px-3 py-2 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors">Quản Trị</button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative p-2 rounded-md hover:bg-secondary transition-colors" aria-label="Giỏ hàng">
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
}
