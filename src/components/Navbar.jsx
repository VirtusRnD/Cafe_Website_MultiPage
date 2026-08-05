import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import LanguageSwitcher from "./LanguageSwitcher";
import { useConfig } from "../hooks/useConfig";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentConfig } = useConfig();
  const { common } = currentConfig;
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = useCallback(() => {
    setNav((prev) => !prev);
  }, []);

  const handleNavigation = (sectionId) => {
    if (nav) setNav(false);

    if (sectionId === "our-story") {
      navigate("/our-story");
    } else if (sectionId === "reviews") {
      navigate("/reviews");
    } else if (sectionId === "menu") {
      navigate("/menu");
    } else if (sectionId === "hero") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (location.pathname === "/") setActiveSection("hero");
    else if (location.pathname === "/our-story") setActiveSection("our-story");
    else if (location.pathname === "/reviews") setActiveSection("reviews");
    else if (location.pathname === "/menu") setActiveSection("menu");
  }, [location.pathname]);

  useEffect(() => {
    setScrolled(window.scrollY > 20);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { id: "hero", label: common?.home },
      { id: "our-story", label: common?.ourStory },
      { id: "reviews", label: common?.reviews },
      { id: "menu", label: common?.menu },
    ],
    [common],
  );

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-[72px] z-[100] transition-all duration-500
        ${
          scrolled
            ? "bg-cafe-oat/90 border-b border-cafe-cinnamon/20 shadow-sm backdrop-blur-md text-cafe-espresso"
            : "bg-transparent border-b border-transparent text-white drop-shadow-md"
        }`}
      >
        <div className="absolute lg:right-8 lg:left-auto left-6 top-1/2 -translate-y-1/2 z-[160] flex items-center">
          <LanguageSwitcher />
        </div>

        <div className="relative flex justify-end lg:justify-between items-center h-full pl-4 pr-6 lg:pl-8 lg:pr-24 max-w-[1240px] mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 xl:-translate-x-15 flex flex-col justify-center items-center">
            <button
              onClick={() => handleNavigation("hero")}
              className="cursor-pointer focus:outline-none font-serif font-bold text-2xl tracking-widest ml-10 transition-colors duration-500"
            >
              LUMIÈRE
            </button>
          </div>

          <ul className="hidden lg:flex font-medium mx-auto uppercase tracking-[0.05em] pl-[0.05em] text-sm items-center gap-2">
            {navItems.map((item) => (
              <li key={item.id} className="font-sans p-4">
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`pb-1 transition-colors duration-300 ${
                    activeSection === item.id
                      ? "border-b-2 border-cafe-cinnamon text-cafe-cinnamon font-bold"
                      : "hover:text-cafe-cinnamon hover:cursor-pointer"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex lg:hidden justify-end items-center z-[150]">
            <div onClick={handleNav} className="cursor-pointer p-1">
              {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>
        </div>
      </div>

      {/* Menü Açıkken Arkaplanı Karartan Kısım */}
      {/* 👑 ÇÖZÜM EKSTRASI: 'pointer-events-none' ve opacity ile animasyonu daha pürüzsüz hale getirdik */}
      <div
        onClick={handleNav}
        className={`fixed inset-0 w-full h-full bg-black/40 z-[140] transition-opacity duration-300 backdrop-blur-sm ${
          nav ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 h-screen w-[80%] max-w-[350px] p-8 bg-cafe-oat text-cafe-espresso flex flex-col z-[150] shadow-2xl transition-all duration-500 ease-in-out ${
          nav ? "left-0 border-r border-cafe-cinnamon/20" : "-left-full"
        }`}
      >
        <div className="mb-12 select-none">
          <button
            onClick={() => handleNavigation("hero")}
            className="font-serif font-bold text-2xl tracking-widest text-cafe-espresso"
          >
            LUMIÈRE
          </button>
        </div>

        <ul className="text-cafe-espresso uppercase tracking-widest text-sm font-medium space-y-4 flex-grow">
          {navItems.map((item) => (
            <li key={item.id} className="border-b border-cafe-espresso/10 pb-4">
              <button
                onClick={() => handleNavigation(item.id)}
                className={`block w-full text-left cursor-pointer transition-colors ${
                  activeSection === item.id
                    ? "text-cafe-cinnamon font-bold"
                    : "hover:text-cafe-cinnamon"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
