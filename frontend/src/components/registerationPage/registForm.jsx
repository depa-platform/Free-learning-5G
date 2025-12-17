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
  const onClickButton = () => {
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

    setbuttonstate(false);
    console.log(userInfo);
    SubmitAction(userInfo);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        ยืนยันตัวตนเพื่อสมัครเข้าร่วมโครงการ
      </h2>

      <form className="space-y-4">
        {/* ID */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">ID</label>
          <input
            type="text"
            value={userInfo.id}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700 mb-2"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">ชื่อจริง (ภาษาไทย)</label>
          <input
            type="text"
            value={userInfo.name}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700 mb-2"
          />
        </div>

        {/* Surname */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">นามสกุล (ภาษาไทย)</label>
          <input
            type="text"
            value={userInfo.surname}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700 mb-2"
          />
        </div>

        {/* DOB */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">วันเกิด (วว-ดด-ปป)</label>
          <input
            type="text"
            value={userInfo.dob}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700 mb-2"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">อีเมล</label>
          <input
            type="email"
            value={userInfo.email}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700 mb-2"
          />
        </div>
        {/* เบอร์โทรศัพท์ */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">เบอร์โทรศัพท์</label>
          <input
            type="text"
            value={userInfo.phoneNumber}
            readOnly
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700 mb-2"
          />
        </div>


        {/* Internet Provider */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">ค่ายสัญญาณอินเทอร์เน็ต</label>
          <select
            value={userInfo.internet}
            onChange={handleInternetChange}
            className={`w-full border rounded-md p-2 bg-gray-100 text-gray-700 
              ${errors.internet ? "border-red-500" : "border-gray-300"}`}
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
            className={`w-full border rounded-md p-2 bg-gray-100 text-gray-700 
              ${errors.file_name ? "border-red-500" : "border-gray-300"}`}
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
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          ยืนยันการลงทะเบียน
        </button>
      </form>
    </div>
  );
}
