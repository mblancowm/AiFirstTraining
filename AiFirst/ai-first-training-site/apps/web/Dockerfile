FROM oven/bun:1.4.4 AS build
WORKDIR /workspace
COPY package.json ./
COPY bun.lock ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/contracts/package.json ./packages/contracts/package.json
RUN bun install --frozen-lockfile
COPY apps/web ./apps/web
COPY packages/contracts ./packages/contracts
RUN bun run build:web

FROM nginx:stable-alpine
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/apps/web/dist/client /usr/share/nginx/html
EXPOSE 8080
