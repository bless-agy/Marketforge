import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  CheckCircle,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  ArrowRight,
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onSelectProduct,
  onBuyNow,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showContactModal, setShowContactModal] = useState(false);

  // Filter related products (same category or seller, excluding current product)
  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.sellerName === product.sellerName)
  ).slice(0, 4);

  const imagesList = product.images.length > 0 ? product.images : ['https://lh3.googleusercontent.com/aida-public/AB6AXuC886RLtweVMgsf35MVIrYENDA0qhS2zHlUKM3wP2Ul6NA1YmUjly0YY2yPQlVhv7EiXBEiHEz5zz7rs90whiojALwLWeopy8sMb-RlRgv-Tvlt71E63Mpm6BfSQ4G_Ed5JnvZd6yAEuOiEmLKB33-rBSS93AkGhG38xTL27Qn_oefKXSf_ag4TcpSxLHa7m5iEQ7gfPym4Zgdimcj0S23tceEwmzmvnLS2lO5Eiu-IzAL20-OjcWgL'];

  return (
    <div id="product-detail-screen" className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 flex flex-col gap-12">
      {/* Top Back Button */}
      <div>
        <button
          id="back-to-shop-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#45464d] hover:text-[#000000] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>
      </div>

      {/* Overview 2-Column Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Main Image View */}
          <div className="w-full aspect-square md:aspect-[4/3] bg-white border border-[#c6c6cd] rounded-xl overflow-hidden relative group">
            <img
              src={imagesList[selectedImageIndex] || imagesList[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {imagesList.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-white rounded-lg overflow-hidden transition-all ${
                  selectedImageIndex === index
                    ? 'border-2 border-[#000000]'
                    : 'border border-[#c6c6cd] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={imgUrl} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}

            {/* If fewer than 4 images, show video thumb simulation */}
            {imagesList.length < 4 && (
              <button
                onClick={() => setSelectedImageIndex(0)}
                className="aspect-square bg-[#f2f4f6] border border-[#c6c6cd] rounded-lg overflow-hidden flex flex-col items-center justify-center text-[#45464d] hover:text-[#000000] transition-colors"
              >
                <PlayCircle className="w-8 h-8" />
                <span className="text-[10px] font-semibold mt-1">Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Info & Buy Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Title & Price Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#6cf8bb]/30 text-[#006c49] font-bold text-xs uppercase tracking-wider">
                {product.stockStatus}
              </span>
              <span className="text-xs text-[#76777d]">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#000000]">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-4xl font-bold text-[#000000]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-base text-[#76777d] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#45464d] leading-relaxed">
            {product.description}
          </p>

          {/* Seller Info Box */}
          <div className="bg-white border border-[#c6c6cd] rounded-xl p-4 flex flex-col gap-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#f2f4f6] border border-[#c6c6cd]">
                  <img
                    src={product.sellerImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOOOpnqZU_h-XQ9oF6Ub_VoduyR074rIxWPXhLBLgaDybF7WoB7jAZW8CYT8xX343X0fvIHIQDAu6Qm8E3b0VQZdD_ZLY-6UQQlbm0lHZZ1S4R6brrikzF8dbbGJjPAoVzZ58EVOyYDEZJWX_lE2nmMy7MVTgdX0uh3zSiOFG-MwZbRCYyaW1ir4dlWrJiu5MKZY7BgLv71S4yC9Onx7cfp8jNu0DWO7opzu4FCCDHb8oMoZWk0aC2'}
                    alt={product.sellerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#000000]">{product.sellerName}</span>
                  <div className="flex items-center text-[#006c49] gap-1 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 fill-[#006c49] text-white" />
                    <span className="text-xs font-semibold uppercase">Top Rated Merchant</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowContactModal(true)}
                className="text-xs font-semibold text-[#000000] hover:underline flex items-center gap-1"
              >
                <span>Contact</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quantity & Buy Actions */}
          <div className="flex flex-col gap-4 pt-2 border-t border-[#c6c6cd]">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#c6c6cd] rounded-lg bg-white h-11">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 text-[#45464d] hover:text-[#000000] hover:bg-[#f2f4f6] h-full rounded-l-lg transition-colors flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-[#000000]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-3.5 text-[#45464d] hover:text-[#000000] hover:bg-[#f2f4f6] h-full rounded-r-lg transition-colors flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-[#76777d]">Limit 10 per customer</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                id="detail-add-to-cart-btn"
                onClick={() => onAddToCart(product, quantity)}
                className="flex-1 bg-white text-[#000000] border border-[#000000] font-semibold text-sm h-12 rounded-lg hover:bg-[#f2f4f6] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                id="detail-buy-now-btn"
                onClick={() => onBuyNow(product, quantity)}
                className="flex-1 bg-[#000000] text-white font-semibold text-sm h-12 rounded-lg hover:bg-[#000000]/90 transition-colors shadow-sm flex items-center justify-center"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-[#c6c6cd] w-full" />

      {/* Bottom Section: Specs & Related Products */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Specs Table */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-[#000000]">Technical Specifications</h2>
          <div className="bg-white border border-[#c6c6cd] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <tbody>
                {product.specs ? (
                  Object.entries(product.specs).map(([key, value], idx) => (
                    <tr key={key} className={idx < Object.keys(product.specs!).length - 1 ? 'border-b border-[#e0e3e5]' : ''}>
                      <th className="py-3.5 px-4 text-xs font-semibold text-[#45464d] bg-[#f7f9fb] w-1/3">
                        {key}
                      </th>
                      <td className="py-3.5 px-4 text-sm text-[#000000] bg-white">
                        {value}
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="border-b border-[#e0e3e5]">
                      <th className="py-3.5 px-4 text-xs font-semibold text-[#45464d] bg-[#f7f9fb] w-1/3">Category</th>
                      <td className="py-3.5 px-4 text-sm text-[#000000] bg-white">{product.category}</td>
                    </tr>
                    <tr className="border-b border-[#e0e3e5]">
                      <th className="py-3.5 px-4 text-xs font-semibold text-[#45464d] bg-[#f7f9fb]">Condition</th>
                      <td className="py-3.5 px-4 text-sm text-[#000000] bg-white">{product.condition}</td>
                    </tr>
                    <tr className="border-b border-[#e0e3e5]">
                      <th className="py-3.5 px-4 text-xs font-semibold text-[#45464d] bg-[#f7f9fb]">Rating</th>
                      <td className="py-3.5 px-4 text-sm text-[#000000] bg-white">{product.rating} / 5.0 ({product.reviewCount} reviews)</td>
                    </tr>
                    <tr>
                      <th className="py-3.5 px-4 text-xs font-semibold text-[#45464d] bg-[#f7f9fb]">Warranty</th>
                      <td className="py-3.5 px-4 text-sm text-[#000000] bg-white">1 Year Manufacturer Warranty</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Related Products */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#000000]">Related Products</h2>
            <div className="flex gap-1.5">
              <button className="w-8 h-8 rounded-full border border-[#c6c6cd] flex items-center justify-center text-[#45464d] hover:bg-[#f2f4f6]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full border border-[#c6c6cd] flex items-center justify-center text-[#45464d] hover:bg-[#f2f4f6]">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel)}
                className="min-w-[200px] w-[200px] bg-white border border-[#c6c6cd] rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="w-full aspect-square bg-[#f2f4f6]">
                  <img src={rel.images[0]} alt={rel.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex flex-col gap-1 flex-grow justify-between">
                  <span className="text-xs font-medium text-[#000000] line-clamp-2">{rel.title}</span>
                  <span className="text-sm font-bold text-[#000000]">${rel.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Seller Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#000000]">Contact Merchant: {product.sellerName}</h3>
            <p className="text-sm text-[#45464d]">
              Send an inquiry regarding bulk orders, custom quotes, or logistics details for {product.title}.
            </p>
            <textarea
              rows={4}
              placeholder="Write your message here..."
              className="w-full p-3 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 border border-[#c6c6cd] text-sm rounded-lg hover:bg-[#f2f4f6]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Message sent to ${product.sellerName}! They will respond within 24 hours.`);
                  setShowContactModal(false);
                }}
                className="px-4 py-2 bg-[#000000] text-white text-sm rounded-lg hover:bg-[#000000]/90"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
