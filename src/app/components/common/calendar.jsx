import React, { useState } from "react";

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Ay ve yıl bilgisini güncelle
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

  // Fonksiyon: Ayı Değiştir
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Fonksiyon: Etkinlik günlerini kontrol et
  const isEventDay = (day) => events.includes(`${currentYear}-${currentMonth + 1}-${day}`);

  // Gün tıklandığında çağrılan fonksiyon
  const handleDayClick = (day) => {
    const selectedDate = `${day} ${months[currentMonth]} ${currentYear}`;
    const eventExists = isEventDay(day);
    console.log(`Seçilen Gün: ${selectedDate}`);
    console.log(eventExists ? "Bu gün bir etkinlik var." : "Bu gün bir etkinlik yok.");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white shadow-lg rounded-lg">
      {/* Ay ve Yıl Başlığı */}
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={() => changeMonth(-1)}
          className="text-gray-600 hover:text-gray-800 select-none"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {months[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="text-gray-600 hover:text-gray-800 select-none"
        >
          &gt;
        </button>
      </div>

      {/* Takvim İçeriği */}
      <div className="grid grid-cols-7 gap-2 px-4 pb-4">
        {/* Gün Başlıkları */}
        {["P", "P", "S", "Ç", "P", "C", "C"].map((day, index) => (
          <div key={index} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {/* Boş Hücreler */}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={index}></div>
        ))}

        {/* Ayın Günleri */}
        {Array.from({ length: daysInMonth }, (_, day) => {
          const dayNumber = day + 1;
          const isToday =
            dayNumber === currentDate.getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear();

          return (
            <div
              key={dayNumber}
              onClick={() => handleDayClick(dayNumber)}
              className={`text-center py-2 rounded-lg cursor-pointer ${
                isToday ? "bg-blue-500 text-white" : "text-gray-700"
              } ${
                isEventDay(dayNumber)
                  ? "border-2 border-red-400"
                  : "hover:bg-gray-200"
              }`}
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