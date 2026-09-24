import { useEffect, useRef, useState } from "react";
import { useLocation as useRouterLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowUpRight,
  Dices,
  LocateFixed,
  MapPin,
  Navigation,
  Sparkles,
  Star,
  X
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { spinCategories } from "../data/spinFoods";

function Places() {

  const defaultLocation = {
    latitude: 10.95,
    longitude: 106.85
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const basePath = routerLocation.pathname === "/" ? "/" : "/places";

  const requestedCategory = searchParams.get("category") || "restaurant";
  const category = ["cafe", "dessert"].includes(requestedCategory)
    ? "drinks"
    : requestedCategory;

  const selectedDish = searchParams.get("dish") || "";

  const selectedCuisine = searchParams.get("cuisine") || "";

  const categoryOptions = [
    { value: "restaurant", label: "Quán ăn" },
    { value: "drinks", label: "Quán nước" },
    { value: "entertainment", label: "Du lịch & vui chơi" },
    { value: "shopping", label: "Tiện lợi & siêu thị" },
    { value: "gas_station", label: "Cây xăng" },
    { value: "administrative", label: "Cơ sở hành chính" }
  ];

  const [places, setPlaces] = useState([]);

  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState(null);

  const [error, setError] = useState("");

  const [locationStatus, setLocationStatus] = useState("pending");

  const [locationLabel, setLocationLabel] = useState("");

  const [locationError, setLocationError] = useState("");

  const [spinCategoryId, setSpinCategoryId] = useState("meals");

  const [spinResult, setSpinResult] = useState(null);

  const [isSpinning, setIsSpinning] = useState(false);

  const spinTimerRef = useRef(null);

  const [isLocationPromptOpen, setIsLocationPromptOpen] = useState(false);

  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);

  const [pendingDish, setPendingDish] = useState("");

  const [pendingCategory, setPendingCategory] = useState("");

  const [pendingCuisine, setPendingCuisine] = useState("");

  const [filterCategory, setFilterCategory] = useState(category);

  const [filterDish, setFilterDish] = useState(selectedDish);

  const [filterSnack, setFilterSnack] = useState("");

  const [filterCuisine, setFilterCuisine] = useState(selectedCuisine);

  const cuisineOptions = [
    { value: "Trung Quốc", label: "Trung Quốc" },
    { value: "Hàn Quốc", label: "Hàn Quốc" },
    { value: "Nhật Bản", label: "Nhật Bản" },
    { value: "Thái Lan", label: "Thái Lan" },
    { value: "Ấn Độ", label: "Ấn Độ" },
    { value: "Ý", label: "Ý" },
    { value: "Pháp", label: "Pháp" },
    { value: "Mexico", label: "Mexico" }
  ];

  useEffect(() => {

    let isActive = true;

    if (!location) {
      return () => {
        isActive = false;
      };
    }

    setLoading(true);
    setPlaces([]);
    setError("");

    const loadPlaces = async (coordinates) => {

      setLocation(coordinates);

      try {

        const response = await axios.get(
          "/api/places",
          {
            params: {
              category,
              dish: selectedDish,
              cuisine: selectedCuisine,
              ...coordinates
            },
            timeout: 130000
          }
        );

        if (isActive) {
          setPlaces(response.data);
          setError("");
        }

      } catch (requestError) {

        console.error(requestError);

        if (isActive) {
          setError(
            requestError.response?.data?.message ||
            "Không thể kết nối đến máy chủ địa điểm."
          );
        }

      } finally {

        if (isActive) {
          setLoading(false);
        }

      }
    };

    loadPlaces(location);

    return () => {
      isActive = false;
    };

  }, [category, selectedDish, selectedCuisine, location]);

  useEffect(() => () => {
    if (spinTimerRef.current) {
      window.clearInterval(spinTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (location && selectedDish) {
      setIsResultsModalOpen(true);
    }
  }, [location, selectedDish]);

  useEffect(() => {
    setFilterCategory(category);
    setFilterDish(selectedDish);
    setFilterSnack("");
    setFilterCuisine(category === "restaurant" ? selectedCuisine : "");
  }, [category, selectedDish, selectedCuisine]);

  const requestLocation = () => {

    const isLocalHost = ["localhost", "127.0.0.1", "[::1]"].includes(
      window.location.hostname
    );

    if (!window.isSecureContext && !isLocalHost) {
      setLocationStatus("unavailable");
      setLocationError("Trình duyệt chỉ cho phép lấy vị trí trên HTTPS hoặc localhost. Hãy mở ứng dụng bằng http://localhost:5173.");
      return;
    }

    if (!navigator.geolocation) {
      setLocationStatus("unavailable");
      setLocationError("Trình duyệt này không hỗ trợ lấy vị trí.");
      return;
    }

    setLocationStatus("requesting");
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLocationLabel("Vị trí hiện tại của bạn");
        setLocationStatus("granted");

        const dishToSearch = pendingDish || spinResult?.dish;
        const categoryToSearch = pendingCategory || category;
        const cuisineToSearch = pendingCuisine || selectedCuisine;
        if (dishToSearch || pendingCategory || pendingCuisine) {
          const nextParams = new URLSearchParams(searchParams);
          nextParams.set("category", categoryToSearch);
          if (dishToSearch) nextParams.set("dish", dishToSearch);
          else nextParams.delete("dish");
          if (cuisineToSearch) nextParams.set("cuisine", cuisineToSearch);
          else nextParams.delete("cuisine");
          setIsResultsModalOpen(true);
          navigate(`${basePath}?${nextParams.toString()}`);
          setSpinResult(null);
          setPendingDish("");
          setPendingCategory("");
          setPendingCuisine("");
        }
      },
      (geolocationError) => {
        if (geolocationError.code === 1) {
          setLocationError("Trình duyệt đang chặn quyền vị trí cho trang này. Hãy bấm biểu tượng ổ khóa trên thanh địa chỉ và cho phép Location.");
        } else if (geolocationError.code === 2) {
          setLocationError("Windows hoặc thiết bị chưa xác định được vị trí. Hãy bật Location trong Windows Settings rồi thử lại.");
        } else {
          setLocationError("Không lấy được vị trí trong thời gian cho phép. Hãy thử lại ở nơi có kết nối mạng tốt hơn.");
        }

        setLocationStatus("denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  const useDemoLocation = () => {
    setLocation(defaultLocation);
    setLocationLabel("Biên Hòa (vị trí mẫu)");
    setLocationStatus("demo");
    setIsLocationPromptOpen(false);

    const dishToSearch = pendingDish || spinResult?.dish;
    const categoryToSearch = pendingCategory || category;
    const cuisineToSearch = pendingCuisine || selectedCuisine;
    if (dishToSearch || pendingCategory || pendingCuisine) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("category", categoryToSearch);
      if (dishToSearch) nextParams.set("dish", dishToSearch);
      else nextParams.delete("dish");
      if (cuisineToSearch) nextParams.set("cuisine", cuisineToSearch);
      else nextParams.delete("cuisine");
      setIsResultsModalOpen(true);
      navigate(`${basePath}?${nextParams.toString()}`);
      setSpinResult(null);
      setPendingDish("");
      setPendingCategory("");
      setPendingCuisine("");
    }
  };

  const selectDish = (dish) => {
    setFilterDish(dish);
    setFilterSnack("");
  };

  const selectSnack = (snack) => {
    setFilterSnack(snack);
    setFilterDish("");
  };

  const selectCategory = (nextCategory) => {
    setFilterCategory(nextCategory);
    setFilterDish("");
    setFilterSnack("");
    setFilterCuisine("");
  };

  const searchWithFilters = () => {
    const dishToSearch = filterDish || filterSnack;
    const categoryToSearch = filterCategory;
    const cuisineToSearch = filterCategory === "restaurant" ? filterCuisine : "";

    setPendingDish(dishToSearch);
    setPendingCategory(categoryToSearch);
    setPendingCuisine(cuisineToSearch);

    if (!location) {
      setIsLocationPromptOpen(true);
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("category", categoryToSearch);
    if (dishToSearch) nextParams.set("dish", dishToSearch);
    else nextParams.delete("dish");
    if (cuisineToSearch) nextParams.set("cuisine", cuisineToSearch);
    else nextParams.delete("cuisine");
    setIsResultsModalOpen(true);
    navigate(`${basePath}?${nextParams.toString()}`);
    setPendingDish("");
    setPendingCategory("");
  };

  const spinCategory = spinCategories.find(item => item.id === spinCategoryId) || spinCategories[0];

  const spinForDish = () => {
    if (isSpinning) return;

    const items = spinCategory.items;
    let previewIndex = Math.floor(Math.random() * items.length);

    setIsSpinning(true);
    setSpinResult({ category: spinCategory.label, dish: items[previewIndex] });
    spinTimerRef.current = window.setInterval(() => {
      previewIndex = (previewIndex + 1) % items.length;
      setSpinResult({ category: spinCategory.label, dish: items[previewIndex] });
    }, 62);

    window.setTimeout(() => {
      window.clearInterval(spinTimerRef.current);
      spinTimerRef.current = null;
      const randomIndex = Math.floor(Math.random() * items.length);
      setSpinResult({
        category: spinCategory.label,
        dish: items[randomIndex]
      });
      setIsSpinning(false);
    }, 1250);
  };

  const continueWithSpinResult = () => {
    if (!spinResult) return;

    if (!location) {
      setIsLocationPromptOpen(true);
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("category", spinResult.category === "Nước uống" ? "drinks" : "restaurant");
    nextParams.set("dish", spinResult.dish);
    nextParams.delete("cuisine");
    setIsResultsModalOpen(true);
    navigate(`${basePath}?${nextParams.toString()}`);
    setSpinResult(null);
  };

  const allowLocationFromPrompt = () => {
    setIsLocationPromptOpen(false);
    requestLocation();
  };

  const categoryLabel = categoryOptions.find(option => option.value === category)?.label || "Địa điểm";
  const mealOptions = spinCategories.find(item => item.id === "meals")?.items || [];
  const drinkOptions = spinCategories.find(item => item.id === "drinks")?.items || [];
  const snackOptions = spinCategories.find(item => item.id === "snacks")?.items || [];

  return (
    <div className="places-page places-redesign">
      <SiteHeader />

      <main className="places-shell">
        <section className="places-hero">
          <div>
            <span className="places-kicker"><Sparkles size={15} /> Gợi ý dành cho bạn</span>
            <h1>{category === "restaurant" ? "Hôm nay ăn gì?" : `Khám phá ${categoryLabel.toLowerCase()}`}</h1>
            <p>Mười lăm địa điểm nổi bật gần bạn, được chọn theo vị trí và đánh giá.</p>
          </div>
          <div className="places-location">
            <LocateFixed size={18} />
            <span><small>Vị trí tìm kiếm</small><strong>{locationLabel || "Chưa chọn vị trí"}</strong></span>
          </div>
        </section>

        <section className="spin-panel" aria-labelledby="spin-title">
          <div className="spin-panel-heading">
            <span className="places-kicker"><Dices size={15} /> Trợ lý chọn món</span>
            <h2 id="spin-title">Hôm nay ăn gì,<br /><em>để vòng quay chọn?</em></h2>
            <p>Chọn một nhóm món, để Đồng Nai Check gợi ý ngẫu nhiên rồi tìm quán gần bạn.</p>
          </div>
          <div className="spin-controls">
            <div className="spin-category-list" aria-label="Nhóm món muốn quay">
              {spinCategories.map(option => (
                <button
                  className={spinCategoryId === option.id ? "spin-category active" : "spin-category"}
                  key={option.id}
                  onClick={() => setSpinCategoryId(option.id)}
                  type="button"
                >
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </button>
              ))}
            </div>
            <button className={isSpinning ? "spin-button spinning" : "spin-button"} onClick={spinForDish} disabled={isSpinning} type="button">
              <Dices size={21} />
              {isSpinning ? "Đang quay..." : "Quay chọn món"}
            </button>
          </div>
        </section>

        {locationStatus === "requesting" && (
          <div className="places-message"><Navigation className="spin-icon" size={22} /> Đang chờ bạn cấp quyền vị trí...</div>
        )}

        {(locationStatus === "denied" || locationStatus === "unavailable") && !location && (
          <section className="location-consent location-denied">
            <div className="consent-icon"><MapPin size={24} /></div>
            <div>
              <h2>Chưa dùng được vị trí hiện tại</h2>
              <p>{locationError || "Bạn có thể thử cấp quyền lại hoặc tiếp tục xem dữ liệu mẫu tại Biên Hòa."}</p>
            </div>
            <div className="consent-actions">
              <button onClick={requestLocation}>Thử lại</button>
              <button className="secondary-action" onClick={useDemoLocation}>Dùng vị trí mẫu</button>
            </div>
          </section>
        )}

        <div className="dish-filters" aria-label="Lọc theo món ăn">
          {categoryOptions.map((option) => (
            <button
              className={filterCategory === option.value ? "dish-chip active" : "dish-chip"}
              key={option.value}
              onClick={() => selectCategory(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        {(filterCategory === "restaurant" || filterCategory === "drinks") && (
          <div className="dish-selects" aria-label="Chọn món muốn tìm">
            {filterCategory === "restaurant" && <label className="dish-select-field">
              <span>Ẩm thực quốc gia</span>
              <select value={filterCuisine} onChange={event => setFilterCuisine(event.target.value)}>
                <option value="">Tất cả quốc gia</option>
                {cuisineOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>}
            {filterCategory === "restaurant" && (
              <label className="dish-select-field">
                <span>Món ăn</span>
                <select value={filterDish} onChange={event => selectDish(event.target.value)}>
                  <option value="">Tất cả món</option>
                  {mealOptions.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            )}
            {filterCategory === "restaurant" && (
              <label className="dish-select-field">
                <span>Món ăn vặt</span>
                <select value={filterSnack} onChange={event => selectSnack(event.target.value)}>
                  <option value="">Tất cả món ăn vặt</option>
                  {snackOptions.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            )}
            {filterCategory === "drinks" && <label className="dish-select-field">
              <span>Thức uống</span>
              <select value={filterDish} onChange={event => selectDish(event.target.value)}>
                <option value="">Tất cả thức uống</option>
                {drinkOptions.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>}
            <button className="filter-search-button" type="button" onClick={searchWithFilters}>
              Tìm kiếm
            </button>
          </div>
        )}

        {!((filterCategory === "restaurant" || filterCategory === "drinks")) && (
          <button className="filter-search-button standalone" type="button" onClick={searchWithFilters}>
            Tìm kiếm
          </button>
        )}

      </main>

      {isResultsModalOpen && (
        <div className="spin-modal-backdrop places-results-backdrop" onClick={() => setIsResultsModalOpen(false)}>
          <section className="places-results-modal" role="dialog" aria-modal="true" aria-labelledby="places-results-title" onClick={event => event.stopPropagation()}>
            <button className="spin-modal-close" type="button" aria-label="Đóng kết quả tìm kiếm" onClick={() => setIsResultsModalOpen(false)}>
              <X size={19} />
            </button>
            <span className="places-kicker"><MapPin size={15} /> Kết quả quanh bạn</span>
            <h2 id="places-results-title">{selectedDish ? <>Nơi có món<br /><em>{selectedCuisine ? `${selectedCuisine} · ` : ""}{selectedDish}</em></> : <>Địa điểm<br /><em>{categoryLabel.toLowerCase()}</em></>}</h2>
            <p className="places-results-subtitle">Được sắp xếp theo khoảng cách gần bạn nhất.</p>

            {loading && <div className="places-message"><Navigation className="spin-icon" size={22} /> Đang tìm địa điểm phù hợp...</div>}
            {!loading && error && <div className="places-message places-error">{error}</div>}
            {!loading && !error && places.length === 0 && <div className="places-message">Chưa tìm thấy quán phù hợp trong bán kính 20 km.</div>}
            {!loading && !error && places.length > 0 && (
              <section className="places-grid">
                {places.map((place, index) => (
                  <article className={`place-card place-rank-${index + 1}`} key={place.id || place.name}>
                    <div className="place-rank">0{index + 1}</div>
                    <div className="place-card-top">
                      <span className="place-type"><MapPin size={13} /> Gần bạn</span>
                      <span className={place.isOpen ? "open" : "closed"}>{place.isOpen ? "Đang mở cửa" : "Đã đóng cửa"}</span>
                    </div>
                    <h2>{place.name}</h2>
                    {!['administrative', 'gas_station'].includes(category) && <div className="place-rating"><Star size={18} fill="currentColor" /><strong>{place.rating}</strong><span>/ 5</span></div>}
                    <p className="place-address"><MapPin size={16} /> {place.address}</p>
                    <div className="place-stats"><span>{category === "administrative" ? "Cơ quan nhà nước" : category === "gas_station" ? "Trạm dịch vụ" : `${place.reviewCount} đánh giá`}</span><span>{place.openingHours}</span><span>{place.distance?.toFixed(1)} km</span></div>
                    <a className="maps-button" href={place.googleMapsUrl} target="_blank" rel="noreferrer">Mở trên Google Maps <ArrowUpRight size={17} /></a>
                  </article>
                ))}
              </section>
            )}
          </section>
        </div>
      )}

      {spinResult && (
        <div className="spin-modal-backdrop" onClick={() => !isSpinning && setSpinResult(null)}>
          <section className="spin-modal" role="dialog" aria-modal="true" aria-labelledby="spin-result-title" onClick={event => event.stopPropagation()}>
            <button className="spin-modal-close" type="button" aria-label="Đóng kết quả quay món" disabled={isSpinning} onClick={() => setSpinResult(null)}>
              <X size={19} />
            </button>
            <span className="places-kicker"><Sparkles size={15} /> {isSpinning ? "Vòng quay đang chạy" : "Kết quả vòng quay"}</span>
            <span className="spin-result-category">{spinResult.category}</span>
            <h2 id="spin-result-title">{isSpinning ? <>Đang lướt qua<br /><em>{spinResult.dish}</em></> : <>Hôm nay thử<br /><em>{spinResult.dish}</em> nhé?</>}</h2>
            <p>{isSpinning ? "Các món đang lướt qua, chờ một chút nhé." : "Để mình tìm những quán đang mở và có món này gần vị trí của bạn."}</p>
            {!isSpinning && <div className="spin-modal-actions">
              <button className="spin-secondary-action" type="button" onClick={spinForDish}>Quay lại</button>
              <button className="spin-primary-action" type="button" onClick={continueWithSpinResult}>Tiếp tục tìm quán <ArrowUpRight size={16} /></button>
            </div>}
          </section>
        </div>
      )}

      {isLocationPromptOpen && (
        <div className="spin-modal-backdrop location-prompt-backdrop" onClick={() => setIsLocationPromptOpen(false)}>
          <section className="location-prompt-modal" role="dialog" aria-modal="true" aria-labelledby="location-prompt-title" onClick={event => event.stopPropagation()}>
            <button className="spin-modal-close" type="button" aria-label="Đóng yêu cầu vị trí" onClick={() => setIsLocationPromptOpen(false)}>
              <X size={19} />
            </button>
            <div className="location-prompt-icon"><LocateFixed size={28} /></div>
            <span className="places-kicker">Tìm món gần bạn</span>
            <h2 id="location-prompt-title">Cho phép dùng<br /><em>vị trí của bạn?</em></h2>
            <p>Đồng Nai Check cần vị trí để tìm những quán có món vừa chọn và sắp xếp nơi gần bạn nhất.</p>
            <div className="location-prompt-actions">
              <button className="spin-primary-action" type="button" onClick={allowLocationFromPrompt}>Cho phép vị trí <LocateFixed size={16} /></button>
              <button className="spin-secondary-action" type="button" onClick={useDemoLocation}>Dùng vị trí mẫu</button>
            </div>
          </section>
        </div>
      )}
      <SiteFooter />
    </div>
  );
}
export default Places;