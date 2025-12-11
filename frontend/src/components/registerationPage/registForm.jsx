import { useState } from "react";
import { SubmitAction } from "../utils/registerationPage/submit_Action";
export default function RegistForm({ userInfo, setUserInfo, setbuttonstate }) {
  const [errors, setErrors] = useState({}); // เก็บ error ของแต่ละ field

  // handle select change
  const handleInternetChange = (e) => {
    setUserInfo((prev) => ({ ...prev, internet: e.target.value }));
  };

  const onClickButton = () => {
    let newErrors_internetProvider = {};
    let newErrors_CourseSelection= {}
    // ตรวจช่องที่ต้องใส่
    if (!userInfo?.internet) newErrors_internetProvider.internet = "กรุณาเลือกค่ายอินเทอร์เน็ต";
        setErrors(newErrors_internetProvider);

    if (!userInfo?.video_name) newErrors_CourseSelection.video_name = "กรุณาเลือกค่ายอินเทอร์เน็ต";
        setErrors(newErrors_CourseSelection);
    // ถ้ามี error ไม่ให้ไปต่อ
    if (Object.keys(newErrors_internetProvider).length > 0 || Object.keys(newErrors_CourseSelection).length > 0) return;
        // ถ้าครบ setButtonState
        setbuttonstate(false);
        //ใส่ action ของ button 
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

        {/* Internet Provider */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">ค่ายสัญญาณอินเทอเน็ต</label>
          <select
            value={userInfo.internet}
            onChange={handleInternetChange}
            className={`w-full border rounded-md p-2 bg-gray-100 text-gray-700 
              ${errors.internet ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">กรุณาเลือกค่ายสัญญาณอินเทอเน็ต</option>
            <option value="AIS">AIS</option>
            <option value="TRUE">TRUE</option>
          </select>

          {/* Error message */}
          {errors.internet && (
            <p className="text-red-500 text-sm mt-1">{errors.internet}</p>
          )}
        </div>

        {/* Course Selection */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">ค่ายสัญญาณอินเทอเน็ต</label>
          <select
            value={userInfo.internet}
            onChange={handleInternetChange}
            className={`w-full border rounded-md p-2 bg-gray-100 text-gray-700 
              ${errors.internet ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">กรุณาเลือกค่ายสัญญาณอินเทอเน็ต</option>
            <option value="AIS">AIS</option>
            <option value="TRUE">TRUE</option>
          </select>

          {/* Error message */}
          {errors.internet && (
            <p className="text-red-500 text-sm mt-1">{errors.internet}</p>
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
