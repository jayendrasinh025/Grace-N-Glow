import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { PRODUCTS, ProductItem, BRAND_CONFIG } from '../data/skincareData';
import { ResilientImage } from './ResilientImage';
import { PageRoute } from './Layout';

interface CurvedShowcaseHeroProps {
  onNavigate: (page: PageRoute) => void;
  onSelectProduct: (product: ProductItem) => void;
}

const PANEL_BACKGROUNDS = [
  'linear-gradient(180deg, #FFFFFF 0%, #FFF5F8 100%)',
  'linear-gradient(180deg, #FFFFFF 0%, #F5F9F6 100%)',
  'linear-gradient(180deg, #FFFFFF 0%, #FDF8F3 100%)',
  'linear-gradient(180deg, #FFFFFF 0%, #FCEFF3 100%)',
  'linear-gradient(180deg, #FFFFFF 0%, #F4F8F5 100%)',
];

export const CurvedShowcaseHero: React.FC<CurvedShowcaseHeroProps> = ({
  onNavigate,
  onSelectProduct,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Physics and interaction refs (no React re-renders during 60fps loop)
  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const isFocusedRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const totalDragDistanceRef = useRef<number>(0);
  const reducedMotionRef = useRef<boolean>(false);

  const [isGrabbing, setIsGrabbing] = useState(false);

  // Use all 10 authentic Grace N Glow products in the continuous loop
  const showcaseItems = PRODUCTS.slice(0, 10);
  const count = showcaseItems.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mediaQuery.matches;
    const handleMediaChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    let animationFrameId: number;
    let lastTime = performance.now();

    const renderFrame = (now: number) => {
      const dt = Math.min(32, now - lastTime) / 16.667; // Normalized to 60fps (dt ~ 1)
      lastTime = now;

      const stageEl = stageRef.current;
      const stageWidth = stageEl ? stageEl.clientWidth : window.innerWidth;

      // Responsive card dimensions & stride
      let cardWidth = 212;
      let baseCardHeight = 278;
      let gap = 24;

      if (stageWidth <= 480) {
        cardWidth = 142;
        baseCardHeight = 192;
        gap = 14;
      } else if (stageWidth <= 820) {
        cardWidth = 172;
        baseCardHeight = 230;
        gap = 18;
      }

      const stride = cardWidth + gap;
      const totalTrackLength = count * stride;

      // Update offset physics
      if (!isDraggingRef.current) {
        // Apply momentum decay if user recently released a drag
        if (Math.abs(velocityRef.current) > 0.05) {
          offsetRef.current += velocityRef.current * dt;
          velocityRef.current *= Math.pow(0.93, dt);
        } else {
          velocityRef.current = 0;
          // Gentle automatic right-to-left scroll when not paused and reduced motion is off
          if (
            !reducedMotionRef.current &&
            !isHoveredRef.current &&
            !isFocusedRef.current
          ) {
            const autoSpeed = stageWidth <= 820 ? 0.48 : 0.65;
            offsetRef.current += autoSpeed * dt;
          }
        }
      }

      // Keep offset bounded cleanly within [0, totalTrackLength)
      offsetRef.current =
        ((offsetRef.current % totalTrackLength) + totalTrackLength) %
        totalTrackLength;

      const halfSpan = Math.max(280, Math.min(720, stageWidth * 0.5));

      for (let i = 0; i < count; i++) {
        const panel = panelRefs.current[i];
        if (!panel) continue;

        // Calculate wrapped horizontal position relative to center of stage
        const rawX = i * stride - offsetRef.current;
        const wrappedX =
          ((((rawX + totalTrackLength / 2) % totalTrackLength) +
            totalTrackLength) %
            totalTrackLength) -
          totalTrackLength / 2;

        // Normalized horizontal distance from centre: 0 at centre, ~1 near edges
        const normD = wrappedX / halfSpan;
        const clampedD = Math.max(-1.45, Math.min(1.45, normD));
        const absD = Math.abs(clampedD);

        // Curved cylindrical geometry:
        // 1. Centre panels are smaller & upright; panels closer to the edges become progressively taller
        const scaleY = 0.85 + Math.pow(absD, 1.35) * 0.34;
        const scaleX = 0.93 + Math.pow(absD, 1.35) * 0.08;

        // 2. Gentle arched vertical curve + outward cylindrical perspective tilt
        const archY = -Math.pow(clampedD, 2) * (stageWidth <= 820 ? 12 : 20);
        const rotateY = -clampedD * (stageWidth <= 820 ? 18 : 24);
        const rotateZ = clampedD * (stageWidth <= 820 ? 2.4 : 3.6);

        // Hide panels that wrap around the far back edges to prevent visual jumps
        const maxVisibleX = totalTrackLength / 2 - stride * 0.65;
        const edgeFade =
          Math.abs(wrappedX) > maxVisibleX
            ? Math.max(
                0,
                1 - (Math.abs(wrappedX) - maxVisibleX) / (stride * 0.5)
              )
            : 1;

        panel.style.width = `${cardWidth}px`;
        panel.style.height = `${baseCardHeight}px`;
        panel.style.opacity = `${edgeFade}`;
        panel.style.zIndex = `${Math.round(100 - absD * 30)}`;
        panel.style.transform = `translate3d(${wrappedX.toFixed(
          2
        )}px, ${archY.toFixed(2)}px, 0px) rotateY(${rotateY.toFixed(
          2
        )}deg) rotateZ(${rotateZ.toFixed(2)}deg) scale(${scaleX.toFixed(
          3
        )}, ${scaleY.toFixed(3)})`;
      }

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    animationFrameId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [count]);

  // Pointer Drag Handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsGrabbing(true);
    dragStartXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    totalDragDistanceRef.current = 0;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    totalDragDistanceRef.current += Math.abs(deltaX);

    // Dragging left moves carousel right-to-left (increases offset)
    offsetRef.current -= deltaX;
    velocityRef.current = -deltaX * 0.85;
  };

  const handlePointerUpOrCancel = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsGrabbing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      velocityRef.current = 14;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      velocityRef.current = -14;
    }
  };

  const handleCardClick = (product: ProductItem) => {
    // Only navigate to product detail if the user clicked rather than dragged
    if (totalDragDistanceRef.current < 8) {
      onSelectProduct(product);
    }
  };

  return (
    <section
      aria-label="Grace N Glow Skincare Showcase Hero"
      className="relative w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,#FFFFFF_0%,#FFF5F7_62%,#FCEBEF_100%)] border-b border-[#F2DCE2] pt-6 sm:pt-10 pb-14 sm:pb-20"
    >
      {/* Restrained Decorative Botanical Line Drawing — Left */}
      <svg
        aria-hidden="true"
        viewBox="0 0 220 260"
        className="pointer-events-none hidden lg:block absolute top-10 left-8 xl:left-16 w-40 h-48 text-[#52745A]/30"
        fill="none"
      >
        <path
          d="M35 230 C55 170, 95 110, 165 40"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="animate-stroke-draw"
        />
        <path
          d="M78 165 C55 150, 42 125, 58 102 C78 115, 86 142, 78 165 Z"
          stroke="currentColor"
          strokeWidth="1.3"
          className="animate-stroke-draw"
        />
        <path
          d="M115 115 C140 112, 162 94, 168 68 C142 72, 122 92, 115 115 Z"
          stroke="currentColor"
          strokeWidth="1.3"
          className="animate-stroke-draw"
        />
        {/* Small Rose-Pink Sparkle Detail */}
        <path
          d="M175 30 L178 39 L187 42 L178 45 L175 54 L172 45 L163 42 L172 39 Z"
          fill="#D96C8A"
          fillOpacity="0.65"
        />
      </svg>

      {/* Restrained Decorative Sparkle & Botanical Accent — Right */}
      <svg
        aria-hidden="true"
        viewBox="0 0 180 180"
        className="pointer-events-none hidden lg:block absolute top-14 right-10 xl:right-20 w-28 h-28 text-[#D96C8A]/45"
        fill="none"
      >
        <path
          d="M90 24 L94 42 L112 46 L94 50 L90 68 L86 50 L68 46 L86 42 Z"
          fill="currentColor"
        />
        <circle cx="52" cy="84" r="3" fill="#52745A" fillOpacity="0.4" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        {/* 1. Hero Badge */}
        <div
          style={{ animationDelay: '60ms' }}
          className="animate-hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDEBF0] border border-[#F2C9D6] shadow-[0_2px_10px_-3px_rgba(217,108,138,0.2)] mb-5 sm:mb-6"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 text-[#52745A] shrink-0"
            fill="none"
          >
            <path
              d="M13.5 2.5C9.5 2.5 5 5 3.5 9.5C2.8 11.5 3.5 13.5 3.5 13.5C3.5 13.5 5.5 14.2 7.5 13.5C12 12 13.5 6.5 13.5 2.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 13.5C6 11 8.5 8.5 10.5 6.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xs sm:text-[13px] font-medium tracking-wide text-[#242124]">
            Your Everyday Skincare Ritual
          </span>
        </div>

        {/* 2. Centred Main Headline */}
        <h1
          style={{ animationDelay: '130ms' }}
          className="animate-hero-fade-up font-sans-clean font-bold text-center text-[#242124] tracking-[-0.03em] text-[38px] sm:text-[52px] md:text-[60px] lg:text-[68px] leading-[1.08] max-w-4xl"
        >
          Your{' '}
          <span className="font-serif-editorial italic font-normal text-[#242124] px-1">
            Glow,
          </span>
          <br />
          Your <span className="text-[#D96C8A]">Natural Beauty.</span>
        </h1>

        {/* 3. Supporting Copy */}
        <p
          style={{ animationDelay: '210ms' }}
          className="animate-hero-fade-up mt-4 sm:mt-5 text-center text-[#777078] font-medium text-sm sm:text-base md:text-[17px] leading-relaxed max-w-[600px]"
        >
          Discover skincare essentials designed to make your daily routine feel
          simple, refreshing, and beautiful.
        </p>

        {/* Handwritten-Style Editorial Note + Thin Curved Arrow Pointing to Carousel */}
        <div
          aria-hidden="true"
          style={{ animationDelay: '320ms' }}
          className="animate-hero-fade-up hidden md:flex items-center gap-2 self-end mr-8 lg:mr-24 xl:mr-36 -mb-3 mt-2 select-none pointer-events-none"
        >
          <span className="font-serif-editorial italic text-sm lg:text-base text-[#D96C8A] tracking-wide -rotate-3">
            “A little care, a little glow”
          </span>
          <svg
            viewBox="0 0 64 52"
            className="w-12 h-10 text-[#D96C8A]"
            fill="none"
          >
            <path
              d="M6 8 C28 8, 44 20, 46 42"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="animate-stroke-draw"
            />
            <path
              d="M39 36 L46 43 L52 35"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 4. Curved, Continuously Moving Product Showcase Carousel */}
      <div
        style={{ animationDelay: '280ms', perspective: '1400px' }}
        className="animate-hero-fade-up relative w-full mt-6 sm:mt-8 mb-8 sm:mb-10 select-none"
      >
        {/* Subtle Edge Vignette Gradients for Seamless Depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-20 lg:w-28 bg-gradient-to-r from-[#FFF5F7] to-transparent z-30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-20 lg:w-28 bg-gradient-to-l from-[#FFF5F7] to-transparent z-30"
        />

        {/* Interactive 3D Cylindrical Stage */}
        <div
          ref={stageRef}
          role="region"
          aria-label="Curved Skincare Product Showcase — Drag or use left and right arrow keys to browse"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
            handlePointerUpOrCancel();
          }}
          onFocus={() => {
            isFocusedRef.current = true;
          }}
          onBlur={() => {
            isFocusedRef.current = false;
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrCancel}
          onPointerCancel={handlePointerUpOrCancel}
          style={{
            transformStyle: 'preserve-3d',
            touchAction: 'pan-y',
          }}
          className={`relative w-full h-[250px] sm:h-[310px] md:h-[360px] flex items-center justify-center overflow-hidden focus-visible:outline-2 focus-visible:outline-[#D96C8A] rounded-2xl ${
            isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {showcaseItems.map((product, index) => {
            const bgGradient =
              PANEL_BACKGROUNDS[index % PANEL_BACKGROUNDS.length];
            return (
              <div
                key={product.id}
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
                onClick={() => handleCardClick(product)}
                role="button"
                tabIndex={0}
                aria-label={`View ${product.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProduct(product);
                  }
                }}
                style={{
                  background: bgGradient,
                  willChange: 'transform, opacity',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[22px] sm:rounded-[26px] border border-[#F0D6DE]/90 shadow-[0_14px_34px_-14px_rgba(36,33,36,0.12)] hover:border-[#D96C8A] transition-colors p-3.5 sm:p-5 flex items-center justify-center overflow-hidden group"
              >
                {/* Soft Top Highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/80 to-transparent"
                />

                <ResilientImage
                  src={product.primaryImage}
                  alt={`${product.name} — Grace N Glow`}
                  bgTone="transparent"
                  priority={index < 6}
                  containerClassName="w-full h-full flex items-center justify-center"
                  className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(36,33,36,0.08)] group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Call-to-Action Buttons */}
      <div
        style={{ animationDelay: '360ms' }}
        className="animate-hero-fade-up max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4"
      >
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-medium text-white bg-[#D96C8A] hover:bg-[#C45675] active:scale-[0.98] rounded-full shadow-[0_10px_24px_-8px_rgba(217,108,138,0.6)] transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D96C8A]"
        >
          <span>Explore Our Collection</span>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>

        <a
          href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-medium text-[#242124] bg-white/85 hover:bg-white border border-[#242124]/20 hover:border-[#52745A] active:scale-[0.98] rounded-full transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#52745A]"
        >
          <MessageCircle className="w-4 h-4 text-[#52745A] shrink-0" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
};
