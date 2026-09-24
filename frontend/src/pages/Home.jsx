import { useNavigate } from "react-router-dom";
import {
  Utensils,
  Gamepad2,
  Coffee,
  IceCreamBowl,
  Landmark,
  MapPin,
  ShoppingBasket,
  Clock,
  Star
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <SiteHeader />

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            📍 Khám phá Đồng Nai
          </span>

          <h1>
            Hôm nay
            <br />
            <span>đi đâu?</span>
          </h1>

          <p>
            Tìm những địa điểm ăn uống, vui chơi và
            giải trí nổi bật gần bạn.
          </p>

          <button
            className="location-button"
            onClick={() => navigate("/places")}
          >
            <MapPin size={20} />
            Khám phá quanh tôi
          </button>

          <button className="quick-card dessert" onClick={() => navigate("/places?category=drinks")}>
            <div className="quick-icon"><IceCreamBowl /></div>
            <h3>Trà sữa & tráng miệng</h3>
            <p>Chè, kem và món ngọt gần bạn</p>
          </button>

          <button className="quick-card shopping" onClick={() => navigate("/places?category=shopping")}>
            <div className="quick-icon"><ShoppingBasket /></div>
            <h3>Mua sắm thiết yếu</h3>
            <p>Cửa hàng tiện lợi và siêu thị</p>
          </button>

          <button className="quick-card admin" onClick={() => navigate("/places?category=administrative")}>
            <div className="quick-icon"><Landmark /></div>
            <h3>Cơ sở hành chính</h3>
            <p>Tìm các cơ quan xung quanh</p>
          </button>

        </div>

      </section>

      <section className="quick-section">

        <div className="section-title">
          <span>✨</span>
          Bạn muốn làm gì hôm nay?
        </div>

        <div className="quick-grid">

          <button
            className="quick-card food"
            onClick={() =>
              navigate("/places?category=restaurant")
            }
          >
            <div className="quick-icon">
              <Utensils />
            </div>

            <h3>Hôm nay ăn gì?</h3>
            <p>Khám phá quán ăn gần bạn</p>
          </button>

          <button
            className="quick-card fun"
            onClick={() =>
              navigate("/places?category=entertainment")
            }
          >
            <div className="quick-icon">
              <Gamepad2 />
            </div>

            <h3>Hôm nay làm gì?</h3>
            <p>Tìm nơi vui chơi & giải trí</p>
          </button>

          <button
            className="quick-card coffee"
            onClick={() =>
              navigate("/places?category=drinks")
            }
          >
            <div className="quick-icon">
              <Coffee />
            </div>

            <h3>Đi cafe</h3>
            <p>Quán cafe được yêu thích</p>
          </button>

        </div>
      </section>

      <section className="feature-section">

        <div className="feature">
          <MapPin />

          <div>
            <h3>Gần bạn</h3>
            <p>Ưu tiên địa điểm ở khoảng cách gần.</p>
          </div>
        </div>

        <div className="feature">
          <Star />

          <div>
            <h3>Đánh giá tốt</h3>
            <p>Lọc theo rating và số lượng đánh giá.</p>
          </div>
        </div>

        <div className="feature">
          <Clock />

          <div>
            <h3>Đúng thời điểm</h3>
            <p>Ưu tiên nơi đang mở cửa.</p>
          </div>
        </div>

      </section>

      <footer>
        <p>
          © 2026 Đồng Nai Check — Khám phá Đồng Nai
        </p>
      </footer>

    </div>
  );
}

export default Home;