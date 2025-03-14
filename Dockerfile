FROM node:20.10-alpine

WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar archivos de pnpm primero para aprovechar el caché
COPY pnpm-lock.yaml ./
COPY package.json ./

# Instalar dependencias con pnpm
RUN pnpm install --frozen-lockfile

# Copiar el resto de archivos
COPY . .

# Construir la aplicación
RUN pnpm build

# Exponer el puerto
EXPOSE 3000

# Iniciar la aplicación
CMD ["pnpm", "start"]