import React, { useState } from 'react';
import { MessageCircle, Search, X, ArrowRight } from 'lucide-react';
import {
  PRODUCTS,
  ProductCategory,
  ProductItem,
  BRAND_CONFIG,
  buildWhatsAppUrl,
  buildProductWhatsAppUrl,
} from '../data/skincareData';
import { ResilientImage } from '../components/ResilientImage';
import { PageRoute } from '../components/Layout';

interface ShopPageProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onSelectProduct: (product: ProductItem) => void;
  onNavigate: (page: PageRoute) => void;
}

const CATEGORIES: ProductCategory[] = [
  'All Products',
  'Face Washes',
  'Moisturizers & Gels',
  'Lip & Skin Balms',
];

export const ShopPage: React.FC<ShopPageProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All Products' || product.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;
    const matchesQuery =
      product.name.toLowerCase().includes(query) ||
      product.shortDescription.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.labelListedIngredients.some((ing) => ing.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Page Header */}
      <div className="bg-[#FAF2F4] rounded-2xl border border-[#EAD8DC] p-8 sm:p-10 lg:p-12 space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
          <span>Grace N Glow Catalogue</span>
          <span aria-hidden="true">·</span>
          <span>{BRAND_CONFIG.descriptor}</span>
        </div>
        <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2226]">
          Shop All Skincare Products
        </h1>
        <p className="text-sm sm:text-base text-[#5A474E] max-w-2xl leading-relaxed">
          Explore our handmade face washes, soothing gels, facial moisturizers, and lip balms.
          Click any product to read usage directions, precautions, and label-listed ingredients—or
          enquire directly via WhatsApp to confirm pricing and place your order.
        </p>
      </div>

      {/* Interactive Category Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAD8DC]">
        {/* Interactive Filter Tabs (Functional Buttons) */}
        <div
          role="tablist"
          aria-label="Product Categories"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#FAF0F2] border border-[#EAD8DC] rounded-xl"
        >
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count =
              category === 'All Products'
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === category).length;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-[#2C2226] shadow-xs border border-[#DFC5CB]'
                    : 'text-[#5A474E] hover:text-[#2C2226]'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Functional Product Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#7A5C64] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or ingredient..."
            aria-label="Search products by name or ingredient"
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-[#DFC5CB] rounded-xl text-[#2C2226] placeholder:text-[#8C737A] focus:outline-2 focus:outline-[#9E4758]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#6E5D63] hover:text-[#2C2226]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EAD8DC] p-12 text-center space-y-4">
          <p className="font-serif-editorial text-2xl text-[#2C2226]">
            No products matched “{searchQuery}”
          </p>
          <p className="text-sm text-[#5A474E] max-w-md mx-auto">
            Try clearing your search filter or message us directly on WhatsApp if you are looking
            for a specific skincare item.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('All Products');
              }}
              className="px-4 py-2.5 text-xs font-medium text-[#2C2226] bg-[#FAF2F4] hover:bg-[#F2DFE4] rounded-lg transition-colors"
            >
              Reset Filters
            </button>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group bg-white rounded-2xl border border-[#EAD8DC] hover:border-[#D88C9A] transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Product Photography */}
                <div
                  onClick={() => onSelectProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProduct(product);
                    }
                  }}
                  className="cursor-pointer p-6 bg-[#FFFDFD] border-b border-[#F4E8EB]"
                >
                  <ResilientImage
                    src={product.primaryImage}
                    alt={product.name}
                    bgTone="#FFFFFF"
                    containerClassName="aspect-[4/3] rounded-xl flex items-center justify-center p-2"
                    className="w-full h-full object-contain group-hover:scale-105"
                  />
                </div>

                {/* Product Metadata & Copy */}
                <div className="p-6 space-y-3">
                  {/* Unboxed Text Metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#6E5D63]">
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.routineStep}</span>
                  </div>

                  <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left hover:text-[#9E4758] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </button>
                  </h2>

                  <p className="text-xs text-[#7A5C64] font-medium">
                    Size: {product.netVolumeOrWeight} · Price: {product.priceDisplay}
                  </p>

                  <p className="text-sm text-[#5A474E] leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 text-xs font-medium text-[#2C2226] bg-[#FAF2F4] hover:bg-[#F2DFE4] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  View Details
                </button>
                <a
                  href={buildProductWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* General Consultation & Routine Help Banner */}
      <div className="bg-[#F6F9F7] rounded-2xl border border-[#DCE6DF] p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#4A6654] font-medium">
            <span>Personal Assistance</span>
            <span aria-hidden="true">·</span>
            <span>Not sure where to begin?</span>
          </div>
          <h3 className="font-serif-editorial text-2xl font-medium text-[#2C2226]">
            Need Help Choosing the Right Cleanser or Moisturizer?
          </h3>
          <p className="text-sm text-[#5A474E] leading-relaxed">
            Explore our educational Skincare Guide to understand your skin type, or send us a
            general WhatsApp message at {BRAND_CONFIG.whatsappDisplay} and we will gladly share
            product details.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('guide')}
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-[#2C2226] bg-white hover:bg-[#EBF1ED] border border-[#C5D6CB] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Read Skincare Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href={buildWhatsAppUrl(
              "Hello Grace N Glow! I'm browsing your product catalogue and would love some guidance on choosing suitable products for my skin routine."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>General WhatsApp Enquiry</span>
          </a>
        </div>
      </div>
    </div>
  );
};
