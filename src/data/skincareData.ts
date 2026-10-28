export const BRAND_CONFIG = {
  name: 'Grace N Glow',
  tagline: 'Glow naturally, glow confidently!',
  descriptor: 'Organic • Handmade • Natural Skincare',
  whatsappNumber: '917385717253',
  whatsappDisplay: '+91 73857 17253',
  instagramHandle: 'TO BE CONFIRMED',
  instagramUrl: '', // Configurable: Replace with 'https://www.instagram.com/your_handle/' when confirmed
  country: 'India',
};

export function buildWhatsAppUrl(customMessage?: string): string {
  const defaultMessage =
    "Hello Grace N Glow! I was exploring your skincare website and would love to know more about your products and how to place an order.";
  const text = encodeURIComponent(customMessage || defaultMessage);
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${text}`;
}

export function buildProductWhatsAppUrl(
  productName: string,
  selectedTopics?: string[]
): string {
  const topicText =
    selectedTopics && selectedTopics.length > 0
      ? ` Specifically, I would like to ask about: ${selectedTopics.join(', ')}.`
      : ' Could you please share the price, available sizes, ingredients, and ordering details?';
  const message = `Hello Grace N Glow! I'm interested in ${productName}.${topicText}`;
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export type ProductCategory =
  | 'All Products'
  | 'Face Washes'
  | 'Moisturizers & Gels'
  | 'Lip & Skin Balms';

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: Exclude<ProductCategory, 'All Products'>;
  routineStep: string;
  featured: boolean;
  primaryImage: string;
  galleryImages: {
    url: string;
    caption: string;
    focusArea?: 'full' | 'label' | 'texture';
  }[];
  imageBgTone: string;
  shortDescription: string;
  fullDescription: string;
  netVolumeOrWeight: string;
  priceDisplay: string;
  labelListedIngredients: string[];
  ingredientsNote: string;
  labelHighlights: string[];
  intendedUse: string;
  directionsForUse: string[];
  precautions: string[];
  storageInstructions: string;
  availableVariants: string;
}

