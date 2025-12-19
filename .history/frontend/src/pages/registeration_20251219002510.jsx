import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  DB_Name_Checker,
  Get_vdo_url_status
} from "../components/utils/registerationPage/Axios_Action";

import NavbarRegist from "../components/registerationPage/navbarRegister";
import RegistForm from "../components/registerationPage/registForm";
import VideoView from "../components/registerationPage/video";

export default function RegistrationForm() {
  const [userInfo, setUserInfo] = useState({
    name: "John",
    surname: "Doe",
    id: "12666669",
    email: "john.doe@example.com",
    dob: "1990-01-01",
    phoneNumber: "0933456790",
    internet: "",
    file_name: ""
  });
  //Param Serach QueryString
  const [searchParams] = useSearchParams();

  // UI states
  const [buttonState, setButtonState] = useState(true);

  // null = loading, true/false = already checked
  const [isRegistered, setIsRegistered] = useState(null);

  // null = loading, true = watched, false = not watched
  const [isDoneVDO, setIsDoneVDO] = useState(null);

  // ===== GET DATA FROM SERVER =====
  useEffect(() => {
    let mToken = searchParams.get("mToken");
    let appID = searchParams.get("appId");

    if (!window.czpSdk) {
      console.error("CZP SDK not loaded");
      return;
    }

    async function loadData() {
      try {
        // เช็คว่าลงทะเบียนหรือยัง
        const regStatus = await DB_Name_Checker(userInfo);
        setIsRegistered(regStatus);

        console.log(userInfo);
        console.log(regStatus);

        // เช็ควิดีโอดูเสร็จหรือยัง
        if (regStatus) {
          const vdoStatus = await Get_vdo_url_status(userInfo.id);
          setIsDoneVDO(Boolean(vdoStatus?.IsSuccess));
        } else {
          setIsDoneVDO(false);
        }

      } catch (error) {
        console.error("Error loading registration data:", error);
      }
    }
    loadData();
    console.log("CZP appId:", window.czpSdk.getAppId());
    console.log("CZP token:", window.czpSdk.getToken());
  }, [userInfo]);

  // ===== UI RENDER LOGIC =====
  return (
    <>
      <NavbarRegist />

      {/* 1) Loading register status */}
      {isRegistered === null ? (
        <h1 className="text-center mt-10">กำลังเช็คข้อมูล...</h1>
      ) : (

        /* 2) ถ้าลงทะเบียนแล้ว */
        isRegistered ? (
          isDoneVDO === null ? (
            // 2.0 Loading video status
            <h1 className="text-center mt-10">กำลังโหลดสถานะวิดีโอ...</h1>
          ) : isDoneVDO === true ? (
            // 2.1 ดูแล้ว
            <Navigate to="/congrat" replace />
          ) : (
            // 2.2 ยังไม่ดู → ดูวิดีโอ
            <VideoView userInfo={userInfo} />
          )

        ) : (

          /* 3) ยังไม่ลงทะเบียน */
          buttonState ? (
            <RegistForm
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setbuttonstate={setButtonState}
            />
          ) : (
            /* 4) ดูวิดีโอที่เลือกมาจากการกดลงทะเบียน */
            <VideoView userInfo={userInfo} />
          )
        )
      )}
    </>
  );
}
