import React, { useState } from 'react';
import { Product, CartItem, Order, ViewMode, SellerStats } from './types';
import { MOCK_PRODUCTS, INITIAL_ORDERS, INITIAL_STATS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { ShopScreen } from './components/ShopScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { SellerDashboardScreen } from './components/SellerDashboardScreen';
import { CartDrawer } from './components/CartDrawer';
import { NewListingModal } from './components/NewListingModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(MOCK_PRODUCTS[0]);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [stats, setStats] = useState<SellerStats>(INITIAL_STATS);
  const [newListingOpen, setNewListingOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.product.id === product.id);
      if (existing) {
        return prevCart.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`Added "${product.title}" to your cart.`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Product selection & view navigation
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = () => {
    if (currentView !== 'shop') {
      setCurrentView('shop');
    }
  };

  // Buy now quick action
  const handleBuyNow = (product: Product, quantity: number) => {
    handleAddToCart(product, quantity);
    setCartOpen(true);
  };

  // Add seller product listing
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setStats((prev) => ({ ...prev, activeListings: prev.activeListings + 1 }));
    showToast(`Published listing "${newProduct.title}" to MarketForge.`);
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Updated order ${orderId} status to "${newStatus}".`);
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setStats((prev) => ({ ...prev, activeListings: Math.max(0, prev.activeListings - 1) }));
    showToast('Removed product listing.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#000000] selection:text-white">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={() => setAuthModalOpen(true)}
        searchQuery={globalSearch}
        onSearchChange={setGlobalSearch}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#000000] text-white px-5 py-3 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Router */}
      <div className="flex-grow flex flex-col">
        {currentView === 'home' && (
          <HomeScreen
            products={products}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
          />
        )}

        {currentView === 'shop' && (
          <ShopScreen
            products={products}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            initialSearchQuery={globalSearch}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailScreen
            product={selectedProduct}
            allProducts={products}
            onBack={() => setCurrentView('shop')}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onBuyNow={handleBuyNow}
          />
        )}

        {currentView === 'seller-dashboard' && (
          <SellerDashboardScreen
            stats={stats}
            orders={orders}
            products={products}
            onOpenNewListing={() => setNewListingOpen(true)}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Modals */}
      <NewListingModal
        isOpen={newListingOpen}
        onClose={() => setNewListingOpen(false)}
        onAddProduct={handleAddProduct}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(email) => showToast(`Welcome back, ${email}!`)}
      />
    </div>
  );
}
