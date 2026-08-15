import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../Context/cartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onProceedToCheckout }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between">
          {/* Header Drawer */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-brand-primary text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-accent" />
              <h2 className="text-lg font-bold">Keranjang Belanja</h2>
            </div>
            <button onClick={onClose} className="text-gray-300 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">Keranjang Anda masih kosong.</p>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 p-3 bg-brand-bg/40 rounded-lg border border-brand-accent/20 items-center">
                  <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md bg-white" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-brand-primary line-clamp-1">{product.name}</h4>
                    <p className="text-xs font-bold text-gray-700 mt-1">{formatRupiah(product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 bg-white border border-gray-300 rounded text-xs flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="text-xs font-medium px-2">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 bg-white border border-gray-300 rounded text-xs flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(product.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Total Pembayaran</span>
                <span className="text-lg font-bold text-brand-primary">{formatRupiah(totalPrice)}</span>
              </div>
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-brand-action text-brand-primary font-bold py-3 px-4 rounded-lg hover:bg-[#e59524] transition-colors flex items-center justify-center gap-2"
              >
                Lanjut ke Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};