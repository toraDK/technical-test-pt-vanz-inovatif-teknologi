import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { db } from './config/firebase';
import midtransClient from 'midtrans-client';
import type { CartItem } from '../shared/types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inisialisasi Midtrans Snap Client
export const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === 'true',
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
});

// GET: Ambil semua data produk dari Firestore
app.get('/api/products', async (_req, res) => {
  try {
    const snapshot = await db.collection('products').get();

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(products);
  } catch (err: unknown) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Gagal mengambil data produk dari Firestore' });
  }
});

// POST: Tambah produk baru ke Firestore
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, price, stock, category, imageUrl } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Nama, harga, dan kategori wajib diisi.' });
    }

    const newProduct = {
      name,
      description: description || '',
      price: Number(price),
      stock: Number(stock) || 0,
      category,
      imageUrl: imageUrl || 'https://placehold.co/400x300?text=Produk+UMKM',
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('products').add(newProduct);

    return res.status(201).json({
      id: docRef.id,
      ...newProduct,
      message: 'Produk berhasil ditambahkan!',
    });
  } catch (error) {
    console.error('Error adding product to Firestore:', error);
    return res.status(500).json({ message: 'Gagal menambahkan produk ke database Firestore.' });
  }
});

// POST: Endpoint Checkout untuk generate Snap Token & simpan draft transaksi
app.post('/api/checkout', async (req, res) => {
  try {
    const { cart, customer } = req.body;
    const orderId = `ORDER-${Date.now()}`;

    // Hitung total harga
    const total = cart.reduce(
      (sum: number, item: CartItem) => sum + item.product.price * item.quantity,
      0
    );

    // Format item_details sesuai standar Midtrans (Wajib integer/number)
    const itemDetails = cart.map((item: CartItem) => ({
      id: String(item.product.id),
      price: Math.round(Number(item.product.price)),
      quantity: Number(item.quantity),
      name: item.product.name.substring(0, 50), // Maksimal 50 karakter
    }));

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: total,
      },
      item_details: itemDetails,
      customer_details: {
        first_name: customer?.first_name || 'Pelanggan',
        email: customer?.email || '',
        phone: customer?.phone || '',
      },
    };

    const transaction = await snap.createTransaction(parameter);

    // Simpan ke Firestore
    await db.collection('transactions').doc(orderId).set({
      orderId,
      customerName: customer?.first_name || 'Pelanggan',
      customerEmail: customer?.email || '',
      customerPhone: customer?.phone || '',
      grossAmount: total,
      status: 'PENDING',
      cartItems: cart,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return res.json({ snapToken: transaction.token, orderId });
  } catch (err: any) {
    // Tampilkan log error spesifik dari Midtrans/Firestore di terminal
    console.error('Checkout error detail:', err?.ApiResponse?.error_messages || err?.message || err);
    return res.status(500).json({ 
      message: err?.ApiResponse?.error_messages?.[0] || err?.message || 'Gagal membuat transaksi' 
    });
  }
});

// POST: Endpoint Callback / Webhook dari Midtrans
app.post('/api/notification', async (req, res) => {
  try {
    const statusResponse = req.body;
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;
    const grossAmount = statusResponse.gross_amount;
    const signatureKey = statusResponse.signature_key;

    // Validasi Signature Key dari Midtrans
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
    const hash = crypto
      .createHash('sha512')
      .update(`${orderId}${statusResponse.status_code}${grossAmount}${serverKey}`)
      .digest('hex');

    if (signatureKey && signatureKey !== hash) {
      console.warn('⚠️ Signature key Midtrans tidak valid!');
      return res.status(403).json({ message: 'Invalid signature key' });
    }

    console.log(`🔔 Midtrans Notification Received for Order: ${orderId} | Status: ${transactionStatus}`);

    // Tentukan status akhir transaksi
    let paymentStatus = 'PENDING';
    if (transactionStatus === 'capture') {
      paymentStatus = fraudStatus === 'challenge' ? 'CHALLENGE' : 'SUCCESS';
    } else if (transactionStatus === 'settlement') {
      paymentStatus = 'SUCCESS';
    } else if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
      paymentStatus = 'FAILED';
    } else if (transactionStatus === 'pending') {
      paymentStatus = 'PENDING';
    }

    // Update status transaksi di Firestore
    const txRef = db.collection('transactions').doc(orderId);
    await txRef.set(
      {
        orderId: orderId,
        paymentType: statusResponse.payment_type || 'midtrans',
        grossAmount: Number(grossAmount),
        status: paymentStatus,
        transactionTime: statusResponse.transaction_time || new Date().toISOString(),
        customerDetails: statusResponse.customer_details || {},
        midtransRaw: statusResponse,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.error('Error handling Midtrans notification:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET: Ambil daftar transaksi untuk Portal Admin
app.get('/api/transactions', async (_req, res) => {
  try {
    const snapshot = await db.collection('transactions').orderBy('updatedAt', 'desc').get();

    const transactions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return res.status(500).json({ message: 'Gagal mengambil data transaksi' });
  }
});

// Jalankan Server Express di Paling Bawah
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});