export const PRODUCTS: ProductItem[] = [
  {
    id: 'blush-glow-moisturizer',
    slug: 'blush-glow-moisturizer',
    name: 'Blush Glow Moisturizer',
    subtitle: 'Soft-textured daily facial moisturizer for hydrated, supple skin',
    category: 'Moisturizers & Gels',
    routineStep: 'Step 02 · Moisturize',
    featured: true,
    primaryImage: '/assets/aistudio/Gemini_Generated_Image_7wfvvm7wfvvm7wfv_8453c1a6.png',
    galleryImages: [
      {
        url: '/assets/aistudio/Gemini_Generated_Image_7wfvvm7wfvvm7wfv_8453c1a6.png',
        caption: 'Grace N Glow Blush Glow Moisturizer — Full Jar Presentation',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/Gemini_Generated_Image_7wfvvm7wfvvm7wfv_8453c1a6.png',
        caption: 'Whipped Soft-Pink Cream Texture & Packaging Detail',
        focusArea: 'texture',
      },
    ],
    imageBgTone: '#FDF6F7',
    shortDescription:
      'A silky, rose-tinted cream moisturizer crafted to comfort dry areas, lock in moisture after cleansing, and leave skin feeling soft and refreshed.',
    fullDescription:
      'Presented in a wide-mouth jar for effortless daily application, the Grace N Glow Blush Glow Moisturizer features a smooth, cushiony cream texture. Designed as the core hydration step in your morning or evening routine, it helps maintain skin softness without feeling heavy.',
    netVolumeOrWeight: 'Available on WhatsApp enquiry (Standard Jar)',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Complete botanical & moisturizing ingredient list available directly via WhatsApp prior to ordering',
    ],
    ingredientsNote:
      'Because handmade batches may be tailored or updated, please request the full batch ingredient list on WhatsApp if you have specific sensitivities.',
    labelHighlights: [
      'Grace N Glow Organic Skincare range',
      'Smooth whipped cream texture',
      'Suitable for daily facial hydration',
    ],
    intendedUse:
      'Daily facial moisturization after cleansing to support skin softness and surface hydration.',
    directionsForUse: [
      'Cleanse your face thoroughly and gently pat until slightly damp.',
      'Scoop a pea-sized amount of Blush Glow Moisturizer with clean, dry fingers or a spatula.',
      'Dot gently across the forehead, cheeks, nose, and chin, then massage upward in soft circular motions.',
      'Allow a few minutes to absorb before applying sunscreen in the morning.',
    ],
    precautions: [
      'For external use only. Avoid direct contact with eyes.',
      'Always perform a 24-hour patch test on your inner forearm or jawline before first full-face use.',
      'Discontinue use if redness or irritation occurs.',
    ],
    storageInstructions:
      'Keep the jar tightly closed after each use. Store in a cool, dry place away from direct sunlight and moisture.',
    availableVariants: 'Blush Glow Moisturizer (Enquire on WhatsApp for available jar sizes)',
  },
  {
    id: 'chocolate-lip-balm-spf30',
    slug: 'chocolate-lip-balm-spf30',
    name: 'Chocolate Lip Balm (With SPF 30)',
    subtitle: 'Nourishing cocoa-toned lip care for dry, chapped lips',
    category: 'Lip & Skin Balms',
    routineStep: 'Step 03 · Lip Care & Protection',
    featured: true,
    primaryImage: '/assets/aistudio/Gemini_Generated_Image_nagn3xnagn3xnagn_204eebe0.png',
    galleryImages: [
      {
        url: '/assets/aistudio/Gemini_Generated_Image_nagn3xnagn3xnagn_204eebe0.png',
        caption: 'Grace N Glow Chocolate Lip Balm — Open Jar & Label View',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/Gemini_Generated_Image_nagn3xnagn3xnagn_204eebe0.png',
        caption: 'Label Details: Nourishes Lips, Protects Dryness, With SPF 30',
        focusArea: 'label',
      },
    ],
    imageBgTone: '#FAF5F2',
    shortDescription:
      'Formulated with natural ingredients for daily lip comfort. Helps nourish dry lips, soften roughness, and provide everyday care with SPF 30.',
    fullDescription:
      'The Grace N Glow Chocolate Lip Balm combines a comforting chocolate-inspired balm texture with daily protective care. As printed on the product label, it is crafted with natural ingredients for daily care and comfort—helping nourish lips, protect against dryness, and soften chapped texture.',
    netVolumeOrWeight: 'Compact Lip Jar (Confirm net weight via WhatsApp)',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Formulated with natural ingredients for daily lip care & comfort (Ask on WhatsApp for full ingredient breakdown)',
    ],
    ingredientsNote:
      'Label states: "Nourishes lips | Protects dryness | Heals chapped lips | Softens | With natural ingredients for daily care & comfort | WITH SPF 30".',
    labelHighlights: [
      'Nourishes lips & protects against dryness',
      'Softens dry, chapped lip texture',
      'Labelled with SPF 30 for daytime lip care',
    ],
    intendedUse:
      'Daily lip moisturization and daytime lip comfort whenever lips feel dry or exposed to the elements.',
    directionsForUse: [
      'With a clean fingertip or lip brush, swipe a small amount of balm from the jar.',
      'Smooth evenly across upper and lower lips.',
      'Reapply during the day as needed, especially before stepping outdoors or before bedtime.',
    ],
    precautions: [
      'For external lip use only.',
      'Perform a quick patch test if you have known sensitivities to cocoa or botanical waxes/butters.',
      'Do not apply to broken or bleeding skin.',
    ],
    storageInstructions:
      'Store in a cool, dry place away from heat sources so the balm maintains its firm, smooth consistency.',
    availableVariants: 'Chocolate Lip Balm with SPF 30',
  },
  {
    id: '24k-gold-facewash',
    slug: '24k-gold-facewash',
    name: '24 K Gold Facewash',
    subtitle: 'Illuminating gel cleanser with Aloe Vera, Niacinamide & Vitamin E',
    category: 'Face Washes',
    routineStep: 'Step 01 · Cleanse',
    featured: true,
    primaryImage: '/assets/aistudio/file_000000004ddc8211bbcce15fe28bdfb1_dc64aeb4.png',
    galleryImages: [
      {
        url: '/assets/aistudio/file_000000004ddc8211bbcce15fe28bdfb1_dc64aeb4.png',
        caption: '24 K Gold Facewash (100 ml) — Full Bottle Presentation',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/file_000000004ddc8211bbcce15fe28bdfb1_dc64aeb4.png',
        caption: 'Front Label Ingredients & Benefits Detail',
        focusArea: 'label',
      },
    ],
    imageBgTone: '#FDFBF7',
    shortDescription:
      'A golden gel cleanser formulated with Gold Dust, Orange, Alfalfa, Aloe Vera Extract, Niacinamide, and Vitamin E oil to remove impurities and refresh dull skin.',
    fullDescription:
      'Our 24 K Gold Facewash comes in a convenient 100 ml flip-top bottle and features a shimmering golden gel suspension. Formulated with Aloe Vera Extract, Niacinamide, Orange, Alfalfa, and Vitamin E oil, it gently lifts everyday surface dirt and excess oil while leaving skin feeling clean and luminous.',
    netVolumeOrWeight: 'Net Weight 100 ml.',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Gold Dust',
      'Orange',
      'Alfalfa',
      'Aloevera Extract',
      'Niacinamide',
      'Essential Oil',
      'Vitamin E Oil',
    ],
    ingredientsNote:
      'Ingredients transcribed directly from the product label.',
    labelHighlights: [
      'Delivers Glow & Restores Skin',
      'Removes Impurities',
      'Net Weight: 100 ml',
    ],
    intendedUse:
      'Daily facial cleansing to remove surface impurities, excess sebum, and dullness.',
    directionsForUse: [
      'Splash your face with lukewarm water.',
      'Dispense a small coin-sized amount of 24 K Gold Facewash into wet palms.',
      'Gently massage over damp skin in upward circular motions for 30 to 45 seconds, avoiding the eye contour.',
      'Rinse thoroughly with water and pat dry with a clean, soft towel.',
    ],
    precautions: [
      'For external use only. Avoid contact with eyes.',
      'Because this formula contains essential oil and citrus (Orange), perform a patch test before first use.',
    ],
    storageInstructions:
      'Store upright in a cool, dry place away from direct sunlight.',
    availableVariants: '100 ml Flip-Top Bottle',
  },
  {
    id: 'avocado-face-wash',
    slug: 'avocado-face-wash',
    name: 'Avocado Face Wash',
    subtitle: 'Refreshing green gel cleanser for balanced, comfortable cleansing',
    category: 'Face Washes',
    routineStep: 'Step 01 · Cleanse',
    featured: true,
    primaryImage: '/assets/aistudio/file_000000007eec8211a38bfb11306f9119_be0c7396.png',
    galleryImages: [
      {
        url: '/assets/aistudio/file_000000007eec8211a38bfb11306f9119_be0c7396.png',
        caption: 'Avocado Face Wash (100 ml) — Bottle Presentation',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/file_000000007eec8211a38bfb11306f9119_be0c7396.png',
        caption: 'Label Detail: Handmade | Net Vol. 100 ml.',
        focusArea: 'label',
      },
    ],
    imageBgTone: '#F6F9F6',
    shortDescription:
      'A soothing, handmade green gel face wash in a 100 ml bottle designed to cleanse everyday buildup while keeping skin feeling fresh and comfortable.',
    fullDescription:
      'Crafted for gentle daily cleansing, the Avocado Face Wash offers a refreshing gel texture that rinses clean without leaving a heavy residue. Packaged in a 100 ml travel-friendly bottle, it is an easy everyday cleanser for morning and evening routines.',
    netVolumeOrWeight: 'Net Vol. 100 ml.',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Avocado-inspired handmade cleanser formulation (Request full ingredient list on WhatsApp)',
    ],
    ingredientsNote:
      'Labelled as "Handmade | Chemical Free | Net Vol. 100 ml." Please message us on WhatsApp to review the complete ingredient list for your skin type.',
    labelHighlights: [
      'Handmade small-batch presentation',
      'Refreshing gel texture',
      'Net Vol. 100 ml',
    ],
    intendedUse:
      'Gentle morning and evening facial cleansing for everyday dirt and oil removal.',
    directionsForUse: [
      'Wet your face with clean water.',
      'Apply a small amount of Avocado Face Wash and work into a light lather.',
      'Massage gently across the face and neck for 30 seconds.',
      'Rinse well with water and follow with your preferred moisturizer.',
    ],
    precautions: [
      'For external use only.',
      'Patch test on a small area of skin 24 hours prior to regular use.',
    ],
    storageInstructions:
      'Keep cap closed tightly after use. Store away from direct heat and sunlight.',
    availableVariants: '100 ml Flip-Top Bottle',
  },
  {
    id: 'rice-protein-facewash',
    slug: 'rice-protein-facewash',
    name: 'Rice Protein Facewash',
    subtitle: 'Gentle clear gel cleanser with suspended botanical micro-beads',
    category: 'Face Washes',
    routineStep: 'Step 01 · Cleanse',
    featured: true,
    primaryImage: '/assets/aistudio/Gemini_Generated_Image_9ki8lh9ki8lh9ki8_32800550.png',
    galleryImages: [
      {
        url: '/assets/aistudio/Gemini_Generated_Image_9ki8lh9ki8lh9ki8_32800550.png',
        caption: 'Rice Protein Facewash (100 ml) — Clear Gel Bottle',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/Gemini_Generated_Image_9ki8lh9ki8lh9ki8_32800550.png',
        caption: 'Suspended Gel Texture & 100 ml Label View',
        focusArea: 'texture',
      },
    ],
    imageBgTone: '#FBF9F6',
    shortDescription:
      'A mild, clear gel face wash in a 100 ml bottle crafted to cleanse the skin gently and leave a clean, soft, comfortable finish.',
    fullDescription:
      'Inspired by time-honoured grain-based skincare traditions, the Rice Protein Facewash features a crystal-clear gel base with fine suspended beads. It is ideal for customers looking for a mild daily face wash that pairs effortlessly with hydrating gels and moisturizers.',
    netVolumeOrWeight: '100 ml',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Rice Protein cleanser base (Full side-panel ingredient list shared via WhatsApp enquiry)',
    ],
    ingredientsNote:
      'The side label lists the detailed ingredient breakdown; ask us on WhatsApp for a close-up photo or full text list before ordering.',
    labelHighlights: [
      'Clear gel texture with fine suspended beads',
      'Gentle daily facial cleanser',
      '100 ml bottle',
    ],
    intendedUse:
      'Daily facial cleansing for a clean, soft, and refreshed complexion.',
    directionsForUse: [
      'Moisten face and neck with water.',
      'Take a small amount of Rice Protein Facewash and massage gently using fingertips.',
      'Rinse thoroughly with water and pat dry with a soft towel.',
    ],
    precautions: [
      'External use only. Avoid eye area.',
      'Always conduct a patch test before incorporating a new cleanser into your routine.',
    ],
    storageInstructions:
      'Store in a cool, dry location out of direct sun.',
    availableVariants: '100 ml Flip-Top Bottle',
  },
  {
    id: 'vitamin-c-facewash',
    slug: 'vitamin-c-facewash',
    name: 'Vitamin C Facewash',
    subtitle: 'Citrus-inspired refreshing gel cleanser for daily radiance',
    category: 'Face Washes',
    routineStep: 'Step 01 · Cleanse',
    featured: true,
    primaryImage: '/assets/aistudio/1000241189__1__f2a7a8c7.png',
    galleryImages: [
      {
        url: '/assets/aistudio/1000241189__1__f2a7a8c7.png',
        caption: 'Vitamin C Facewash — Botanical Citrus Presentation',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/1000241189__1__f2a7a8c7.png',
        caption: 'Front Label Benefits & Gel Texture View',
        focusArea: 'label',
      },
    ],
    imageBgTone: '#FFF9F4',
    shortDescription:
      'A vibrant citrus-toned gel cleanser designed to wash away surface dirt, refresh tired-looking skin, and support a bright, clean feel.',
    fullDescription:
      'Our Vitamin C Facewash offers an uplifting, refreshing cleanse after exposure to outdoor dust and pollution. Its lightweight gel texture lathers gently to lift away daily grime while leaving your skin feeling energized and ready for moisturizer.',
    netVolumeOrWeight: 'Standard Bottle (Confirm volume on WhatsApp)',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Vitamin C cleanser formulation (Complete ingredient list available via WhatsApp)',
    ],
    ingredientsNote:
      'Front label highlights: "Fades dark spots · Protects skin from dirt · Boosts glow · Repairs and restores natural skin". Contact us on WhatsApp for full ingredient transparency.',
    labelHighlights: [
      'Helps remove everyday surface dirt and buildup',
      'Supports natural skin radiance',
      'Refreshing gel cleanser',
    ],
    intendedUse:
      'Morning or evening cleansing to remove surface dirt and refresh dull-looking skin.',
    directionsForUse: [
      'Splash face with cool or lukewarm water.',
      'Massage a small amount of Vitamin C Facewash onto damp skin in gentle circles.',
      'Rinse thoroughly and follow with moisturizer and daytime broad-spectrum sunscreen.',
    ],
    precautions: [
      'For external use only.',
      'When using Vitamin C skincare products during the day, always pair with proper sun protection.',
      'Patch test for 24 hours prior to regular facial application.',
    ],
    storageInstructions:
      'Store in a cool, shaded place away from direct sunlight to preserve product freshness.',
    availableVariants: 'Flip-Top Bottle (Enquire for size options)',
  },
  {
    id: 'glutathione-face-wash',
    slug: 'glutathione-face-wash',
    name: 'Glutathione Face Wash',
    subtitle: 'Multi-ingredient gel cleanser with Vitamin C, Niacinamide & Aloe Vera',
    category: 'Face Washes',
    routineStep: 'Step 01 · Cleanse',
    featured: false,
    primaryImage: '/assets/aistudio/IMG-20261028-WA0005_5796d21c.jpg',
    galleryImages: [
      {
        url: '/assets/aistudio/IMG-20261028-WA0005_5796d21c.jpg',
        caption: 'Glutathione Face Wash — Full Bottle & Step-by-Step Label',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/IMG-20261028-WA0005_5796d21c.jpg',
        caption: 'Printed Ingredients & 4-Step Usage Instructions on Bottle',
        focusArea: 'label',
      },
    ],
    imageBgTone: '#F4F8FB',
    shortDescription:
      'Formulated with Glutathione, Vitamin C & E, Aloe Vera, Niacinamide (Vitamin B3), Glycolic, Alpha Arbutin, Allantoin, Licorice Extract, and Rosa Extract.',
    fullDescription:
      'Printed with complete step-by-step instructions and ingredient transparency right on the front label, this blue micro-bead gel cleanser combines soothing Aloe Vera, Allantoin, and Rosa Extract with Niacinamide (Vitamin B3), Vitamin C & E, Glutathione, Glycolic, and Licorice Extract for a thorough, refreshing cleanse.',
    netVolumeOrWeight: 'Confirm bottle volume via WhatsApp',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Glutathione',
      'Vitamin C & E',
      'Aloe Vera',
      'Niacinamide (Vitamin B3)',
      'Glycolic',
      'Alpha Arbutin',
      'Allantoin',
      'Licorice Extract',
      'Rosa Extract',
      'Natural Surfactants',
      'Fragrance',
    ],
    ingredientsNote:
      'All 11 ingredient groups above are transcribed directly from the product front label.',
    labelHighlights: [
      'Full ingredient list printed clearly on front label',
      'Includes Aloe Vera, Niacinamide (B3), Allantoin & Licorice Extract',
      'Clear 4-step cleansing instructions on bottle',
    ],
    intendedUse:
      'Facial cleansing for removing impurities and supporting an even, refreshed skin appearance.',
    directionsForUse: [
      'Prep: Splash your face with water to prepare your skin.',
      'Cleanse: Take a small amount of face wash and gently massage onto damp skin in circular motions.',
      'Rinse: Rinse thoroughly with water.',
      'Pat Dry: Gently pat your face dry with a soft towel.',
    ],
    precautions: [
      'Contains Glycolic and active brightening ingredients; introduce gradually and always wear sunscreen during the day.',
      'Perform a 24–48 hour patch test before use. Avoid applying to irritated or freshly exfoliated skin.',
    ],
    storageInstructions:
      'Keep in a cool, dry place away from direct heat and sunlight.',
    availableVariants: 'Standard Flip-Top Bottle',
  },
  {
    id: 'de-tan-face-wash',
    slug: 'de-tan-face-wash',
    name: 'De-Tan Face Wash',
    subtitle: 'Botanical scrub-textured cleanser for post-sun refreshment',
    category: 'Face Washes',
    routineStep: 'Step 01 · Cleanse & Refresh',
    featured: false,
    primaryImage: '/assets/aistudio/IMG-20261028-WA0006_0a4193fe.jpg',
    galleryImages: [
      {
        url: '/assets/aistudio/IMG-20261028-WA0006_0a4193fe.jpg',
        caption: 'De-Tan Face Wash — Exfoliating Granule Suspension Bottle',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/IMG-20261028-WA0006_0a4193fe.jpg',
        caption: 'Close-Up of Suspended Botanical Scrubbing Particles',
        focusArea: 'texture',
      },
    ],
    imageBgTone: '#FCF8F2',
    shortDescription:
      'A textured face wash featuring suspended exfoliating granules to gently lift away surface dullness, sweat, and outdoor grime after sun exposure.',
    fullDescription:
      'Designed for days when your skin feels weighed down by outdoor travel, dust, and sun exposure, the De-Tan Face Wash features visible suspended exfoliating specks inside a creamy-gel base. Used with a light touch, it helps polish away dead surface buildup and leaves skin feeling clean.',
    netVolumeOrWeight: 'Available on WhatsApp enquiry',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Full ingredient list and granule source available via WhatsApp enquiry',
    ],
    ingredientsNote:
      'Enquire on WhatsApp for complete ingredient details and recommended usage frequency for your skin type.',
    labelHighlights: [
      'Suspended exfoliating granules for gentle surface polishing',
      'Ideal after outdoor commutes and sun exposure',
      'Easy flip-top dispensing bottle',
    ],
    intendedUse:
      'Periodic or daily cleansing to remove surface buildup and refresh skin after outdoor exposure.',
    directionsForUse: [
      'Wet your face thoroughly with water.',
      'Dispense a small amount and massage with very light fingertip pressure—let the suspended granules move gently without harsh scrubbing.',
      'Rinse completely with lukewarm water and apply a soothing gel or moisturizer immediately after.',
    ],
    precautions: [
      'Do not scrub aggressively or use over active breakouts, sunburn, or compromised skin barriers.',
      'Patch test prior to first use.',
    ],
    storageInstructions:
      'Keep tightly capped in a cool, dry place.',
    availableVariants: 'Standard Flip-Top Bottle',
  },
  {
    id: 'pure-hydrating-soothing-gel',
    slug: 'pure-hydrating-soothing-gel',
    name: 'Pure Crystal Soothing & Hydrating Gel',
    subtitle: 'Lightweight transparent moisture gel for cooling comfort',
    category: 'Moisturizers & Gels',
    routineStep: 'Step 02 · Hydrate & Soothe',
    featured: false,
    primaryImage: '/assets/aistudio/IMG-20261028-WA0007_29dbc4c9.jpg',
    galleryImages: [
      {
        url: '/assets/aistudio/IMG-20261028-WA0007_29dbc4c9.jpg',
        caption: 'Crystal-Clear Hydrating Gel Texture in Wide-Mouth Jar',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/IMG-20261028-WA0007_29dbc4c9.jpg',
        caption: 'Close-Up of Dewy, Water-Light Gel Consistency',
        focusArea: 'texture',
      },
    ],
    imageBgTone: '#F8FAFC',
    shortDescription:
      'A crystal-clear, oil-freefeeling gel that delivers weightless hydration and a cooling sensation—ideal for warm weather or oily and combination skin.',
    fullDescription:
      'Shown in its pure, crystal-clear texture, our Soothing & Hydrating Gel is crafted for customers who prefer a weightless, non-greasy moisture layer. It absorbs quickly into damp skin after cleansing and works wonderfully in humid Indian weather or as a soothing post-sun gel.',
    netVolumeOrWeight: 'Wide-Mouth Jar (Confirm size options on WhatsApp)',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Clear hydrating gel base (Confirm exact botanical variant & ingredients on WhatsApp)',
    ],
    ingredientsNote:
      'Product photograph showcases the unlabelled crystal-clear gel texture. Message us on WhatsApp to confirm current batch variants, sizes, and ingredients.',
    labelHighlights: [
      'Crystal-clear, non-heavy gel texture',
      'Comfortable in warm and humid climates',
      'Multi-purpose facial and skin hydration',
    ],
    intendedUse:
      'Lightweight daily hydration for face and neck, especially suited for normal, combination, or oily skin types.',
    directionsForUse: [
      'Apply a small scoop onto clean, slightly damp skin after washing your face.',
      'Spread evenly in gentle upward strokes and pat lightly until absorbed.',
      'Can be used morning and night, or layered under a richer cream in dry weather.',
    ],
    precautions: [
      'Always use a clean spoon/spatula or freshly washed hands when scooping from the open jar.',
      'Perform a 24-hour patch test before first use.',
    ],
    storageInstructions:
      'Store in a cool, dry place. May also be kept in a cool cupboard for an extra-refreshing feel.',
    availableVariants: 'Clear Jar (Enquire on WhatsApp for available weights)',
  },
  {
    id: 'small-batch-nourishing-balm',
    slug: 'small-batch-nourishing-balm',
    name: 'Artisanal Whipped Butter & Lip/Skin Salve Tin',
    subtitle: 'Hand-poured botanical balm in a reusable small-business tin',
    category: 'Lip & Skin Balms',
    routineStep: 'Step 03 · Targeted Nourishment',
    featured: false,
    primaryImage: '/assets/aistudio/Gemini_Generated_Image_cvme3gcvme3gcvme_d8671280.png',
    galleryImages: [
      {
        url: '/assets/aistudio/Gemini_Generated_Image_cvme3gcvme3gcvme_d8671280.png',
        caption: 'Hand-Poured Cream Balm Tin — "Thank You For Supporting Our Small Business"',
        focusArea: 'full',
      },
      {
        url: '/assets/aistudio/Gemini_Generated_Image_cvme3gcvme3gcvme_d8671280.png',
        caption: 'Smooth Butter-Cream Balm Texture & Reusable Tin Detail',
        focusArea: 'texture',
      },
    ],
    imageBgTone: '#FBF8F3',
    shortDescription:
      'A rich, hand-poured botanical salve presented in our signature small-business tin—crafted to comfort dry patches, cuticles, or lips.',
    fullDescription:
      'Every tin reflects the personal, handmade heart of Grace N Glow. Topped with our "Thank You For Supporting Our Small Business" seal, this smooth, butter-toned balm melts gently on contact with skin warmth to soften dry areas such as lips, elbows, or cuticles.',
    netVolumeOrWeight: 'Travel Tin (Enquire on WhatsApp for available variants)',
    priceDisplay: 'Shared via WhatsApp enquiry',
    labelListedIngredients: [
      'Natural plant butters & botanical oils (Enquire on WhatsApp for current batch variant & full ingredients)',
    ],
    ingredientsNote:
      'This photograph shows our small-batch handmade tin packaging. Please contact us on WhatsApp to ask about currently available balm flavours and ingredient lists.',
    labelHighlights: [
      'Hand-poured small-batch presentation',
      'Portable metal tin with screw-top lid',
      'Melts smoothly on contact with skin warmth',
    ],
    intendedUse:
      'Targeted moisture care for dry lips, cuticles, knuckles, or rough skin patches.',
    directionsForUse: [
      'Warm a small amount of balm on a clean fingertip.',
      'Press and smooth onto dry lips, cuticles, or dry skin patches as needed throughout the day.',
    ],
    precautions: [
      'For external use only.',
      'Conduct a patch test on your inner wrist before use, especially if sensitive to natural nut/seed butters or essential oils.',
    ],
    storageInstructions:
      'Keep away from direct heat so the natural balm does not soften excessively.',
    availableVariants: 'Enquire via WhatsApp for current handmade balm variants',
  },
];

