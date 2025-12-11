import React, { useState, useEffect } from "react";
import { DB_Name_Checker } from "../components/utils/registerationPage/Axios_Action";
import NavbarRegist from "../components/registerationPage/navbarRegister";
import RegistForm from "../components/registerationPage/registForm";
import NotiSubmit from "../components/registerationPage/notisubmit";

export default function RegistrationForm() {
  const [userInfo, setUserInfo] = useState({
    name: "John",
    surname: "Doe",
    id: "12345679",
    email: "john.doe@example.com",
    dob: "1990-01-01",
    phoneNumber: "0933456790",
    internet: "",
    file_name:"",
    success:0
  });

  const [buttonstate, setbuttonstate] = useState(true);
  const [isRegistered, setIsRegistered] = useState(null); // null = ยังไม่เช็ค

  useEffect(() => {
    async function checkDB() {
      const result = await DB_Name_Checker(userInfo);
      setIsRegistered(result);
    }
    checkDB();
  }, [userInfo]);

  return (
    <>
    {/* Logic :
        เชคว่าได้มีการลงทะเบียนรึยัง 
          ถ้ายัง ให้ไป ลงทะเบียนก่อน
          ถ้าใช่ ให้ไป ดูคลิปเลย

          ดูจบมั้ย
            ดูจบ :   ไป แจ้งเตือนรุ้นรางวัล
            ดูไปจบ : ไป ดูวิดีโอ

    */}
      <NavbarRegist />
      {isRegistered === null ? (
        <h1>กำลังเช็คข้อมูล...</h1>
      ) : isRegistered ? (                            //เชค ว่าได้ลงทะเบียนมาในระบบรึยัง ?
        //ดูคลิป  ( Component )                       
        <h1>ไปหน้าที่เป็นว่าอัพโหลดเอกสาร certificate</h1>
      ) : buttonstate ? (
        <RegistForm 
          userInfo={userInfo} 
          setUserInfo={setUserInfo} 
          setbuttonstate={setbuttonstate}
        />
      ) : (
        //ดูคลิป  ( Component )
        <h1>ไปหน้าที่เป็นว่าอัพโหลดเอกสาร certificate</h1>
      )}
    </>
  );
}
