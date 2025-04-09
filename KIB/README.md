## 📈 K6 Load Testing with Grafana + InfluxDB 

This repo shows how to run [K6](https://k6.io/) performance tests on a Node.js API, and visualize the results in [Grafana](https://grafana.com/) using [InfluxDB](https://www.influxdata.com/).  
This setup is great for **local development**, with manual control over dashboards and data sources in Grafana.

---

### 🐳 Stack Overview

| Service   | Purpose                             |
|-----------|-------------------------------------|
| `api`     | Simple Node.js/Express server       |
| `k6`      | Load testing tool (run manually)    |
| `influxdb`| Metrics database for K6 output      |
| `grafana` | Dashboard UI for visualizing metrics|

---

## 📁 Project Structure

```
.
├── api/                  # Node.js Express API
│   └── index.js
├── k6/                   # K6 test scripts
│   ├── smoke.js
│   ├── load.js
│   └── stress.js
├── docker-compose.yml   # All services
└── README.md            # This file
```

---

## 🚀 Getting Started

### 1. Clone the repo and start services

```bash
docker-compose up -d --build
```

This will start:
- `api` on `http://localhost:3000`
- `influxdb` on `http://localhost:8086`
- `grafana` on `http://localhost:3001` (login: `admin` / `admin`)

---

### 2. Manually configure Grafana

#### ✅ Add InfluxDB as a data source

1. Go to [http://localhost:3001](http://localhost:3001)
2. Sidebar → ⚙️ **Settings** > **Data Sources** > **Add data source**
3. Choose **InfluxDB**
4. Fill in:
   - **URL**: `http://influxdb:8086`
   - **Database**: `k6`
   - **HTTP Method**: GET (default is fine)
5. Click **Save & Test** ✅

#### 📊 Import the K6 Dashboard

1. In Grafana sidebar → **+ > Import**
2. Enter **Dashboard ID**: `2587` <!-- Downloads the JSON from grafana.com and imports it -->
3. Select the **InfluxDB** data source you just created
4. Click **Import**

<!-- 2587 is the official K6 Load Testing Results dashboard -->

You now have a prebuilt K6 dashboard ready to go!
---

## 📌 Running K6 Tests

### Example: Run the test
           
<!-- Use InfluxDB container's network namespace -->
<!-- Mount current directory for access to K6 test scripts -->
<!-- Run the K6 stress test script -->
<!-- Send results to InfluxDB -->

docker run --rm -i `
  --network container:$(docker-compose ps -q influxdb | % { $_.Trim() }) `
  -v "${PWD}:/scripts" `
  grafana/k6 run /scripts/k6/stress.js `
  --out influxdb=http://influxdb:8086/k6


> 💡 Change `/scripts/k6/smoke.js` to `/scripts/k6/load.js` or `stress.js` as needed.

### 🔍 Why a separate K6 container?

Because you're using Docker Compose to run your app and monitoring stack, and K6 itself is just a CLI tool, the cleanest way to run K6 without installing it on your host is to use the official Docker image (grafana/k6) temporarily as a tool container — not a service.

It's a common pattern called the "tooling container pattern.

---

## 🔬 Available Test Scripts

| Script     | Description                     |
|------------|---------------------------------|
| `smoke.js` | Basic test to check API is up   |
| `load.js`  | Simulates steady moderate load  |
| `stress.js`| Simulates high, increasing load |

Each script uses K6's `options` block to control duration, VUs, thresholds, etc.


 