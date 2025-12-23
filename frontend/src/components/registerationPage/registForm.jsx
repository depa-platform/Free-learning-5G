import { useState, useEffect } from "react";
import { SubmitAction, GetCourseData } from "../utils/registerationPage/Axios_Action";

export default function RegistForm({ userInfo, setUserInfo, setbuttonstate }) {
  const [errors, setErrors] = useState({}); // เก็บ error ของแต่ละ field
  const [courses, setCourses] = useState([]); // เก็บคอร์สจาก API
  const [loadingCourses, setLoadingCourses] = useState(true); // state สำหรับ loading

  // handle select change
  const handleInternetChange = (e) => {
    setUserInfo((prev) => ({ ...prev, internet: e.target.value }));
  };
  const handleCourseNameChange = (e) => {
    setUserInfo((prev) => ({ ...prev, file_name: e.target.value }));
  };

  // ดึงข้อมูลคอร์สจาก API
  useEffect(() => {
    async function fetchCourses() {
      setLoadingCourses(true);
      try {
        const data = await GetCourseData();
        if (data && Array.isArray(data.courses)) {
          setCourses(data.courses); // data.courses เป็น array ของ string
        } else {
          console.error("Course data is not an array:", data);
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
      setLoadingCourses(false);
    }
    fetchCourses();
  }, []);

  // handle submit button
  const onClickButton = async () => {
    const newErrors = {};

    if (!userInfo?.internet) {
      newErrors.internet = "กรุณาเลือกค่ายอินเทอร์เน็ต";
    }
    if (!userInfo?.file_name) {
      newErrors.file_name = "กรุณาเลือก คอร์สเรียน";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    if (userInfo.id === "เลขบัตรประชาชน") {
      setbuttonstate(true);
    } else {
      setbuttonstate(false);
      await SubmitAction(userInfo);
    }
    
    console.log(userInfo);

  };

  return (
    <div className="min-h-[calc(100vh-5rem)] w-full relative overflow-hidden bg-gray-50 flex items-start justify-center pt-10 pb-20">

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-green-100/40 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-teal-50/50 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto bg-white/80 backdrop-blur-md shadow-2xl shadow-emerald-900/10 rounded-2xl p-8 border border-white/50">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ยืนยันตัวตนเพื่อสมัครเข้าร่วมโครงการ
          </h2>
          <p className="text-gray-500 text-sm">กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนยืนยัน</p>
        </div>

        <form className="space-y-4">
          {/* ID */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">ID</label>
            <input
              type="text"
              value={userInfo.id}
              readOnly
              className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 mb-2 font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">ชื่อจริง (ภาษาไทย)</label>
            <input
              type="text"
              value={userInfo.name}
              readOnly
              className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 mb-2 font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
          </div>

          {/* Surname */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">นามสกุล (ภาษาไทย)</label>
            <input
              type="text"
              value={userInfo.surname}
              readOnly
              className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 mb-2 font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
          </div>

          {/* DOB */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">วันเกิด (วว-ดด-ปป)</label>
            <input
              type="text"
              value={userInfo.dob}
              readOnly
              className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 mb-2 font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">อีเมล</label>
            <input
              type="email"
              value={userInfo.email}
              readOnly
              className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 mb-2 font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
          </div>
          {/* เบอร์โทรศัพท์ */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">เบอร์โทรศัพท์</label>
            <input
              type="text"
              value={userInfo.phoneNumber}
              readOnly
              className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-700 mb-2 font-medium focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
            />
          </div>


          {/* Internet Provider */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">ค่ายสัญญาณอินเทอร์เน็ต</label>
            <select
              value={userInfo.internet}
              onChange={handleInternetChange}
              className={`w-full border rounded-xl p-3 bg-white text-gray-700 mb-1 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all appearance-none
              ${errors.internet ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-green-500"}`}
            >
              <option value="">กรุณาเลือกค่ายสัญญาณอินเทอร์เน็ต</option>
              <option value="AIS">AIS</option>
              <option value="TRUE">TRUE</option>
            </select>
            {errors.internet && (
              <p className="text-red-500 text-sm mt-1">{errors.internet}</p>
            )}
          </div>

          {/* Course Selection */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">คอร์สเรียน</label>
            <select
              value={userInfo.file_name}
              onChange={handleCourseNameChange}
              disabled={loadingCourses || courses.length === 0}
              className={`w-full border rounded-xl p-3 bg-white text-gray-700 mb-1 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all appearance-none
              ${errors.file_name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-green-500"}`}
            >
              <option value="">
                {loadingCourses ? "กำลังโหลดคอร์ส..." : "กรุณาเลือก คอร์สเรียน"}
              </option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {errors.file_name && (
              <p className="text-red-500 text-sm mt-1">{errors.file_name}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={onClickButton}
            type="button"
            className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-green-500/30 transform transition-all duration-200 active:scale-[0.98]"
          >
            ยืนยันการลงทะเบียน
          </button>
        </form>
      </div>
    </div>
  );
}
