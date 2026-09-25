const express = require("express");
const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { promisify } = require("util");

const router = express.Router();
const execFileAsync = promisify(execFile);

function runCrawler(latitude, longitude, dish, category, cuisine) {
  const crawlerPath = path.resolve(__dirname, "../../crawler/crawler.py");
  const virtualEnvPython = process.platform === "win32"
    ? path.resolve(__dirname, "../../crawler/venv/Scripts/python.exe")
    : path.resolve(__dirname, "../../crawler/venv/bin/python");
  const pythonCommand = fs.existsSync(virtualEnvPython)
    ? virtualEnvPython
    : process.platform === "win32" ? "python" : "python3";

  return execFileAsync(
    pythonCommand,
    [
      crawlerPath,
      "--latitude", String(latitude),
      "--longitude", String(longitude),
      "--dish", dish || "",
      "--category", category || "restaurant",
      "--cuisine", cuisine || ""
    ],
    {
      cwd: path.dirname(crawlerPath),
      timeout: 120000,
      maxBuffer: 1024 * 1024 * 5
    }
  ).then(({ stdout }) => {
    const result = JSON.parse(stdout.trim());

    if (result.error) {
      throw new Error(result.error);
    }

    return result;
  });
}

// Temporary runtime data. Nothing is persisted between server restarts.
const places = [
  {
    id: "an-vien-quan",
    name: "AN VIÊN QUÁN",
    category: "restaurant",
    ward: "Phước Tân",
    address: "101 Đ. Đặng Văn Trơn, Biên Hòa, Đồng Nai",
    latitude: 10.9462,
    longitude: 106.8428,
    rating: 4.8,
    reviewCount: 101,
    dishes: ["cơm", "gà", "ăn vặt"],
    openingHours: "10:00 - 22:00"
  },
  {
    id: "dong-phuong-1",
    name: "Quán Ăn Gia Đình Đông Phương 1",
    category: "restaurant",
    ward: "Tam Phước",
    address: "Đ. Trần Quốc Toản, Biên Hòa, Đồng Nai",
    latitude: 10.9571,
    longitude: 106.8452,
    rating: 4.1,
    reviewCount: 86,
    dishes: ["cơm", "bún"],
    openingHours: "10:00 - 23:00"
  },
  {
    id: "nakharat-thai",
    name: "Nakharat Thai Restaurant",
    category: "restaurant",
    ward: "Thanh Sơn",
    address: "K52/K7 Đường N2, Đ. Võ Thị Sáu, Biên Hòa, Đồng Nai",
    latitude: 10.9543,
    longitude: 106.8747,
    rating: 4.3,
    reviewCount: 72,
    dishes: ["phở", "bún"],
    openingHours: "10:30 - 22:30"
  },
  {
    id: "nha-vien-quan",
    name: "Nhã Viên quán",
    category: "restaurant",
    ward: "Phước Tân",
    address: "12/96 khu phố Bình Thiền, Biên Hòa, Đồng Nai",
    latitude: 10.9478,
    longitude: 106.8391,
    rating: 4.2,
    reviewCount: 54,
    dishes: ["cơm", "ăn vặt"],
    openingHours: "10:00 - 22:00"
  },
  {
    id: "phu-an-quan",
    name: "Phù An Quán",
    category: "restaurant",
    ward: "Tam Phước",
    address: "WRWH+FP5, Biên Hòa, Đồng Nai",
    latitude: 10.9496,
    longitude: 106.8624,
    rating: 4.8,
    reviewCount: 127,
    dishes: ["cơm", "gà", "bún"],
    openingHours: "10:00 - 22:00"
  },
  {
    id: "kaisern-restaurant",
    name: "Kaiserin Restaurant",
    category: "restaurant",
    ward: "Thanh Sơn",
    address: "K36 Đ. Võ Thị Sáu, Biên Hòa, Đồng Nai",
    latitude: 10.9565,
    longitude: 106.8709,
    rating: 4.1,
    reviewCount: 63,
    dishes: ["phở", "cơm"],
    openingHours: "10:00 - 23:00"
  },
  {
    id: "oc-nang-an",
    name: "Ốc Nàng An - Hải Sản & Ốc Ngon Biên Hòa",
    category: "restaurant",
    ward: "Tam Phước",
    address: "1046 XLHN, Biên Hòa, Đồng Nai",
    latitude: 10.9742,
    longitude: 106.8868,
    rating: 4.9,
    reviewCount: 148,
    dishes: ["gà", "ăn vặt"],
    openingHours: "11:00 - 23:00"
  },
  {
    id: "nha-hang-cay-dua",
    name: "Nhà hàng Cây Dừa",
    category: "restaurant",
    ward: "Phước Tân",
    address: "488 Cách Mạng Tháng 8, Biên Hòa, Đồng Nai",
    latitude: 10.9548,
    longitude: 106.8368,
    rating: 4.4,
    reviewCount: 92,
    dishes: ["cơm", "bún", "gà"],
    openingHours: "10:00 - 22:00"
  }
];

