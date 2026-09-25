FROM node:22-bookworm

RUN apt-get update \
  && apt-get install -y --no-install-recommends chromium chromium-driver python3 python3-pip \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/package*.json ./backend/
RUN npm ci --prefix backend --omit=dev

COPY backend ./backend
COPY crawler ./crawler

RUN pip3 install --break-system-packages --no-cache-dir -r crawler/requirements.txt

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "backend/server.js"]