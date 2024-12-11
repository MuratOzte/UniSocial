"use client";

import React, { useState, useRef, useEffect } from "react";
import "./EmailCheck.css";
import { useDispatch } from "react-redux";

const OTPInput = () => {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [mailCode, setMailCode] = useState("");

  const inputsRef = useRef([]);

  useEffect(() => {
    setMailCode(() => otp.join(""))
  }, [otp]);

  const handleInputChange = (index, value) => {
    if (isNaN(value)) return;

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
