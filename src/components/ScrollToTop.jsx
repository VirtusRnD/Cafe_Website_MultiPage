import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// 👑 YENİ: Lenis hook'unu projeye dahil ediyoruz
import { useLenis } from "lenis/react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  // 👑 YENİ: Lenis motoruna erişim sağlıyoruz
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // Lenis devredeyse, sayfayı "anında" (immediate: true) en üste çek
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Lenis'in yüklenemediği olası durumlar için eski güvenilir fallback
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;
