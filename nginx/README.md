# ⚛️ React + Vite + NGINX Docker Setup

This project sets up a Dockerized environment for building and serving a React app using Vite. It supports both development and production workflows using multi-stage Docker builds.

---

## 📌 Key Features

- **Development Mode**: Uses Node.js with Vite for fast refresh and local development.
- **Production Mode**: Builds the app and serves it with NGINX for efficient static delivery.
- **Docker Compose Support**: Simplifies running and switching between modes.
- **NGINX Configuration**: Handles client-side routing for single-page applications.

---

## 🛠️ Development Workflow

- Run with Docker Compose in development mode.
- Mounts the local project for live editing.
- Exposes the Vite development server.

---

## 🚀 Production Workflow

- Builds the React app into static files.
- Uses NGINX to serve those files.
- Useful for staging or deployment environments.

---

## ⚙️ Configuration

- The Dockerfile handles all stages (development, build, production).
- Docker Compose reads from an optional `.env` file.
- NGINX is configured to support React SPA routing (`index.html` fallback).

---

## ✅ Running the App

- Use Docker Compose with `development` or `production` target.
- Access your app at the appropriate port (Vite for dev, NGINX for prod).
 
 