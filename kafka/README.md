## 🐳 Dockerized Node.js Microservices with Kafka + Zookeeper

This is a **sample project** demonstrating how to build **event-driven Node.js microservices** using:

- **Kafka** for messaging
- **Zookeeper** for Kafka coordination
- **Docker Compose** for orchestration

---

### 📦 Services Included

| Service         | Description                                      |
|-----------------|--------------------------------------------------|
| `user-service`  | A microservice that produces Kafka events        |
| `email-service` | A microservice that consumes Kafka events        |
| `kafka`         | Apache Kafka broker                              |
| `zookeeper`     | Zookeeper (required by Kafka for coordination)   |

---

### ⚙️ Kafka Setup

- Kafka and Zookeeper are powered by **Bitnami Docker images**
- Kafka listens on `kafka:9092` (Docker network hostname)

---

### 🧪 Sample Event Flow

1. `user-service` registers a user and **sends an event** (`user-registered`) to Kafka
2. `email-service` **listens** for `user-registered` events and logs a simulated email notification

---

### 🚀 How to Run

```bash
docker-compose up --build
```

Then you can test the flow by sending a POST request to the user service:

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John", "email":"john@example.com"}'
```

---

### 📂 Folder Structure

```
.
├── user-service/
│   ├── Dockerfile
│   └── index.js
├── email-service/
│   ├── Dockerfile
│   └── index.js
├── docker-compose.yml
└── README.md
```

---

### 🧠 Notes

- Kafka **requires Zookeeper** unless using KRaft (which is not used in this setup).
- Services communicate internally using Docker's default network.
- Event types are handled via a custom field (`eventType`) in the Kafka message payload.

---

Let me know if you want a version using **Kafka without Zookeeper** (KRaft mode) or want to scale up to multiple services/topics.