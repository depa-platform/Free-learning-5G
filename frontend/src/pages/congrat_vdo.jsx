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
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <NavbarRegist />

            <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] animate-blob"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-green-100/40 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-teal-50/50 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
                </div>

                <div
                    className={`
                        relative z-10 w-full max-w-lg bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-200 p-8 md:p-10 text-center
                        transform transition-all duration-700 ease-out
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                >
                    {/* Header Strip or Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center border-4 border-white shadow-sm ring-1 ring-slate-100">
                            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        บันทึกผลการอบรมเรียบร้อยแล้ว
                    </h1>

                    <p className="text-slate-500 mb-8">
                        ระบบได้ทำการบันทึกข้อมูลการเข้าชมวิดีโอของท่านเข้าสู่ฐานข้อมูลแล้ว
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8 text-left">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-0.5">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 text-sm">สถานะ: ดำเนินการเสร็จสิ้น</h3>
                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                    ขอบคุณสำหรับการเข้าร่วมโครงการ 5G Learning Platform <br />
                                    โปรดรอติดตามการประกาศผลรางวัลผ่านช่องทางประชาสัมพันธ์
                                </p>
                                <a href="tel:*102#">กดรับเน็ตฟรี</a>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <span>กลับสู่หน้าหลัก</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>

                    <div className="mt-8 border-t border-slate-100 pt-4">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">
                            Official Training Record
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 