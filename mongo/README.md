# MongoDB Docker Setup with Replica Set  
MongoDB is a NoSQL document database designed for scalability, flexibility, and high performance. Unlike traditional relational databases, MongoDB stores data in JSON-like BSON documents, allowing for a more dynamic and schema-less approach to data storage.

This setup runs **MongoDB 6** with **replication enabled**. MongoDB requires a **replica set** to support **multi-document transactions**, so replication is configured even for a single-node deployment.  

## 🚀 Why Enable a Replica Set?  

By default, MongoDB runs as a **standalone instance**, which **does not support transactions**. To use **ACID-compliant transactions**, MongoDB must be part of a **replica set**, even if there is only one node.  

This setup ensures that transactions are supported by:  
1. **Starting MongoDB with replication enabled** (`--replSet rs0`).  
2. **Initializing a replica set** after MongoDB starts.  

## 📂 Docker Compose Overview  

### Services  

- **mongo**  
  - Runs the official `mongo:6` image  
  - Starts with replication enabled:  
    ```yaml
    command: ["mongod", "--replSet", "rs0", "--bind_ip_all"]
    ```
  - Uses `mongo_data` for persistent storage  

- **mongo-init**  
  - Waits for MongoDB to be ready  
  - Runs a one-time command to **initialize the replica set**:  
    ```yaml
    entrypoint: [ "sh", "-c", "sleep 5 && mongosh --host mongo:27017 --eval 'rs.initiate({_id:\"rs0\", members:[{_id:0, host:\"mongo:27017\"}]})'" ]
    ```
  - This step is necessary to enable transactions  

## 🔧 Usage Instructions  

1. **Start MongoDB**  
   ```bash
   docker-compose up -d
   ```  

2. **Verify the replica set is active (optional)**  
   ```bash
   docker exec -it mongo_rs mongosh --eval "rs.status()"
   ```  

3. **Stop and remove containers**  
   ```bash
   docker-compose down
   ```  

## 🔗 Additional Resources  

- [MongoDB Transactions](https://www.mongodb.com/docs/manual/core/transactions/)  
- [Replica Set Configuration](https://www.mongodb.com/docs/manual/replication/)  

 

 