export interface SkincareArticle {
  id: string;
  slug: string;
  number: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  coverImage: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string[];
    bullets?: string[];
  }[];
  safetyNote: string;
}

export const SKINCARE_GUIDES: SkincareArticle[] = [
  {
    id: 'basic-skincare-routine',
    slug: 'how-to-build-a-basic-skincare-routine',
    number: '01',
    title: 'How to Build a Basic Skincare Routine',
    category: 'Routine Foundations',
    readTime: '4 min read',
    summary:
      'A calm, consistent skincare routine does not require ten complicated steps. Learn how cleansing, moisturizing, and daytime sun protection form a reliable daily foundation.',
    coverImage: '/assets/aistudio/Gemini_Generated_Image_7wfvvm7wfvvm7wfv_8453c1a6.png',
    keyTakeaways: [
      'Consistency with 3 core steps outperforms an overloaded 10-step routine.',
      'Morning routines focus on gentle refreshment and daytime protection.',
      'Evening routines focus on removing outdoor buildup and replenishing moisture.',
    ],
    sections: [
      {
        heading: 'Why Simplicity Works Best for Your Skin Barrier',
        body: [
          'When exploring skincare, it is easy to feel overwhelmed by complex layering rules. In reality, healthy-looking skin thrives on consistency and gentle care rather than excessive products.',
          'A thoughtful basic routine relies on three essential pillars: a gentle cleanser suited to your skin, a comfortable moisturizer or hydrating gel, and broad-spectrum protection during daylight hours.',
        ],
      },
      {
        heading: 'The 3-Step Morning & Evening Framework',
        body: [
          'By keeping your routine structured around these three pillars, you can easily observe how your skin responds to each product:',
        ],
        bullets: [
          'Step 1 — Cleanse: Wash away sweat, excess sebum, and surface dust using lukewarm water and a gentle gel face wash (such as our Rice Protein, Avocado, or 24 K Gold Facewash). Massage for 30 seconds without harsh scrubbing.',
          'Step 2 — Moisturize & Hydrate: While skin is still slightly damp, apply a lightweight gel (like our Pure Crystal Soothing Gel for humid days) or a nourishing cream (like the Blush Glow Moisturizer) to lock in comfort.',
          'Step 3 — Protect & Nourish Lips: During the day, finish with broad-spectrum sunscreen on exposed skin and a protective lip balm such as our Chocolate Lip Balm with SPF 30.',
        ],
      },
      {
        heading: 'Adapting to Indian Weather & Seasons',
        body: [
          'Across India, humidity and temperature shift dramatically between summer, monsoon, and winter. During humid monsoon afternoons, a lighter gel layer may feel most comfortable, while dry winter evenings call for a richer cream moisturizer and extra lip care.',
        ],
      },
    ],
    safetyNote:
      'Educational Disclaimer: Cosmetic skincare supports surface cleansing and hydration. If you experience persistent acne, eczema, or dermatological conditions, please consult a qualified dermatologist.',
  },
  {
    id: 'understanding-your-skin-type',
    slug: 'understanding-your-skin-type',
    number: '02',
    title: 'Understanding Your Skin Type',
    category: 'Skin Observation',
    readTime: '5 min read',
    summary:
      'Before choosing a cleanser or moisturizer, learn how to observe your skin’s natural oil balance and hydration levels at home using a simple, gentle wash test.',
    coverImage: '/assets/aistudio/IMG-20261028-WA0007_29dbc4c9.jpg',
    keyTakeaways: [
      'Your skin type can shift with climate, season, and age.',
      'A simple 60-minute bare-skin observation after gentle cleansing helps identify your baseline.',
      'Oily skin still requires lightweight hydration—skipping moisturizer can leave skin feeling unbalanced.',
    ],
    sections: [
      {
        heading: 'The Simple 60-Minute At-Home Observation Method',
        body: [
          'To understand how your skin behaves naturally, wash your face with a mild cleanser and lukewarm water, pat dry gently with a soft towel, and leave your skin bare without any creams or gels for 45 to 60 minutes.',
          'Examine your forehead, nose, cheeks, and chin in natural daylight and note how your skin feels when you smile or lightly touch your T-zone.',
        ],
      },
      {
        heading: 'Common Skin Characteristics',
        body: [
          'While every person’s skin is unique, most complexions fall into one of five everyday patterns:',
        ],
        bullets: [
          'Normal / Balanced Skin: Feels comfortable, neither tight nor overly shiny an hour after washing.',
          'Dry Skin: Feels tight, parched, or shows fine flaky patches shortly after cleansing; benefits from creamier moisturizers like Blush Glow Moisturizer.',
          'Oily Skin: Develops noticeable shine across the forehead, nose, and cheeks; prefers refreshing gel cleansers and weightless clear gels.',
          'Combination Skin: Shows oiliness along the T-zone (forehead, nose, and chin) while the cheeks feel normal or dry.',
          'Sensitive / Reactive Skin: Flushes or stings easily with weather changes, friction, or new fragrances; requires extra attention to patch testing and ingredient lists.',
        ],
      },
    ],
    safetyNote:
      'Tip: When messaging Grace N Glow on WhatsApp, share how your skin usually feels during the day so we can share relevant product details.',
  },
  {
    id: 'introduce-new-skincare-product',
    slug: 'how-to-introduce-a-new-skincare-product',
    number: '03',
    title: 'How to Introduce a New Skincare Product',
    category: 'Mindful Usage',
    readTime: '4 min read',
    summary:
      'Starting three new products on the same night makes it impossible to know which one suits your skin. Discover the slow-introduction method for stress-free skincare.',
    coverImage: '/assets/aistudio/Gemini_Generated_Image_9ki8lh9ki8lh9ki8_32800550.png',
    keyTakeaways: [
      'Introduce only one new product at a time, spaced at least 7 to 10 days apart.',
      'Always complete a 24–48 hour patch test before applying a new formula to your entire face.',
      'Start active or exfoliating cleansers gradually rather than twice daily right away.',
    ],
    sections: [
      {
        heading: 'The "One-at-a-Time" Golden Rule',
        body: [
          'When a package of new skincare arrives, it is tempting to try the cleanser, scrub, and moisturizer all at once. However, if your skin feels sensitive the next morning, you will not know which product caused the reaction.',
          'By introducing one product at a time and using it alongside your existing familiar products for a full week, you give your skin time to adjust calmly.',
        ],
      },
      {
        heading: 'Pacing Active or Exfoliating Formulas',
        body: [
          'Not every product needs to be used twice a day from day one:',
        ],
        bullets: [
          'Gentle Hydrating Products: Moisturizers and soothing gels can usually be used daily once your patch test is clear.',
          'Exfoliating or Granule Cleansers (such as De-Tan Face Wash): Begin by using 2 to 3 times a week with very light pressure so you do not over-exfoliate.',
          'Multi-Ingredient Brightening Cleansers (such as Glutathione or Vitamin C Facewash): Start once daily and ensure you wear broad-spectrum sun protection during the day.',
        ],
      },
    ],
    safetyNote:
      'Remember: Natural and botanical ingredients are still active substances. Give your skin time and patience when transitioning routines.',
  },
  {
    id: 'why-patch-testing-matters',
    slug: 'why-patch-testing-matters',
    number: '04',
    title: 'Why Patch Testing Matters (even with Natural Skincare)',
    category: 'Skin Safety',
    readTime: '3 min read',
    summary:
      'A common misconception is that natural or handmade ingredients cannot cause sensitivity. Here is how a simple 24-hour patch test protects your skin.',
    coverImage: '/assets/aistudio/file_000000007eec8211a38bfb11306f9119_be0c7396.png',
    keyTakeaways: [
      'Essential oils, citrus extracts, and botanical ingredients can trigger individual sensitivities just like synthetic ingredients.',
      'A patch test takes less than two minutes to set up and saves days of facial irritation.',
      'Test on the inner forearm or just below the ear/jawline for 24 to 48 hours.',
    ],
    sections: [
      {
        heading: 'Natural Does Not Mean Universal for Every Skin Type',
        body: [
          'At Grace N Glow, we deeply value handmade and botanical formulations. At the same time, responsible skincare education means being honest: just as some people are allergic to strawberries or peanuts in food, individual skin can be sensitive to specific plant extracts, citrus oils, or fragrances.',
          'Performing a patch test before applying any new product across your face is the single most reliable habit you can adopt.',
        ],
      },
      {
        heading: 'How to Perform a Proper 24-Hour Patch Test',
        body: [
          'Follow these four simple steps whenever you receive a new skincare product:',
        ],
        bullets: [
          '1. Choose a discreet test spot: Wash and dry a small coin-sized area on the inside of your forearm or along the side of your neck just below the ear.',
          '2. Apply the product: For a moisturizer or lip balm, dab a small amount onto the spot. For a rinse-off face wash, lather a tiny amount on the test spot for 30 seconds and rinse off as directed.',
          '3. Wait and observe for 24 hours: Keep the area free from other products and check at 1 hour, 12 hours, and 24 hours.',
          '4. Evaluate: If there is no redness, itching, bumps, or burning sensation after 24 hours, you can confidently introduce the product into your routine.',
        ],
      },
    ],
    safetyNote:
      'If you notice stinging or redness during a patch test, wash the area immediately with cool water and discontinue use of that product.',
  },
  {
    id: 'apply-skincare-correctly',
    slug: 'how-to-apply-skincare-products-correctly',
    number: '05',
    title: 'How to Apply Skincare Products Correctly',
    category: 'Application Technique',
    readTime: '4 min read',
    summary:
      'From water temperature to applying moisturizer on slightly damp skin, small adjustments in how you apply your products can noticeably improve skin comfort.',
    coverImage: '/assets/aistudio/file_000000004ddc8211bbcce15fe28bdfb1_dc64aeb4.png',
    keyTakeaways: [
      'Wash with lukewarm or cool water—hot water strips natural surface oils.',
      'Apply gels and moisturizers within 60 seconds of patting your skin dry.',
      'Always use clean fingers or a small spatula when dipping into open jars.',
    ],
    sections: [
      {
        heading: 'Gentle Touch Over Friction',
        body: [
          'Many people scrub their skin vigorously thinking it will get cleaner. In truth, your facial skin is delicate. Let the surfactants and botanical ingredients in your cleanser do the work while your fingertips glide gently in upward circular motions for 30 to 45 seconds.',
          'When drying your face, never rub harshly with a rough bath towel. Instead, keep a separate, clean, soft face towel and gently press or pat the water away.',
        ],
      },
      {
        heading: 'The Damp-Skin Moisturizing Secret',
        body: [
          'Timing matters just as much as product choice:',
        ],
        bullets: [
          'Apply on Slightly Damp Skin: Smooth on your Blush Glow Moisturizer or Pure Crystal Soothing Gel while your skin still feels slightly dewy from washing. This helps seal surface hydration in place.',
          'Order of Texture (Thinnest to Thickest): If using multiple products, apply watery or clear gels first, richer creams second, and lip balms or thick salves last.',
          'Hygienic Jar Care: Before scooping moisturizer or lip balm from a jar, always wash and dry your hands thoroughly so water and bacteria do not enter the container.',
        ],
      },
    ],
    safetyNote:
      'Consistent, gentle application protects your skin barrier and keeps handmade products fresh throughout their shelf life.',
  },
  {
    id: 'common-skincare-mistakes',
    slug: 'common-skincare-mistakes-to-avoid',
    number: '06',
    title: 'Common Skincare Mistakes to Avoid',
    category: 'Healthy Habits',
    readTime: '4 min read',
    summary:
      'Even great products can fall short if paired with habits that stress your skin. Learn how to avoid over-cleansing, product hopping, and storage mistakes.',
    coverImage: '/assets/aistudio/Gemini_Generated_Image_nagn3xnagn3xnagn_204eebe0.png',
    keyTakeaways: [
      'Washing your face more than twice a day can trigger rebound dryness or oiliness.',
      'Switching products every few days prevents you from seeing steady results.',
      'Storing natural skincare in hot, humid bathrooms can shorten product freshness.',
    ],
    sections: [
      {
        heading: 'Mistake 1: Over-Cleansing & Over-Exfoliating',
        body: [
          'In warm Indian climates, it is tempting to wash your face with cleanser four or five times a day whenever you feel sweaty. However, frequent detergent cleansing strips away the protective lipid barrier, which can actually prompt your skin to feel tighter and oilier.',
          'Stick to cleansing once in the morning and once in the evening. If you need to freshen up mid-day, a simple splash of cool water is often enough.',
        ],
      },
      {
        heading: 'Mistake 2: Neglecting Storage & Hygiene for Handmade Products',
        body: [
          'Handmade and natural skincare deserves mindful care at home:',
        ],
        bullets: [
          'Keep Water Out of Jars: Never dip wet fingers into moisturizer or lip balm jars, as introduced water can compromise product stability.',
          'Avoid Direct Sunlight & Heat: Do not leave face wash bottles or balm tins on sunny window ledges. Store them in a cool, dry bedroom drawer or cabinet.',
          'Don’t Forget Your Lips & Neck: Your neck and lips experience the same sun and dry air as your face—extend your gentle cleansing and moisturizing down to your neck, and keep lip care handy.',
        ],
      },
    ],
    safetyNote:
      'Have a question about how to store or use a specific Grace N Glow product? Message us anytime on WhatsApp for personal assistance.',
  },
];

