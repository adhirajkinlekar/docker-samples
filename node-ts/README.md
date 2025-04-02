# 🚀 Dockerized Node.js + TypeScript Project

This project is a **TypeScript-based Node.js application** containerized using **Docker** with a **multi-stage build** setup. It supports **development and production** environments using **Docker Compose**.

## 📂 Project Structure
```
/node-ts-app
│── /src               # Source Code (TypeScript)
│── /dist              # Compiled Output (Generated after build)
│── package.json       # Dependencies & Scripts
│── tsconfig.json      # TypeScript Configuration
│── Dockerfile         # Multi-Stage Dockerfile
│── docker-compose.yml # Docker Compose Setup
│── .dockerignore      # Files to Ignore in Docker
│── .env               # Environment Variables
```

---

## ⚙️ Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (Optional for local development)

---

## 🛠️ Dockerfile Overview
The **multi-stage Dockerfile** consists of four stages:

1. **Base Stage:** Installs **only production dependencies**.
2. **Development Stage:** Copies files, installs **development dependencies**, and runs in `dev` mode.
3. **Build Stage:** Installs both **dev & production dependencies**, compiles TypeScript, and generates a `dist` folder.
4. **Production Stage:** Copies only `dist` and production dependencies for a minimal image.

---

## 🌎 Environment Variables (`.env`)
The `.env` file is used to configure **environment variables**.

```env
NODE_ENV=development
PORT=3000 
```
