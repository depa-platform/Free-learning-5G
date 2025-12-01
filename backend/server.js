import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import registeration from "./Routes/registeration.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// โหลด .env จาก root project
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
// Allow CORS from all origins (for development)
app.use(
  cors({
    origin: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/registeration",registeration); // สำหรับ ลงทะเบรยนและเชคลงทะเบียน
const PORT = process.env.SERVER_PORT || 11111;
const HOST = process.env.HOST || "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
