FROM oven/bun:1.4.4 AS runtime
WORKDIR /workspace
COPY package.json ./
COPY bun.lock ./
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json
COPY packages/contracts/package.json ./packages/contracts/package.json
RUN bun install --production --frozen-lockfile
COPY apps/api ./apps/api
COPY packages/contracts ./packages/contracts
WORKDIR /workspace/apps/api
ENV PORT=3001
EXPOSE 3001
CMD ["bun", "run", "start"]
