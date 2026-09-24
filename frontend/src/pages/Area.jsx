import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Compass, MapPin, Search, X } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import catTienImage from "../assets/vuonquocgia.jpg";
import triAnImage from "../assets/hotrian4.jpg";
import chuaChanImage from "../assets/nui-chua-chan-11-1691854477.jpg";
import buulongimg from "../assets/buulong.jpg";
import vanmieu from "../assets/vanmieu.jpg";
import sontien from "../assets/sontien.jpg";
import langbuoi from "../assets/langbuoi.jpg";
import bocapvang from "../assets/bocapvang.jpg";
import mada from "../assets/mada.jpg";
import bugiamap from "../assets/bugiamap.jpg";
import trangco from "../assets/trangco.jpg";
import baotang from "../assets/baotang.jpg";
import socbombo from "../assets/socbombo.jpg";
import chua from "../assets/hat.jpg";
import nuibara from "../assets/nuibara.jpg";

const destinations = [
  {
    name: "Vườn Quốc gia Cát Tiên",
    type: "Thiên nhiên & khám phá",
    area: "Tân Phú",
    image: catTienImage,
    description: "Khu rừng nhiệt đới rộng lớn bên dòng Đồng Nai, nổi bật với hệ sinh thái đa dạng và những cung đường trekking xanh mát. Đây là nơi lý tưởng để đi bộ trong rừng, quan sát chim và tìm một nhịp sống chậm giữa thiên nhiên.",
    detail: "Nên dành trọn một ngày để khám phá các tuyến rừng và trải nghiệm không khí nguyên sơ của Cát Tiên."
  },
  {
    name: "Hồ Trị An",
    type: "Mặt hồ & cắm trại",
    area: "Vĩnh Cửu",
    image: triAnImage,
    description: "Mặt hồ rộng, phẳng lặng và những hòn đảo xanh tạo nên một khung cảnh thư thái cách xa nhịp đô thị. Hoàng hôn trên hồ đặc biệt đẹp, phù hợp cho chuyến picnic, chèo SUP hoặc cắm trại cuối tuần.",
    detail: "Mang theo đồ ăn nhẹ và ở lại đến chiều muộn để ngắm ánh nắng đổi màu trên mặt nước."
  },
  {
    name: "Núi Chứa Chan",
    type: "Núi & trekking",
    area: "Xuân Lộc",
    image: chuaChanImage,
    description: "Núi Chứa Chan là điểm trekking nổi bật của Đồng Nai với những đoạn đường rừng, dốc núi và tầm nhìn mở ra vùng đất phía dưới. Không khí trên cao mát mẻ, thích hợp cho một ngày vận động và săn mây.",
    detail: "Chuẩn bị giày bám tốt, nước uống và bắt đầu hành trình từ sáng sớm để tránh nắng."
  },
  {
    name: "Khu du lịch Bò Cạp Vàng ",
    type: "Cảnh quan & vui chơi",
    area: "Nhơn Trạch",
    image: bocapvang,
    description: "Hai điểm dã ngoại xanh mát với dòng nước tự nhiên, bãi cỏ và không gian nhiều cây. Đây là lựa chọn dễ đi cho một ngày thư giãn, chụp ảnh và vui chơi cùng gia đình hoặc bạn bè.",
    detail: "Nên kiểm tra thời tiết trước chuyến đi và mang theo khăn, đồ thay nếu muốn vui chơi gần thác."
  },
  {
    name: "Khu du lịch Bửu Long",
    type: "Cảnh quan & vui chơi",
    area: "Biên Hòa",
    image: buulongimg,
    description: "Quần thể hồ nước, núi đá và những góc cảnh quan đặc trưng ngay gần trung tâm Biên Hòa. Bửu Long phù hợp cho chuyến đi trong ngày với nhiều hoạt động tham quan, chụp ảnh và nghỉ ngơi.",
    detail: "Một điểm đến thuận tiện nếu bạn muốn đổi không khí mà không cần đi quá xa thành phố."
  },
  {
    name: "Khu du lịch Sơn Tiên & The Amazing Bay",
    type: "Công viên nước & giải trí",
    area: "Biên Hòa",
    image: sontien,
    description: "Tổ hợp vui chơi quy mô lớn với The Amazing Bay, bãi biển nhân tạo và nhiều trò chơi dưới nước. Không gian sôi động này phù hợp cho nhóm bạn hoặc gia đình muốn có một ngày giải trí trọn vẹn.",
    detail: "Ưu tiên đến sớm để có thêm thời gian trải nghiệm các khu trò chơi và nghỉ ngơi trong ngày."
  },
  {
    name: "Văn miếu Trấn Biên",
    type: "Lịch sử & văn hóa",
    area: "Biên Hòa",
    image: vanmieu,
    description: "Một không gian văn hóa trang nghiêm, gắn với truyền thống hiếu học và lịch sử hình thành vùng đất Đồng Nai. Những hàng cây, hồ nước và kiến trúc cổ tạo nên nơi tham quan yên tĩnh giữa lòng thành phố.",
    detail: "Hãy dành thời gian đi chậm qua khuôn viên để cảm nhận câu chuyện văn hóa lâu đời của vùng đất này."
  },
  {
    name: "Làng bưởi Tân Triều",
    type: "Ẩm thực & làng nghề",
    area: "Vĩnh Cửu",
    image: langbuoi,
    description: "Vùng đất ven sông nổi tiếng với những vườn bưởi xanh tốt và các món đặc sản từ bưởi. Ghé Tân Triều là dịp để thưởng thức hương vị địa phương, tìm hiểu đời sống miệt vườn và mua quà mang về.",
    detail: "Mùa bưởi là thời điểm đẹp để ghé thăm, nhưng làng vẫn có nét duyên riêng quanh năm."
  },
  {
    name: "Rừng Mã Đà",
    type: "Thiên nhiên & khám phá",
    area: "Trị An",
    image: mada,
    description: "Khu rừng nhiệt đới rộng lớn bên dòng Đồng Nai, nổi bật với hệ sinh thái đa dạng và những cung đường trekking xanh mát. Đây là nơi lý tưởng để đi bộ trong rừng, quan sát chim và tìm một nhịp sống chậm giữa thiên nhiên.",
    detail: "Nên dành trọn một ngày để khám phá các tuyến rừng và trải nghiệm không khí nguyên sơ của Cát Tiên."
  },
  {
    name: "Vườn Quốc gia Bù Gia Mập",
    type: "Rừng & sinh thái",
    area: "Bù Gia Mập",
    image: bugiamap,
    description: "Vùng rừng nguyên sinh giàu đa dạng sinh học với những cung đường xanh, suối trong và hệ động thực vật đặc trưng của miền Đông Nam Bộ. Đây là điểm đến dành cho người yêu thiên nhiên và những chuyến khám phá có chiều sâu.",
    detail: "Nên đăng ký hướng dẫn địa phương và chuẩn bị kỹ trước khi đi vào các tuyến rừng."
  },
  {
    name: "Núi Bà Rá",
    type: "Núi & trekking",
    area: "Phước Long",
    image: nuibara,
    description: "Núi Bà Rá là một trong những ngọn núi nổi bật của vùng Đông Nam Bộ, mang đến không khí mát lành và tầm nhìn rộng xuống hồ Thác Mơ. Cung đường lên núi phù hợp cho một ngày vận động, ngắm cảnh và tìm sự yên tĩnh.",
    detail: "Hãy bắt đầu hành trình từ sớm, mang giày bám tốt và dành thời gian ngắm cảnh từ trên cao."
  },
  {
    name: "Trảng cỏ Bù Lạch",
    type: "Đồng cỏ & dã ngoại",
    area: "Bù Đốp / Bù Đăng",
    image: trangco,
    description: "Không gian đồng cỏ rộng mở bên hồ nước, mang vẻ đẹp bình dị và khoáng đạt của vùng cao nguyên phía Đông Nam Bộ. Bù Lạch thích hợp cho những buổi dã ngoại, cắm trại và chụp ảnh giữa thiên nhiên.",
    detail: "Nên đi vào mùa cỏ xanh và chuẩn bị đầy đủ nước uống, đồ ăn cùng vật dụng dã ngoại."
  },
  {
    name: "Chùa Phật Quốc Vạn Thành",
    type: "Văn hóa & tâm linh",
    area: "Bình Long",
    image: chua,
    description: "Ngôi chùa có không gian thanh tịnh, kiến trúc trang nghiêm và cảnh quan hồ nước rộng phía trước. Đây là điểm dừng chân phù hợp để tham quan, tìm hiểu văn hóa tâm linh và dành một khoảng lặng cho bản thân.",
    detail: "Nên giữ trang phục lịch sự và đi nhẹ, nói khẽ khi tham quan khuôn viên chùa."
  },
  {
    name: "Sóc Bom Bo",
    type: "Văn hóa & lịch sử",
    area: "Bù Đăng",
    image: socbombo,
    description: "Khu bảo tồn văn hóa gắn với ký ức của đồng bào S'tiêng và câu chuyện lịch sử của vùng đất Bù Đăng. Những âm thanh cồng chiêng, nhịp chày giã gạo và nếp sống cộng đồng tạo nên một trải nghiệm giàu bản sắc.",
    detail: "Hãy tìm hiểu trước về các hoạt động văn hóa để có thể gặp đúng thời điểm cộng đồng tổ chức trải nghiệm."
  },
  {
    name: "Bảo tàng Đồng Nai",
    type: "Lịch sử & văn hóa",
    area: "Biên Hòa",
    image: baotang,
    description: "Nơi lưu giữ nhiều tư liệu, hiện vật khảo cổ và câu chuyện về quá trình hình thành vùng đất Đồng Nai. Một chuyến tham quan bảo tàng giúp bạn nhìn địa phương qua những lớp văn hóa lâu đời, từ cư dân cổ đến đời sống hiện đại.",
    detail: "Nên dành thời gian đọc phần chú thích hiện vật để kết nối các câu chuyện lịch sử của Đồng Nai."
  }
];

