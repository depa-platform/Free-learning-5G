import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// โหลด .env จาก root project
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_STORAGE_URL}`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});