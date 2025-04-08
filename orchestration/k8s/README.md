# 🐳 Kubernetes Microservices Setup with Ingress (Local Dev)

This project demonstrates a basic Kubernetes setup for a multi-service application with Ingress-based routing using **NGINX Ingress Controller**. Services include `home`, `auth`, and `admin`.

---

## 📦 Project Structure

- `home-service`: Public landing site
- `auth-service`: Authentication microservice
- `admin-service`: Admin dashboard 

Each service is containerized using Docker and deployed in the Kubernetes cluster.

---

## 🏗️ Build & Push Docker Images

We use Docker to build images and push them to Docker Hub (or any registry):

```bash
# From each service directory (e.g., ./home-service)
docker build -t yourdockerhub/home-service .
docker push yourdockerhub/home-service

# Repeat for auth-service and admin-service

📝 Note: Kubernetes does not build images itself — it requires container images to deploy pods. All deployments reference these images from a registry, so make sure your images are available and accessible.
```

---

## ☸️ Kubernetes Setup

### Namespaces
All services are deployed under the `backend` namespace:

```bash
kubectl create namespace backend
```

### Services & Deployments
Each service has a corresponding `Deployment` and `ClusterIP Service` defined in YAML files. These expose internal ports for use within the cluster.

To apply the configuration:

```bash
kubectl apply -f ./infra
```
---

## 🌐 Ingress & Routing

To expose services using custom domain routes (like `home.myk8sapp.com`, `admin.myk8sapp.com`), we use a Kubernetes `Ingress` resource with the **NGINX Ingress Controller**.

---

## 📥 Installing NGINX Ingress Controller

Ingress resources need a controller to work — in our case, **NGINX**.

### Why Install NGINX Ingress?
Kubernetes doesn’t come with an Ingress Controller by default. You need to install one so Ingress rules can route traffic to your services.

We use **NGINX Ingress**, deployed via Helm.

---

## ⚙️ Installing Chocolatey & Helm (on Windows)

### Step 1: Install Chocolatey 

Chocolatey is a package manager for Windows that helps install tools like Helm with ease.

👉 Visit the official installation page and follow the instructions:
🔗 https://chocolatey.org/install

💡 Make sure to run the installation in PowerShell as Administrator.

### Step 2: Install Helm

```bash
choco install kubernetes-helm
```

---

## 🚀 Installing NGINX Ingress via Helm

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

# Recommended: install in separate namespace
helm install ingress-nginx ingress-nginx/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

Verify with:

```bash
kubectl get svc -n ingress-nginx
```

---

## 🌍 Local Domain Setup

To simulate custom domains locally (like `admin.myk8sapp.com` or `auth.myk8sapp.com`), you need to map them to `127.0.0.1` in your system's hosts file.

Add these entries to your local `/etc/hosts` or `C:\Windows\System32\drivers\etc\hosts`:

```
127.0.0.1 myk8sapp.com auth.myk8sapp.com admin.myk8sapp.com 
```

Access services via:
- `http://myk8sapp.com`
- `http://auth.myk8sapp.com`
- `http://admin.myk8sapp.com`

---

## 🔐 Note For Production Setup

For production-grade TLS certificates, you can integrate [Cert-Manager](https://cert-manager.io/) with your Kubernetes cluster.

Cert-Manager automates the issuance and renewal of TLS certificates using providers like **Let's Encrypt**, eliminating the need for manual certificate management.
 
Example benefits:
- Automatic HTTPS with valid certificates
- Seamless renewals before expiry
- Works well with NGINX Ingress using simple annotations
 
🧪 For local development, TLS is optional — but it's highly recommended to enable it in staging/production environments.

---

## ✅ Conclusion

This setup enables local Kubernetes development with a production-like routing structure using Ingress and multiple microservices. Easily portable to cloud providers like GKE, EKS, etc. 
 