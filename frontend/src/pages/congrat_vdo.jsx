import React, { useState, useEffect } from "react";
import NavbarRegist from "../components/registerationPage/navbarRegister";
export default function Congrat(){
    return(
        <>
        <NavbarRegist/>
        <h1 className="text-center mt-10">
              คุณได้ดูวิดีโอเรียบร้อยแล้ว รอประกาศรางวัลนะครับ 🎉
        </h1>
        </>
    )
}