import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logoImage from "../assets/Logo_Dong_Nai.svg.webp";
import { useLanguage } from "../context/LanguageContext";

function SiteHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const english = language === "en";

  const isActive = path => location.pathname === path;
  const goTo = path => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="site-header">
      <button className="site-brand" onClick={() => navigate("/")}>
        <img src={logoImage} alt="Đồng Nai Check" />
        Đồng Nai Check
      </button>

      <nav className={isMenuOpen ? "site-nav open" : "site-nav"} aria-label="Điều hướng chính">
        <button className={isActive("/") ? "active" : ""} aria-current={isActive("/") ? "page" : undefined} onClick={() => goTo("/")}>{english ? "Home" : "Trang chủ"}</button>
        <button className={isActive("/dong-nai") ? "active" : ""} aria-current={isActive("/dong-nai") ? "page" : undefined} onClick={() => goTo("/dong-nai")}>{english ? "About Dong Nai" : "Về Đồng Nai"}</button>
        <button className={isActive("/khu-vuc") ? "active" : ""} aria-current={isActive("/khu-vuc") ? "page" : undefined} onClick={() => goTo("/khu-vuc")}>{english ? "Destinations" : "Điểm đến nổi bật"}</button>
      </nav>

      <button className="site-menu-toggle" type="button" aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"} aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen(open => !open)}>
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <button className="language-toggle" type="button" onClick={toggleLanguage} aria-label={english ? "Switch to Vietnamese" : "Switch to English"}>
        {english ? "VI" : "EN"}
      </button>

    </header>
  );
}

export default SiteHeader;
