import React, { useState, useEffect } from "react";
// 👑 YENİ: Yönlendirme işlemi için Link import edildi
import { Link } from "react-router-dom";

const Hero = ({
  titleMain,
  titleItalic,
  description,
  ctaText,
  ctaLink = "#",
  bgImage,
  alignRight = false,
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const gradientClass = alignRight
    ? "bg-gradient-to-l from-cafe-espresso/95 via-cafe-espresso/60 to-transparent"
    : "bg-gradient-to-r from-cafe-espresso/95 via-cafe-espresso/60 to-transparent";

  const contentAlignmentClass = alignRight
    ? "ml-auto items-end text-right"
    : "mr-auto items-start text-left";

  return (
    <section className="relative w-full h-[85vh] min-h-150 flex items-center overflow-hidden">
      {/* KATMAN 1: Arka Plan Görseli */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-75 ease-out will-change-transform"
        style={{
          backgroundImage: `url('${bgImage}')`,
          transform: `translateY(${offsetY * 0.25}px)`,
        }}
      />

      {/* KATMAN 2: Karartma (Dinamik Yön) */}
      <div className={`absolute inset-0 ${gradientClass}`} />

      {/* KATMAN 3: İçerik */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center">
        <div className={`max-w-2xl flex flex-col ${contentAlignmentClass}`}>
          {/* BAŞLIK */}
          <h1
            className={`font-serif text-cafe-oat flex flex-col gap-1 transition-all duration-1000 ease-out transform ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <span className="text-5xl md:text-6xl lg:text-7xl tracking-widest uppercase font-light break-words leading-tight">
              {titleMain}
            </span>
            <span className="text-4xl md:text-5xl lg:text-6xl italic break-words leading-tight md:-mt-2">
              {titleItalic}
            </span>
          </h1>

          {/* AYIRICI ÇİZGİ */}
          <div
            className={`flex items-center gap-3 my-6 transition-all duration-1000 delay-300 ease-out transform ${
              isLoaded ? "opacity-60 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="h-px w-10 bg-cafe-oat"></div>
            <div className="w-1.5 h-1.5 rotate-45 bg-cafe-oat"></div>
            <div className="h-px w-10 bg-cafe-oat"></div>
          </div>

          {/* AÇIKLAMA */}
          {description && (
            <p
              className={`font-sans text-cafe-oat/90 text-sm md:text-base leading-relaxed mb-10 max-w-md font-light transition-all duration-1000 delay-500 ease-out transform ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {description}
            </p>
          )}

          {/* BUTON */}
          {ctaText && (
            <div
              className={`transition-all duration-1000 delay-700 ease-out transform ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* 👑 DÜZELTME: Standart <a> etiketi, React'in dinamik <Link> bileşeniyle değiştirildi */}
              <Link
                to={ctaLink}
                className="inline-block bg-cafe-cinnamon hover:bg-cafe-caramel text-cafe-oat hover:text-cafe-espresso px-8 py-4 font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300 shadow-md"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
