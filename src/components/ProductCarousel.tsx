import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from 'lucide-react';
import {
  PRODUCTS,
  ProductItem,
  buildProductWhatsAppUrl,
} from '../data/skincareData';
import { ResilientImage } from './ResilientImage';
import { PageRoute } from './Layout';

interface ProductCarouselProps {
  onSelectProduct: (product: ProductItem) => void;
  onNavigate: (page: PageRoute) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  onSelectProduct,
  onNavigate,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < maxScroll - 8);
    setScrollProgress(maxScroll > 0 ? Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)) : 0);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    updateScrollState();
    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });
    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const handleScrollBy = (direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const firstCard = container.querySelector<HTMLElement>('[data-carousel-card]');
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : container.clientWidth * 0.75;
    const scrollAmount = direction === 'next' ? cardWidth * 2 : -cardWidth * 2;
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleScrollBy('prev');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleScrollBy('next');
    }
  };

  return (
    <section
      aria-labelledby="skincare-collection-carousel-heading"
      className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 overflow-hidden"
    >
      {/* Section Header & Desktop Navigation Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EAD8DC] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
            <span>Grace N Glow Collection</span>
            <span aria-hidden="true">·</span>
            <span>Swipe or Browse</span>
          </div>
          <h2
            id="skincare-collection-carousel-heading"
            className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#2C2226]"
          >
            Explore Our Skincare Collection
          </h2>
          <p className="text-sm sm:text-base text-[#5A474E]">
            Find the right essentials for your skincare routine.
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#2C2226] bg-[#FAF2F4] hover:bg-[#F2DFE4] border border-[#EAD8DC] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 text-[#9E4758] shrink-0" />
          </button>

          {/* Subtle Previous / Next Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-2" role="group" aria-label="Carousel Navigation">
            <button
              type="button"
              onClick={() => handleScrollBy('prev')}
              disabled={!canScrollLeft}
              aria-label="Previous products"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                canScrollLeft
                  ? 'bg-white border-[#DFC5CB] text-[#2C2226] hover:bg-[#FAF2F4] hover:border-[#9E4758] cursor-pointer'
                  : 'bg-[#FAF5F6] border-[#EFE3E6] text-[#B8A6AC] cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScrollBy('next')}
              disabled={!canScrollRight}
              aria-label="Next products"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                canScrollRight
                  ? 'bg-white border-[#DFC5CB] text-[#2C2226] hover:bg-[#FAF2F4] hover:border-[#9E4758] cursor-pointer'
                  : 'bg-[#FAF5F6] border-[#EFE3E6] text-[#B8A6AC] cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally Swipeable Product Track */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Skincare Products Carousel"
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-[#9E4758] rounded-2xl"
        >
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              data-carousel-card
              className="snap-start shrink-0 w-[78%] xs:w-[70%] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] bg-white rounded-2xl border border-[#EAD8DC] hover:border-[#D88C9A] shadow-[0_6px_24px_-12px_rgba(44,34,38,0.08)] transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Consistent Image Frame with object-fit: contain */}
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
                  className="cursor-pointer p-5 bg-gradient-to-b from-[#FFFDFD] to-[#FDF6F8] border-b border-[#F4E8EB]"
                >
                  <ResilientImage
                    src={product.primaryImage}
                    alt={product.name}
                    bgTone="transparent"
                    containerClassName="aspect-square rounded-xl flex items-center justify-center p-2"
                    className="w-full h-full object-contain group-hover:scale-105"
                  />
                </div>

                {/* Product Metadata & Title */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#5E7A68]">
                    <span>{product.category}</span>
                    {product.netVolumeOrWeight.includes('ml') && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{product.netVolumeOrWeight}</span>
                      </>
                    )}
                  </div>

                  <h3 className="font-serif-editorial text-lg font-medium text-[#2C2226] leading-snug">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="text-left hover:text-[#9E4758] transition-colors cursor-pointer line-clamp-2"
                    >
                      {product.name}
                    </button>
                  </h3>
                </div>
              </div>

              {/* Direct WhatsApp Enquiry Button */}
              <div className="px-5 pb-5 pt-1 space-y-2">
                <a
                  href={buildProductWhatsAppUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Enquire on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  className="w-full text-center py-1 text-xs font-medium text-[#6E5D63] hover:text-[#9E4758] transition-colors cursor-pointer"
                >
                  View Product Details
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Subtle Progress Track & Mobile Swipe Hint */}
        <div className="pt-3 flex items-center justify-between gap-4">
          <div className="flex-1 h-1 bg-[#F2E4E7] rounded-full overflow-hidden max-w-xs">
            <div
              className="h-full bg-[#9E4758] rounded-full transition-all duration-150"
              style={{ width: `${Math.max(20, scrollProgress)}%` }}
            />
          </div>
          <span className="text-xs text-[#6E5D63]">
            {PRODUCTS.length} Products · Swipe or use arrows to browse
          </span>
        </div>
      </div>
    </section>
  );
};
