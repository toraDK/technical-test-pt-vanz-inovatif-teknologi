export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
    createdAt?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CustomerDetails {
    first_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
}

export interface Transaction {
    id: string;
    orderId: string;
    items: CartItem[];
    grossAmount: number;
    customerDetails: CustomerDetails;
    status: 'pending' | 'settlement' | 'expire' | 'cancel';
    paymentUrl?: string;
    createdAt: string;
}