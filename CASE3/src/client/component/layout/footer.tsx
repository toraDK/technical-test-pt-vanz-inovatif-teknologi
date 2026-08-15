import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#16697A] px-6 pt-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Footer Main Content */}
        <div className="grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">

            <a
              href="#"
              className="text-2xl font-bold tracking-tight"
            >
              KARYA LOKAL
            </a>

            <p className="mt-5 max-w-md leading-relaxed text-white/60">
              Menghadirkan produk lokal berkualitas yang dibuat
              dengan perhatian, cerita, dan hati.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-3">

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold transition hover:bg-[#FFA62B] hover:text-[#16697A]"
              >
                IG
              </a>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold transition hover:bg-[#FFA62B] hover:text-[#16697A]"
              >
                WA
              </a>

            </div>
          </div>


          {/* Navigation */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#82C0CC]">
              Navigation
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-white/60">

              <li>
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Beranda
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="transition hover:text-white"
                >
                  Tentang Kami
                </a>
              </li>

              <li>
                <a
                  href="#products"
                  className="transition hover:text-white"
                >
                  Produk
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="transition hover:text-white"
                >
                  Kontak
                </a>
              </li>

            </ul>

          </div>


          {/* Information */}
          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#82C0CC]">
              Information
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-white/60">

              <li>
                Senin – Sabtu
              </li>

              <li>
                08.00 – 17.00
              </li>

              <li>
                Malang, Jawa Timur
              </li>

              <li>
                +62 811-3333-0000
              </li>

            </ul>

          </div>

        </div>


        {/* Footer Bottom */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">

          <p>
            © {new Date().getFullYear()} KARYA LOKAL. All rights reserved.
          </p>

          <p>
            Made with care in Indonesia.
          </p>

        </div>

      </div>
    </footer>
  );
};