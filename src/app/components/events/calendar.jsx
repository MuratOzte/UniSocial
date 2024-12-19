import feedSlice from '@/store/Slices/FeedSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Calendar = ({ events }) => {
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState(new Date());

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    const months = [
        'Ocak',
        'Şubat',
        'Mart',
        'Nisan',
        'Mayıs',
        'Haziran',
        'Temmuz',
        'Ağustos',
        'Eylül',
        'Ekim',
        'Kasım',
        'Aralık',
    ];

    const changeMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const isEventDay = (day) =>
        events.includes(`${currentYear}-${currentMonth + 1}-${day}`);

    const handleDayClick = (day) => {
        const selectedDate = `${day} ${months[currentMonth]} ${currentYear}`;
        const eventExists = isEventDay(day);
        dispatch(
            feedSlice.actions.SelectedCalendarDateChangeHandler(selectedDate)
        );
        console.log(`Seçilen Gün: ${selectedDate}`);
        console.log(
            eventExists
                ? 'Bu gün bir etkinlik var.'
                : 'Bu gün bir etkinlik yok.'
        );
    };

    return (
        <div className="w-full mx-auto mt-6 bg-white shadow-lg rounded-lg p-4">
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

            {/* Takvim İçeriği */}
            <div className="grid grid-cols-7 gap-2 px-3 pb-3">
                {/* Gün Başlıkları */}
                {['P', 'P', 'S', 'Ç', 'P', 'C', 'C'].map((day, index) => (
                    <div
                        key={index}
                        className="text-center font-semibold text-lg text-gray-600"
                    >
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
                            className={`text-center py-1 text-xl rounded-lg cursor-pointer ${
                                isToday
                                    ? 'bg-blue-500 text-white'
                                    : 'text-gray-700'
                            } ${
                                isEventDay(dayNumber)
                                    ? 'border-2 border-red-400'
                                    : 'hover:bg-gray-200'
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
