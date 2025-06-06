# Stage 1: Build the NestJS project
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# генерация Prisma Client
RUN npx prisma generate

RUN npm run build

# Stage 2: Run the app
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Настройка ENV переменных
ENV NODE_ENV=production

CMD ["node", "dist/main"]

