import argparse
import json
import re
import sys
import time
from urllib.parse import quote_plus

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def create_driver():
    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--no-sandbox")
    options.add_argument("--window-size=1440,900")
    options.add_argument("--lang=en")
    return webdriver.Chrome(options=options)


def parse_number(value):
    try:
        return float(value.replace(",", "."))
    except (TypeError, ValueError):
        return None


def parse_reviews(text):
    match = re.search(r"(?:\(|\[)\s*([\d.,]+)\s*(?:\)|\])", text)
    if not match:
        match = re.search(r"([\d.,]+)\s+(?:reviews|đánh giá)", text, re.I)
    if not match:
        for line in text.splitlines():
            if re.fullmatch(r"[\d.,]+", line.strip()):
                value = line.strip().replace(",", "").replace(".", "")
                if int(value) >= 20:
                    return int(value)
        return 0
    return int(float(match.group(1).replace(",", "").replace(".", "")))


def parse_rating(text):
    match = re.search(r"(?<!\d)([1-5](?:[.,]\d)?)\s*(?=\()", text)
    if match:
        return parse_number(match.group(1).replace(",", "."))
    match = re.search(r"(?<!\d)([1-5](?:[.,]\d)?)(?:\s*(?:stars?|sao))", text, re.I)
    if match:
        return parse_number(match.group(1).replace(",", "."))
    for line in text.splitlines():
        if re.fullmatch(r"[1-5](?:[.,]\d)?", line.strip()):
            return parse_number(line.strip().replace(",", "."))
    return None


def parse_coordinates(href):
    match = re.search(r"!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)", href or "")
    if not match:
        return None, None
    return float(match.group(1)), float(match.group(2))


def is_open(text):
    lowered = text.lower()
    if "đang mở cửa" in lowered or re.search(r"\bopen\b", lowered):
        return True
    if "mở cửa lúc" in lowered or "opens soon" in lowered:
        return False
    return "closed" not in lowered and "đã đóng cửa" not in lowered and "tạm đóng" not in lowered


def crawl_places(latitude, longitude, dish, category="restaurant", cuisine="", limit=30):
    category_terms = {
        "restaurant": "quán ăn nhà hàng",
        "drinks": "quán nước cafe trà sữa đồ uống",
        "entertainment": "khu du lịch vui chơi giải trí",
        "shopping": "cửa hàng tiện lợi siêu thị",
        "gas_station": "cây xăng trạm xăng dầu",
        "administrative": "cơ quan hành chính UBND trung tâm hành chính"
    }
    base_term = dish if category in ("restaurant", "drinks") and dish else category_terms.get(category, category_terms["restaurant"])
    search_term = f"quán {cuisine}".strip() if cuisine and category in ("restaurant", "drinks") else base_term
    keyword = search_term
    url = f"https://www.google.com/maps/search/{quote_plus(keyword)}/@{latitude},{longitude},14z?hl=vi"
    driver = create_driver()
    results = []

    try:
        driver.get(url)
        wait = WebDriverWait(driver, 20)

        for label in ("Accept all", "Chấp nhận tất cả", "I agree"):
            buttons = driver.find_elements(By.XPATH, f"//button[contains(., '{label}')]")
            if buttons:
                buttons[0].click()
                break

        feed = wait.until(
            lambda current_driver: (
                current_driver.find_elements(By.CSS_SELECTOR, 'div[role="feed"]')
                or current_driver.find_elements(By.CSS_SELECTOR, 'div[role="article"], div.Nv2PK')
                or current_driver.find_elements(By.CSS_SELECTOR, 'a[href*="/maps/place"]')
            )
        )

        if not feed:
            raise RuntimeError(
                "Google Maps không trả danh sách địa điểm. "
                "Hãy kiểm tra cửa sổ Chrome để xử lý consent hoặc xác minh."
            )

        feed_containers = driver.find_elements(By.CSS_SELECTOR, 'div[role="feed"]')
        if feed_containers:
            for _ in range(6):
                driver.execute_script(
                    "arguments[0].scrollTop = arguments[0].scrollHeight;",
                    feed_containers[0]
                )
                time.sleep(1.5)

        cards = driver.find_elements(By.CSS_SELECTOR, 'div[role="article"], div.Nv2PK')
        for card in cards[:limit]:
            text = card.text.strip()
            link = card.find_element(By.CSS_SELECTOR, "a").get_attribute("href")
            lines = [line.strip() for line in text.splitlines() if line.strip()]
            if not lines:
                continue

            rating = parse_rating(text)
            latitude_value, longitude_value = parse_coordinates(link)
            address_index = 3 if len(lines) > 3 and re.search(r"[1-5](?:[.,]\d)?\s*\(", lines[2]) else 2
            results.append({
                "id": re.sub(r"[^a-z0-9]+", "-", lines[0].lower()).strip("-"),
                "name": lines[0],
                "category": category,
                "address": lines[address_index] if len(lines) > address_index else "",
                "latitude": latitude_value,
                "longitude": longitude_value,
                "rating": rating or 0,
                "reviewCount": parse_reviews(text),
                "isOpen": is_open(text),
                "openingHours": "",
                "googleMapsUrl": link,
                "sourceText": text
            })

        if not results:
            raise RuntimeError(
                "Google Maps đã mở nhưng không tìm thấy card địa điểm. "
                "Markup hoặc quyền truy cập của Google có thể đã thay đổi."
            )

        return results
    finally:
        driver.quit()


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser()
    parser.add_argument("--latitude", type=float, required=True)
    parser.add_argument("--longitude", type=float, required=True)
    parser.add_argument("--dish", default="")
    parser.add_argument("--category", default="restaurant")
    parser.add_argument("--cuisine", default="")
    args = parser.parse_args()

    try:
        print(json.dumps(crawl_places(args.latitude, args.longitude, args.dish, args.category, args.cuisine), ensure_ascii=False))
    except Exception as error:
        message = str(error) or "Selenium không lấy được dữ liệu từ Google Maps"
        print(json.dumps({"error": message}, ensure_ascii=False))