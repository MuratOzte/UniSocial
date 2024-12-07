import React from 'react';

function MessageBox() {
  const chats = [
    { name: "Frances Guerrero", message: "Frances sent a photo.", status: "online" },
    { name: "Lori Ferguson", message: "You missed a call from Carolyn 👆", active: true },
    { name: "Samuel Bishop", message: "Day sweetness why cordially 😊" },
    { name: "Dennis Barrett", message: "Happy birthday 🍰" },
    { name: "Judy Nguyen", message: "Thank you!" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sol Menü */}
      <div className="w-1/4 border-r border-gray-300 bg-white p-4">
        <h2 className="font-bold text-lg mb-4">Active chats <span className="ml-2 px-2 py-1 bg-green-100 text-green-600 rounded-full">6</span></h2>
        <input
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none"
          placeholder="Search for chats"
        />
        <ul>
          {chats.map((chat, index) => (
            <li
              key={index}
              className={`flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                chat.active ? "bg-blue-100" : ""
              }`}
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <h4 className="font-bold text-sm">{chat.name}</h4>
                <p className="text-xs text-gray-500">{chat.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sohbet Ekranı */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
          <div>
            <h2 className="font-bold text-lg">Lori Ferguson</h2>
            <p className="text-sm text-green-500">online</p>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {/* Mesajlar */}
          <div className="flex">
            <div className="bg-gray-200 px-4 py-2 rounded-md">
              Congratulations! 👏
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-md">
              And sir dare view but over man So at within mr to simple assure Mr disposing.
            </div>
          </div>

          <div className="flex">
            <div className="bg-gray-200 px-4 py-2 rounded-md">
              Traveling alteration impression 😐 six all uncommonly Chamber hearing.
            </div>
          </div>
        </div>

        {/* Mesaj Girişi */}
        <div className="p-4 border-t bg-white flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
          />
          <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
