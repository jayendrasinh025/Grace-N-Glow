import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  MessageCircle,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  SKINCARE_GUIDES,
  SkincareArticle,
  PRODUCTS,
  ProductItem,
  BRAND_CONFIG,
  buildWhatsAppUrl,
} from '../data/skincareData';
import { ResilientImage } from '../components/ResilientImage';

interface SkincareGuidePageProps {
  selectedArticle: SkincareArticle | null;
  onSelectArticle: (article: SkincareArticle | null) => void;
  onSelectProduct: (product: ProductItem) => void;
}

type SkinFeelOption = 'balanced' | 'dry' | 'oily' | 'combination';

const ROUTINE_RECOMMENDATIONS: Record<
  SkinFeelOption,
  {
    label: string;
    observation: string;
    morningFocus: string;
    eveningFocus: string;
    suggestedProductIds: string[];
    whatsappPrompt: string;
  }
> = {
  balanced: {
    label: 'Normal / Balanced Feel',
    observation:
      'Skin feels comfortable throughout the day without excessive shine or dry flaking.',
    morningFocus:
      'Cleanse gently with lukewarm water or a mild gel cleanser, apply a light layer of moisturizer or gel on damp skin, and finish with sun protection and SPF 30 lip care.',
    eveningFocus:
      'Remove outdoor dust with a gentle 30-second facial cleanse and replenish moisture before sleep.',
    suggestedProductIds: [
      'rice-protein-facewash',
      'blush-glow-moisturizer',
      'chocolate-lip-balm-spf30',
    ],
    whatsappPrompt:
      "Hello Grace N Glow! My skin generally feels normal/balanced, and I'd love to enquire about a simple daily cleanser, moisturizer, and lip care routine.",
  },
  dry: {
    label: 'Dry or Tight-Feeling Skin',
    observation:
      'Skin often feels tight after washing or develops dry patches in air-conditioned rooms or cooler weather.',
    morningFocus:
      'Avoid hot water. Cleanse gently once, apply a creamy moisturizer like Blush Glow Moisturizer while skin is still slightly damp, and nourish lips with balm.',
    eveningFocus:
      'Cleanse mildly, apply a generous layer of cream moisturizer, and use a rich botanical balm on lips and dry cuticles.',
    suggestedProductIds: [
      'avocado-face-wash',
      'blush-glow-moisturizer',
      'small-batch-nourishing-balm',
    ],
    whatsappPrompt:
      "Hello Grace N Glow! My skin tends to feel dry and tight. Could you please share details and pricing for your gentle cleansers, Blush Glow Moisturizer, and nourishing balms?",
  },
  oily: {
    label: 'Oily or Humid-Climate Skin',
    observation:
      'Skin develops noticeable shine across the forehead, nose, and cheeks, especially in warm Indian weather.',
    morningFocus:
      'Use a refreshing gel face wash (such as 24 K Gold or Vitamin C Facewash) and hydrate with a weightless, crystal-clear soothing gel instead of heavy creams.',
    eveningFocus:
      'Wash away sweat and pollution thoroughly with a gentle gel cleanser (avoid scrubbing harshly) and apply a light layer of soothing gel.',
    suggestedProductIds: [
      '24k-gold-facewash',
      'pure-hydrating-soothing-gel',
      'vitamin-c-facewash',
    ],
    whatsappPrompt:
      "Hello Grace N Glow! My skin feels oily, especially in warm weather. Could you share details about your gel face washes and Pure Crystal Soothing Gel?",
  },
  combination: {
    label: 'Combination (Oily T-Zone, Dry Cheeks)',
    observation:
      'Your forehead and nose feel shiny by mid-day while your cheeks and lips feel normal or slightly dry.',
    morningFocus:
      'Cleanse with a balanced gel cleanser, apply a lightweight soothing gel across the T-zone, and layer a softer cream moisturizer on drier cheek areas.',
    eveningFocus:
      'Cleanse away daily buildup and customize moisture weight by zone—light gel on the forehead and richer cream on cheeks and lips.',
    suggestedProductIds: [
      'rice-protein-facewash',
      'pure-hydrating-soothing-gel',
      'blush-glow-moisturizer',
    ],
    whatsappPrompt:
      "Hello Grace N Glow! I have combination skin (oily T-zone and drier cheeks) and would love to ask about suitable cleansers and moisturizers from your range.",
  },
};

