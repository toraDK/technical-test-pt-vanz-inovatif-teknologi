import React from 'react';
import { ShoppingBag, Store } from 'lucide-react';
import { useCart } from '../../Context/cartContext';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { totalItems } = useCart();

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
            <span className="text-[10px] text-brand-accent uppercase tracking-widest font-medium">UMKM Store</span>
          </div>
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="/#home" className="hover:text-brand-accent transition-colors">Beranda</a>
          <a href="/#about" className="hover:text-brand-accent transition-colors">About</a>
          <a href="/#products" className="hover:text-brand-accent transition-colors">Katalog Produk</a>
          <a href="/#contact" className="hover:text-brand-accent transition-colors">Kontak</a>
        </nav>

        {/* Action Button */}
        <button
          onClick={onOpenCart}
          className="relative bg-brand-action text-brand-primary font-semibold px-4 py-2 rounded-lg hover:bg-[#e59524] transition-all flex items-center gap-2 shadow-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-sm">Keranjang</span>
          {totalItems > 0 && (
            <span className="bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};