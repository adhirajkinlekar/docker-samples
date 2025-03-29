# MinIO Docker Setup  

This setup runs **MinIO**, a high-performance, S3-compatible object storage solution, using Docker. The configuration ensures that MinIO starts properly, initializes a **default bucket**, and includes **health checks** for better reliability.  

## 🚀 Why Use MinIO?  

MinIO is an **open-source object storage** designed for high availability, scalability, and cloud-native environments. It provides:  
- **S3 Compatibility** – Works seamlessly with AWS S3 APIs.  
- **High Performance** – Optimized for fast data access and retrieval.  
- **Scalability** – Supports distributed deployments.  
- **Self-Hosting** – Allows full control over your storage infrastructure.  

## 📂 Docker Compose Overview  

### 🔹 Services  

- **minio**  
  - Uses the `minio/minio` image (specified release version).  
  - Exposes:  
    - **Port 9000** (for S3 API access).  
    - **Port 9001** (for the MinIO web console).  
  - Configured with environment variables for credentials and settings.  
  - Initializes a **dummy bucket** (`dummy-bucket`) if it does not already exist.  
  - Implements a **health check** to ensure MinIO is running correctly.  

### 🔹 Environment Variables  

| Variable              | Description                               |
|----------------------|-------------------------------------------|
| `MINIO_UPDATE`       | Disables auto-updates for stability.      |
| `MINIO_ADDRESS`      | Specifies the MinIO API address.          |
| `MINIO_CONSOLE_ADDRESS` | Sets the MinIO web console address.   |
| `MINIO_ROOT_USER`    | Defines the MinIO admin username.        |
| `MINIO_ROOT_PASSWORD` | Defines the MinIO admin password.       |
| `MINIO_REGION_NAME`  | Specifies the storage region.            |

## 🔧 Usage Instructions  

1. **Start MinIO**  
   ```bash
   docker-compose up -d
   ```  

2. **Access the MinIO Web Console**  
   Open your browser and navigate to:  
   ```
   http://localhost:9001
   ```
   Log in using:  
   - **Username:** `dummy-user`  
   - **Password:** `dummy-password`  

3. **Verify MinIO Health Status**  
   ```bash
   curl -f http://localhost:9000/minio/health/live
   ```  

4. **List Available Buckets**  
   ```bash
   docker exec -it minio mc alias set minio http://localhost:9000 dummy-user dummy-password
   docker exec -it minio mc ls minio
   ```  

5. **Stop and Remove Containers**  
   ```bash
   docker-compose down
   ```  

## 🔗 Additional Resources  

- [MinIO Documentation](https://min.io/docs/)  
- [MinIO S3 API Reference](https://min.io/docs/minio/linux/developers/s3-api.html)  

 
 