import React, { useEffect, useState } from 'react';
import type { Product } from '../../shared/types';
import { fetchProducts } from '../services/api';
import { ProductCard } from '../component/ui/productCart';

export const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Terjadi kesalahan saat memuat produk');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#EDE7E3] text-[#16697A]">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#EDE7E3]" id="home">
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">

          {/* Hero Content */}
          <div className="max-w-2xl">

            <span className="mb-5 inline-block rounded-full bg-[#82C0CC]/30 px-4 py-2 text-sm font-semibold text-[#16697A]">
              UMKM Lokal Indonesia
            </span>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Dibuat Lokal,
              <br />
              <span className="text-[#489FB5]">
                Dibuat dengan Hati.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#16697A]/75">
              Temukan produk pilihan dari pelaku UMKM lokal yang dibuat
              dengan bahan berkualitas, perhatian terhadap detail, dan
              semangat untuk menghadirkan sesuatu yang istimewa.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#products"
                className="rounded-xl bg-[#FFA62B] px-6 py-3.5 font-semibold text-[#16697A] transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                Lihat Produk
              </a>

              <a
                href="#about"
                className="rounded-xl border border-[#16697A] px-6 py-3.5 font-semibold text-[#16697A] transition duration-200 hover:bg-[#16697A] hover:text-white"
              >
                Tentang Kami
              </a>
            </div>

            {/* Small Stats */}
            <div className="mt-12 flex flex-wrap gap-8 border-t border-[#16697A]/15 pt-6">
              <div>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm text-[#16697A]/60">
                  Produk Lokal
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">Berkualitas</p>
                <p className="text-sm text-[#16697A]/60">
                  Pilihan Produk
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">Trusted</p>
                <p className="text-sm text-[#16697A]/60">
                  Oleh Pelanggan
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#82C0CC]/40 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] bg-[#16697A] p-3 shadow-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <img
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1000&auto=format&fit=crop&q=80"
                  alt="Produk dan suasana UMKM lokal"
                  className="h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#16697A]/70 via-transparent to-transparent" />

                {/* Image Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#82C0CC]">
                    Local • Authentic • Quality
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Dibuat dengan hati.
                  </h2>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          ABOUT SECTION
      ====================================================== */}
      <section id="about" className="bg-white px-6 py-20 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          {/* About Image */}
          <div className="relative overflow-hidden rounded-[2rem] bg-[#82C0CC]/30">
            <div className="aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&auto=format&fit=crop&q=80"
                alt="Suasana alam dan produk lokal"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Decorative Card */}
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white/5 px-5 py-4 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#489FB5]">
                Our Story
              </p>

              <p className="mt-1 text-sm font-bold text-[#16697A]">
                Dari lokal untuk semua.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#489FB5]">
              Tentang Kami
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#16697A] sm:text-5xl">
              Lebih dari sekadar produk.
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#16697A]/70">
              <p>
                Kami percaya bahwa setiap produk lokal memiliki cerita.
                Dari proses pembuatannya, orang-orang di baliknya, hingga
                nilai yang ingin diberikan kepada pelanggan.
              </p>

              <p>
                Karena itu, kami menghadirkan produk yang tidak hanya
                mengutamakan kualitas, tetapi juga membawa karakter dan
                identitas dari usaha lokal yang membuatnya.
              </p>

              <p>
                Dengan mendukung produk lokal, kamu juga ikut membantu
                perkembangan pelaku UMKM dan ekonomi di sekitar kita.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="#products"
                className="font-semibold text-[#16697A] underline decoration-[#FFA62B] decoration-2 underline-offset-4"
              >
                Jelajahi produk kami →
              </a>
            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          BRAND VALUES
      ====================================================== */}
      <section className="bg-[#16697A] px-6 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#82C0CC]">
              Why Local?
            </span>

            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
              Dibuat dengan nilai
              <br />
              yang kami percaya.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Value 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 transition duration-200 hover:bg-white/10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFA62B] text-xl text-[#16697A]">
                01
              </div>

              <h3 className="text-xl font-bold">
                Dibuat Lokal
              </h3>

              <p className="mt-3 leading-relaxed text-white/65">
                Mendukung produk yang dibuat oleh pelaku usaha lokal
                dengan karakter dan cerita mereka sendiri.
              </p>
            </div>

            {/* Value 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 transition duration-200 hover:bg-white/10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#82C0CC] text-xl text-[#16697A]">
                02
              </div>

              <h3 className="text-xl font-bold">
                Kualitas
              </h3>

              <p className="mt-3 leading-relaxed text-white/65">
                Kami memilih dan menghadirkan produk yang memiliki
                kualitas serta nilai yang layak untuk dibagikan.
              </p>
            </div>

            {/* Value 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 transition duration-200 hover:bg-white/10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#489FB5] text-xl text-white">
                03
              </div>

              <h3 className="text-xl font-bold">
                Dengan Hati
              </h3>

              <p className="mt-3 leading-relaxed text-white/65">
                Setiap produk dibuat dengan perhatian terhadap detail
                dan kepedulian terhadap pelanggan.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          PRODUCT SECTION
      ====================================================== */}
      <section
        id="products"
        className="bg-[#EDE7E3] px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#489FB5]">
                Our Products
              </span>

              <h2 className="mt-2 text-4xl font-bold tracking-tight text-[#16697A] sm:text-5xl">
                Pilihan untukmu.
              </h2>

              <p className="mt-3 max-w-xl text-[#16697A]/65">
                Jelajahi produk pilihan dari UMKM lokal kami.
              </p>
            </div>

            <span className="text-sm font-medium text-[#16697A]/60">
              {products.length} Produk Tersedia
            </span>

          </div>


          {/* Loading */}
          {loading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#16697A] border-t-transparent" />

              <p className="mt-3 text-sm font-medium text-[#16697A]/60">
                Memuat katalog produk...
              </p>
            </div>
          )}


          {/* Error */}
          {!loading && error && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700">
              <p>{error}</p>

              <button
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white"
              >
                Coba Lagi
              </button>
            </div>
          )}


          {/* Empty */}
          {!loading && !error && products.length === 0 && (
            <div className="mt-10 rounded-2xl border border-dashed border-[#16697A]/20 bg-white p-12 text-center">
              <p className="text-[#16697A]/60">
                Belum ada produk yang ditambahkan ke katalog.
              </p>
            </div>
          )}


          {/* Products */}
          {!loading && !error && products.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

        </div>
      </section>


      {/* =====================================================
          CTA SECTION
      ====================================================== */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-[#FFA62B] px-8 py-16 text-center sm:px-12">

          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#16697A]/60">
            Support Local
          </span>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#16697A] sm:text-5xl">
            Temukan sesuatu
            <br />
            yang kamu suka.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[#16697A]/70">
            Pilih produk lokal favoritmu dan ikut mendukung
            perkembangan UMKM Indonesia.
          </p>

          <a
            href="#products"
            className="mt-8 inline-flex rounded-xl bg-[#16697A] px-7 py-3.5 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#16697A]/90 hover:shadow-lg"
          >
            Jelajahi Produk
          </a>

        </div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ====================================================== */}
      <section
        id="contact"
        className="bg-[#EDE7E3] px-6 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#489FB5]">
              Get In Touch
            </span>

            <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#16697A] sm:text-5xl">
              Ada pertanyaan?
              <br />
              Mari ngobrol.
            </h2>

            <p className="mt-5 leading-relaxed text-[#16697A]/65">
              Kami siap membantu menjawab pertanyaan mengenai produk,
              pemesanan, maupun informasi lainnya.
            </p>
          </div>

          {/* Contact Content */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* WhatsApp */}
            <a
              href="https://wa.me/......"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-white p-7 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#82C0CC]/30 text-[#16697A]">
                <span className="text-lg font-bold">
                  WA
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#16697A]">
                WhatsApp
              </h3>

              <p className="mt-2 text-sm text-[#16697A]/60">
                Hubungi kami secara langsung melalui WhatsApp.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#16697A] group-hover:text-[#FFA62B]">
                Chat sekarang →
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl bg-white p-7 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#82C0CC]/30 text-[#16697A]">
                <span className="text-lg font-bold">
                  IG
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#16697A]">
                Instagram
              </h3>

              <p className="mt-2 text-sm text-[#16697A]/60">
                Ikuti cerita dan produk terbaru dari kami.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#16697A] group-hover:text-[#FFA62B]">
                Kunjungi Instagram →
              </span>
            </a>

            {/* Location */}
            <div className="rounded-2xl bg-[#16697A] p-7 text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFA62B] text-[#16697A]">
                <span className="text-lg font-bold">
                  LOC
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Lokasi
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Jl. Pisang Kipas No. 123,
                <br />
                Malang, Jawa Timur
              </p>

              <p className="mt-5 text-sm font-semibold text-[#82C0CC]">
                Senin – Sabtu · 08.00 – 17.00
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};