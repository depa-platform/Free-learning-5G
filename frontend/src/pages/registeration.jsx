import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  DB_Name_Checker,
  Get_vdo_url_status,
  getThangRatInfo
} from "../components/utils/registerationPage/Axios_Action";

import NavbarRegist from "../components/registerationPage/navbarRegister";
import RegistForm from "../components/registerationPage/registForm";
import VideoView from "../components/registerationPage/video";

const formatDOB = (s) =>
  s && s.length === 8 ? `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}` : "";

export default function RegistrationForm() {
  const [userInfo, setUserInfo] = useState({
    name: "ชื่อ",
    surname: "นามสกุล",
    id: "เลขบัตรประชาชน",
    email: "อีเมล",
    dob: "วว ดด ปป",
    phoneNumber: "เบอร์โทรศัพท์",
    internet: "ค่ายสัญญาณ",
    file_name: "คลิปวิดีโอ"
  });
  //Param Serach QueryString
  const [searchParams] = useSearchParams();
  const calledRef = useRef(false);

  // UI states
  const [buttonState, setButtonState] = useState(true);

  // null = loading, true/false = already checked
  const [isRegistered, setIsRegistered] = useState(null);

  // null = loading, true = watched, false = not watched
  const [isDoneVDO, setIsDoneVDO] = useState(null);



  //  ดึงข้อมูลจากmk'รัฐ (ครั้งเดียว)
  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    (async () => {
      const appId = window.czpSdk?.getAppId?.() || searchParams.get("appId");
      const mToken = window.czpSdk?.getToken?.() || searchParams.get("mToken");
      if (!appId || !mToken) return;

      const data = await getThangRatInfo(appId, mToken);
      const p = data?.result;
      if (!p) return;

      setUserInfo((prev) => ({
        ...prev,
        name: p.firstName || "ชื่อ",
        surname: p.lastName || "นามสกุล",
        id: p.citizenId || "เลขบัตรประชาชน",
        email: p.email || "อีเมล",
        dob: formatDOB(p.dateOfBirthString) || "วว ดด ปป",
        phoneNumber: p.mobile || "เบอร์โทรศัพท์",
      }));
    })();
  }, [searchParams]);

  // 2) พอมี citizenId แล้วค่อยเช็ค DB + วิดีโอ
  useEffect(() => {
    if (!userInfo.id) return;

    (async () => {
      try {
        const regStatus = await DB_Name_Checker(userInfo);
        setIsRegistered(regStatus);

        if (regStatus) {
          const vdoStatus = await Get_vdo_url_status(userInfo.id);
          setIsDoneVDO(Boolean(vdoStatus?.IsSuccess));
        } else {
          setIsDoneVDO(false);
        }
      } catch (error) {
        console.error("Error loading registration data:", error);
      }
    })();
  }, [userInfo.id]);

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
