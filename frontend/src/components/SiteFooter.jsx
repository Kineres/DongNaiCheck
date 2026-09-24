import { ArrowUpRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function SiteFooter() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const english = language === "en";

  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div>
          <div className="site-footer-brand"><span>ĐN</span> Đồng Nai Check</div>
          <p>{english ? "Explore the places, flavors and stories of Dong Nai." : "Khám phá những nơi chốn, hương vị và câu chuyện của Đồng Nai."}</p>
        </div>
        <div className="site-footer-links">
          <button onClick={() => navigate("/")}>{english ? "Home" : "Trang chủ"}</button>
          <button onClick={() => navigate("/dong-nai")}>{english ? "About Dong Nai" : "Về Đồng Nai"}</button>
          <button onClick={() => navigate("/khu-vuc")}>{english ? "Destinations" : "Điểm đến"}</button>
        </div>
        <div className="site-footer-location"><MapPin size={16} /> {english ? "Dong Nai, Vietnam" : "Đồng Nai, Việt Nam"}</div>
      </div>
      <div className="site-footer-bottom">
        <span>© 2026 Dong Nai Check</span>
        <a href="https://www.google.com/maps/search/Dong+Nai+Vietnam" target="_blank" rel="noreferrer">Google Maps <ArrowUpRight size={14} /></a>
      </div>
    </footer>
  );
}

export default SiteFooter;
