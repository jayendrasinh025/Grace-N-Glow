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
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  const navItems: { label: string; route: PageRoute; activeMatch: PageRoute[] }[] = [
    { label: 'Home', route: 'home', activeMatch: ['home'] },
    { label: 'Shop', route: 'shop', activeMatch: ['shop', 'product-detail'] },
    { label: 'Skincare Guide', route: 'guide', activeMatch: ['guide', 'guide-article'] },
    { label: 'About Us', route: 'about', activeMatch: ['about'] },
    { label: 'Contact', route: 'contact', activeMatch: ['contact'] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBFB] text-[#2C2226]">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#FFFBFB]/95 backdrop-blur-md border-b border-[#EAD8DC]'
            : 'bg-[#FFFBFB] border-b border-[#F2E4E7]'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="font-serif-editorial text-xl sm:text-2xl font-semibold tracking-tight text-[#2C2226] hover:text-[#9E4758] transition-colors whitespace-nowrap shrink-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E4758]"
          >
            Grace N Glow
          </button>

          {/* Zone 2: 5 concise single-line text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A474E]"
          >
            {navItems.map((item) => {
              const isActive = item.activeMatch.includes(currentPage);
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNavClick(item.route)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-[#2C2226] border-[#9E4758] font-medium'
                      : 'border-transparent hover:text-[#2C2226] hover:border-[#D88C9A]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action (plus mobile menu trigger on mobile) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5A44]"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp Enquiry</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#2C2226] hover:bg-[#F9E8EC] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFFBFB] border-b border-[#EAD8DC] px-4 pt-3 pb-6 space-y-3 shadow-sm">
            <div className="pb-2 border-b border-[#F2E4E7]">
              <p className="text-xs text-[#6E5D63]">
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
                    className={`w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F9E8EC] text-[#2C2226]'
                        : 'text-[#4A3B40] hover:bg-[#FDF4F6]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order or Ask on WhatsApp ({BRAND_CONFIG.whatsappDisplay})</span>
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
                className="font-serif-editorial text-2xl font-semibold text-[#2C2226] tracking-tight text-left"
              >
                Grace N Glow
              </button>
              <p className="text-xs uppercase tracking-widest text-[#7A5C64] font-medium">
                {BRAND_CONFIG.descriptor}
              </p>
              <p className="font-serif-editorial italic text-base text-[#4A3B40]">
                “{BRAND_CONFIG.tagline}”
              </p>
              <p className="text-sm text-[#5A474E] leading-relaxed max-w-sm">
                Thoughtfully presented handmade skincare essentials across India. Explore our
                product catalogue, learn gentle skincare routines, and connect with us directly on
                WhatsApp for personalised ordering assistance.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
                Explore
              </h3>
              <ul className="space-y-2.5 text-sm text-[#5A474E]">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('home')}
                    className="hover:text-[#9E4758] transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('shop')}
                    className="hover:text-[#9E4758] transition-colors"
                  >
                    Shop All Products
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('guide')}
                    className="hover:text-[#9E4758] transition-colors"
                  >
                    Skincare Guide
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about')}
                    className="hover:text-[#9E4758] transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('contact')}
                    className="hover:text-[#9E4758] transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Shop Categories */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
                Product Collections
              </h3>
              <ul className="space-y-2.5 text-sm text-[#5A474E]">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory('Face Washes');
                      handleNavClick('shop');
                    }}
                    className="hover:text-[#9E4758] transition-colors text-left"
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
                    className="hover:text-[#9E4758] transition-colors text-left"
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
                    className="hover:text-[#9E4758] transition-colors text-left"
                  >
                    Lip Care & Nourishing Balms
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavClick('guide')}
                    className="hover:text-[#9E4758] transition-colors text-left"
                  >
                    24-Hour Patch Testing Guide
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct Contact & Ordering */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
                Direct Enquiries & Orders
              </h3>
              <div className="space-y-2 text-sm text-[#5A474E]">
                <p>
                  We take orders and answer product questions directly via WhatsApp across India.
                </p>
                <p className="font-medium text-[#2C2226] tabular-nums">
                  WhatsApp: {BRAND_CONFIG.whatsappDisplay}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-1">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
                <button
                  type="button"
                  onClick={onOpenInstagramInfo}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#2C2226] bg-white hover:bg-[#F9E8EC] border border-[#DFC5CB] rounded-lg transition-colors whitespace-nowrap"
                >
                  <Instagram className="w-4 h-4 text-[#9E4758] shrink-0" />
                  <span>Instagram ({BRAND_CONFIG.instagramHandle})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Policy Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E5D63]">
            <p>
              © {new Date().getFullYear()} {BRAND_CONFIG.name}. All rights reserved. Sample
              Showcase Website.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => handleNavClick('privacy')}
                className="hover:text-[#2C2226] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
              >
                Privacy Policy
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => handleNavClick('terms')}
                className="hover:text-[#2C2226] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
              >
                Terms & Conditions
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => handleNavClick('shipping')}
                className="hover:text-[#2C2226] underline-offset-4 hover:underline transition-colors whitespace-nowrap"
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
