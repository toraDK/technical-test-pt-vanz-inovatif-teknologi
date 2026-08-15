import React, { useState, useCallback } from 'react';
import { addProduct, type NewProductInput } from '../services/api';

interface Transaction {
  id: string;
  orderId?: string;
  customerName: string;
  customerEmail?: string;
  grossAmount?: number;
  totalAmount?: number;
  status: string;
  createdAt?: string;
}

export const AdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'addProduct' | 'transactions'>('addProduct');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTx, setLoadingTx] = useState(false);

  // Form State
  const [formData, setFormData] = useState<NewProductInput>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: 'Makanan',
    imageUrl: '',
  });

  // Fungsi Fetch Data
  const fetchTransactions = useCallback(async () => {
    setLoadingTx(true);
    try {
      const res = await fetch('http://localhost:5000/api/transactions');
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      } else {
        alert('Gagal mengambil data transaksi');
      }
    } catch (err) {
      console.error('Gagal mengambil daftar transaksi:', err);
    } finally {
      setLoadingTx(false);
    }
  }, []);

  // Handler untuk berpindah tab & memuat data transaksi
  const handleTabChange = (tab: 'addProduct' | 'transactions') => {
    setActiveTab(tab);
    if (tab === 'transactions') {
      fetchTransactions();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProduct(formData);
      alert('Produk berhasil ditambahkan ke Firestore!');
      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: 'Makanan',
        imageUrl: '',
      });
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header & Tab Switcher */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-[#1D7484]">Dashboard Pengelolaan Toko</h1>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => handleTabChange('addProduct')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              activeTab === 'addProduct' ? 'bg-white shadow text-[#1D7484]' : 'text-gray-600'
            }`}
          >
            + Tambah Produk
          </button>
          <button
            onClick={() => handleTabChange('transactions')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${
              activeTab === 'transactions' ? 'bg-white shadow text-[#1D7484]' : 'text-gray-600'
            }`}
          >
            Daftar Transaksi
          </button>
        </div>
      </div>

      {/* Tab 1: Form Tambah Produk */}
      {activeTab === 'addProduct' && (
        <div className="bg-white p-6 rounded-xl border shadow-sm max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Formulir Tambah Produk Baru</h2>
          <form onSubmit={handleSubmitProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Produk *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Kategori *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 text-sm"
                >
                  <option value="Makanan">Makanan</option>
                  <option value="Minuman">Minuman</option>
                  <option value="Pakaian">Pakaian</option>
                  <option value="Kerajinan">Kerajinan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Harga (Rp) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price || ''}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stok *</label>
                <input
                  type="number"
                  name="stock"
                  required
                  value={formData.stock || ''}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Gambar</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1D7484] text-white py-2.5 rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Tabel Riwayat Transaksi Firestore */}
      {activeTab === 'transactions' && (
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Riwayat Pesanan & Transaksi (Firestore)</h2>
            <button
              onClick={fetchTransactions}
              className="text-sm bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
            >
              Refresh Data
            </button>
          </div>

          {loadingTx ? (
            <p className="text-gray-500 text-sm text-center py-8">Memuat transaksi dari Firestore...</p>
          ) : transactions.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">Belum ada transaksi masuk.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Pembeli</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Total Bayar</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const orderId = tx.orderId || tx.id;
                    const amount = tx.grossAmount ?? tx.totalAmount ?? 0;
                    return (
                      <tr key={tx.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-mono text-xs font-semibold">{orderId}</td>
                        <td className="p-3 font-medium">{tx.customerName || '-'}</td>
                        <td className="p-3 text-gray-600">{tx.customerEmail || '-'}</td>
                        <td className="p-3 font-semibold text-[#1D7484]">
                          Rp {amount.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};