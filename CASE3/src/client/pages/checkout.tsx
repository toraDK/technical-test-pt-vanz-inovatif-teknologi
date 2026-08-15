import React, { useState } from 'react';
import { useCart } from '../Context/cartContext';
import { createCheckout } from '../services/api';
import type { CustomerDetails } from '../../shared/types';

declare global {
  interface Window {
    snap?: {
      pay: (
        snapToken: string,
        options: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}

export const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  // State disesuaikan dengan interface CustomerDetails kamu
  const [customer, setCustomer] = useState<CustomerDetails>({
    first_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Keranjang belanja kosong!');

    setLoading(true);
    try {
      const response = await createCheckout(cart, customer);
      
      if (response.snapToken && window.snap) {
        window.snap.pay(response.snapToken, {
          onSuccess: () => {
            alert('Pembayaran berhasil!');
            clearCart();
          },
          onPending: () => alert('Menunggu pembayaran...'),
          onError: () => alert('Pembayaran gagal!'),
          onClose: () => alert('Popup pembayaran ditutup.'),
        });
      } else {
        alert('Gagal memuat sistem pembayaran Midtrans.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-brand-primary">Formulir Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="first_name"
              required
              value={customer.first_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={customer.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nomor HP / Whatsapp</label>
            <input
              type="tel"
              name="phone"
              required
              value={customer.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Alamat Lengkap</label>
            <textarea
              name="address"
              rows={2}
              required
              value={customer.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 text-sm"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kota</label>
              <input
                type="text"
                name="city"
                required
                value={customer.city}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kode Pos</label>
              <input
                type="text"
                name="postal_code"
                required
                value={customer.postal_code}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 mt-4"
          >
            {loading ? 'Memproses...' : `Bayar Sekarang (Rp ${totalPrice.toLocaleString()})`}
          </button>
        </form>

        {/* Ringkasan Pesanan */}
        <div className="bg-gray-50 p-6 rounded-xl border h-fit">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
            {cart.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span>{item.product.name} x{item.quantity}</span>
                <span className="font-medium">Rp {(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between font-bold text-base">
            <span>Total Bayar</span>
            <span className="text-brand-primary">Rp {totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};