import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarRegist from "../components/registerationPage/navbarRegister";

export default function Congrat() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <NavbarRegist />

            {/* Background */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 flex items-center justify-center px-4 py-12">

                {/* Card */}
                <div
                    className={`
                        max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8
                        transform transition-all duration-700 ease-out
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                >
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
                        ยินดีด้วย! 🎉
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-center mb-6">
                        คุณได้ดูวิดีโอเรียบร้อยแล้ว
                    </p>

                    {/* Divider */}
                    <div className="w-12 h-1 bg-green-500 mx-auto rounded-full mb-6"></div>

                    {/* Message */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <p className="text-gray-700 text-center text-sm">
                            ขอบคุณที่เข้าร่วมโครงการ<br />
                            <span className="font-medium text-green-600">รอประกาศรางวัลนะครับ</span>
                        </p>
                    </div>

                    {/* Info */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>บันทึกข้อมูลเรียบร้อยแล้ว</span>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-md"
                    >
                        กลับหน้าหลัก
                    </button>
                </div>
            </div>
        </>
    );
} 