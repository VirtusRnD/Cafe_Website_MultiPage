import React, { useEffect, useRef, useState } from "react";
import { useConfig } from "../hooks/useConfig";

const OurStory = () => {
  const { currentConfig } = useConfig();
  const { ourStory } = currentConfig;

  // 👑 SCROLL ANİMASYONU İÇİN OBSERVER STATE'LERİ
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Ekrana girdiği an isVisible true olur ve bir daha false'a dönmez (tek seferlik animasyon)
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }, // Section'ın %20'si göründüğünde tetikle
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="our-story"
      ref={sectionRef} // Observer'ın takip edeceği referans
      className="w-full py-24 md:py-32 flex flex-col items-center justify-center bg-cafe-oat px-6 overflow-hidden"
    >
      {/* 👑 ÜST BAŞLIK ANİMASYONU */}
      <div
        className={`flex items-center gap-4 mb-10 transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <span className="h-px w-8 md:w-12 bg-cafe-espresso opacity-40"></span>
        <span className="text-xs md:text-sm tracking-[0.25em] uppercase font-sans text-cafe-espresso/80">
          {ourStory?.subtitle}
        </span>
        <span className="h-px w-8 md:w-12 bg-cafe-espresso opacity-40"></span>
      </div>

      {/* 👑 ANA BAŞLIK ANİMASYONU (Gecikmeli) */}
      <h2
        className={`flex flex-col items-center justify-center leading-none mb-12 transition-all duration-1000 delay-200 ease-out transform ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-16 scale-95"
        }`}
      >
        <span className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] tracking-wide uppercase text-transparent [-webkit-text-stroke:1.5px_var(--color-cafe-cinnamon)] pb-2">
          {ourStory?.titleOutline}
        </span>
        <span className="font-serif italic text-3xl md:text-5xl lg:text-[4rem] text-cafe-espresso md:-mt-3.75 -mt-2.5">
          {ourStory?.titleFilled}
        </span>
      </h2>

      {/* 👑 PARAGRAFLAR ANİMASYONU (Gecikmeli) */}
      <div
        className={`flex flex-col gap-6 items-center text-cafe-espresso/80 max-w-2xl mx-auto text-center transition-all duration-1000 delay-500 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {ourStory?.paragraphs?.map((paragraph, index) => (
          <p
            key={index}
            className="font-sans font-light text-base md:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    </section>
  );
};

export default OurStory;
