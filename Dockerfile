FROM node:22 as builder
ARG VOCDONI_ENVIRONMENT
WORKDIR /app
COPY package.json pnpm-lock.yaml .
RUN corepack enable && corepack prepare pnpm@10.16.1 --activate
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
