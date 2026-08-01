import React from 'react';
import { ShieldCheck, Building2, Lock, ArrowRight, Star, Store } from 'lucide-react';
import { Product, ViewMode } from '../types';
import { HERO_IMAGE } from '../data/mockData';

interface HomeScreenProps {
  products: Product[];
  onNavigate: (view: ViewMode) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  onNavigate,
  onSelectProduct,
  onAddToCart,
}) => {
  // Select 4 featured listings
  const featuredListings = products.slice(0, 4);

  return (
    <div id="home-screen" className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section id="hero-section" className="bg-white py-16 md:py-20 px-4 md:px-8 border-b border-[#c6c6cd]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Hero Text */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#000000] leading-tight">
              The Professional Marketplace for Business Growth.
            </h1>
            <p className="text-lg text-[#45464d] max-w-2xl leading-relaxed">
              Connect with verified merchants and discover premium inventory. Buy with confidence, sell with efficiency, and scale your business on a platform built for professionals.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start pt-2">
              <button
                id="hero-shop-btn"
                onClick={() => onNavigate('shop')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#000000] text-white font-medium text-sm rounded-lg hover:opacity-90 transition-opacity shadow-sm"
              >
                Shop Marketplace
              </button>
              <button
                id="hero-sell-btn"
                onClick={() => onNavigate('seller-dashboard')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#000000] border border-[#c6c6cd] font-medium text-sm rounded-lg hover:bg-[#f2f4f6] transition-colors"
              >
                Start Selling Today
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="flex-1 w-full h-[380px] md:h-[420px] bg-[#f2f4f6] rounded-xl border border-[#c6c6cd] relative overflow-hidden flex items-center justify-center">
            <img
              src={HERO_IMAGE}
              alt="Professional flat lay of business tools, premium electronics, and logistics packaging"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Value Proposition Bento */}
      <section id="value-proposition-section" className="py-20 px-4 md:px-8 bg-[#f7f9fb]">
        <div className="max-w-[1280px] mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[#000000]">Engineered for Excellence</h2>
            <p className="text-base text-[#45464d] mt-2">The foundation of trust for serious buyers and sellers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl border border-[#c6c6cd] hover:shadow-md transition-shadow">
              <ShieldCheck className="w-8 h-8 text-[#000000] mb-4" />
              <h3 className="text-xl font-semibold text-[#000000] mb-2">Trusted Sellers</h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                Every merchant undergoes rigorous verification. Shop from a curated network of established professional businesses.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl border border-[#c6c6cd] hover:shadow-md transition-shadow">
              <Building2 className="w-8 h-8 text-[#000000] mb-4" />
              <h3 className="text-xl font-semibold text-[#000000] mb-2">Fair Commissions</h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                Transparent fee structures designed to help you scale. Keep more of your profits with industry-leading rates.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-xl border border-[#c6c6cd] hover:shadow-md transition-shadow">
              <Lock className="w-8 h-8 text-[#000000] mb-4" />
              <h3 className="text-xl font-semibold text-[#000000] mb-2">Secure Payments</h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                Institutional-grade transaction security. Your funds are protected at every stage of the buying and selling process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Grid */}
      <section id="featured-listings-section" className="py-20 px-4 md:px-8 bg-white border-y border-[#c6c6cd]">
        <div className="max-w-[1280px] mx-auto space-y-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-semibold text-[#000000]">Featured Listings</h2>
              <p className="text-base text-[#45464d] mt-2">Discover top-rated inventory from premier sellers.</p>
            </div>
            <button
              id="view-all-listings-btn"
              onClick={() => onNavigate('shop')}
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[#000000] hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((product) => (
              <div
                key={product.id}
                id={`featured-card-${product.id}`}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-xl border border-[#c6c6cd] overflow-hidden group hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full"
              >
                <div className="aspect-square bg-[#f2f4f6] relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-bold border border-[#c6c6cd] text-[#000000]">
                    ${product.price.toFixed(2)} {product.priceSuffix || ''}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-[#000000] line-clamp-1 group-hover:text-[#006c49] transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-[#45464d] text-xs">
                      <Store className="w-3.5 h-3.5 text-[#76777d]" />
                      <span className="truncate">{product.sellerName}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#eceef0]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#000000] fill-current" />
                      <span className="text-xs font-semibold text-[#000000]">{product.rating}</span>
                      <span className="text-xs text-[#76777d]">({product.reviewCount})</span>
                    </div>
                    <button
                      id={`add-cart-featured-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="text-xs bg-[#f2f4f6] hover:bg-[#000000] hover:text-white px-2.5 py-1.5 rounded text-[#000000] font-medium transition-colors"
                    >
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <button
              onClick={() => onNavigate('shop')}
              className="w-full px-4 py-2.5 border border-[#c6c6cd] rounded-lg font-medium text-sm text-[#000000] bg-white hover:bg-[#f2f4f6]"
            >
              View All Listings
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="py-20 px-4 md:px-8 bg-[#000000] text-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold tracking-tight">Turn your inventory into profit.</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            Join 5,000+ sellers on MarketForge and reach a network of professional buyers ready to scale.
          </p>
          <div className="pt-2">
            <button
              id="cta-start-selling-btn"
              onClick={() => onNavigate('seller-dashboard')}
              className="px-8 py-4 bg-white text-[#000000] font-bold text-sm rounded-lg hover:bg-[#f2f4f6] transition-colors shadow-lg"
            >
              Start Selling on MarketForge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
