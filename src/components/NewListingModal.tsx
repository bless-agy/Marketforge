import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';

interface NewListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

export const NewListingModal: React.FC<NewListingModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [stockCount, setStockCount] = useState('25');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      title: title || 'New Commercial Inventory Listing',
      category,
      price: parseFloat(price) || 99.99,
      sku: sku || `SKU-${Math.floor(Math.random() * 9000 + 1000)}`,
      stockStatus: Number(stockCount) > 0 ? 'In Stock' : 'Out of Stock',
      stockCount: Number(stockCount) || 25,
      rating: 5.0,
      reviewCount: 1,
      sellerName: 'Seller Forge',
      sellerVerified: true,
      description: description || 'High-performance commercial product ready for enterprise dispatch.',
      condition: 'New',
      images: [
        imageUrl.trim() ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCsWPpvWxekVHiyHTXkhN9-NjPffSy2ZnIQkUz_zBFkClx_5S4lrwrXmqbARcRIQkExpVbjuxnDsqt8yBwDkp1qq0IWJXDZgwfy9_1MYsAmZebP75dWr1vFh8te2VouuKw99pM8lDOUBhT34YnvuwaGC9otQoHaiGsy3_LREogFMKxxHwHufsqNH9RjHifwn1yIwakuzzu7uKxqAuA0v5Bs6QhzNdAX9l6Z9ZNzkVVBFXsaKTol5tmu',
      ],
    };

    onAddProduct(newProd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
        <div className="flex justify-between items-center border-b border-[#c6c6cd] pb-3">
          <h3 className="text-xl font-bold text-[#000000]">Create New Marketplace Listing</h3>
          <button onClick={onClose} className="p-1 text-[#45464d] hover:text-[#000000]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#45464d] block mb-1">Product Title</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Precision CNC Aluminum Workstation"
              className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#45464d] block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000] bg-white"
              >
                <option value="Electronics">Electronics</option>
                <option value="Machinery">Machinery</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="IT Infrastructure">IT Infrastructure</option>
                <option value="Raw Materials">Raw Materials</option>
                <option value="Appliances">Appliances</option>
                <option value="Security">Security</option>
                <option value="Instruments">Instruments</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#45464d] block mb-1">Unit Price ($)</label>
              <input
                required
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="199.99"
                className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#45464d] block mb-1">SKU Number</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="PROD-902-X"
                className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#45464d] block mb-1">Initial Stock Units</label>
              <input
                type="number"
                value={stockCount}
                onChange={(e) => setStockCount(e.target.value)}
                placeholder="50"
                className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#45464d] block mb-1">Image URL (Optional)</label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#76777d]" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full pl-9 pr-3 py-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#45464d] block mb-1">Product Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe specs, warranty, build quality, and target business applications..."
              className="w-full p-2.5 border border-[#c6c6cd] rounded-lg text-sm outline-none focus:border-[#000000]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#c6c6cd]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#c6c6cd] text-sm font-semibold rounded-lg hover:bg-[#f2f4f6]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#000000] text-white text-sm font-semibold rounded-lg hover:bg-[#000000]/90 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
