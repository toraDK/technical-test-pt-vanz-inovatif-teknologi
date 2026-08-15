import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../../shared/types';
import { useCart } from '../../Context/cartContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden border border-brand-accent/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div>
            <div className="h-52 w-full bg-brand-accent/10 overflow-hidden relative">
            <img
                src={product.imageUrl || 'https://via.placeholder.com/300?text=Produk+UMKM'}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-3 left-3 bg-brand-primary/90 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm font-medium">
                {product.category}
            </span>
            </div>
            <div className="p-4">
            <h3 className="text-base font-bold text-brand-primary line-clamp-1">{product.name}</h3>
            <p className="text-xs text-gray-600 mt-1.5 line-clamp-2 leading-relaxed">{product.description}</p>
            </div>
        </div>

        <div className="p-4 pt-0 flex items-center justify-between mt-3 border-t border-gray-100">
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-medium">Harga</span>
                <span className="text-base font-bold text-brand-primary">
                    {formatRupiah(product.price)}
                </span>
            </div>
            <button
                onClick={() => addToCart(product)}
                className="bg-brand-action text-brand-primary font-semibold text-xs px-3.5 py-2 rounded-lg hover:bg-[#e59524] transition-colors flex items-center gap-1.5"
                >
                <ShoppingCart className="w-3.5 h-3.5" />
                + Keranjang
            </button>
        </div>
        </div>
    );
};