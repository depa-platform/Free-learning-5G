import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client } from "./r2Client.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// โหลด .env จาก root project
dotenv.config({ path: path.resolve(__dirname, "../../.env") });



export async function getSignedVideoURL(fileName) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
  });

  // Signed URL expires in 5 minutes
  return await getSignedUrl(r2Client, command, { expiresIn: 60 * 5 });
}
