import axios from "axios"
import React from "react"

export async function SubmitAction(userInfo) {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND}/api/uploadRegist_Info`,
            userInfo, // send userInfo as JSON
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log("Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error uploading user info:", error);
        throw error; // rethrow if you want to handle it elsewhere
    }
}

export async function DB_Name_Checker(userInfo) {
    //TODO : เอาไว้เชคว่ามรายชื่อใน database มั้ย
    //TODO : return (True) ถ้า มีแล้ว
    //TODO : return (False) ถ้ายังไม่มี
    try {
        const backendUrl = `${import.meta.env.VITE_BACKEND}/api/getRegist_Info/CheckList`;

        // userInfo.id will be converted to ?id=123456789
        const response = await axios.get(backendUrl, { params: { id: userInfo.id } });

        // Server returns JSON like { exists: true/false }
        console.log(response.data.status)
        return response.data.status;

    } catch (error) {
        console.error("Error checking user in DB:", error);
        return false; // fallback if request fails
    }
}


export async function GetCourseData() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/getCourse`); // เปลี่ยนเป็น URL ของคุณ
    return response.data; // คืนค่าเฉพาะข้อมูลจาก API
  } catch (error) {
    console.error("Error fetching course data:", error);
    return null; // หรือ return [] ถ้าอยากให้เป็น array ว่าง
  }
}