export const SkincareGuidePage: React.FC<SkincareGuidePageProps> = ({
  selectedArticle,
  onSelectArticle,
  onSelectProduct,
}) => {
  const [skinFeel, setSkinFeel] = useState<SkinFeelOption>('balanced');

  // If a specific article is open, render the full editorial article view
  if (selectedArticle) {
    const currentIndex = SKINCARE_GUIDES.findIndex((a) => a.id === selectedArticle.id);
    const prevArticle = currentIndex > 0 ? SKINCARE_GUIDES[currentIndex - 1] : null;
    const nextArticle =
      currentIndex < SKINCARE_GUIDES.length - 1 ? SKINCARE_GUIDES[currentIndex + 1] : null;

    return (
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        {/* Top Back Link */}
        <div className="flex items-center justify-between border-b border-[#EAD8DC] pb-4">
          <button
            type="button"
            onClick={() => onSelectArticle(null)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5A474E] hover:text-[#2C2226] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Skincare Guides</span>
          </button>

          <div className="text-xs text-[#6E5D63]">
            Guide {selectedArticle.number} · {selectedArticle.category} ·{' '}
            {selectedArticle.readTime}
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
            <span>Grace N Glow Skincare Education</span>
            <span aria-hidden="true">·</span>
            <span>{selectedArticle.category}</span>
          </div>

          <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2226] leading-tight">
            {selectedArticle.title}
          </h1>

          <p className="text-base sm:text-lg text-[#5A474E] leading-relaxed">
            {selectedArticle.summary}
          </p>
        </header>

        {/* Key Takeaways Box */}
        <div className="bg-[#FAF2F4] rounded-2xl border border-[#EAD8DC] p-6 sm:p-8 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#9E4758]">
            Key Takeaways at a Glance
          </p>
          <ul className="space-y-2.5">
            {selectedArticle.keyTakeaways.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm text-[#2C2226] leading-relaxed"
              >
                <Check className="w-4 h-4 text-[#5E7A68] shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Sections */}
        <div className="space-y-10">
          {selectedArticle.sections.map((sec, idx) => (
            <section
              key={idx}
              className="bg-white rounded-2xl border border-[#EAD8DC] p-6 sm:p-8 space-y-4"
            >
              <h2 className="font-serif-editorial text-2xl font-medium text-[#2C2226]">
                {sec.heading}
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#4A3B40] leading-relaxed">
                {sec.body.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
              {sec.bullets && (
                <ul className="space-y-3 pt-3 border-t border-[#F4E8EB]">
                  {sec.bullets.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-sm text-[#4A3B40] leading-relaxed bg-[#FFFBFB] rounded-xl border border-[#F2E4E7] p-4"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Responsible Skincare Note */}
        <div className="bg-[#F6F9F7] rounded-2xl border border-[#DCE6DF] p-6 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-[#4A6654] shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4A6654]">
              Responsible Skincare Note
            </p>
            <p className="text-xs sm:text-sm text-[#4A3B40] leading-relaxed">
              {selectedArticle.safetyNote}
            </p>
          </div>
        </div>

        {/* Ask a Question on WhatsApp */}
        <div className="bg-white rounded-2xl border border-[#EAD8DC] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif-editorial text-xl font-medium text-[#2C2226]">
              Have a Question About This Topic?
            </h3>
            <p className="text-xs sm:text-sm text-[#5A474E]">
              Message Grace N Glow on WhatsApp ({BRAND_CONFIG.whatsappDisplay}) to ask how our
              products fit into your daily routine.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(
              `Hello Grace N Glow! I just read your guide "${selectedArticle.title}" and would love to ask a question about your skincare products.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

        {/* Next / Previous Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EAD8DC]">
          {prevArticle ? (
            <button
              type="button"
              onClick={() => onSelectArticle(prevArticle)}
              className="text-left bg-white hover:bg-[#FAF2F4] border border-[#EAD8DC] rounded-xl p-4 transition-colors cursor-pointer"
            >
              <span className="text-xs text-[#6E5D63]">← Previous Guide</span>
              <p className="font-serif-editorial text-base font-medium text-[#2C2226] mt-1">
                {prevArticle.title}
              </p>
            </button>
          ) : (
            <div />
          )}

          {nextArticle && (
            <button
              type="button"
              onClick={() => onSelectArticle(nextArticle)}
              className="text-right bg-white hover:bg-[#FAF2F4] border border-[#EAD8DC] rounded-xl p-4 transition-colors cursor-pointer"
            >
              <span className="text-xs text-[#6E5D63]">Next Guide →</span>
              <p className="font-serif-editorial text-base font-medium text-[#2C2226] mt-1">
                {nextArticle.title}
              </p>
            </button>
          )}
        </div>
      </div>
    );
  }

  const activeRoutine = ROUTINE_RECOMMENDATIONS[skinFeel];
  const suggestedProducts = PRODUCTS.filter((p) =>
    activeRoutine.suggestedProductIds.includes(p.id)
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Page Header */}
      <div className="bg-[#FAF2F4] rounded-2xl border border-[#EAD8DC] p-8 sm:p-10 lg:p-12 space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5E7A68] font-medium">
          <span>Grace N Glow Education Library</span>
          <span aria-hidden="true">·</span>
          <span>Mindful Skincare</span>
        </div>
        <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2226]">
          Skincare Routine & Educational Guide
        </h1>
        <p className="text-sm sm:text-base text-[#5A474E] max-w-2xl leading-relaxed">
          Understanding how to cleanse gently, patch test new products, and choose textures suited
          to your skin makes all the difference. Explore our six foundational guides below.
        </p>
      </div>

      {/* All 6 Educational Guides Grid */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SKINCARE_GUIDES.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-[#EAD8DC] hover:border-[#D88C9A] transition-colors flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div
                  onClick={() => onSelectArticle(article)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectArticle(article);
                    }
                  }}
                  className="p-5 bg-[#FFFDFD] border-b border-[#F4E8EB] cursor-pointer"
                >
                  <ResilientImage
                    src={article.coverImage}
                    alt={article.title}
                    bgTone="#FFFFFF"
                    containerClassName="aspect-[16/10] rounded-xl flex items-center justify-center p-2"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-6 space-y-3">
                  {/* Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs text-[#6E5D63]">
                    <span className="font-medium text-[#9E4758] tabular-nums">
                      Guide {article.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-serif-editorial text-xl font-medium text-[#2C2226] leading-snug">
                    <button
                      type="button"
                      onClick={() => onSelectArticle(article)}
                      className="text-left hover:text-[#9E4758] transition-colors cursor-pointer"
                    >
                      {article.title}
                    </button>
                  </h2>

                  <p className="text-sm text-[#5A474E] leading-relaxed">{article.summary}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#2C2226] bg-[#FAF2F4] hover:bg-[#F2DFE4] rounded-lg transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#9E4758]" />
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Routine Explorer */}
      <section className="bg-[#F6F9F7] rounded-2xl border border-[#DCE6DF] p-8 sm:p-10 lg:p-12 space-y-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#4A6654] font-medium">
            <span>Interactive Routine Helper</span>
            <span aria-hidden="true">·</span>
            <span>Educational Guidance</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#2C2226]">
            Explore a Simple Routine by How Your Skin Feels
          </h2>
          <p className="text-sm text-[#5A474E] leading-relaxed">
            Select the description that best matches how your skin typically feels during the day
            to see a simple morning and evening care structure:
          </p>
        </div>

        {/* Interactive Selector Tabs */}
        <div
          role="tablist"
          aria-label="Skin feel selector"
          className="flex flex-wrap gap-2 p-1.5 bg-white border border-[#DCE6DF] rounded-xl w-fit"
        >
          {(Object.keys(ROUTINE_RECOMMENDATIONS) as SkinFeelOption[]).map((key) => {
            const item = ROUTINE_RECOMMENDATIONS[key];
            const isSelected = skinFeel === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => setSkinFeel(key)}
                className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#2E5A44] text-white'
                    : 'text-[#4A3B40] hover:bg-[#F6F9F7]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Routine Details & Matching Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white rounded-xl border border-[#DCE6DF] p-6 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#4A6654] font-semibold">
                Typical Skin Observation
              </p>
              <p className="text-sm text-[#2C2226] mt-1 leading-relaxed">
                {activeRoutine.observation}
              </p>
            </div>

            <div className="pt-4 border-t border-[#EBF1ED] space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
                  Morning Approach
                </p>
                <p className="text-sm text-[#5A474E] mt-1 leading-relaxed">
                  {activeRoutine.morningFocus}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#2C2226]">
                  Evening Approach
                </p>
                <p className="text-sm text-[#5A474E] mt-1 leading-relaxed">
                  {activeRoutine.eveningFocus}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EBF1ED]">
              <a
                href={buildWhatsAppUrl(activeRoutine.whatsappPrompt)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium text-white bg-[#2E5A44] hover:bg-[#234735] rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Discuss This Routine on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#4A6654]">
              Grace N Glow Products to Explore for This Routine:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {suggestedProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProduct(prod);
                    }
                  }}
                  className="bg-white rounded-xl border border-[#DCE6DF] hover:border-[#2E5A44] p-4 flex flex-col justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <ResilientImage
                      src={prod.primaryImage}
                      alt={prod.name}
                      bgTone="#FFFFFF"
                      containerClassName="aspect-square rounded-lg flex items-center justify-center p-2 mb-3"
                      className="w-full h-full object-contain"
                    />
                    <p className="text-[11px] text-[#6E5D63]">{prod.routineStep}</p>
                    <p className="font-serif-editorial text-sm font-medium text-[#2C2226] mt-0.5">
                      {prod.name}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#9E4758] mt-3 inline-block">
                    View Details →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
