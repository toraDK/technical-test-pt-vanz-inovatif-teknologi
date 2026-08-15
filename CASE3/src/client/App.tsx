import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './Context/cartContext';
import { Navbar } from './component/layout/navbar';
import { Footer } from './component/layout/footer';
import { CartDrawer } from './component/cart/cartDrawer';
import { Home } from './pages/home';
import { Checkout } from './pages/checkout';
import { AdminPortal } from './pages/adminPortal'; // Halaman admin rahasia

const AppContent: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar standar tanpa tombol ke Portal Admin */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Secret URL Path */}
          <Route path="/kelola-toko-9921" element={<AdminPortal />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={handleProceedToCheckout}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;