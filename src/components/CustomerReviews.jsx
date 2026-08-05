import React, { useEffect, useRef, useState } from "react";
import { useConfig } from "../hooks/useConfig";

const CustomerReviews = () => {
  const { currentConfig } = useConfig();
  const { reviews } = currentConfig;

  // 👑 SCROLL ANİMASYONU İÇİN STATE VE REFERANS
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Ekrana girdiği an isVisible true olur ve bir daha false'a dönmez
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }, // Section'ın %15'i göründüğünde tetikle
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const leftTiltClasses = [
    "-rotate-3 -translate-y-4",
    "rotate-2 translate-x-4 translate-y-6",
  ];
  const rightTiltClasses = [
    "rotate-3 translate-y-8",
    "-rotate-2 -translate-x-6",
  ];

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center z-30 -mt-12 md:-mt-24 overflow-hidden"
    >
      <div
        className={`relative w-full z-20 transition-all duration-1000 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        <img
          src="images/coffe-machine-illustration.png"
          alt="Coffee Machine Transition"
          className="w-full h-auto relative z-20 drop-shadow-2xl"
        />
      </div>

      <div className="relative w-full bg-cafe-oat flex flex-col items-center -mt-12 md:-mt-24 z-10 pt-32 pb-32">
        <div
          className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 md:w-[50px] bg-cafe-latte coffee-stream z-0 transition-all ${
            !isVisible ? "[animation-play-state:paused]" : ""
          }`}
        />

        {/* 👑 BAŞLIK ANİMASYONU */}
        <div
          className={`relative z-10 flex flex-col items-center text-center mb-24 px-6 transition-all duration-1000 delay-200 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-8 bg-cafe-cinnamon"></span>
            <span className="text-xs tracking-[0.2em] pl-[0.2em] uppercase font-sans text-cafe-cinnamon">
              {reviews?.overline}
            </span>
            <span className="h-px w-8 bg-cafe-cinnamon"></span>
          </div>
          <h2 className="font-serif italic font-light text-4xl md:text-5xl text-cafe-espresso leading-tight">
            {reviews?.title}
          </h2>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-x-10 gap-y-16 md:gap-y-32 mt-8">
          {/* SOL SÜTUN (KARTLAR) */}
          <div className="flex flex-col items-center md:items-end gap-16 md:gap-32">
            {reviews?.testimonials?.slice(0, 2).map((item, index) => (
              <div
                key={item.id}
                className={`group relative w-full max-w-[340px] h-[280px] perspective-[1000px] cursor-pointer transition-all duration-700 ease-out transform ${leftTiltClasses[index]} ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: `${300 + index * 200}ms` }}
              >
                <div className="relative w-full h-full duration-700 transform-3d group-hover:transform-[rotateY(180deg)] shadow-xl rounded-3xl">
                  <div className="absolute inset-0 w-full h-full bg-cafe-oat rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden border border-cafe-cinnamon/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-[3px] border-white shadow-sm"
                    />
                    <h4 className="font-sans font-bold text-xl text-cafe-espresso uppercase tracking-tight mb-2">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <img
                          key={starIndex}
                          src={
                            starIndex <= item.rating
                              ? "images/coffee-bean-filled.png"
                              : "images/coffee-bean-empty.png"
                          }
                          alt={
                            starIndex <= item.rating
                              ? "Filled Bean"
                              : "Empty Bean"
                          }
                          className="w-7 md:w-9 h-7 md:h-9 object-contain"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 w-full h-full bg-cafe-cinnamon rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden transform-[rotateY(180deg)] text-cafe-oat shadow-inner">
                    <span className="text-6xl font-serif leading-none mb-2 opacity-50">
                      “
                    </span>
                    <p className="font-serif italic text-lg leading-relaxed px-2">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block w-10 md:w-[120px]"></div>

          {/* SAĞ SÜTUN (KARTLAR) */}
          <div className="flex flex-col items-center md:items-start gap-16 md:gap-32">
            {reviews?.testimonials?.slice(2, 4).map((item, index) => (
              <div
                key={item.id}
                className={`group relative w-full max-w-[340px] h-[280px] perspective-[1000px] cursor-pointer transition-all duration-700 ease-out transform ${rightTiltClasses[index]} ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <div className="relative w-full h-full duration-700 transform-3d group-hover:transform-[rotateY(180deg)] shadow-xl rounded-3xl">
                  <div className="absolute inset-0 w-full h-full bg-cafe-oat rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden border border-cafe-cinnamon/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-[3px] border-white shadow-sm"
                    />
                    <h4 className="font-sans font-bold text-xl text-cafe-espresso uppercase tracking-tight mb-2">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <img
                          key={starIndex}
                          src={
                            starIndex <= item.rating
                              ? "images/coffee-bean-filled.png"
                              : "images/coffee-bean-empty.png"
                          }
                          alt={
                            starIndex <= item.rating
                              ? "Filled Bean"
                              : "Empty Bean"
                          }
                          className="w-7 md:w-9 h-7 md:h-9 object-contain"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 w-full h-full bg-cafe-cinnamon rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden transform-[rotateY(180deg)] text-cafe-oat shadow-inner">
                    <span className="text-6xl font-serif leading-none mb-2 opacity-50">
                      “
                    </span>
                    <p className="font-serif italic text-lg leading-relaxed px-2">
                      {item.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
