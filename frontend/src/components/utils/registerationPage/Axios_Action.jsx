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
    //console.log(response.data.status)
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

export async function Get_vdo_url_status(id) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/getRegist_Info/Check_vdo?id=${id}`
    );
    //console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching video name:", error);
    return null;
  }
}

export async function DoneVDO(id) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/getRegist_Info/Check_vdo/isDone?id=${id}&Issuccess=${1}`
    );

    //console.log("DoneVDO Response:", response);
    return response.data;

  } catch (error) {
    console.error("Error updating VDO status:", error);
    return null;
  }
}

const GOV_AUTH_BASE = import.meta.env.VITE_BASE_API;
const GOV_CZP_BASE = import.meta.env.VITE_BASE_API_ENV;

export async function getThangRatInfo(appId, mToken) {
  try {
    const validateResp = await axios.get(`${GOV_AUTH_BASE}/validate`, {
      params: {
        ConsumerSecret: import.meta.env.VITE_CONSUMER_SECRET,
        AgentID: import.meta.env.VITE_APP_ID,
      },
      headers: {
        "Consumer-Key": import.meta.env.VITE_CONSUMER_KEY,
        "Content-Type": "application/json",
      },
    });

    // ดูให้ชัวร์ (เอาออกทีหลัง)
    console.log("validateResp.data:", validateResp.data);

    const govToken =
      validateResp?.data?.Result ||
      validateResp?.data?.result ||
      validateResp?.data?.data?.Result ||
      validateResp?.data?.data?.result;

    if (!govToken) throw new Error("validate failed: missing Result token");

    const deprocResp = await axios.post(
      `${GOV_CZP_BASE}/v1/core/shield/data/deproc`,
      { AppId: appId, MToken: mToken },
      {
        headers: {
          "Consumer-Key": import.meta.env.VITE_CONSUMER_KEY,
          "Content-Type": "application/json",
          Token: govToken,
        },
      }
    );

    return deprocResp.data;
  } catch (error) {
    console.error("Error fetching Thang Rat Info:", error?.response?.data || error.message);
    return null;
  }
}