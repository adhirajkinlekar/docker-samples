import express from "express";
import multer from "multer";
import { Client } from "minio";  

const app = express();

const port = 5000;

// MinIO Client Setup
const minioClient = new Client({
    region:"us-east-1",
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: "dummy-user",
    secretKey: "dummy-password",
});

// Bucket Name
const bucketName = "dummy-bucket";

// Use Memory Storage (Prevents Local File Creation)
const storage = multer.memoryStorage();

const upload = multer({ storage });

// API: Upload Image to MinIO
app.post("/upload", upload.single("file"), async (req, res) => {
    try {

        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const fileName = `${Date.now()}-${req.file.originalname}`;
        
        // Upload directly from buffer to MinIO
        await minioClient.putObject(bucketName, fileName, req.file.buffer);

        res.json({
            message: "✅ File uploaded successfully",
            fileUrl: `http://localhost:9001/browser/${bucketName}/${fileName}`,
        });
    } 
    catch (error) {

        console.error("❌ Upload Error:", error);
        
        res.status(500).json({ error: "File upload failed" });
    }
});

app.listen(port, async () => console.log(`Server running at http://localhost:${port}`));
