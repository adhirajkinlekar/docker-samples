# ---------- Development Stage ----------
    FROM node:18-alpine AS development

    WORKDIR /app
    
    COPY package*.json ./

    RUN npm install
    
    COPY . .
     
    CMD ["npm", "run", "dev"]
    
    # ---------- Build Stage ----------
    FROM node:18-alpine AS build
    
    WORKDIR /app
    
    COPY package*.json ./

    RUN npm install
    
    COPY . .

    RUN npm run build
    
    # ---------- Production Stage ----------
    FROM nginx:stable-alpine AS production
    
    COPY --from=build /app/dist /usr/share/nginx/html
    
    COPY nginx.conf /etc/nginx/conf.d/default.conf

    CMD ["nginx", "-g", "daemon off;"]
    