/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layout, PageRoute } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SkincareGuidePage } from './pages/SkincareGuidePage';
import {
  AboutPage,
  ContactPage,
  PolicyPage,
  InstagramConfigModal,
} from './pages/SecondaryPages';
import {
  PRODUCTS,
  SKINCARE_GUIDES,
  BRAND_CONFIG,
  ProductCategory,
  ProductItem,
  SkincareArticle,
} from './data/skincareData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All Products');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(PRODUCTS[0]);
  const [selectedArticle, setSelectedArticle] = useState<SkincareArticle | null>(null);
  const [instagramModalOpen, setInstagramModalOpen] = useState(false);

  // Sync document title for SEO per view
  useEffect(() => {
    const titles: Record<PageRoute, string> = {
      home: 'Grace N Glow — Organic, Handmade & Natural Skincare',
      shop: `${selectedCategory} | Grace N Glow Skincare Catalogue`,
      'product-detail': `${selectedProduct.name} | Grace N Glow Skincare`,
      guide: 'Skincare Guide & Routine Education | Grace N Glow',
      'guide-article': `${
        selectedArticle ? selectedArticle.title : 'Skincare Guide'
      } | Grace N Glow`,
      about: 'About Us — Organic, Handmade & Natural Skincare | Grace N Glow',
      contact: 'Contact & WhatsApp Enquiries | Grace N Glow',
      privacy: 'Privacy Policy | Grace N Glow',
      terms: 'Terms and Conditions | Grace N Glow',
      shipping: 'Shipping and Returns Policy | Grace N Glow',
    };
    document.title = titles[currentPage] || 'Grace N Glow — Natural Skincare';
  }, [currentPage, selectedCategory, selectedProduct, selectedArticle]);

  const handleNavigate = (page: PageRoute) => {
    if (page === 'guide') {
      setSelectedArticle(null);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: SkincareArticle | null) => {
    setSelectedArticle(article);
    setCurrentPage(article ? 'guide-article' : 'guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInstagramInfo = () => {
    if (BRAND_CONFIG.instagramUrl && BRAND_CONFIG.instagramUrl.startsWith('http')) {
      window.open(BRAND_CONFIG.instagramUrl, '_blank', 'noopener,noreferrer');
    } else {
      setInstagramModalOpen(true);
    }
  };

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenInstagramInfo={handleOpenInstagramInfo}
      >
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onSelectArticle={(article) => handleSelectArticle(article)}
            onOpenInstagramInfo={handleOpenInstagramInfo}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'product-detail' && (
          <ProductDetailPage
            product={selectedProduct}
            onBackToShop={() => handleNavigate('shop')}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {(currentPage === 'guide' || currentPage === 'guide-article') && (
          <SkincareGuidePage
            selectedArticle={selectedArticle}
            onSelectArticle={handleSelectArticle}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentPage === 'contact' && (
          <ContactPage onOpenInstagramInfo={handleOpenInstagramInfo} />
        )}

        {(currentPage === 'privacy' ||
          currentPage === 'terms' ||
          currentPage === 'shipping') && (
          <PolicyPage policyType={currentPage} onNavigate={handleNavigate} />
        )}
      </Layout>

      <InstagramConfigModal
        isOpen={instagramModalOpen}
        onClose={() => setInstagramModalOpen(false)}
      />
    </>
  );
}
