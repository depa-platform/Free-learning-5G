import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarRegist from "../components/registerationPage/navbarRegister";

export default function Root() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
            {/* Background Decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
            </div>

            <NavbarRegist />

            {/* Hero Section */}
            <main className="relative z-10 flex-1 pt-20 pb-16 md:pt-32 md:pb-32">
                <div className="mx-auto max-w-6xl px-4 py-16 md:py-12">
                    <div className="text-center animate-fade-in">

                        {/* Hero Title */}
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                            ยินดีต้อนรับสู่โครงการ
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
                                Free Learning 5G
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
                            เรียนรู้เทคโนโลยี 5G ฟรี! พัฒนาทักษะดิจิทัลของคุณ
                            <br className="hidden md:block" />
                            พร้อมก้าวสู่อนาคตแห่งการเชื่อมต่อไร้ขีดจำกัด
                        </p>
                        <br />

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <button
                                onClick={() => navigate("/Regist")}
                                className="group relative px-8 py-4 rounded-2xl bg-emerald-500 text-white font-semibold text-lg shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/30 w-full sm:w-auto overflow-hidden"
                            >

                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full duration-500 transition-transform -skew-x-12 -translate-x-full"></div>
                                <span className="flex items-center justify-center gap-2 relative z-10">
                                    ลงทะเบียนเข้าร่วม
                                    <svg
                                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2.5"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                ),
                                title: "เรียนรู้ฟรี",
                                description: "เนื้อหาคุณภาพสูง อัดแน่นด้วยความรู้ ไม่มีค่าใช้จ่ายตลอดหลักสูตร",
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                ),
                                title: "ได้รับ Certificate",
                                description: "รับใบประกาศนียบัตรรับรองความสามารถทันทีเมื่อเรียนจบ",
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                title: "เทคโนโลยี 5G",
                                description: "อัปเดตเทรนด์เทคโนโลยี 5G ล่าสุดจากผู้เชี่ยวชาญตัวจริง",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="modern-card group cursor-pointer relative overflow-hidden"
                                style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                    <div className="transform rotate-12 scale-150 text-emerald-500">
                                        {feature.icon}
                                    </div>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed group-hover:text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-100 py-8 bg-white/50 backdrop-blur-sm">
                <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">
                        © 2024 <span className="text-emerald-600 font-medium">Free Learning 5G</span> Project. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                    </div>
                </div>
            </footer>
        </div>
    );
}