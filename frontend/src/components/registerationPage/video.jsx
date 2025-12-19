import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Get_vdo_url_status, DoneVDO } from "../utils/registerationPage/Axios_Action";

export default function VideoView({ userInfo }) {
  const [isFinished, setIsFinished] = useState(false);
  const [VideoURLs, setVideoURLs] = useState(null);
  const navigate = useNavigate();

  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const lastTimeRef = useRef(0);

  const [videoDuration, setVideoDuration] = useState(0);

  const requiredPercent = 70;

  const fmtTime = (sec) => {
    if (!sec || sec < 0 || Number.isNaN(sec)) return "00:00";
    const s = Math.floor(sec);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleTimeUpdate = (e) => {
    const video = e.currentTarget;
    const currentTime = video.currentTime;
    const duration = video.duration;

    // กัน duration เพี้ยน/0
    if (!duration || duration <= 0 || isNaN(duration)) return;

    // เก็บ duration เพื่อโชว์ UI (ไม่กระทบ logic หลัก)
    if (videoDuration === 0) setVideoDuration(duration);

    const delta = currentTime - lastTimeRef.current;

    // กัน seek ไม่ให้นับเป็นเวลาที่ดู (logic โค้ด 2)
    if (delta > 0 && delta < 2) {
      setWatchedSeconds((prev) => {
        const newWatched = prev + delta;
        const requiredTime = duration * 0.7; // 70% (logic โค้ด 2)

        if (newWatched >= requiredTime && !isFinished) {
          setIsFinished(true);
        }
        return newWatched;
      });
    }

    lastTimeRef.current = currentTime;
  };

  const handleReload = () => window.location.reload();

  useEffect(() => {
    if (!userInfo?.id) return;

    const fetchVideo = async () => {
      const res = await Get_vdo_url_status(userInfo.id);
      // ให้ปลอดภัยขึ้นนิด (ไม่กระทบ logic)
      setVideoURLs(res?.urls || null);
    };

    fetchVideo();
  }, [userInfo]);

  // ===== UI คำนวณ progress =====
  const progressPercent =
    videoDuration > 0
      ? Math.min(100, Math.round((watchedSeconds / videoDuration) * 100))
      : 0;

  const requiredTimeUI =
    videoDuration > 0 ? (videoDuration * requiredPercent) / 100 : 0;

  const remaining = Math.max(0, requiredTimeUI - watchedSeconds);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            กรุณารับชมวิดีโอให้ครบตามเงื่อนไข
          </h1>
          <p className="mt-2 text-gray-600">
            ปลดล็อกปุ่มทำแบบทดสอบเมื่อดูครบอย่างน้อย{" "}
            <b>{requiredPercent}%</b>
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur border border-emerald-100 rounded-2xl shadow-xl shadow-emerald-900/5 overflow-hidden">
          {/* User strip */}
          <div className="px-4 md:px-6 py-4 border-b border-emerald-50 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center font-extrabold">
                {(userInfo?.name?.[0] || "U").toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {userInfo?.name || "-"} {userInfo?.surname || ""}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  รหัสผู้เรียน: {userInfo?.id || "-"}
                </p>
              </div>
            </div>

            <span
              className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg border ${isFinished
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-orange-50 text-orange-700 border-orange-200"
                }`}
            >
              {isFinished ? "ปลดล็อกแล้ว ✅" : `ยังไม่ครบ ${requiredPercent}%`}
            </span>
          </div>

          {/* Video */}
          <div className="p-3 md:p-6">
            {!VideoURLs ? (
              <div className="aspect-video rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-200 animate-pulse mb-3" />
                <p className="text-gray-600 font-semibold">กำลังโหลดวิดีโอ...</p>

                <button
                  onClick={handleReload}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 transition active:scale-95"
                >
                  โหลดใหม่อีกครั้ง
                </button>
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden bg-black ring-1 ring-black/5">
                <video
                  src={VideoURLs}
                  controls
                  className="w-full h-auto aspect-video object-contain"
                  onTimeUpdate={handleTimeUpdate}
                  controlsList="nodownload"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* ความคืบหน้าเวลาที่ดู videoo */}
            <div className="mt-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-gray-900">ความคืบหน้า</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ดูแล้ว <b className="text-gray-800">{fmtTime(watchedSeconds)}</b> /{" "}
                    <b className="text-gray-800">{fmtTime(videoDuration)}</b>{" "}
                    — เป้าหมาย{" "}
                    <b className="text-emerald-700">{fmtTime(requiredTimeUI)}</b>
                  </p>
                </div>
                <p className="text-sm font-extrabold text-gray-900">
                  {progressPercent}%
                </p>
              </div>

              <div className="mt-3 w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isFinished ? "bg-emerald-500" : "bg-orange-400"
                    }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Next button */}
            <button
              disabled={!isFinished}
              className={`mt-6 w-full px-5 py-3.5 rounded-2xl font-extrabold text-base shadow-xl transition active:scale-[0.99]
                ${isFinished
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-emerald-500/25"
                  : "bg-gray-100 text-gray-400 shadow-transparent cursor-not-allowed"
                }`}
              onClick={async () => {
                await DoneVDO(userInfo.id, 1);
                navigate("/congrat");
              }}
            >
              กดรับสิทธิ์เน็ตฟรี 4GB
            </button>

            {!isFinished && (
              <p className="mt-3 text-center text-xs text-gray-500">
                ต้องดูอีกประมาณ{" "}
                <b className="text-gray-800">{fmtTime(remaining)}</b>{" "}
                เพื่อปลดล็อก
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
