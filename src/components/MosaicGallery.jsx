import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { config } from "../config.js";

const MosaicGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, []);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const showPrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length],
  );

  const showNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length],
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      const key = e.key.toLowerCase();
      if (e.key === "ArrowLeft" || key === "a") showPrev();
      else if (e.key === "ArrowRight" || key === "d") showNext();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showPrev, showNext, closeLightbox]);

  const getAutoPattern = (index, total) => {
    const { defaultPatterns, remainderOverrides } = config.galleryLayout;
    const patternLength = defaultPatterns.length;

    let currentPattern = defaultPatterns[index % patternLength];
    const remaining = total % patternLength;
    const indexFromEnd = total - index;

    if (
      remainderOverrides[remaining] &&
      remainderOverrides[remaining][indexFromEnd]
    ) {
      return remainderOverrides[remaining][indexFromEnd];
    }

    return currentPattern;
  };

  const getEntranceStyle = (index) => {
    if (isVisible) return "opacity-100 translate-y-0 scale-100";
    const animations = config.galleryLayout.entranceAnimations;
    return animations[index % animations.length];
  };

  const processedImages = useMemo(() => {
    return images.map((img, index) => ({
      ...img,
      finalSpanClasses: img.spanClasses || getAutoPattern(index, images.length),
      entranceAnimation: getEntranceStyle(index),
      delay: `${index * 80}ms`,
    }));
  }, [images, isVisible]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pb-24">
        <div
          ref={galleryRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[250px] grid-flow-dense"
        >
          {processedImages.map((img, index) => (
            <div
              key={index}
              // 👑 rounded-2xl eklenerek kenarlar yumuşatıldı
              className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-1000 ease-out ${img.finalSpanClasses} ${img.entranceAnimation}`}
              style={{ transitionDelay: img.delay }}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={img.src}
                alt={img.alt || `Gallery Image ${index + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-cafe-espresso/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 transition-opacity duration-300 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors z-[260] p-2"
              onClick={closeLightbox}
            >
              <AiOutlineClose size={40} />
            </button>

            <div className="relative w-full max-w-6xl px-4 md:px-12 flex items-center justify-between h-full">
              <button
                className="text-white/50 hover:text-white hover:scale-110 transition-all z-[260] p-2 md:p-4 flex-shrink-0"
                onClick={showPrev}
              >
                <AiOutlineLeft size={50} />
              </button>

              <div className="flex-1 flex justify-center items-center h-full px-4 md:px-8">
                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt || "Selected"}
                  // 👑 rounded-lg eklenerek tam ekrandaki görselin de köşeleri hafifçe yumuşatıldı
                  className="max-w-full md:max-w-4xl max-h-[70vh] md:max-h-[85vh] object-contain drop-shadow-2xl rounded-lg select-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <button
                className="text-white/50 hover:text-white hover:scale-110 transition-all z-[260] p-2 md:p-4 flex-shrink-0"
                onClick={showNext}
              >
                <AiOutlineRight size={50} />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default React.memo(MosaicGallery);
