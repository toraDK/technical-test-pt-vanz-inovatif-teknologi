import type { Product, CustomerDetails, CartItem } from '../../shared/types';

// Arahkan langsung ke port Express backend
const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Gagal mengambil data produk');
    return response.json();
};

export const createCheckout = async (cart: CartItem[], customer: CustomerDetails) => {
  const response = await fetch('http://localhost:5000/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cart,
      customer: {
        first_name: customer.first_name,
        email: customer.email,
        phone: customer.phone,
        billing_address: {
            first_name: customer.first_name,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            postal_code: customer.postal_code,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Gagal memproses checkout');
  }

  return response.json();
};

// Omit 'id' karena ID dibuat otomatis oleh Firestore
export type NewProductInput = Omit<Product, 'id'>;

export const addProduct = async (productData: NewProductInput): Promise<Product> => {
    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    });

    // Baca respon sebagai teks untuk menghindari crash jika body kosong
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        throw new Error(data.message || `Server Error: ${response.status}`);
    }

    return data;
};