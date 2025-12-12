import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Get_vdo_url_status ,DoneVDO } from "../utils/registerationPage/Axios_Action";

export default function VideoView({ userInfo }) {
  const [isFinished, setIsFinished] = useState(false);
  const [VideoURLs, setVideoURLs] = useState(null);
  const navigate = useNavigate();

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

      {/* Video Frame */}
      <div className="w-full max-w-3xl bg-black rounded-lg overflow-hidden shadow-lg mx-auto mb-4">
        <video
          src={`${VideoURLs}`}
          controls
          className="w-full h-auto"
          onEnded={() => setIsFinished(true)}
        >
          Your browser does not support the video tag.
        </video>
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
