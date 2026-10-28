import React, { useState } from 'react';
import {
  MessageCircle,
  Instagram,
  ArrowRight,
  BookOpen,
  AlertCircle,
  X,
  Check,
} from 'lucide-react';
import {
  BRAND_CONFIG,
  PRODUCTS,
  VERIFIED_BRAND_PILLARS,
  buildWhatsAppUrl,
} from '../data/skincareData';
import { ResilientImage } from '../components/ResilientImage';
import { PageRoute } from '../components/Layout';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="bg-[#FAF2F4] rounded-2xl border border-[#EAD8DC] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
            <span>About {BRAND_CONFIG.name}</span>
            <span aria-hidden="true">·</span>
            <span>{BRAND_CONFIG.descriptor}</span>
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2226] leading-tight">
            “{BRAND_CONFIG.tagline}”
          </h1>
          <p className="text-base text-[#5A474E] leading-relaxed">
            Grace N Glow is a natural skincare business offering organic, handmade, and natural
            skincare essentials to customers across India. Our focus is simple: present each
            product clearly, share helpful skincare education, and make ordering personal and
            approachable through direct conversation.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-white bg-[#9E4758] hover:bg-[#843847] rounded-lg transition-colors cursor-pointer"
            >
              <span>Explore Our Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('guide')}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-[#2C2226] bg-white hover:bg-[#F9E8EC] border border-[#DFC5CB] rounded-lg transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#5E7A68]" />
              <span>Read Skincare Guides</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-[#EAD8DC] p-6 space-y-4">
            <ResilientImage
              src="/assets/aistudio/Gemini_Generated_Image_7wfvvm7wfvvm7wfv_8453c1a6.png"
              alt="Grace N Glow Blush Glow Moisturizer"
              bgTone="#FFFFFF"
              containerClassName="aspect-square rounded-xl flex items-center justify-center p-4"
              className="w-full h-full object-contain"
            />
            <p className="text-xs text-center text-[#6E5D63] pt-2 border-t border-[#F4E8EB]">
              Grace N Glow — Organic • Handmade • Natural Skincare
            </p>
          </div>
        </div>
      </div>

      {/* Our Philosophy & Verified Commitments */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
            What Guides Us
          </p>
          <h2 className="font-serif-editorial text-3xl font-medium text-[#2C2226]">
            Clarity, Education & Personal Attention
          </h2>
          <p className="text-sm sm:text-base text-[#5A474E] leading-relaxed">
            Whether you are choosing your first daily face wash or looking for a comforting lip
            balm, we want you to feel informed and supported at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERIFIED_BRAND_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white rounded-2xl border border-[#EAD8DC] p-6 space-y-3"
            >
              <span className="font-serif-editorial text-lg font-medium text-[#9E4758] tabular-nums">
                {pillar.number}.
              </span>
              <h3 className="font-serif-editorial text-lg font-medium text-[#2C2226]">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#5A474E] leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editable Brand Story Placeholder Section (Transparent & Accurate) */}
      <section className="bg-[#F6F9F7] rounded-2xl border border-[#DCE6DF] p-8 sm:p-10 space-y-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#4A6654] shrink-0 mt-1" />
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4A6654]">
              Editable Section · Business Details To Be Confirmed Before Launch
            </p>
            <h2 className="font-serif-editorial text-2xl font-medium text-[#2C2226]">
              Founder Story, Batch Preparation & Sourcing Notes
            </h2>
            <p className="text-sm text-[#4A3B40] leading-relaxed max-w-3xl">
              To maintain complete accuracy and avoid unverified claims, this space is reserved for
              Grace N Glow’s confirmed founder story, city of origin, formulation journey, and
              verified ingredient sourcing details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-white rounded-xl border border-[#DCE6DF] p-5 space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
              Founder & Studio Origin
            </p>
            <p className="text-xs text-[#5A474E] leading-relaxed">
              [TO BE CONFIRMED: Insert the founder’s inspiration for starting Grace N Glow and
              where batches are handcrafted in India.]
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#DCE6DF] p-5 space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
              Formulation & Batch Standards
            </p>
            <p className="text-xs text-[#5A474E] leading-relaxed">
              [TO BE CONFIRMED: Insert verified details on how small batches are prepared, packaged,
              and quality-checked prior to dispatch.]
            </p>
          </div>
          <div className="bg-white rounded-xl border border-[#DCE6DF] p-5 space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
              Registrations & Certifications
            </p>
            <p className="text-xs text-[#5A474E] leading-relaxed">
              [TO BE CONFIRMED: Only list verified licenses or testing registrations held by the
              business.]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ContactPageProps {
  onOpenInstagramInfo: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenInstagramInfo }) => {
  const [enquiryType, setEnquiryType] = useState('Product Price & Ordering');
  const [selectedProductName, setSelectedProductName] = useState(PRODUCTS[0].name);
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customNote, setCustomNote] = useState('');

  const composedMessage = [
    `Hello Grace N Glow!`,
    customerName.trim() ? `My name is ${customerName.trim()}${customerCity.trim() ? ` from ${customerCity.trim()}` : ''}.` : customerCity.trim() ? `I am messaging from ${customerCity.trim()}.` : '',
    `Enquiry Topic: ${enquiryType}.`,
    selectedProductName !== 'General / Multiple Products'
      ? `Product of Interest: ${selectedProductName}.`
      : '',
    customNote.trim()
      ? `My Question: ${customNote.trim()}`
      : `Could you please share pricing, ingredients, and ordering details?`,
  ]
    .filter(Boolean)
    .join(' ');

  const whatsappHref = buildWhatsAppUrl(composedMessage);

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-14">
      {/* Header */}
      <div className="bg-[#FAF2F4] rounded-2xl border border-[#EAD8DC] p-8 sm:p-10 lg:p-12 space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
          <span>Direct Customer Care</span>
          <span aria-hidden="true">·</span>
          <span>WhatsApp & Instagram</span>
        </div>
        <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2226]">
          Contact Grace N Glow
        </h1>
        <p className="text-sm sm:text-base text-[#5A474E] max-w-2xl leading-relaxed">
          Have a question about ingredients, how to use a product, or how to place an order across
          India? Connect with us directly on WhatsApp or Instagram.
        </p>
      </div>

      {/* Contact Channels + Interactive WhatsApp Message Composer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Card */}
          <div className="bg-[#F6F9F7] rounded-2xl border border-[#DCE6DF] p-6 sm:p-8 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#4A6654]">
              Primary Ordering & Support Channel
            </div>
            <h2 className="font-serif-editorial text-2xl font-medium text-[#2C2226]">
              WhatsApp Enquiries & Orders
            </h2>
            <p className="text-lg font-semibold text-[#2C2226] tabular-nums">
              {BRAND_CONFIG.whatsappDisplay}
            </p>
            <p className="text-sm text-[#5A474E] leading-relaxed">
              Click below to open WhatsApp directly. You can ask about any product’s price, size,
              ingredients, or delivery options to your PIN code.
            </p>
            <div className="pt-2">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Open WhatsApp ({BRAND_CONFIG.whatsappDisplay})</span>
              </a>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="bg-white rounded-2xl border border-[#EAD8DC] p-6 sm:p-8 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#9E4758]">
              Social Direct Messages
            </div>
            <h2 className="font-serif-editorial text-2xl font-medium text-[#2C2226]">
              Instagram Direct
            </h2>
            <p className="text-sm font-medium text-[#4A3B40]">
              Handle: <span className="text-[#9E4758]">{BRAND_CONFIG.instagramHandle}</span>
            </p>
            <p className="text-sm text-[#5A474E] leading-relaxed">
              Our Instagram handle is currently marked To Be Confirmed in this sample design and is
              ready to be linked to the official Grace N Glow profile URL.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenInstagramInfo}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#2C2226] bg-[#FAF2F4] hover:bg-[#F2DFE4] border border-[#DFC5CB] rounded-xl transition-colors cursor-pointer"
              >
                <Instagram className="w-4 h-4 text-[#9E4758] shrink-0" />
                <span>View Instagram Configuration Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Interactive WhatsApp Enquiry Builder */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAD8DC] p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="space-y-1.5 border-b border-[#F2E4E7] pb-5">
            <p className="text-xs uppercase tracking-widest text-[#9E4758] font-medium">
              Custom Message Builder
            </p>
            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#2C2226]">
              Prepare Your WhatsApp Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-[#5A474E]">
              Fill in any optional details below to prefill your WhatsApp message. Nothing is sent
              automatically—you review and press Send inside WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="enquiry-topic"
                className="block text-xs font-medium text-[#2C2226]"
              >
                What would you like to ask about?
              </label>
              <select
                id="enquiry-topic"
                value={enquiryType}
                onChange={(e) => setEnquiryType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FFFBFB] border border-[#DFC5CB] rounded-xl text-[#2C2226] focus:outline-2 focus:outline-[#9E4758]"
              >
                <option value="Product Price & Ordering">Product Price & Ordering</option>
                <option value="Ingredients & Suitability">Ingredients & Suitability</option>
                <option value="Skincare Routine Guidance">Skincare Routine Guidance</option>
                <option value="Shipping & PIN Code Availability">
                  Shipping & PIN Code Availability
                </option>
                <option value="General Question">General Question</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="enquiry-product"
                className="block text-xs font-medium text-[#2C2226]"
              >
                Select a Product
              </label>
              <select
                id="enquiry-product"
                value={selectedProductName}
                onChange={(e) => setSelectedProductName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FFFBFB] border border-[#DFC5CB] rounded-xl text-[#2C2226] focus:outline-2 focus:outline-[#9E4758]"
              >
                <option value="General / Multiple Products">General / Multiple Products</option>
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="customer-name" className="block text-xs font-medium text-[#2C2226]">
                Your Name (Optional)
              </label>
              <input
                id="customer-name"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Priya"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FFFBFB] border border-[#DFC5CB] rounded-xl text-[#2C2226] placeholder:text-[#8C737A] focus:outline-2 focus:outline-[#9E4758]"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="customer-city" className="block text-xs font-medium text-[#2C2226]">
                Your City / PIN Code (Optional)
              </label>
              <input
                id="customer-city"
                type="text"
                value={customerCity}
                onChange={(e) => setCustomerCity(e.target.value)}
                placeholder="e.g. Pune / Mumbai"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FFFBFB] border border-[#DFC5CB] rounded-xl text-[#2C2226] placeholder:text-[#8C737A] focus:outline-2 focus:outline-[#9E4758]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="custom-note" className="block text-xs font-medium text-[#2C2226]">
              Your Question or Message (Optional)
            </label>
            <textarea
              id="custom-note"
              rows={3}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Write any questions about prices, sizes, skin type suitability, or ordering..."
              className="w-full px-3.5 py-2.5 text-sm bg-[#FFFBFB] border border-[#DFC5CB] rounded-xl text-[#2C2226] placeholder:text-[#8C737A] focus:outline-2 focus:outline-[#9E4758]"
            />
          </div>

          {/* Live Message Preview */}
          <div className="bg-[#FAF2F4] rounded-xl border border-[#EAD8DC] p-4 space-y-1.5">
            <p className="text-[11px] uppercase tracking-wider text-[#7A5C64] font-semibold">
              Prefilled Message Preview:
            </p>
            <p className="text-xs sm:text-sm text-[#2C2226] italic leading-relaxed">
              “{composedMessage}”
            </p>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Continue to WhatsApp to Send Message</span>
          </a>
        </div>
      </div>
    </div>
  );
};

interface PolicyPageProps {
  policyType: 'privacy' | 'terms' | 'shipping';
  onNavigate: (page: PageRoute) => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ policyType, onNavigate }) => {
  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms and Conditions',
    shipping: 'Shipping and Returns Policy',
  };

  const subtitles = {
    privacy:
      'How Grace N Glow handles personal enquiries and order information shared via WhatsApp and Instagram.',
    terms:
      'Responsible skincare usage guidelines, product enquiries, and terms governing this website.',
    shipping:
      'Information regarding order dispatch, delivery across India, and damaged-parcel resolution.',
  };

  return (
    <div className="max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-10">
      <div className="bg-[#FAF2F4] rounded-2xl border border-[#EAD8DC] p-8 sm:p-10 space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9E4758] font-medium">
          <span>{BRAND_CONFIG.name} Policies</span>
          <span aria-hidden="true">·</span>
          <span>Editable Business Template</span>
        </div>
        <h1 className="font-serif-editorial text-3xl sm:text-4xl font-medium text-[#2C2226]">
          {titles[policyType]}
        </h1>
        <p className="text-sm sm:text-base text-[#5A474E] leading-relaxed">
          {subtitles[policyType]}
        </p>
      </div>

      {/* Confirmation Notice Banner */}
      <div className="bg-[#F6F9F7] rounded-xl border border-[#DCE6DF] p-5 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#4A6654] shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-[#4A3B40] leading-relaxed">
          <strong>Note for Website Launch:</strong> Clauses marked with{' '}
          <span className="font-semibold text-[#2C2226]">[TO BE CONFIRMED]</span> represent
          editable business placeholders that must be verified and finalized by the Grace N Glow
          business owner before publishing live.
        </p>
      </div>

      {policyType === 'privacy' && (
        <div className="bg-white rounded-2xl border border-[#EAD8DC] p-6 sm:p-10 space-y-6 text-sm text-[#4A3B40] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              1. Overview & Direct Communication Model
            </h2>
            <p>
              This website serves as an informational product catalogue and skincare guide for
              Grace N Glow. We do not operate automated payment gateways, user accounts, or credit
              card forms on this website. When you choose to enquire or place an order, you are
              directed to WhatsApp ({BRAND_CONFIG.whatsappDisplay}) or Instagram to communicate
              directly with us.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              2. Information You Share With Us
            </h2>
            <p>
              When you contact Grace N Glow via WhatsApp or Instagram to ask questions or place an
              order, you may voluntarily share your name, phone number, delivery address, PIN code,
              and skincare preferences so we can assist you and fulfil your order.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              3. How We Use & Protect Your Details
            </h2>
            <p>
              We use your contact and delivery details solely to respond to your enquiries, confirm
              your order, coordinate courier delivery, and share order updates. We never sell or
              rent customer phone numbers or addresses to third-party marketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              4. Contact for Privacy Questions
            </h2>
            <p>
              For any privacy-related requests, please contact us on WhatsApp at{' '}
              {BRAND_CONFIG.whatsappDisplay}. Business Email / Postal Address:{' '}
              <strong>[TO BE CONFIRMED BY BUSINESS OWNER]</strong>.
            </p>
          </section>
        </div>
      )}

      {policyType === 'terms' && (
        <div className="bg-white rounded-2xl border border-[#EAD8DC] p-6 sm:p-10 space-y-6 text-sm text-[#4A3B40] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              1. Cosmetic & Educational Disclaimer
            </h2>
            <p>
              All Grace N Glow products and educational guides are intended for external cosmetic
              skincare use only (cleansing, moisturizing, and surface skin comfort). Nothing on
              this website constitutes medical or dermatological advice, nor are our products
              intended to diagnose, treat, cure, or prevent medical skin conditions such as cystic
              acne, eczema, psoriasis, or infections.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              2. Mandatory Patch Testing Responsibility
            </h2>
            <p>
              Even natural, organic, and handmade ingredients (such as plant oils, citrus extracts,
              and botanicals) can trigger individual skin sensitivities. Customers are strongly
              advised to review the full ingredient list via WhatsApp prior to ordering and to
              perform a 24-to-48-hour patch test on the inner forearm before full use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              3. Product Availability, Pricing & Handmade Variations
            </h2>
            <p>
              Because our skincare items are prepared in small batches, slight natural variations
              in colour or texture may occur between batches. Current product prices, available
              sizes, and payment methods (<strong>[TO BE CONFIRMED: e.g., UPI / Bank Transfer]</strong>)
              are confirmed directly on WhatsApp at the time of ordering.
            </p>
          </section>
        </div>
      )}

      {policyType === 'shipping' && (
        <div className="bg-white rounded-2xl border border-[#EAD8DC] p-6 sm:p-10 space-y-6 text-sm text-[#4A3B40] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              1. Order Confirmation & Dispatch Timeline
            </h2>
            <p>
              Orders are confirmed personally via WhatsApp ({BRAND_CONFIG.whatsappDisplay}).
              Estimated dispatch time after order confirmation:{' '}
              <strong>[TO BE CONFIRMED BY BUSINESS OWNER — e.g., X to Y business days]</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              2. Delivery Coverage & Shipping Charges
            </h2>
            <p>
              We ship across India. Shipping charges and estimated delivery timelines depend on
              your city/PIN code and courier availability:{' '}
              <strong>[TO BE CONFIRMED BY BUSINESS OWNER — Insert courier partners & shipping fee structure]</strong>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              3. Returns, Replacements & Damaged Parcels
            </h2>
            <p>
              Due to personal hygiene standards for skincare products, opened or used cosmetics
              generally cannot be returned. Return/replacement policy for transit damage or wrong
              items:{' '}
              <strong>
                [TO BE CONFIRMED BY BUSINESS OWNER — e.g., Whether an unboxing video is required
                within X hours of delivery to claim transit damage replacement]
              </strong>
              .
            </p>
          </section>
        </div>
      )}

      {/* Policy Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EAD8DC]">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('privacy')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              policyType === 'privacy'
                ? 'bg-[#9E4758] text-white'
                : 'bg-white border border-[#EAD8DC] text-[#2C2226] hover:bg-[#FAF2F4]'
            }`}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => onNavigate('terms')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              policyType === 'terms'
                ? 'bg-[#9E4758] text-white'
                : 'bg-white border border-[#EAD8DC] text-[#2C2226] hover:bg-[#FAF2F4]'
            }`}
          >
            Terms & Conditions
          </button>
          <button
            type="button"
            onClick={() => onNavigate('shipping')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              policyType === 'shipping'
                ? 'bg-[#9E4758] text-white'
                : 'bg-white border border-[#EAD8DC] text-[#2C2226] hover:bg-[#FAF2F4]'
            }`}
          >
            Shipping & Returns Policy
          </button>
        </div>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Questions? Ask on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstagramConfigModal: React.FC<InstagramModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="instagram-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2226]/50 backdrop-blur-xs"
    >
      <div className="bg-white rounded-2xl border border-[#EAD8DC] max-w-md w-full p-6 sm:p-8 space-y-5 shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2F4] border border-[#EAD8DC] flex items-center justify-center text-[#9E4758]">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="instagram-modal-title"
                className="font-serif-editorial text-xl font-medium text-[#2C2226]"
              >
                Instagram Profile Link
              </h3>
              <p className="text-xs text-[#6E5D63]">Status: {BRAND_CONFIG.instagramHandle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-[#6E5D63] hover:text-[#2C2226] hover:bg-[#FAF2F4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#4A3B40] leading-relaxed">
          In accordance with Grace N Glow’s brand accuracy guidelines, no placeholder username has
          been invented. Once the official Instagram handle is confirmed, update{' '}
          <code className="px-1.5 py-0.5 bg-[#FAF2F4] rounded text-xs text-[#9E4758]">
            BRAND_CONFIG.instagramUrl
          </code>{' '}
          to open the live Instagram profile directly.
        </p>

        <div className="bg-[#F6F9F7] rounded-xl border border-[#DCE6DF] p-4 space-y-2">
          <p className="text-xs font-medium text-[#2C2226]">
            Want to reach Grace N Glow right now?
          </p>
          <p className="text-xs text-[#5A474E]">
            Our WhatsApp line ({BRAND_CONFIG.whatsappDisplay}) is active and ready for product
            questions and orders.
          </p>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp ({BRAND_CONFIG.whatsappDisplay})</span>
          </a>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#2C2226] bg-[#FAF2F4] hover:bg-[#F2DFE4] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
