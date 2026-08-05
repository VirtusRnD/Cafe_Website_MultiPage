import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Menu from "../components/Menu";
import { useConfig } from "../hooks/useConfig";
import { config } from "../config";

const MenuPage = () => {
  const { currentConfig } = useConfig();
  const { menuHero } = currentConfig;

  useEffect(() => {
    // Sayfa açıldığında en üste kaydırır
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-cafe-oat min-h-screen flex flex-col relative">
      {/* 1. BÖLÜM: HERO */}
      <Hero
        titleMain={menuHero?.titleMain}
        titleItalic={menuHero?.titleItalic}
        description={menuHero?.description}
        bgImage={config.heroes.menu}
        alignRight={false}
      />

      {/* 👑 2. BÖLÜM: DİNAMİK YÜKSEKLİK ALANI (Menü + Akan Sıvı) */}
      <div className="relative w-full flex-grow overflow-hidden bg-cafe-oat">
        {/* ARKA PLAN: Merkezden Akan Kahve Sıvısı */}
        <div className="absolute inset-0 z-0 pointer-events-none w-full">
          {/* 👑 DEĞİŞİKLİK: Desen yerine CustomerReviews'daki coffee-stream div'i eklendi */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 md:w-[50px] bg-cafe-latte coffee-stream z-0" />

          {/* Akan sıvının Hero'dan aniden çıkmasını ve altta aniden kesilmesini önleyen gradient maskeler */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cafe-oat to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cafe-oat to-transparent z-10"></div>
        </div>

        {/* ÖN PLAN: Menü Bileşeni */}
        <div className="relative z-20 pt-16 pb-24 mt-50 -mb-30 md:-mb-20">
          <Menu />
        </div>
      </div>
    </main>
  );
};

export default MenuPage;