export const VERIFIED_BRAND_PILLARS = [
  {
    number: '01',
    title: 'Handmade Small-Batch Care',
    description:
      'Our products are thoughtfully prepared in small batches with attention to texture, sensory comfort, and everyday usability.',
  },
  {
    number: '02',
    title: 'Clear Product & Label Information',
    description:
      'We present genuine product photographs and share label-listed ingredients, usage steps, and precautions before you place an order.',
  },
  {
    number: '03',
    title: 'Education Over Aggressive Hype',
    description:
      'Rather than making unrealistic overnight promises, we provide practical guides on patch testing, skin types, and gentle daily routines.',
  },
  {
    number: '04',
    title: 'Direct WhatsApp Assistance',
    description:
      'Every customer can ask questions directly on WhatsApp—whether confirming current batch pricing, ingredient lists, or suitability for your routine.',
  },
];

export const ORDER_STEPS = [
  {
    step: '01',
    title: 'Explore the Catalogue & Guides',
    description:
      'Browse our face washes, moisturizers, hydrating gels, and lip care. Read the usage directions, label highlights, and skincare guides.',
  },
  {
    step: '02',
    title: 'Select a Product & Ask Questions',
    description:
      'Click "Ask on WhatsApp" on any product card or detail page. You can enquire about current pricing, available sizes, and full batch ingredients.',
  },
  {
    step: '03',
    title: 'Confirm Your Order on WhatsApp',
    description:
      'Chat directly with Grace N Glow on WhatsApp (+91 73857 17253) to confirm availability, delivery options to your PIN code, and simple payment steps.',
  },
];
