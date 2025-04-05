# ========================
# BASE STAGE
# ========================

FROM node:20-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production

# ========================
# DEVELOPMENT STAGE
# ========================
FROM node:20-alpine AS development

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=development  

RUN npm install --only=development

CMD ["npm", "run", "dev"]

# ========================
# BUILD STAGE
# ========================
FROM node:20-alpine AS build

WORKDIR /app

COPY --from=development /app ./

RUN npm run build 

# ========================
# PRODUCTION STAGE
# ========================
FROM node:20-alpine AS production

WORKDIR /app

# Set NODE_ENV to ensure proper production behavior, even if the container is started without Docker Compose
ENV NODE_ENV=production  

# Node JS requires node modules unlike fe apps like React 
COPY --from=base /app/node_modules ./node_modules

COPY --from=build /app/dist ./dist 

CMD ["node", "dist/index.js"]
