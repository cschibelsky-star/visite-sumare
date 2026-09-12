FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY data/db.seed.json ./data/db.seed.json
RUN mkdir -p /app/runtime-data /app/runtime-uploads
ENV PORT=8787 DATA_DIR=/app/runtime-data UPLOADS_DIR=/app/runtime-uploads
EXPOSE 8787
CMD ["node","src/server.js"]
