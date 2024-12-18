"use client";

import React, { useState, useRef, useEffect } from "react";
import "./EmailCheck.css";
import { useDispatch, useSelector } from "react-redux";
import registerSlice from "@/store/Slices/RegisterSlice";

const OTPInput = () => {
  const dispatch = useDispatch();
  const register = useSelector((state) => state.register);

  const [otp, setOtp] = useState(["", "", "", ""]);

  // Referanslar
  const inputsRef = useRef([]);

  useEffect(() => {
    const otpValue = otp.join("");
    dispatch(registerSlice.actions.mailCodeChangeHandler(otpValue));
  }, [otp]);

  const handleInputChange = (index, value) => {
    if (isNaN(value) || value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyUp = (index, key) => {
    if (key === "Backspace" || key === "Delete") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
    if (key === "Space") {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <div className="container">
      <div className="inputs">
        {otp.map((value, index) => (
          <input
            key={index}
            className="input"
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyUp={(e) => handleKeyUp(index, e.key)}
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
