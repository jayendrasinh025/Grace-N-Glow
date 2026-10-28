import React, { useState } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Check,
  AlertCircle,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import {
  ProductItem,
  PRODUCTS,
  BRAND_CONFIG,
  buildProductWhatsAppUrl,
  buildWhatsAppUrl,
} from '../data/skincareData';
import { ResilientImage } from '../components/ResilientImage';
import { PageRoute } from '../components/Layout';

interface ProductDetailPageProps {
  product: ProductItem;
  onBackToShop: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onNavigate: (page: PageRoute) => void;
}

const ENQUIRY_TOPICS = [
  'Current price & ordering process',
  'Available sizes / quantities',
  'Full batch ingredient list',
  'Suitability for my skin type',
  'Delivery timeline to my city / PIN code',
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToShop,
  onSelectProduct,
  onNavigate,
}) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'Current price & ordering process',
    'Available sizes / quantities',
    'Full batch ingredient list',
  ]);

  // Reset gallery index when product changes
  React.useEffect(() => {
    setActiveGalleryIndex(0);
  }, [product.id]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const currentGalleryItem =
    product.galleryImages[activeGalleryIndex] || product.galleryImages[0];

  const prefilledPreviewText =
    selectedTopics.length > 0
      ? `Hello Grace N Glow! I'm interested in ${product.name}. Specifically, I would like to ask about: ${selectedTopics.join(', ')}.`
      : `Hello Grace N Glow! I'm interested in ${product.name}. Could you please share the price, available sizes, ingredients, and ordering details?`;

  const whatsappUrl = buildProductWhatsAppUrl(product.name, selectedTopics);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  const fallbackRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAD8DC] pb-4">
        <button
          type="button"
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5A474E] hover:text-[#2C2226] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalogue</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-[#6E5D63]">
          <span>{product.category}</span>
          <span aria-hidden="true">·</span>
          <span>{product.routineStep}</span>
        </div>
      </div>

      {/* Main Split Product Presentation & Contiguous Enquiry Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: Sticky Product Photography & View Switcher */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4">
          <div className="bg-white rounded-2xl border border-[#EAD8DC] p-6 sm:p-8">
            <ResilientImage
              src={currentGalleryItem.url}
              alt={`${product.name} — ${currentGalleryItem.caption}`}
              bgTone="#FFFFFF"
              focusArea={currentGalleryItem.focusArea || 'full'}
              priority={true}
              containerClassName="aspect-square rounded-xl flex items-center justify-center p-4"
              className="w-full h-full object-contain"
            />
            <p className="text-xs text-center text-[#6E5D63] pt-4 border-t border-[#F4E8EB] mt-4">
              {currentGalleryItem.caption}
            </p>
          </div>

          {/* Multiple Photographic Views / Inspection Modes */}
          {product.galleryImages.length > 1 && (
            <div className="grid grid-cols-2 gap-3">
              {product.galleryImages.map((img, idx) => {
                const isSelected = idx === activeGalleryIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveGalleryIndex(idx)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#FAF2F4] border-[#9E4758] text-[#2C2226]'
                        : 'bg-white border-[#EAD8DC] text-[#5A474E] hover:border-[#D88C9A]'
                    }`}
                  >
                    <ResilientImage
                      src={img.url}
                      alt={img.caption}
                      bgTone="#FFFFFF"
                      focusArea={img.focusArea || 'full'}
                      containerClassName="w-14 h-14 rounded-lg shrink-0 border border-[#F2E4E7] p-1"
                      className="w-full h-full object-contain"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#2C2226] truncate">
                        {idx === 0 ? 'Full Presentation' : 'Close-Up Inspection'}
                      </p>
                      <p className="text-[11px] text-[#6E5D63] line-clamp-2 mt-0.5">
                        {img.caption}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Contiguous Product Information & WhatsApp Ordering Module */}
        <div className="lg:col-span-6 space-y-8">
          {/* Header & Key Specifications */}
          <div className="space-y-4 border-b border-[#EAD8DC] pb-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.routineStep}</span>
            </div>

            <h1 className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#2C2226]">
              {product.name}
            </h1>

            <p className="text-base text-[#5A474E] leading-relaxed">{product.subtitle}</p>

            {/* Specification Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
              <div className="bg-[#FAF2F4] rounded-xl p-3.5 border border-[#EAD8DC]">
                <p className="text-[11px] uppercase tracking-wider text-[#7A5C64]">
                  Size / Quantity
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#2C2226] mt-1 tabular-nums">
                  {product.netVolumeOrWeight}
                </p>
              </div>
              <div className="bg-[#FAF2F4] rounded-xl p-3.5 border border-[#EAD8DC]">
                <p className="text-[11px] uppercase tracking-wider text-[#7A5C64]">Price</p>
                <p className="text-xs sm:text-sm font-medium text-[#2C2226] mt-1">
                  {product.priceDisplay}
                </p>
              </div>
              <div className="bg-[#FAF2F4] rounded-xl p-3.5 border border-[#EAD8DC]">
                <p className="text-[11px] uppercase tracking-wider text-[#7A5C64]">Variants</p>
                <p className="text-xs sm:text-sm font-medium text-[#2C2226] mt-1">
                  {product.availableVariants}
                </p>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Ordering & Enquiry Module */}
          <div className="bg-[#F6F9F7] rounded-2xl border border-[#DCE6DF] p-6 space-y-5">
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
                  Enquire or Order via WhatsApp
                </h2>
                <span className="text-xs text-[#4A6654] font-medium tabular-nums">
                  {BRAND_CONFIG.whatsappDisplay}
                </span>
              </div>
              <p className="text-xs text-[#5A474E]">
                Select the details you would like to ask about (your WhatsApp message will be
                prefilled automatically—you manually press Send in WhatsApp):
              </p>
            </div>

            {/* Interactive Checkboxes for Prefilled Message */}
            <div className="flex flex-wrap gap-2">
              {ENQUIRY_TOPICS.map((topic) => {
                const isChecked = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleTopic(topic)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-white border-[#2E5A44] text-[#2C2226]'
                        : 'bg-[#EBF1ED]/60 border-transparent text-[#5A474E] hover:text-[#2C2226]'
                    }`}
                  >
                    <Check
                      className={`w-3.5 h-3.5 ${
                        isChecked ? 'text-[#2E5A44] opacity-100' : 'opacity-30'
                      }`}
                    />
                    <span>{topic}</span>
                  </button>
                );
              })}
            </div>

            {/* Prefilled Message Preview */}
            <div className="bg-white rounded-xl border border-[#DCE6DF] p-3.5 space-y-1">
              <p className="text-[11px] uppercase tracking-wider text-[#6E5D63] font-medium">
                Prefilled WhatsApp Message Preview:
              </p>
              <p className="text-xs text-[#2C2226] italic leading-relaxed">
                “{prefilledPreviewText}”
              </p>
            </div>

            {/* Primary WhatsApp CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Ask / Order {product.name} on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Product Description & Intended Use */}
          <div className="space-y-4">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              About This Product
            </h2>
            <p className="text-sm sm:text-base text-[#5A474E] leading-relaxed">
              {product.fullDescription}
            </p>
            <div className="bg-white rounded-xl border border-[#EAD8DC] p-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
                Intended Use
              </p>
              <p className="text-sm text-[#5A474E]">{product.intendedUse}</p>
            </div>
          </div>

          {/* Label-Listed Ingredients & Transparency */}
          <div className="space-y-3 border-t border-[#EAD8DC] pt-6">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              Ingredients & Label Information
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.labelListedIngredients.map((ingredient, i) => (
                <li
                  key={i}
                  className="bg-white rounded-lg border border-[#EAD8DC] px-3.5 py-2.5 text-xs sm:text-sm text-[#2C2226] font-medium"
                >
                  {ingredient}
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#6E5D63] leading-relaxed">{product.ingredientsNote}</p>
          </div>

          {/* Step-by-Step Directions for Use */}
          <div className="space-y-4 border-t border-[#EAD8DC] pt-6">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              Directions for Use
            </h2>
            <ol className="space-y-3">
              {product.directionsForUse.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3.5 bg-white rounded-xl border border-[#EAD8DC] p-4"
                >
                  <span className="font-serif-editorial text-base font-semibold text-[#9E4758] tabular-nums shrink-0">
                    0{index + 1}.
                  </span>
                  <span className="text-sm text-[#4A3B40] leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Precautions & Storage Instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#EAD8DC] pt-6">
            <div className="bg-[#FAF2F4] rounded-xl border border-[#EAD8DC] p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E4758]">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Precautions & Patch Testing</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#4A3B40] leading-relaxed">
                {product.precautions.map((precaution, i) => (
                  <li key={i}>• {precaution}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('guide')}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#9E4758] hover:underline pt-1 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read our 24-Hour Patch Test Guide</span>
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#EAD8DC] p-5 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
                Storage Instructions
              </p>
              <p className="text-xs text-[#5A474E] leading-relaxed">
                {product.storageInstructions}
              </p>
              <div className="pt-2 border-t border-[#F4E8EB]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
                  Available Variants
                </p>
                <p className="text-xs text-[#5A474E] mt-1">{product.availableVariants}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="space-y-6 border-t border-[#EAD8DC] pt-12">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#2C2226]">
            Explore More from Grace N Glow
          </h2>
          <button
            type="button"
            onClick={onBackToShop}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#9E4758] hover:text-[#7A3241] cursor-pointer"
          >
            <span>All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fallbackRelated.map((rel) => (
            <div
              key={rel.id}
              className="bg-white rounded-2xl border border-[#EAD8DC] p-5 flex flex-col justify-between gap-4"
            >
              <div
                onClick={() => onSelectProduct(rel)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(rel);
                  }
                }}
                className="cursor-pointer space-y-3"
              >
                <ResilientImage
                  src={rel.primaryImage}
                  alt={rel.name}
                  bgTone="#FFFFFF"
                  containerClassName="aspect-[4/3] rounded-xl flex items-center justify-center p-2 border border-[#F4E8EB]"
                  className="w-full h-full object-contain"
                />
                <div className="text-xs text-[#6E5D63]">
                  {rel.category} · {rel.netVolumeOrWeight}
                </div>
                <h3 className="font-serif-editorial text-lg font-medium text-[#2C2226] hover:text-[#9E4758]">
                  {rel.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectProduct(rel)}
                  className="flex-1 px-3 py-2 text-xs font-medium text-[#2C2226] bg-[#FAF2F4] hover:bg-[#F2DFE4] rounded-lg transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <a
                  href={buildProductWhatsAppUrl(rel.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Enquire</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
