import React from 'react';
import {
  ArrowRight,
  MessageCircle,
  BookOpen,
  Instagram,
  Sparkles,
  Check,
  ShieldCheck,
} from 'lucide-react';
import {
  BRAND_CONFIG,
  PRODUCTS,
  SKINCARE_GUIDES,
  VERIFIED_BRAND_PILLARS,
  ORDER_STEPS,
  buildWhatsAppUrl,
  buildProductWhatsAppUrl,
  ProductItem,
  SkincareArticle,
} from '../data/skincareData';
import { ResilientImage } from '../components/ResilientImage';
import { PageRoute } from '../components/Layout';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectProduct: (product: ProductItem) => void;
  onSelectArticle: (article: SkincareArticle) => void;
  onOpenInstagramInfo: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
  onSelectArticle,
  onOpenInstagramInfo,
}) => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured);
  const heroPrimaryProduct = PRODUCTS[0]; // Blush Glow Moisturizer
  const heroSecondaryProduct = PRODUCTS[1]; // Chocolate Lip Balm SPF 30
  const heroTertiaryProduct = PRODUCTS[2]; // 24 K Gold Facewash

  return (
    <div className="space-y-20 md:space-y-28 pb-20">
      {/* B. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FDF4F6] via-[#FFF9FA] to-[#FFFBFB] border-b border-[#F2E4E7]">
        {/* Subtle Botanical SVG Background Ornament */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 600"
          className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] text-[#5E7A68]/10"
          fill="none"
        >
          <path
            d="M300 40C360 150 470 210 560 240C470 290 380 390 300 540C220 390 130 290 40 240C130 210 240 150 300 40Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="300" cy="290" r="140" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Editorial Copy Column */}
            <div className="lg:col-span-6 space-y-6 md:space-y-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
                <span>{BRAND_CONFIG.descriptor}</span>
                <span aria-hidden="true">·</span>
                <span>India</span>
              </div>

              <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-[54px] font-medium text-[#2C2226] leading-[1.14] tracking-tight max-w-xl">
                Your Natural Glow Begins Here.
              </h1>

              <p className="text-base sm:text-lg text-[#5A474E] leading-relaxed max-w-xl">
                Discover thoughtfully presented skincare essentials and simple ways to care for
                your skin. Explore our handmade cleansers, moisturizers, and lip care—and connect
                with us directly for personal guidance.
              </p>

              {/* Two Clear Calls to Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-[#9E4758] hover:bg-[#843847] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Our Products</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('guide')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium text-[#2C2226] bg-white hover:bg-[#F9E8EC] border border-[#DFC5CB] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#5E7A68] shrink-0" />
                  <span>Discover Your Skincare Routine</span>
                </button>
              </div>

              {/* Quiet Editorial Assurance Line (Unboxed Text Metadata) */}
              <div className="pt-4 border-t border-[#EAD8DC] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6E5D63]">
                <span>Small-Batch Handmade Care</span>
                <span aria-hidden="true">·</span>
                <span>Responsible Skincare Guides</span>
                <span aria-hidden="true">·</span>
                <span>Direct WhatsApp Ordering ({BRAND_CONFIG.whatsappDisplay})</span>
              </div>
            </div>

            {/* Editorial Product Photoshoot Composition */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-12 gap-4 sm:gap-5 items-stretch">
                {/* Main Featured Product Portrait */}
                <div
                  onClick={() => onSelectProduct(heroPrimaryProduct)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProduct(heroPrimaryProduct);
                    }
                  }}
                  className="col-span-12 sm:col-span-7 group bg-white rounded-2xl border border-[#EAD8DC] p-5 sm:p-6 flex flex-col justify-between cursor-pointer hover:border-[#D88C9A] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-[#6E5D63] mb-3">
                    <span>Signature Hydration</span>
                    <span>Step 02</span>
                  </div>
                  <ResilientImage
                    src={heroPrimaryProduct.primaryImage}
                    alt={heroPrimaryProduct.name}
                    bgTone="#FFFFFF"
                    priority={true}
                    containerClassName="aspect-square rounded-xl flex items-center justify-center p-2"
                    className="w-full h-full object-contain group-hover:scale-105"
                  />
                  <div className="pt-4 mt-2 border-t border-[#F4E8EB] flex items-center justify-between gap-2">
                    <div>
                      <p className="font-serif-editorial text-lg font-medium text-[#2C2226] group-hover:text-[#9E4758] transition-colors">
                        {heroPrimaryProduct.name}
                      </p>
                      <p className="text-xs text-[#6E5D63] mt-0.5">
                        Grace N Glow Organic Skincare
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[#9E4758] whitespace-nowrap">
                      View →
                    </span>
                  </div>
                </div>

                {/* Stacked Companion Products */}
                <div className="col-span-12 sm:col-span-5 flex flex-col gap-4 sm:gap-5 justify-between">
                  <div
                    onClick={() => onSelectProduct(heroSecondaryProduct)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProduct(heroSecondaryProduct);
                      }
                    }}
                    className="flex-1 group bg-white rounded-2xl border border-[#EAD8DC] p-4 flex flex-col justify-between cursor-pointer hover:border-[#D88C9A] transition-colors"
                  >
                    <ResilientImage
                      src={heroSecondaryProduct.primaryImage}
                      alt={heroSecondaryProduct.name}
                      bgTone="#FFFFFF"
                      priority={true}
                      containerClassName="aspect-[4/3] rounded-xl flex items-center justify-center p-2"
                      className="w-full h-full object-contain group-hover:scale-105"
                    />
                    <div className="pt-3">
                      <p className="text-xs text-[#6E5D63]">Daily Lip Care · SPF 30</p>
                      <p className="font-serif-editorial text-base font-medium text-[#2C2226] group-hover:text-[#9E4758] transition-colors">
                        Chocolate Lip Balm
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={() => onSelectProduct(heroTertiaryProduct)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProduct(heroTertiaryProduct);
                      }
                    }}
                    className="flex-1 group bg-white rounded-2xl border border-[#EAD8DC] p-4 flex flex-col justify-between cursor-pointer hover:border-[#D88C9A] transition-colors"
                  >
                    <ResilientImage
                      src={heroTertiaryProduct.primaryImage}
                      alt={heroTertiaryProduct.name}
                      bgTone="#FFFFFF"
                      containerClassName="aspect-[4/3] rounded-xl flex items-center justify-center p-2"
                      className="w-full h-full object-contain group-hover:scale-105"
                    />
                    <div className="pt-3">
                      <p className="text-xs text-[#6E5D63]">Gentle Cleanser · 100 ml</p>
                      <p className="font-serif-editorial text-base font-medium text-[#2C2226] group-hover:text-[#9E4758] transition-colors">
                        24 K Gold Facewash
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* C. Brand Introduction */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF2F4] rounded-2xl border border-[#EAD8DC] p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
                <span>About Grace N Glow</span>
                <span aria-hidden="true">·</span>
                <span>{BRAND_CONFIG.tagline}</span>
              </div>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-medium text-[#2C2226] leading-snug">
                Thoughtful Handmade Skincare, Presented with Honesty and Personal Care
              </h2>
              <p className="text-sm sm:text-base text-[#5A474E] leading-relaxed">
                Grace N Glow focuses on organic, handmade, and natural skincare essentials designed
                for everyday routines across India. Rather than overwhelming you with complicated
                claims or automated checkout pressure, we believe in helping you understand what
                each product does, how to use it gently, and how to ask questions directly before
                you order.
              </p>
              <p className="text-sm sm:text-base text-[#5A474E] leading-relaxed">
                From refreshing gel face washes to comforting moisturizers and nourishing lip care,
                each item in our catalogue can be explored in detail—and ordered through a simple
                WhatsApp conversation with our team.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#9E4758] hover:text-[#7A3241] underline underline-offset-4 cursor-pointer"
                >
                  <span>Read more about our approach</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl border border-[#EAD8DC] p-5 sm:p-6 space-y-4">
                <ResilientImage
                  src="/assets/aistudio/Gemini_Generated_Image_cvme3gcvme3gcvme_d8671280.png"
                  alt="Grace N Glow Handmade Small Business Balm Tin"
                  bgTone="#FFFFFF"
                  containerClassName="aspect-[4/3] rounded-lg flex items-center justify-center p-2"
                  className="w-full h-full object-contain"
                />
                <div className="text-center space-y-1 pt-2 border-t border-[#F4E8EB]">
                  <p className="font-serif-editorial text-base font-medium text-[#2C2226]">
                    Small-Batch Handmade Presentation
                  </p>
                  <p className="text-xs text-[#6E5D63]">
                    Prepared with care and shared directly with customers across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. Featured Products */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAD8DC] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
              <span>Curated Catalogue</span>
              <span aria-hidden="true">·</span>
              <span>Genuine Product Photographs</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#2C2226]">
              Featured Skincare Essentials
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9E4758] hover:text-[#7A3241] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>View All {PRODUCTS.length} Products in Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Column Editorial Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredProducts.map((product) => (
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

                {/* Product Info */}
                <div className="p-6 space-y-3">
                  {/* Unboxed Metadata with Typographic Separator */}
                  <div className="flex items-center gap-2 text-xs text-[#6E5D63]">
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.netVolumeOrWeight}</span>
                  </div>

                  <h3 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left hover:text-[#9E4758] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </button>
                  </h3>

                  <p className="text-sm text-[#5A474E] leading-relaxed line-clamp-3">
                    {product.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Actions */}
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
      </section>

      {/* E. Why Explore Grace N Glow? */}
      <section className="bg-[#F6F9F7] border-y border-[#DCE6DF] py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#4A6654] font-medium">
              <span>Our Verified Commitments</span>
              <span aria-hidden="true">·</span>
              <span>Responsible Skincare</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#2C2226]">
              Why Explore Grace N Glow?
            </h2>
            <p className="text-sm sm:text-base text-[#5A474E] leading-relaxed">
              We focus on clarity, product education, and personal communication rather than
              exaggerated cosmetic promises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFIED_BRAND_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="bg-white rounded-xl border border-[#DCE6DF] p-6 space-y-3"
              >
                <span className="font-serif-editorial text-lg font-medium text-[#5E7A68] tabular-nums">
                  {pillar.number}.
                </span>
                <h3 className="font-serif-editorial text-lg font-medium text-[#2C2226]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#5A474E] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. Skincare Education Preview */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAD8DC] pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
              <span>Skincare Education</span>
              <span aria-hidden="true">·</span>
              <span>Practical & Responsible Guides</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#2C2226]">
              Learn How to Care for Your Skin Mindfully
            </h2>
            <p className="text-sm sm:text-base text-[#5A474E]">
              Good skincare begins with understanding your skin type, patch testing every new
              product, and applying formulas gently.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('guide')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9E4758] hover:text-[#7A3241] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Explore All 6 Skincare Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SKINCARE_GUIDES.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-[#EAD8DC] hover:border-[#D88C9A] transition-colors flex flex-col justify-between p-6 space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#6E5D63]">
                  <span className="tabular-nums font-medium text-[#9E4758]">
                    Guide {article.number}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif-editorial text-xl font-medium text-[#2C2226] leading-snug">
                  <button
                    type="button"
                    onClick={() => onSelectArticle(article)}
                    className="text-left hover:text-[#9E4758] transition-colors cursor-pointer"
                  >
                    {article.title}
                  </button>
                </h3>

                <p className="text-sm text-[#5A474E] leading-relaxed">{article.summary}</p>
              </div>

              <div className="pt-4 border-t border-[#F4E8EB] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9E4758] hover:text-[#7A3241] transition-colors cursor-pointer"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* G. How to Order (Simple 3-Step Section) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF2F4] rounded-2xl border border-[#EAD8DC] p-8 sm:p-12 lg:p-14 space-y-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9E4758] font-medium">
              <span>Simple Personal Ordering</span>
              <span aria-hidden="true">·</span>
              <span>No Complicated Checkout</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#2C2226]">
              How to Enquire & Order from Grace N Glow
            </h2>
            <p className="text-sm sm:text-base text-[#5A474E] leading-relaxed">
              We prefer personal conversations over automated carts so you can ask questions about
              ingredients, sizes, and suitability before placing your order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ORDER_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl border border-[#EAD8DC] p-6 space-y-3"
              >
                <div className="text-xs font-medium uppercase tracking-widest text-[#9E4758] tabular-nums">
                  Step {item.step}
                </div>
                <h3 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#5A474E] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E5CFD4]">
            <div className="text-sm text-[#4A3B40]">
              Have a question before choosing a product? Message us directly on WhatsApp at{' '}
              <span className="font-semibold text-[#2C2226] tabular-nums">
                {BRAND_CONFIG.whatsappDisplay}
              </span>
              .
            </div>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Start WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* H. Instagram Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-2xl border border-[#EAD8DC] p-8 sm:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#F2E4E7]">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9E4758] font-medium">
                <span>Connect on Social</span>
                <span aria-hidden="true">·</span>
                <span>Instagram Handle: {BRAND_CONFIG.instagramHandle}</span>
              </div>
              <h2 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#2C2226]">
                Follow Grace N Glow on Instagram
              </h2>
              <p className="text-sm text-[#5A474E] leading-relaxed">
                Explore product close-ups, batch updates, and simple skincare tips—or send us a
                direct message on Instagram. (Note: Official Instagram profile URL is configurable
                and marked To Be Confirmed.)
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenInstagramInfo}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#2C2226] bg-[#FAF2F4] hover:bg-[#F2DFE4] border border-[#DFC5CB] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#9E4758] shrink-0" />
                <span>Instagram Profile ({BRAND_CONFIG.instagramHandle})</span>
              </button>
            </div>
          </div>

          {/* Showcase of Actual Product Photographs (Not a fake live feed) */}
          <div className="pt-8 space-y-4">
            <p className="text-xs text-[#6E5D63]">
              Product Photography Gallery · Click any photograph to view product details
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {PRODUCTS.slice(0, 5).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  className="group text-left bg-[#FFFDFD] rounded-xl border border-[#EAD8DC] p-3 hover:border-[#D88C9A] transition-colors cursor-pointer"
                >
                  <ResilientImage
                    src={item.primaryImage}
                    alt={item.name}
                    bgTone="#FFFFFF"
                    containerClassName="aspect-square rounded-lg flex items-center justify-center p-2"
                    className="w-full h-full object-contain group-hover:scale-105"
                  />
                  <p className="text-xs font-medium text-[#2C2226] mt-2 truncate group-hover:text-[#9E4758]">
                    {item.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
