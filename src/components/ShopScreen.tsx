import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Star, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import { Product, FilterState } from '../types';

interface ShopScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  initialSearchQuery?: string;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  initialSearchQuery = '',
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    categories: [],
    minPrice: null,
    maxPrice: null,
    condition: 'Any',
    minRating: null,
    search: initialSearchQuery,
    sortBy: 'recent',
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Sync initial search if passed
  React.useEffect(() => {
    if (initialSearchQuery !== undefined && initialSearchQuery !== filterState.search) {
      setFilterState((prev) => ({ ...prev, search: initialSearchQuery }));
    }
  }, [initialSearchQuery]);

  const allCategories = [
    { name: 'Electronics', count: 245 },
    { name: 'Machinery', count: 189 },
    { name: 'Raw Materials', count: 56 },
    { name: 'Office Supplies', count: 312 },
    { name: 'IT Infrastructure', count: 84 },
    { name: 'Appliances', count: 42 },
    { name: 'Security', count: 96 },
    { name: 'Instruments', count: 110 },
  ];

  const handleCategoryToggle = (categoryName: string) => {
    setFilterState((prev) => {
      const exists = prev.categories.includes(categoryName);
      const nextCategories = exists
        ? prev.categories.filter((c) => c !== categoryName)
        : [...prev.categories, categoryName];
      return { ...prev, categories: nextCategories };
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilterState({
      categories: [],
      minPrice: null,
      maxPrice: null,
      condition: 'Any',
      minRating: null,
      search: '',
      sortBy: 'recent',
    });
    setCurrentPage(1);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search
      if (filterState.search.trim()) {
        const query = filterState.search.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesSeller = product.sellerName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesSeller) {
          return false;
        }
      }

      // Categories
      if (filterState.categories.length > 0) {
        if (!filterState.categories.includes(product.category)) {
          return false;
        }
      }

      // Price range
      if (filterState.minPrice !== null && product.price < filterState.minPrice) {
        return false;
      }
      if (filterState.maxPrice !== null && product.price > filterState.maxPrice) {
        return false;
      }

      // Condition
      if (filterState.condition !== 'Any' && product.condition !== filterState.condition) {
        return false;
      }

      // Rating
      if (filterState.minRating !== null && product.rating < filterState.minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'rating') return b.rating - a.rating;
      if (filterState.sortBy === 'popularity') return b.reviewCount - a.reviewCount;
      return 0; // default recent
    });
  }, [products, filterState]);

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  return (
    <div id="shop-screen" className="flex-grow flex flex-col md:flex-row px-4 md:px-8 max-w-[1280px] mx-auto w-full gap-6 py-6">
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden flex justify-between items-center bg-white p-3 rounded-xl border border-[#c6c6cd]">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex items-center gap-2 text-sm font-semibold text-[#000000]"
        >
          <Filter className="w-4 h-4" />
          <span>Filters {filterState.categories.length > 0 ? `(${filterState.categories.length})` : ''}</span>
        </button>
        <span className="text-xs text-[#76777d]">{filteredProducts.length} Results</span>
      </div>

      {/* Sidebar Filters (Desktop & Mobile Drawer) */}
      <aside
        id="shop-sidebar-filters"
        className={`w-full md:w-64 shrink-0 flex-col gap-6 sticky top-28 h-[calc(100vh-120px)] overflow-y-auto pr-2 ${
          mobileFilterOpen
            ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto flex'
            : 'hidden md:flex'
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#000000]">Filters</h3>
          {mobileFilterOpen && (
            <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-[#45464d]">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="border-b border-[#c6c6cd] pb-6">
          <h4 className="text-xs font-semibold text-[#45464d] mb-3 uppercase tracking-wider">Categories</h4>
          <div className="flex flex-col gap-2.5">
            {allCategories.map((cat) => (
              <label key={cat.name} className="flex items-center gap-2.5 cursor-pointer group text-sm">
                <input
                  type="checkbox"
                  checked={filterState.categories.includes(cat.name)}
                  onChange={() => handleCategoryToggle(cat.name)}
                  className="rounded border-[#c6c6cd] text-[#000000] focus:ring-[#000000] w-4 h-4 transition-colors"
                />
                <span className="text-[#191c1e] group-hover:text-[#000000] transition-colors">
                  {cat.name} <span className="text-[#76777d]">({cat.count})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="border-b border-[#c6c6cd] pb-6">
          <h4 className="text-xs font-semibold text-[#45464d] mb-3 uppercase tracking-wider">Price Range</h4>
          <div className="flex gap-2.5 items-center">
            <input
              type="number"
              placeholder="Min"
              value={filterState.minPrice ?? ''}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  minPrice: e.target.value ? Number(e.target.value) : null,
                }))
              }
              className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-1.5 text-sm outline-none focus:border-[#000000]"
            />
            <span className="text-[#45464d]">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filterState.maxPrice ?? ''}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  maxPrice: e.target.value ? Number(e.target.value) : null,
                }))
              }
              className="w-full rounded-lg border border-[#c6c6cd] bg-white px-3 py-1.5 text-sm outline-none focus:border-[#000000]"
            />
          </div>
        </div>

        {/* Condition */}
        <div className="border-b border-[#c6c6cd] pb-6">
          <h4 className="text-xs font-semibold text-[#45464d] mb-3 uppercase tracking-wider">Condition</h4>
          <div className="flex flex-col gap-2.5 text-sm">
            {(['Any', 'New', 'Refurbished'] as const).map((cond) => (
              <label key={cond} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="condition"
                  checked={filterState.condition === cond}
                  onChange={() => setFilterState((prev) => ({ ...prev, condition: cond }))}
                  className="border-[#c6c6cd] text-[#000000] focus:ring-[#000000]"
                />
                <span className="text-[#191c1e] group-hover:text-[#000000]">{cond}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Seller Rating */}
        <div>
          <h4 className="text-xs font-semibold text-[#45464d] mb-3 uppercase tracking-wider">Seller Rating</h4>
          <div className="flex flex-col gap-2.5 text-sm">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filterState.minRating === 4}
                onChange={(e) =>
                  setFilterState((prev) => ({ ...prev, minRating: e.target.checked ? 4 : null }))
                }
                className="rounded border-[#c6c6cd] text-[#000000] focus:ring-[#000000] w-4 h-4"
              />
              <span className="flex items-center gap-1 text-[#191c1e]">
                4 & Up <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </span>
            </label>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          id="clear-filters-btn"
          onClick={handleClearFilters}
          className="w-full py-2.5 bg-[#e0e3e5] text-[#000000] font-medium text-sm rounded-lg hover:bg-[#c6c6cd] transition-colors mt-2"
        >
          Clear Filters
        </button>

        {mobileFilterOpen && (
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="w-full py-3 bg-[#000000] text-white font-semibold text-sm rounded-lg mt-4"
          >
            Apply Filters ({filteredProducts.length})
          </button>
        )}
      </aside>

      {/* Main Content Area */}
      <section className="flex-grow flex flex-col gap-6">
        {/* Top Tools: Search & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-xl border border-[#c6c6cd]">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#76777d] w-4 h-4" />
            <input
              id="shop-search-input"
              type="text"
              value={filterState.search}
              onChange={(e) =>
                setFilterState((prev) => ({ ...prev, search: e.target.value }))
              }
              placeholder="Search products in Shop..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#c6c6cd] bg-[#f7f9fb] focus:border-[#000000] outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-[#45464d]">Sort by:</span>
            <select
              id="shop-sort-select"
              value={filterState.sortBy}
              onChange={(e) =>
                setFilterState((prev) => ({
                  ...prev,
                  sortBy: e.target.value as FilterState['sortBy'],
                }))
              }
              className="rounded-lg border border-[#c6c6cd] bg-white text-sm focus:border-[#000000] py-1.5 pl-3 pr-8 cursor-pointer outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popularity">Popularity</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {paginatedProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#c6c6cd] p-12 text-center space-y-4">
            <p className="text-lg font-semibold text-[#000000]">No products match your current filters.</p>
            <p className="text-sm text-[#45464d]">Try adjusting your search term or clearing some category filters.</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 bg-[#000000] text-white text-sm font-medium rounded-lg hover:opacity-90"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <article
                key={product.id}
                id={`shop-product-card-${product.id}`}
                onClick={() => onSelectProduct(product)}
                className="bg-white border border-[#c6c6cd] rounded-xl overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col h-full relative cursor-pointer"
              >
                {/* Stock Badge */}
                <div
                  className={`absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded text-[11px] font-semibold ${
                    product.stockStatus === 'In Stock'
                      ? 'bg-[#6cf8bb]/30 text-[#006c49]'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {product.stockStatus}
                </div>

                {/* Thumbnail */}
                <div className="aspect-square bg-[#f2f4f6] relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Content */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-xs text-[#76777d] block mb-1">{product.category}</span>
                    <h3 className="text-sm font-semibold text-[#000000] mb-1.5 line-clamp-2 group-hover:text-[#006c49] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-[#45464d] line-clamp-2 mb-3 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-[#eceef0]">
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <span className="text-[11px] text-[#76777d] block">Seller: {product.sellerName}</span>
                        <span className="text-lg font-bold text-[#000000]">
                          ${product.price.toFixed(2)}
                          {product.priceSuffix && <span className="text-xs text-[#76777d] font-normal"> {product.priceSuffix}</span>}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`add-to-cart-shop-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-full bg-[#e0e3e5] text-[#000000] border border-[#c6c6cd] text-xs font-semibold py-2.5 rounded-lg hover:bg-[#000000] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 pt-4 border-t border-[#c6c6cd]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#c6c6cd] text-[#45464d] hover:bg-[#f2f4f6] disabled:opacity-40"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                  currentPage === page
                    ? 'bg-[#000000] text-white'
                    : 'border border-[#c6c6cd] text-[#000000] hover:bg-[#f2f4f6]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#c6c6cd] text-[#45464d] hover:bg-[#f2f4f6] disabled:opacity-40"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