function Areas() {

  const mapsUrlFor = destination => (
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${destination.name}, ${destination.area}, Đồng Nai`)}`
  );

  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    if (!selectedDestination) return undefined;

    const handleKeyDown = event => {
      if (event.key === "Escape") setSelectedDestination(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedDestination]);

  return (
    <div className="explore-page areas-page">
      <SiteHeader />

      <main className="area-main">
        <section className="area-intro">
          <div>
            <span className="eyebrow"><Compass size={15} /> Điểm đến Đồng Nai</span>
            <h1>Đi một vòng,<br /><em>gặp đúng chỗ.</em></h1>
            <p>Những địa điểm đáng chú ý cho một chuyến đi nhiều màu sắc: từ rừng xanh, mặt hồ đến những dấu ấn văn hóa địa phương.</p>
          </div>
          <div className="area-stamp">
            <MapPin size={22} />
            <strong>Những điểm đến</strong>
            <span>đáng để khám phá</span>
          </div>
        </section>

        <div className="area-toolbar">
          <span>Địa điểm nổi bật</span>
          <span className="toolbar-note"><Search size={15} /> Chạm để xem chi tiết</span>
        </div>

        <div className="area-grid">

        {destinations.map((destination, index) => (

          <button
            className="area-card"
            key={destination.name}
            onClick={() => setSelectedDestination(destination)}
          >
            <span className="area-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="area-card-image">
              {destination.image ? <img src={destination.image} alt={destination.name} /> : "Thêm ảnh"}
            </span>
            <span className="area-pin"><MapPin size={18} /></span>
            <strong>{destination.name}</strong>
            <small>{destination.type} · {destination.area}</small>
            <ArrowRight className="area-arrow" size={20} />
          </button>
        ))}

        </div>
      </main>
      <SiteFooter />

      {selectedDestination && (
        <div className="destination-modal-backdrop" onClick={() => setSelectedDestination(null)}>
          <section
            className="destination-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="destination-title"
            onClick={event => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Đóng thông tin địa điểm"
              onClick={() => setSelectedDestination(null)}
            >
              <X size={20} />
            </button>
            <span className="modal-kicker">{selectedDestination.type}</span>
            <div className="destination-modal-image">
              {selectedDestination.image ? <img src={selectedDestination.image} alt={selectedDestination.name} /> : "Khu vực ảnh địa điểm"}
            </div>
            <h2 id="destination-title">{selectedDestination.name}</h2>
            <div className="modal-location"><MapPin size={16} /> {selectedDestination.area}, Đồng Nai</div>
            <p>{selectedDestination.description}</p>
            <div className="modal-note">
              <strong>Gợi ý trải nghiệm</strong>
              <span>{selectedDestination.detail}</span>
            </div>
            <a
              className="destination-maps-link"
              href={mapsUrlFor(selectedDestination)}
              target="_blank"
              rel="noreferrer"
            >
              Mở địa điểm trên Google Maps <ArrowUpRight size={17} />
            </a>
          </section>
        </div>
      )}
    </div>
  );
}

export default Areas;