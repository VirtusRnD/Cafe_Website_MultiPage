import React, { useEffect } from "react";
import Hero from "../components/Hero";
import MosaicGallery from "../components/MosaicGallery";
import CustomerReviews from "../components/CustomerReviews";
import { useConfig } from "../hooks/useConfig";
import { config } from "../config";

const ReviewsPage = () => {
  const { currentConfig } = useConfig();
  const { reviewsHero } = currentConfig;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-cafe-oat min-h-screen flex flex-col relative">
      {/* 1. BÖLÜM: HERO */}
      <Hero
        titleMain={reviewsHero?.titleMain}
        titleItalic={reviewsHero?.titleItalic}
        description={reviewsHero?.description}
        bgImage={config.heroes.reviews}
        alignRight={false}
      />

      {/* 👑 2. BÖLÜM: DİNAMİK YÜKSEKLİK ALANI (Galeri + Seamless Pattern) */}
      <div className="relative w-full overflow-hidden bg-cafe-oat">
        {/* ARKA PLAN: Süzülen Seamless Deseni */}
        {/* 👑 DEĞİŞİKLİK BURADA YAPILDI: max-w-6xl ve mx-auto silindi */}
        <div className="absolute inset-0 z-0 pointer-events-none w-full">
          {/* Opaklığı %30'a (yaklaşık %70 azaltılmış) çekildi ve scroll animasyonu verildi */}
          <div
            className="absolute inset-0 bg-repeat animate-bg-scroll opacity-10 mix-blend-multiply"
            style={{
              backgroundImage:
                "url('images/seamless-coffee-beans-pattern.webp')",
              backgroundSize: "500px",
            }}
          />

          {/* Desen yukarıda ve aşağıda keskin bitmesin diye yumuşak gradient maskeler */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cafe-oat to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cafe-oat to-transparent z-10"></div>
        </div>

        {/* ÖN PLAN: Mosaic Gallery */}
        {/* Galeri aşağıya doğru ne kadar genişlerse, dıştaki relative div ve içindeki absolute arka plan da o kadar esner. */}
        <div className="relative z-20 pt-16 pb-12">
          <MosaicGallery images={config.reviewsGallery} />
        </div>
      </div>

      {/* 3. BÖLÜM: MÜŞTERİ YORUMLARI */}
      <div className="relative z-30">
        <CustomerReviews />
      </div>
    </main>
  );
};

export default ReviewsPage;
