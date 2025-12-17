import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Get_vdo_url_status, DoneVDO } from "../utils/registerationPage/Axios_Action";

export default function VideoView({ userInfo }) {
  const [isFinished, setIsFinished] = useState(false);
  const [VideoURLs, setVideoURLs] = useState(null);
  const navigate = useNavigate();

  // เช็กการดู video 70%
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const lastTimeRef = useRef(0);

  const handleTimeUpdate = (e) => {
    const video = e.currentTarget;
    const currentTime = video.currentTime;
    const duration = video.duration;

    // ค้่่าไม่เท่ากับ 0
    if (!duration || duration <= 0 || isNaN(duration)) return;

    const delta = currentTime - lastTimeRef.current;

    if (delta > 0 && delta < 2) {
      setWatchedSeconds(prev => {
        const newWatched = prev + delta;
        const requiredTime = duration * 0.7;

        if (newWatched >= requiredTime && !isFinished) {
          setIsFinished(true);
        }
        return newWatched;
      });
    }
    lastTimeRef.current = currentTime;
  };

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!userInfo || !userInfo.id) return;

    const fetchVideoName = async () => {
      const urls = await Get_vdo_url_status(userInfo.id);
      setVideoURLs(urls.urls);
    };

    fetchVideoName();
  }, [userInfo]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">
        Notification Submit Page
      </h1>

      {!VideoURLs && (
        <div className="bg-white rounded-lg shadow-sm p-4 text-center">
          <p className="text-gray-600 mb-2">วิดีโอยังไม่โหลด</p>
          <button
            onClick={handleReload}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            🔄 โหลดใหม่
          </button>
        </div>
      )}

      {/* Video Frame */}
      <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
        {VideoURLs ? (
          <video
            src={VideoURLs}
            controls
            className="w-full h-auto"
            onTimeUpdate={handleTimeUpdate}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="text-white text-center p-10">
            กำลังรอวิดีโอ...
          </div>
        )}
      </div>

      {userInfo && (
        <p className="text-gray-700 text-center mb-4">
          User: {userInfo.name} {userInfo.surname}
        </p>
      )}

      {isFinished && (
        <div className="text-center">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={async () => {
              await DoneVDO(userInfo.id, 1);
              navigate("/congrat");
            }}
          >
            ไปหน้าถัดไป
          </button>
        </div>
      )}
    </div>
  );
}