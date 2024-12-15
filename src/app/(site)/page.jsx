"use client";
import { useEffect, useState } from "react";
import Calendar from "../components/common/calendar";

const Main = () => {
  const [file, setFile] = useState(null);
  const events = ["2024-12-5", "2024-12-10","2025-1-8"];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <div className="bg-white">
        <input type="file" onChange={handleFileChange} />

        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            style={{ width: "500px", height: "500px" }}
          />
        )}
      </div>
      <Calendar
        events={events}
      />
    </div>
  );
};

export default Main;