function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const R = 6371;

  const dLat =
    (lat2 - lat1) *
    Math.PI / 180;

  const dLon =
    (lon2 - lon1) *
    Math.PI / 180;

  const a =
    Math.sin(dLat / 2) *
    Math.sin(dLat / 2) +

    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *

    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

function isOpenNow(openingHours) {

  const [openTime, closeTime] = openingHours
    .split(" - ")
    .map(time => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute;
    });

  const timeParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date());

  const currentHour = Number(
    timeParts.find(part => part.type === "hour").value
  );
  const currentMinute = Number(
    timeParts.find(part => part.type === "minute").value
  );
  const currentTime = currentHour * 60 + currentMinute;

  if (closeTime < openTime) {
    return currentTime >= openTime || currentTime < closeTime;
  }

  return currentTime >= openTime && currentTime < closeTime;
}

router.get("/", async (req, res) => {

  try {

    const {
      category,
      latitude,
      longitude,
      ward,
      dish,
      cuisine
    } = req.query;

    const userLatitude = Number(latitude);
    const userLongitude = Number(longitude);

    if (!Number.isFinite(userLatitude) || !Number.isFinite(userLongitude)) {
      return res.status(400).json({
        message: "Cần cung cấp vị trí người dùng"
      });
    }

    const shouldCrawl = process.env.ENABLE_CRAWLER === "true"
      || (process.env.NODE_ENV !== "production" && process.env.ENABLE_CRAWLER !== "false");

    const crawledPlaces = shouldCrawl
      ? await runCrawler(
          userLatitude,
          userLongitude,
          dish,
          category,
          cuisine
        )
      : places;

    const nearbyPlaces = crawledPlaces
      .filter(place => !category || place.category === category)
      .filter(place => !ward || place.address.includes(ward))
      .map(place => ({
        ...place,
        distance: Number.isFinite(place.latitude) && Number.isFinite(place.longitude)
          ? calculateDistance(userLatitude, userLongitude, place.latitude, place.longitude)
          : null
      }))
      .filter(place => place.distance === null || place.distance <= 20);

    const qualifiedPlaces = nearbyPlaces
      .filter(place => category === "administrative" || category === "gas_station"
        ? place.isOpen
        : place.rating >= 4.0 && place.reviewCount >= 20 && place.isOpen);

    const results = (qualifiedPlaces.length > 0 ? qualifiedPlaces : nearbyPlaces)
        .sort((a, b) => {
          if (a.distance === null) {
            return 1;
          }

          if (b.distance === null) {
            return -1;
          }

          if (a.distance !== b.distance) {
            return a.distance - b.distance;
          }

          if (b.rating !== a.rating) {
            return b.rating - a.rating;
          }

          return b.reviewCount - a.reviewCount;
        })
        .slice(0, 15);

    res.json(results);

  } catch (error) {

    console.error(error);

    const crawlerError = error.message && error.message.includes("Google Maps")
      ? error.message
      : "Không thể lấy dữ liệu địa điểm từ Selenium";

    res.status(503).json({
      message: crawlerError
    });

  }

});

router.get("/geocode", async (req, res) => {

  const query = String(req.query.q || "").trim();

  if (!query) {
    return res.status(400).json({
      message: "Vui lòng nhập địa điểm cần tìm"
    });
  }

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "1");
    url.searchParams.set("countrycodes", "vn");
    url.searchParams.set("q", query);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "DongNaiCheck/1.0 (local development)"
      }
    });
    const data = await response.json();

    if (!data.length) {
      return res.status(404).json({
        message: "Không tìm thấy địa điểm này"
      });
    }

    const result = data[0];

    res.json({
      label: result.display_name,
      latitude: Number(result.lat),
      longitude: Number(result.lon)
    });

  } catch (error) {
    console.error(error);
    res.status(502).json({
      message: "Không thể kết nối dịch vụ tìm vị trí"
    });
  }
});

module.exports = router;