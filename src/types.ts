export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  priceSuffix?: string; // e.g., "/ 100"
  sku: string;
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  stockCount?: number;
  rating: number;
  reviewCount: number;
  sellerName: string;
  sellerId?: string;
  sellerVerified?: boolean;
  sellerImage?: string;
  description: string;
  images: string[];
  specs?: Record<string, string>;
  condition: 'New' | 'Refurbished' | 'Used';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  itemsCount: number;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface SellerStats {
  totalSales: number;
  salesGrowth: number;
  activeListings: number;
  pendingOrders: number;
  immediateActionOrders: number;
  totalCommissionPaid: number;
  commissionRate: number;
}

export interface FilterState {
  categories: string[];
  minPrice: number | null;
  maxPrice: number | null;
  condition: 'Any' | 'New' | 'Refurbished';
  minRating: number | null;
  search: string;
  sortBy: 'recent' | 'price-asc' | 'price-desc' | 'popularity' | 'rating';
}

export type ViewMode = 'home' | 'shop' | 'product-detail' | 'seller-dashboard';

export type DashboardTab = 'overview' | 'inventory' | 'orders' | 'analytics' | 'commission' | 'settings' | 'support';
