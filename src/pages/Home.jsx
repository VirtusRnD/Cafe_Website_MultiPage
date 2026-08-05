import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import SignatureMenu from "../components/SignatureMenu";
import OffsetCard from "../components/OffsetCard";
import Menu from "../components/Menu";
import { useConfig } from "../hooks/useConfig";
import { config } from "../config";

const Home = () => {
  const { currentConfig } = useConfig();
  const { hero } = currentConfig;
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main>
      <Hero
        titleMain={hero?.titleMain}
        titleItalic={hero?.titleItalic}
        description={hero?.description}
        ctaText={hero?.ctaText}
        ctaLink="/menu"
        bgImage={config.heroes.home}
        alignRight={false}
      />

      {/* 1. KART: Our Story Sayfasına Yönlendirme */}
      <OffsetCard
        imageLeft={false}
        imageSrc={config.homeCards.brew}
        imageAlt={t("home.cards.brew.alt")}
        overline={t("home.cards.brew.overline")}
        titleBold={t("home.cards.brew.titleBold")}
        titleLight={t("home.cards.brew.titleLight")}
        description={t("home.cards.brew.desc")}
        hasButton={true}
        buttonText={t("home.cards.brew.button")}
        onButtonClick={() => {
          navigate("/our-story");
        }}
        bgColor="bg-cafe-latte/30"
        accentColor="cinnamon"
      />

      {/* 2. KART: "Doğal & Yerel" Konsepti (Matcha & Oat) */}
      <OffsetCard
        imageLeft={true}
        imageSrc={config.homeCards.artisans}
        imageAlt={t("home.cards.artisans.alt")}
        overline={t("home.cards.artisans.overline")}
        titleBold={t("home.cards.artisans.titleBold")}
        titleLight={t("home.cards.artisans.titleLight")}
        description={t("home.cards.artisans.desc")}
        hasButton={false}
        bgColor="bg-cafe-matcha/15"
        accentColor="matcha"
      />

      {/* 3. KART: Reviews Sayfasına Yönlendirme */}
      <OffsetCard
        imageLeft={false}
        imageSrc={config.homeCards.study}
        imageAlt={t("home.cards.study.alt")}
        overline={t("home.cards.study.overline")}
        titleBold={t("home.cards.study.titleBold")}
        titleLight={t("home.cards.study.titleLight")}
        description={t("home.cards.study.desc")}
        hasButton={true}
        buttonText={t("home.cards.study.button")}
        onButtonClick={() => {
          navigate("/reviews");
        }}
        bgColor="bg-cafe-espresso/20"
        accentColor="espresso"
      />
    </main>
  );
};

export default Home;
