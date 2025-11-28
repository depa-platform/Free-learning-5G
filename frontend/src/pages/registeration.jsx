import React, { useState } from "react";
import NavbarRegist from "../components/registerationPage/navbarRegister";
import RegistForm from "../components/registerationPage/registForm";
export default function RegistrationForm() {
  // Example data
  const [userInfo, setUserInfo] = useState({
    name: "John",
    surname: "Doe",
    id: "123456789",
    email: "john.doe@example.com",
    dob: "1990-01-01",
    phoneNumber: "0933456790",
    internet: ""
  });
  let [buttonstate,setbuttonstate] = useState(true)
  return (
    <>
      <NavbarRegist />
        {
        buttonstate ?
            <RegistForm userInfo={userInfo} setUserInfo={setUserInfo} setbuttonstate={setbuttonstate}/>
            :
            <h1 className="flex justify-center items-center min-h-screen" >NotiSubmit</h1>
        }
      
      
    </>
  );
}
