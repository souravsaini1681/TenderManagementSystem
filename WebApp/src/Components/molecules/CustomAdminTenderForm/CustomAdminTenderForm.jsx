import { useState } from "react";
import { STRING } from "../../../shared/Constants";
import CustomButton from "../../atoms/CustomButton";
import CustomTextInput from "../../atoms/CustomTextInput/CustomTextInput";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

function CustomAdminTenderForm() {
  const [tenderData, setTenderData] = useState({
    name: "",
    description: "",
    startingBid: 0,
    startTime: "",
    endTime: "",
    bufferTime: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!tenderData.name) {
      newErrors.name = "Name is required";
    }
    if (!tenderData.description) {
      newErrors.description = "Description is required";
    }
    if (tenderData.startingBid <= 0) {
      newErrors.startingBid = "Starting bid must be a positive number";
    }
    if (!tenderData.startTime) {
      newErrors.startTime = "Start time is required";
    }
    if (!tenderData.endTime) {
      newErrors.endTime = "End time is required";
    }
    if (new Date(tenderData.startTime) >= new Date(tenderData.endTime)) {
      newErrors.endTime = "End time must be after start time";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    const data = {
      name: tenderData.name,
      startingBid: tenderData.startingBid,
      description: tenderData.description,
      startTime: tenderData.startTime,
      endTime: tenderData.endTime,
      bufferTime: tenderData.bufferTime,
      bids: [],
    };

    try {
      await axios.post("http://localhost:5000/api/tenders", data);
      // Clear the form fields after successful submission
      setTenderData({
        name: "",
        description: "",
        startingBid: 0,
        startTime: "",
        endTime: "",
        bufferTime: "",
      });
      toast("Tender data added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "success",
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.log(err);
      toast("Failed to add tender", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type: "error",
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-2xl p-12 bg-white rounded-lg shadow-md">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-row justify-between items-center space-x-4">
            <p className="text-lg font-semibold text-gray-700">
              {STRING.ADMIN_PANEL.textInputName}
            </p>
            <div className="w-[60%]">
              <CustomTextInput
                value={tenderData.name}
                className="w-full"
                placeholder={"Enter Your Tender Name"}
                onChange={(e) => {
                  setTenderData({ ...tenderData, name: e.target.value });
                }}
              />
              {errors.name && (
                <p className="text-red-500 text-sm pl-2 pt-1">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center space-x-4">
            <p className="text-lg font-semibold text-gray-700">
              {STRING.ADMIN_PANEL.textInputDescription}
            </p>
            <div className="w-[60%]">
              <CustomTextInput
                value={tenderData.description}
                className="w-full"
                placeholder={"Enter Your Tender Description"}
                onChange={(e) => {
                  setTenderData({ ...tenderData, description: e.target.value });
                }}
              />
              {errors.description && (
                <p className="text-red-500 text-sm pl-2 pt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center space-x-4">
            <p className="text-lg font-semibold text-gray-700">
              {STRING.ADMIN_PANEL.startingBid}
            </p>
            <div className="w-[60%]">
              <CustomTextInput
                value={tenderData.startingBid}
                className="w-full"
                placeholder={"Enter Tender's Starting Bid"}
                type="number"
                onChange={(e) => {
                  setTenderData({
                    ...tenderData,
                    startingBid: parseFloat(e.target.value),
                  });
                }}
              />
              {errors.startingBid && (
                <p className="text-red-500 text-sm pl-2 pt-1">
                  {errors.startingBid}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center space-x-4">
            <p className="text-lg font-semibold text-gray-700">
              {STRING.ADMIN_PANEL.startTime}
            </p>
            <div className="w-[60%]">
              <input
                value={tenderData.startTime}
                onChange={(e) => {
                  setTenderData({ ...tenderData, startTime: e.target.value });
                }}
                type="datetime-local"
                className="w-full border border-gray-300 rounded-md p-2 shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm pl-2 pt-1">
                  {errors.startTime}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center space-x-4">
            <p className="text-lg font-semibold text-gray-700">
              {STRING.ADMIN_PANEL.endTime}
            </p>
            <div className="w-[60%]">
              <input
                value={tenderData.endTime}
                type="datetime-local"
                className="w-full border border-gray-300 rounded-md p-2 shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                onChange={(e) => {
                  setTenderData({ ...tenderData, endTime: e.target.value });
                }}
              />
              {errors.endTime && (
                <p className="text-red-500 text-sm pl-2 pt-1">
                  {errors.endTime}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between items-center space-x-4">
            <p className="text-lg font-semibold text-gray-700">
              {STRING.ADMIN_PANEL.bufferTime}
            </p>
            <div className="w-[60%]">
              <input
                value={tenderData.bufferTime}
                type="time"
                className="w-full border border-gray-300 rounded-md p-2 shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                onChange={(e) => {
                  setTenderData({ ...tenderData, bufferTime: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <CustomButton
              text={STRING.ADMIN_PANEL.submitButton}
              className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomAdminTenderForm;
