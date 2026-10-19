FROM node:20-alpine

# O yarn.lock (version 8 / cacheKey 10c0) é do Yarn 4 (Berry)
RUN corepack enable && corepack prepare yarn@4.9.2 --activate

# Garante node_modules tradicional (necessário para o Nest CLI funcionar bem)
ENV YARN_NODE_LINKER=node-modules \
    YARN_ENABLE_TELEMETRY=0 \
    CHOKIDAR_USEPOLLING=true \
    NODE_ENV=development

WORKDIR /app

# Instala dependências em camada separada para aproveitar cache
COPY package.json yarn.lock .yarnrc.yml* ./
RUN yarn install --immutable

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]