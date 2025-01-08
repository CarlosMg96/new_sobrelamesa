# Etapa de dependencias de desarrollo (dev-dep)
FROM node:22-alpine3.19 as dev-dep
LABEL authors="CarlosMg96"
WORKDIR /app

# Copiar package.json y yarn.lock para instalar las dependencias
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Instalar bash y curl, luego obtener el script wait-for-it
RUN apk add --no-cache bash curl && curl -o /wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod +x /wait-for-it.sh

# Etapa de dependencias de producción (dev-prod)
FROM node:22-alpine3.19 as dev-prod
LABEL authors="CarlosMg96"
WORKDIR /app

# Copiar solo las dependencias de producción
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Etapa de desarrollo (dev)
FROM node:22-alpine3.19 as dev
LABEL authors="CarlosMg96"
WORKDIR /app

# Copiar las dependencias de desarrollo desde 'dev-dep'
COPY --from=dev-dep /app/node_modules ./node_modules

# Copiar package.json y yarn.lock para tener las dependencias correctas
COPY package.json yarn.lock ./

# Copiar todo el código fuente desde src
COPY src ./src

# Exponer puertos necesarios para el desarrollo
EXPOSE 3000

# Usar nodemon para reiniciar el servidor automáticamente durante el desarrollo
# Esperar a que otros servicios (como la base de datos) estén disponibles antes de iniciar el servidor
CMD ["./wait-for-it.sh", "db:3306", "--", "./node_modules/.bin/nodemon", "src/index.js"]

# Etapa de producción (prod)
FROM node:22-alpine3.19 as prod
LABEL authors="CarlosMg96"
WORKDIR /app

# Copiar solo package.json y yarn.lock para tener las dependencias de producción
COPY package.json yarn.lock ./

# Exponer puertos necesarios para producción
EXPOSE 3000
EXPOSE 50051

# Copiar las dependencias de producción desde 'dev-prod'
COPY --from=dev-prod /app/node_modules ./node_modules

# Copiar todo el código fuente desde src
COPY src ./src

# Comando para ejecutar la app en producción
CMD ["node", "src/index.js"]
