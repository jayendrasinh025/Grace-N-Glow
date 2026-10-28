import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Instagram, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG, buildWhatsAppUrl, ProductCategory } from '../data/skincareData';

export type PageRoute =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'guide'
  | 'guide-article'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'shipping';

interface LayoutProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, param?: string) => void;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenInstagramInfo: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  currentPage,
  onNavigate,
  onSelectCategory,
  onOpenInstagramInfo,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  // Top Navigation items as specified: Home · Our Products · About Us · Skincare Tips · Contact
  const navItems: { label: string; route: PageRoute; activeMatch: PageRoute[] }[] = [
    { label: 'Home', route: 'home', activeMatch: ['home'] },
    { label: 'Our Products', route: 'shop', activeMatch: ['shop', 'product-detail'] },
    { label: 'About Us', route: 'about', activeMatch: ['about'] },
    { label: 'Skincare Tips', route: 'guide', activeMatch: ['guide', 'guide-article'] },
    { label: 'Contact', route: 'contact', activeMatch: ['contact'] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F7] text-[#242124]">
      {/* Top Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 animate-hero-fade-up ${
          scrolled
            ? 'bg-[#FFF5F7]/92 backdrop-blur-md border-b border-[#F2DCE2]'
            : 'bg-[#FFF5F7]/75 backdrop-blur-xs border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Logo with minimal botanical floral symbol */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="inline-flex items-center gap-2.5 font-serif-editorial text-xl sm:text-2xl font-semibold tracking-tight text-[#242124] hover:text-[#D96C8A] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D96C8A]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#52745A] shrink-0"
              fill="none"
            >
              <path
                d="M12 3C14.5 7 18.5 9.5 21 12C18.5 14.5 14.5 17 12 21C9.5 17 5.5 14.5 3 12C5.5 9.5 9.5 7 12 3Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="2.2" fill="#D96C8A" />
            </svg>
            <span>Grace N Glow</span>
          </button>

          {/* Zone 2: Navigation Links (Desktop > 820px) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden min-[821px]:flex items-center gap-7 text-sm font-medium text-[#777078]"
          >
            {navItems.map((item) => {
              const isActive = item.activeMatch.includes(currentPage);
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                    isActive
                      ? 'text-[#242124] border-[#D96C8A] font-semibold'
                      : 'border-transparent hover:text-[#242124] hover:border-[#D96C8A]/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Rose-pink pill button labelled "Explore Products" + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavClick('shop')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#D96C8A] hover:bg-[#C45675] active:scale-[0.98] rounded-full shadow-[0_6px_18px_-6px_rgba(217,108,138,0.55)] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D96C8A]"
            >
              Explore Products
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="min-[821px]:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#242124] bg-white/80 border border-[#F0D6DE] hover:bg-[#FCE8EE] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer (Screens <= 820px) */}
        {mobileMenuOpen && (
          <div className="min-[821px]:hidden bg-[#FFF5F7] border-b border-[#EAD8DC] px-4 pt-3 pb-6 space-y-3 shadow-sm">
            <div className="pb-2 border-b border-[#F2E4E7]">
              <p className="text-xs text-[#777078]">
                {BRAND_CONFIG.descriptor} · {BRAND_CONFIG.tagline}
              </p>
            </div>
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const isActive = item.activeMatch.includes(currentPage);
                return (
                  <button
                    key={item.route}
                    type="button"
                    onClick={() => handleNavClick(item.route)}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#FCE4EC] text-[#242124]'
                        : 'text-[#242124] hover:bg-white/70'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => handleNavClick('shop')}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-[#D96C8A] hover:bg-[#C45675] rounded-full transition-colors cursor-pointer"
              >
                Explore Products
              </button>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#242124] bg-white border border-[#E6CFD6] hover:bg-[#FCE8EE] rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#52745A]" />
                <span>Chat on WhatsApp ({BRAND_CONFIG.whatsappDisplay})</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Light Editorial Footer */}
      <footer className="bg-[#FAF0F2] border-t border-[#EAD8DC] text-[#4A3B40]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#E5CFD4]">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className="inline-flex items-center gap-2 font-serif-editorial text-2xl font-semibold text-[#242124] tracking-tight text-left cursor-pointer"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-[#52745A] shrink-0"
                  fill="none"
                >
                  <path
                    d="M12 3C14.5 7 18.5 9.5 21 12C18.5 14.5 14.5 17 12 21C9.5 17 5.5 14.5 3 12C5.5 9.5 9.5 7 12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="12" cy="12" r="2.2" fill="#D96C8A" />
                </svg>
                <span>Grace N Glow</span>
              </button>
              <p className="text-xs uppercase tracking-widest text-[#777078] font-medium">
                {BRAND_CONFIG.descriptor}
              </p>
              <p className="font-serif-editorial italic text-base text-[#242124]">
                “{BRAND_CONFIG.tagline}”
              </p>
              <p className="text-sm text-[#777078] leading-relaxed max-w-sm">
                Thoughtfully presented handmade skincare essentials across India. Explore our
                product catalogue, learn gentle skincare routines, and connect with us directly on
                WhatsApp for personalised ordering assistance.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#242124]">
                Explore
              </h3>
              <ul className="space-y-2.5 text-sm text-[#777078]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('home')}
                    className="hover:text-[#D96C8A] transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('shop')}
                    className="hover:text-[#D96C8A] transition-colors cursor-pointer"
                  >
                    Our Products
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about')}
                    className="hover:text-[#D96C8A] transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('guide')}
                    className="hover:text-[#D96C8A] transition-colors cursor-pointer"
                  >
                    Skincare Tips
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('contact')}
                    className="hover:text-[#D96C8A] transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Shop Categories */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#242124]">
                Product Collections
              </h3>
              <ul className="space-y-2.5 text-sm text-[#777078]">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory('Face Washes');
                      handleNavClick('shop');
                    }}
                    className="hover:text-[#D96C8A] transition-colors text-left cursor-pointer"
                  >
                    Handmade & Botanical Face Washes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory('Moisturizers & Gels');
                      handleNavClick('shop');
                    }}
                    className="hover:text-[#D96C8A] transition-colors text-left cursor-pointer"
                  >
                    Moisturizers & Soothing Gels
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory('Lip & Skin Balms');
                      handleNavClick('shop');
                    }}
                    className="hover:text-[#D96C8A] transition-colors text-left cursor-pointer"
                  >
                    Lip Care & Nourishing Balms
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('guide')}
                    className="hover:text-[#D96C8A] transition-colors text-left cursor-pointer"
                  >
                    24-Hour Patch Testing Guide
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct Contact & Ordering */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#242124]">
                Direct Enquiries & Orders
              </h3>
              <div className="space-y-2 text-sm text-[#777078]">
                <p>
                  We take orders and answer product questions directly via WhatsApp across India.
                </p>
                <p className="font-medium text-[#242124] tabular-nums">
                  WhatsApp: {BRAND_CONFIG.whatsappDisplay}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-1">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#52745A] hover:bg-[#3F5C46] rounded-full transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
                <button
                  type="button"
                  onClick={onOpenInstagramInfo}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#242124] bg-white hover:bg-[#FCE8EE] border border-[#DFC5CB] rounded-full transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Instagram className="w-4 h-4 text-[#D96C8A] shrink-0" />
                  <span>Instagram ({BRAND_CONFIG.instagramHandle})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Policy Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#777078]">
            <p>
              © {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved. Sample
              Showcase Website.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => handleNavClick('privacy')}
                className="hover:text-[#242124] underline-offset-4 hover:underline transition-colors whitespace-nowrap cursor-pointer"
              >
                Privacy Policy
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => handleNavClick('terms')}
                className="hover:text-[#242124] underline-offset-4 hover:underline transition-colors whitespace-nowrap cursor-pointer"
              >
                Terms & Conditions
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => handleNavClick('shipping')}
                className="hover:text-[#242124] underline-offset-4 hover:underline transition-colors whitespace-nowrap cursor-pointer"
              >
                Shipping & Returns Policy
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
