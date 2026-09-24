import {
  ArrowRight,
  BookOpen,
  Clock3,
  Landmark,
  Leaf,
  MapPin,
  Mountain,
  TreePine,
  Utensils,
  Waves
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

function DongNai() {
  const navigate = useNavigate();

  return (
    <div className="info-page">
      <SiteHeader />

      <main>

        {/* ================= HERO ================= */}
        <section className="info-hero">
          <div className="info-hero-copy">

            <span className="eyebrow">
              <Leaf size={15} />
              Một vùng đất đang bước sang trang mới
            </span>

            <h1>
              Đồng Nai,
              <br />
              <em>một hành trình mới.</em>
            </h1>

            <p>
              Từ những dòng sông, khu rừng và miền đất đỏ bazan đến những
              đô thị hiện đại, những khu công nghiệp và những con đường
              đang mở rộng về tương lai. Đồng Nai hôm nay là một vùng đất
              rộng lớn, nơi lịch sử, thiên nhiên và nhịp sống hiện đại
              cùng tồn tại.
            </p>

            <button
              className="primary-action"
              onClick={() => navigate("/khu-vuc")}
            >
              Điểm đến nôi bật
              <ArrowRight size={18} />
            </button>

          </div>

          <div className="info-hero-image">
            <img
              src={heroImage}
              alt="Phong cảnh Đồng Nai"
            />

            <div className="image-caption">
              <MapPin size={15} />
              Thành phố Đồng Nai, Việt Nam
            </div>
          </div>
        </section>


        {/* ================= INTRO ================= */}
        <section className="info-story">

          <div className="story-label">
            01 / Đồng Nai hôm nay
          </div>

          <div>
            <h2>
              Một Đồng Nai rộng lớn hơn,
              <br />
              nhiều câu chuyện hơn.
            </h2>

            <p>
              Đồng Nai từ lâu đã là một vùng đất đặc biệt của miền Đông Nam Bộ.
              Nơi đây có dòng sông Đồng Nai bồi đắp phù sa, có Biên Hòa với
              lịch sử lâu đời, có những vùng cây trái, những khu rừng rộng lớn,
              những đô thị năng động và một nền công nghiệp giữ vai trò quan
              trọng trong sự phát triển của phía Nam.
            </p>

            <p>
              Nhưng từ năm 2025, câu chuyện về Đồng Nai bước sang một chương
              mới. Tỉnh Bình Phước được sắp xếp cùng tỉnh Đồng Nai thành tỉnh
              Đồng Nai mới, chính thức vận hành từ ngày 01/07/2025. Không gian
              Đồng Nai từ đó được mở rộng về phía Bắc, kết nối vùng đô thị,
              công nghiệp với những miền đất đỏ, rừng xanh và vùng nông nghiệp
              đặc trưng của Bình Phước.
            </p>

            <p>
              Và ngày 30/04/2026 trở thành một dấu mốc đặc biệt:
              Đồng Nai chính thức trở thành thành phố trực thuộc Trung ương.
              Đây không chỉ là sự thay đổi về tên gọi hay mô hình hành chính,
              mà còn mở ra một không gian phát triển mới cho toàn vùng.
            </p>
          </div>

        </section>


        {/* ================= NEW ERA ================= */}
        <section className="history-section">

          <div className="history-heading">

            <span className="story-label">
              02 / Một dấu mốc lịch sử
            </span>

            <h2>
              Từ tỉnh Đồng Nai
              <br />
              <em>đến Thành phố Đồng Nai.</em>
            </h2>

            <p>
              Hành trình của Đồng Nai là hành trình của một vùng đất liên tục
              thay đổi nhưng không đánh mất ký ức của mình. Từ Trấn Biên xưa,
              qua Biên Hòa, qua những thập niên công nghiệp hóa và đô thị hóa,
              Đồng Nai bước vào một giai đoạn phát triển với quy mô và vị thế
              mới.
            </p>

          </div>


          <div className="history-timeline">

            <article className="history-item">

              <div className="history-icon">
                <BookOpen size={20} />
              </div>

              <div>

                <span className="history-year">
                  Dấu tích xa xưa
                </span>

                <h3>
                  Những lớp văn hóa đầu tiên
                </h3>

                <p>
                  Vùng đất Đồng Nai lưu giữ nhiều dấu tích khảo cổ quan trọng,
                  cho thấy con người đã sinh sống và tạo dựng đời sống văn hóa
                  từ rất sớm. Những di chỉ như Cù Lao Rùa cùng các địa điểm
                  khảo cổ ven sông góp phần tạo nên câu chuyện về một vùng đất
                  có lịch sử lâu đời.
                </p>

              </div>

            </article>


            <article className="history-item">

              <div className="history-icon">
                <Landmark size={20} />
              </div>

              <div>

                <span className="history-year">
                  Năm 1698
                </span>

                <h3>
                  Trấn Biên và hành trình mở cõi
                </h3>

                <p>
                  Năm 1698, Thống suất Nguyễn Hữu Cảnh vào kinh lược vùng đất
                  phương Nam, lập dinh Trấn Biên và đặt nền móng quan trọng
                  cho quá trình hình thành hệ thống hành chính tại vùng Đồng
                  Nai. Từ đó, vùng đất bên sông từng bước trở thành một trung
                  tâm cư trú, sản xuất và giao thương quan trọng.
                </p>

              </div>

            </article>


            <article className="history-item">

              <div className="history-icon">
                <Clock3 size={20} />
              </div>

              <div>

                <span className="history-year">
                  Biên Hòa qua các thời kỳ
                </span>

                <h3>
                  Thành phố bên dòng sông
                </h3>

                <p>
                  Biên Hòa phát triển bên dòng Đồng Nai và trở thành một trong
                  những đô thị có lịch sử lâu đời ở Nam Bộ. Cù Lao Phố,
                  Văn miếu Trấn Biên cùng nhiều công trình và làng nghề đã góp
                  phần tạo nên một không gian văn hóa đặc trưng của vùng đất
                  này.
                </p>

              </div>

            </article>


            <article className="history-item">

              <div className="history-icon">
                <Waves size={20} />
              </div>

              <div>

                <span className="history-year">
                  Thế kỷ XX – XXI
                </span>

                <h3>
                  Công nghiệp hóa và mở rộng đô thị
                </h3>

                <p>
                  Đồng Nai từng bước trở thành một trong những trung tâm công
                  nghiệp quan trọng của Việt Nam. Những khu công nghiệp,
                  tuyến giao thông lớn và quá trình đô thị hóa đã tạo nên
                  diện mạo mới, đồng thời đưa Đồng Nai trở thành một mắt xích
                  quan trọng trong vùng kinh tế phía Nam.
                </p>

              </div>

            </article>


            <article className="history-item">

              <div className="history-icon">
                <Mountain size={20} />
              </div>

              <div>

                <span className="history-year">
                  01/07/2025
                </span>

                <h3>
                  Bình Phước hòa vào không gian Đồng Nai mới
                </h3>

                <p>
                  Một chương mới được mở ra khi toàn bộ diện tích tự nhiên và
                  quy mô dân số của tỉnh Bình Phước được sắp xếp cùng tỉnh
                  Đồng Nai thành tỉnh Đồng Nai mới. Từ đây, Đồng Nai không chỉ
                  có những đô thị, khu công nghiệp và vùng sông nước quen thuộc,
                  mà còn có thêm không gian rừng, núi, nông nghiệp và văn hóa
                  đặc sắc của miền đất Bình Phước.
                </p>

              </div>

            </article>


            <article className="history-item">

              <div className="history-icon">
                <Leaf size={20} />
              </div>

              <div>

                <span className="history-year">
                  30/04/2026
                </span>

                <h3>
                  Thành phố Đồng Nai
                </h3>

                <p>
                  Quốc hội quyết nghị thành lập Thành phố Đồng Nai trên cơ sở
                  toàn bộ diện tích tự nhiên và quy mô dân số của tỉnh Đồng Nai.
                  Nghị quyết có hiệu lực từ ngày 30/04/2026. Đây là dấu mốc
                  mở ra một giai đoạn phát triển mới với không gian rộng lớn,
                  kết nối đô thị, công nghiệp, logistics, nông nghiệp,
                  rừng và du lịch.
                </p>

              </div>

            </article>

          </div>

        </section>


        {/* ================= BINH PHUOC ================= */}
        <section className="info-story">

          <div className="story-label">
            03 / Bình Phước trong Đồng Nai mới
          </div>

          <div>

            <h2>
              Từ miền Đông Nam Bộ
              <br />
              đến miền đất đỏ phương Nam.
            </h2>

            <p>
              Nếu Đồng Nai được nhắc đến với dòng sông, những đô thị năng động,
              những khu công nghiệp và những vườn cây trù phú, thì Bình Phước
              mang đến một sắc màu khác: những cánh rừng, đồi đất đỏ bazan,
              những vườn điều, cao su, cà phê và đời sống văn hóa đặc sắc của
              các cộng đồng dân tộc.
            </p>

            <p>
              Sự kết nối này làm cho Đồng Nai mới trở nên đa dạng hơn về cảnh
              quan và trải nghiệm. Từ những không gian đô thị ở phía Nam,
              người ta có thể tìm thấy những miền quê rộng mở hơn khi đi về
              phía Bắc; từ những khu công nghiệp và tuyến giao thông hiện đại,
              có thể tiếp cận những vùng rừng, hồ, núi và những điểm đến mang
              đậm dấu ấn văn hóa.
            </p>

            <p>
              Bình Phước cũng mang theo những câu chuyện riêng không thể tách
              rời khỏi bản sắc của Đồng Nai mới. Sóc Bom Bo gợi nhớ hình ảnh
              đồng bào S'tiêng với tinh thần "giã gạo nuôi quân" trong những
              năm tháng kháng chiến. Những vườn điều, cao su, cà phê và cây
              ăn trái ngày nay lại tạo nên một diện mạo nông nghiệp đầy sức
              sống cho vùng đất này.
            </p>

          </div>

        </section>


        {/* ================= LANDSCAPE ================= */}
        <section className="history-section">

          <div className="history-heading">

            <span className="story-label">
              04 / Một Đồng Nai nhiều sắc màu
            </span>

            <h2>
              Sông, rừng, núi,
              <br />
              <em>đô thị và những miền quê.</em>
            </h2>

            <p>
              Điểm đặc biệt của Đồng Nai mới nằm ở sự đa dạng. Một hành trình
              trong cùng một thành phố có thể đưa bạn qua nhiều kiểu cảnh quan,
              văn hóa và nhịp sống khác nhau.
            </p>

          </div>


          <div className="history-timeline">

            <article className="history-item">

              <div className="history-icon">
                <Waves size={20} />
              </div>

              <div>

                <span className="history-year">
                  Dòng sông Đồng Nai
                </span>

                <h3>
                  Mạch nước của một vùng đất
                </h3>

                <p>
                  Dòng sông Đồng Nai không chỉ tạo nên cảnh quan mà còn gắn với
                  lịch sử cư trú, giao thương và phát triển của vùng đất.
                  Những bến nước, cù lao và đô thị ven sông đã tạo nên một
                  phần ký ức rất riêng của Đồng Nai.
                </p>

              </div>

            </article>


            <article className="history-item">

              <div className="history-icon">
                <TreePine size={20} />
              </div>

              <div>

                <span className="history-year">
                  Rừng và thiên nhiên
                </span>

                <h3>
                  Màu xanh giữa một đô thị đang lớn
                </h3>

                <p>
                  Từ Vườn quốc gia Cát Tiên, hồ Trị An đến những vùng rừng và
                  cảnh quan tự nhiên ở phía Bắc, thiên nhiên vẫn giữ một vị trí
                  quan trọng trong diện mạo Đồng Nai.
                </p>

              </div>

            </article>


            <article className="history-item">

              <div className="history-icon">
                <Mountain size={20} />
              </div>

              <div>

                <span className="history-year">
                  Miền đất Bình Phước
                </span>

                <h3>
                  Đất đỏ, đồi núi và những vườn cây
                </h3>

                <p>
                  Những vùng đất đỏ bazan cùng các vườn điều, cao su, cà phê
                  tạo nên một sắc thái rất khác cho Đồng Nai mới. Đây cũng là
                  không gian gắn với nhiều cộng đồng dân cư và những giá trị
                  văn hóa đặc trưng của miền Đông.
                </p>

              </div>

            </article>


            <article className="history-item">

              <div className="history-icon">
                <Landmark size={20} />
              </div>

              <div>

                <span className="history-year">
                  Văn hóa
                </span>

                <h3>
                  Từ Trấn Biên đến Bom Bo
                </h3>

                <p>
                  Một bên là Văn miếu Trấn Biên, Cù Lao Phố và câu chuyện mở
                  cõi phương Nam; một bên là Sóc Bom Bo, văn hóa S'tiêng và
                  những ký ức của thời kỳ kháng chiến. Những câu chuyện ấy
                  cùng tồn tại trong một Đồng Nai mới rộng lớn hơn.
                </p>

              </div>

            </article>

          </div>

        </section>


        {/* ================= TODAY ================= */}
        <section className="info-story">

          <div className="story-label">
            05 / Đồng Nai Check!
          </div>

          <div>

            <h2>
              Một nơi đáng sống,
              <br />
              cũng là một nơi đáng khám phá.
            </h2>

            <p>
              Đồng Nai không chỉ được tạo nên bởi những địa danh nổi tiếng.
              Nó còn nằm trong những quán ăn nhỏ trên một con đường quen,
              một quán cà phê có góc nhìn đẹp, một khu vui chơi cho gia đình,
              một điểm dã ngoại cuối tuần hay một cung đường bất chợt khiến
              bạn muốn dừng xe lại.
            </p>

            <p>
              Đó cũng là lý do Đồng Nai Check! được tạo ra.
              Thay vì phải mất thời gian tìm kiếm hàng chục địa điểm,
              bạn có thể bắt đầu từ chính nơi mình đang đứng và tìm một
              nơi phù hợp với câu hỏi rất đơn giản:
              <strong> "Hôm nay ăn gì?"</strong> hoặc
              <strong> "Hôm nay đi đâu?"</strong>
            </p>

            <p>
              Một Đồng Nai rộng lớn hơn đồng nghĩa với nhiều lựa chọn hơn.
              Từ những món ăn quen thuộc, những điểm vui chơi trong thành phố
              đến những chuyến đi tìm thiên nhiên, văn hóa và những miền quê
              phía Bắc — tất cả đều có thể bắt đầu từ một cú tìm kiếm.
            </p>

            <button
              className="primary-action"
              onClick={() => navigate("/places")}
            >
              Tìm địa điểm quanh tôi
              <ArrowRight size={18} />
            </button>

          </div>

        </section>


        {/* ================= VALUES ================= */}
        <section className="info-values">

          <article>
            <Leaf size={22} />
            <span>Thiên nhiên</span>
            <p>
              Từ sông, hồ, rừng xanh đến những miền đất đỏ rộng mở.
            </p>
          </article>

          <article>
            <Utensils size={22} />
            <span>Ẩm thực</span>
            <p>
              Những món ăn địa phương và những địa điểm được nhiều người
              lựa chọn.
            </p>
          </article>

          <article>
            <Mountain size={22} />
            <span>Khám phá</span>
            <p>
              Một Đồng Nai mới với nhiều cung đường và điểm đến hơn.
            </p>
          </article>

          <article>
            <Landmark size={22} />
            <span>Văn hóa</span>
            <p>
              Từ Trấn Biên, Cù Lao Phố đến những câu chuyện của Sóc Bom Bo.
            </p>
          </article>

        </section>

      </main>
      <SiteFooter />
    </div>
  );
}

export default DongNai;