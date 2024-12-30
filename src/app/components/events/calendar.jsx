import feedSlice from "@/store/Slices/FeedSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Calendar = () => {
  const dispatch = useDispatch();
  const Reduxfeed = useSelector((state) => state.feed);
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isEventDay = (day) =>
    Reduxfeed.sharedEventsDate.includes(`${currentYear}-${currentMonth + 1}-${day}`);

  const handleDayClick = (day) => {
    const selectedDate = `${currentYear}-${1 + currentMonth}-${day}`;
    if (Reduxfeed.SelectedCalendarDate == selectedDate) {
      dispatch(feedSlice.actions.SelectedCalendarDateChangeHandler(null));
    } else {
      dispatch(
        feedSlice.actions.SelectedCalendarDateChangeHandler(selectedDate)
      );
    }

    const eventExists = isEventDay(day);
    console.log(`Seçilen Gün: ${selectedDate}`);
    console.log(
      eventExists ? "Bu gün bir etkinlik var." : "Bu gün bir etkinlik yok."
    );
  };

  return (
    <div className="w-[350px] mx-auto mt-6 bg-white shadow-lg rounded-lg p-4">
      <div className="p-3 flex justify-between items-center">
        <button
          onClick={() => changeMonth(-1)}
          className="text-xl text-gray-600 hover:text-gray-800 select-none"
        >
          &lt;
        </button>
        <h2 className="text-2xl font-semibold">
          {`${months[currentMonth]} ${currentYear}`}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="text-xl text-gray-600 hover:text-gray-800 select-none"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 px-3 pb-3">
        {["P", "P", "S", "Ç", "P", "C", "C"].map((day, index) => (
          <div
            key={index}
            className="text-center font-semibold text-lg text-gray-600"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: startDay }).map((_, index) => (
          <div key={index}></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, day) => {
          const dayNumber = day + 1;
          const isToday =
            dayNumber === currentDate.getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear();
          const selectedDate = `${currentYear}-${
            currentMonth + 1
          }-${dayNumber}`;
          const isSelected = Reduxfeed.SelectedCalendarDate === selectedDate;

          return (
            <div
              key={dayNumber}
              onClick={() => handleDayClick(dayNumber)}
              className={`text-center py-1 text-xl rounded-lg cursor-pointer ${
                isToday ? "bg-blue-500 text-white" : "text-gray-700"
              } ${
                isEventDay(dayNumber)
                  ? "border-2 border-red-400"
                  : "hover:bg-gray-200"
              }${isSelected ? " bg-green-500 text-white" : ""}
                            `}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
