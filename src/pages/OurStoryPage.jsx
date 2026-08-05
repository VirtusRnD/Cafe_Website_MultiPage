import React, { useEffect } from "react";
import Hero from "../components/Hero";
import OurStory from "../components/OurStory";
import SignatureMenu from "../components/SignatureMenu";
import { useConfig } from "../hooks/useConfig";
import { config } from "../config";

const OurStoryPage = () => {
  const { currentConfig } = useConfig();
  // 👑 JSON'dan Hikayemiz sayfasına özel Hero metinlerini çekiyoruz
  const { ourStoryHero } = currentConfig;

  useEffect(() => {
    // Sayfa açıldığında Lenis veya tarayıcının en üste çıkmasını garantiler
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-cafe-oat min-h-screen">
      {/* 1. Bölüm: Hikayemiz Sayfası Özel Hero */}
      <Hero
        titleMain={ourStoryHero?.titleMain}
        titleItalic={ourStoryHero?.titleItalic}
        description={ourStoryHero?.description}
        bgImage={config.heroes.ourStory}
        alignRight={true} // Yazı ve karartma sağa yaslı
        // ctaText verilmediği için buton otomatik gizlenir
      />

      {/* 2. Bölüm: Hikayemiz Metinleri */}
      <OurStory />

      {/* 3. Bölüm: İmza Lezzetler (Carousel) */}
      <SignatureMenu />
    </main>
  );
};

export default OurStoryPage;
