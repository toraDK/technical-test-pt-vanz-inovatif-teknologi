import React, { useState } from 'react';
import { Menu, ShoppingBag, Store, X } from 'lucide-react';
import { useCart } from '../../Context/cartContext';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { href: '/#home', label: 'Beranda' },
    { href: '/#about', label: 'About' },
    { href: '/#products', label: 'Katalog Produk' },
    { href: '/#contact', label: 'Kontak' }
  ];

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-brand-primary text-white sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center space-x-3 group">
          <div className="bg-brand-accent p-2 rounded-lg text-brand-primary group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight">Karya Lokal</span>
            <span className="hidden sm:block text-[10px] text-brand-accent uppercase tracking-widest font-medium">UMKM Store</span>
          </div>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-brand-accent transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
            aria-label={isMobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-main-navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Action Button */}
          <button
            onClick={onOpenCart}
            className="relative bg-brand-action text-brand-primary font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-[#e59524] transition-all flex items-center gap-2 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Keranjang</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-main-navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-4 pb-4 pt-1 border-t border-white/10 bg-brand-primary/95 backdrop-blur-sm flex flex-col gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleMobileLinkClick}
              className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-brand-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};