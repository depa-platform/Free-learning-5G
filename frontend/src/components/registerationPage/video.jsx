import React, { useState , useEffect } from "react";
import { Get_vdo_url } from "../utils/registerationPage/Axios_Action";
export default function VideoView({ userInfo }) {
  const [isFinished, setIsFinished] = useState(false);

  const [VideoURLs, setVideoURLs] = useState(null);

  useEffect(() => {
    if (!userInfo || !userInfo.id) return;
    //chagne
    const fetchVideoName = async () => {
      const urls = await Get_vdo_url(userInfo.id);
      
      setVideoURLs(urls);
      
    };

    fetchVideoName();
  }, [userInfo]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">
        Notification Submit Page
      </h1>

      {/* Video Frame - centered horizontally */}
      <div className="w-full max-w-3xl bg-black rounded-lg overflow-hidden shadow-lg mx-auto mb-4">
        <video
          src={`${VideoURLs}`}
          controls
          className="w-full h-auto"
          onEnded={() => setIsFinished(true)}   // 👉 วิดีโอจบแล้วให้โชว์ปุ่ม
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Optional: Video info */}
      {userInfo && (
        <p className="text-gray-700 text-center mb-4">
          User: {userInfo.name} {userInfo.surname}
        </p>
      )}

      {/* Next Button - จะปรากฏเฉพาะตอนวิดีโอเล่นจบ */}
      {isFinished && (
        <div className="text-center">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() => console.log("ไปหน้าถัดไป")}
          >
            ไปหน้าถัดไป
          </button>
        </div>
      )}
    </div>
  );
}
