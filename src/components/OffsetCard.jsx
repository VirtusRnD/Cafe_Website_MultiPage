import React from "react";

const OffsetCard = ({
  imageLeft = false,
  imageSrc,
  imageAlt = "Card Image",
  overline,
  titleBold,
  titleLight,
  description,
  hasButton = false,
  buttonText,
  onButtonClick,
  bgColor = "bg-cafe-latte/20",
  accentColor = "cinnamon",
}) => {
  const themeStyles = {
    cinnamon: {
      title: "text-cafe-cinnamon",
      button:
        "border-cafe-cinnamon/40 text-cafe-espresso hover:bg-cafe-cinnamon hover:border-cafe-cinnamon hover:text-white",
    },
    caramel: {
      title: "text-cafe-caramel",
      button:
        "border-cafe-caramel/40 text-cafe-espresso hover:bg-cafe-caramel hover:border-cafe-caramel hover:text-white",
    },
    matcha: {
      title: "text-cafe-matcha",
      button:
        "border-cafe-matcha/40 text-cafe-espresso hover:bg-cafe-matcha hover:border-cafe-matcha hover:text-white",
    },
    espresso: {
      title: "text-cafe-espresso",
      button:
        "border-cafe-espresso/40 text-cafe-espresso hover:bg-cafe-espresso hover:border-cafe-espresso hover:text-cafe-oat",
    },
  };

  const currentTheme = themeStyles[accentColor] || themeStyles.cinnamon;

  return (
    <div className="relative w-full max-w-[1300px] mx-auto my-16 md:my-32 px-4 md:px-12 lg:px-16">
      {/* 👑 ARKA PLAN KUTUSU ÇÖZÜMÜ: 
          Mobilde 'left-0 right-0 mx-auto' ile kutu TAM ORTAYA hizalanır. 
          Sağa veya sola kayma (offset) işlemi sadece 'md:' (tablet ve üzeri) ekranlarda devreye girer. */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 mx-auto md:mx-0 w-[92%] md:w-[85%] h-[96%] md:h-[75%] rounded-[2rem] md:rounded-[2.5rem] z-0 ${bgColor} ${
          imageLeft
            ? "md:left-auto md:right-8 lg:right-12"
            : "md:right-auto md:left-8 lg:left-12"
        }`}
      ></div>

      <div
        className={`relative z-10 flex flex-col gap-6 md:gap-12 lg:gap-16 items-center ${
          imageLeft ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* GÖRSEL KISMI */}
        <div className="w-[75%] sm:w-[65%] md:w-5/12 lg:w-4/12 flex-shrink-0 mx-auto md:mx-0 mt-8 md:mt-0">
          <div className="relative w-full h-[280px] sm:h-[350px] md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* YAZI KISMI */}
        <div
          className={`w-full md:w-7/12 lg:w-8/12 flex flex-col justify-center items-center text-center md:items-start md:text-left py-4 px-6 sm:px-10 md:px-0 ${
            imageLeft ? "md:pr-8 lg:pr-16" : "md:pl-8 lg:pl-16"
          }`}
        >
          {overline && (
            <span className="text-[10px] md:text-xs uppercase italic tracking-[0.2em] font-sans font-semibold text-cafe-espresso/70 mb-3 md:mb-4">
              {overline}
            </span>
          )}

          {(titleBold || titleLight) && (
            <h3
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans leading-[1.15] mb-5 md:mb-6 ${currentTheme.title}`}
            >
              {titleBold && (
                <span className="font-bold block">{titleBold}</span>
              )}
              {titleLight && (
                <span className="font-light block mt-1">{titleLight}</span>
              )}
            </h3>
          )}

          {description && (
            <p className="text-cafe-espresso/80 leading-relaxed font-sans text-sm md:text-base mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
              {description}
            </p>
          )}

          {hasButton && buttonText && (
            <div className="w-full flex justify-center md:justify-start mb-4 md:mb-0">
              <button
                onClick={onButtonClick}
                className={`w-full max-w-[240px] md:w-auto md:max-w-none px-4 md:px-8 py-3 md:py-3 min-h-[44px] rounded-full border-2 font-semibold uppercase tracking-wider text-[10px] md:text-sm transition-all duration-300 drop-shadow-md shadow-xl flex items-center justify-center whitespace-normal text-center leading-tight ${currentTheme.button}`}
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OffsetCard;
