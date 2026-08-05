export const config = {
  // 📞 Dil gerektirmeyen yapısal veriler
  contact: {
    phone: "+90 555 123 4567",
    email: "info@lumiere.com",
    orders: "orders@lumiere.com",
    socials: [
      { platform: "Instagram", url: "#" },
      { platform: "WhatsApp", url: "https://wa.me/905551234567" },
    ],
  },
  // 🗺️ Harita Konumu
  map: {
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12031.586343679504!2d28.9907559!3d41.0712531!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6f83672f8bd%3A0x12c9d57e5a4cc0b8!2zTWVjaWRpeWVrw7Z5IE1haGFsbGVzaSwgMzQzODEgxZ5pxZ9saS_EsHN0YW5idWw!5e0!3m2!1str!2str!4v1785767043893!5m2!1str!2str",
    link: "https://maps.google.com/?q=Istanbul",
  },
  heroes: {
    home: "images/hero.webp",
    ourStory: "images/our-story-hero.webp",
    reviews: "images/reviews-hero.webp",
    menu: "images/menu-hero.webp",
  },
  homeCards: {
    brew: "images/coffee-brew.webp",
    artisans: "images/local-artisans.webp",
    study: "images/study.webp",
  },
  signatureMenu: {
    images: [
      "images/signature-1.webp",
      "images/signature-2.webp",
      "images/signature-3.webp",
      "images/signature-4.webp",
    ],
  },
  galleryLayout: {
    defaultPatterns: [
      "col-span-2 row-span-2",
      "col-span-1 row-span-1",
      "col-span-1 row-span-2",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
    ],
    remainderOverrides: {
      1: { 1: "col-span-2 md:col-span-4 row-span-2" },
      2: { 1: "col-span-1 md:col-span-2 row-span-2" },
      3: { 2: "col-span-1 row-span-2" },
      5: { 1: "col-span-2 md:col-span-4 row-span-1" },
      6: { 1: "col-span-2 row-span-1" },
    },
    entranceAnimations: [
      "opacity-0 translate-y-12",
      "opacity-0 scale-90 translate-y-6",
      "opacity-0 -translate-y-6 scale-95",
      "opacity-0 translate-y-20",
    ],
  },

  reviewsGallery: [
    { src: "images/signature-1.webp", alt: "Lumière Moment 1" },
    { src: "images/signature-2.webp", alt: "Lumière Moment 2" },
    { src: "images/signature-3.webp", alt: "Lumière Moment 3" },
    { src: "images/signature-4.webp", alt: "Lumière Moment 4" },
    // Algoritmanın kalan kurallarını görmek için ek görseller:
    { src: "images/signature-1.webp", alt: "Lumière Moment 5" },
  ],
};
