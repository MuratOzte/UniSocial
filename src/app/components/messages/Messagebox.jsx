import React, { useState } from "react";

function App() {
  const initialChats = [
    {
      id: 1,
      name: "Frances Guerrero",
      message: "Frances sent a photo.",
      status: "online",
      conversation: [
        { sender: "Frances", text: "Hey! Check this out 👀", type: "received" },
        { sender: "You", text: "Nice photo! 📸", type: "sent" },
      ],
    },
    {
      id: 2,
      name: "Lori Ferguson",
      message: "You missed a call from Carolyn 👆",
      status: "online",
      conversation: [
        { sender: "Lori", text: "Congratulations! 👏", type: "received" },
        { sender: "You", text: "Thank you so much! 😊", type: "sent" },
      ],
    },
  ];

  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(initialChats[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecipient, setNewRecipient] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const handleNewChat = () => {
    if (newRecipient && newMessage) {
      const newChat = {
        id: chats.length + 1,
        name: newRecipient,
        message: newMessage,
        status: "offline",
        conversation: [
          { sender: "You", text: newMessage, type: "sent" },
        ],
      };
      setChats([...chats, newChat]);
      setIsModalOpen(false);
      setNewRecipient("");
      setNewMessage("");
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r border-gray-300 bg-white p-4">
        <h2 className="font-bold text-lg mb-4 flex items-center justify-between">
          Active chats{" "}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm"
          >
            + New Message
          </button>
        </h2>
        <input
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none"
          placeholder="Search for chats"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredChats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
                activeChat.id === chat.id ? "bg-blue-100" : ""
              }`}
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <h4 className="font-bold text-sm">{chat.name}</h4>
                <p className="text-xs text-gray-500 truncate">{chat.message}</p>
              </div>
            </li>
          ))}
          {filteredChats.length === 0 && (
            <p className="text-gray-500 text-sm text-center mt-4">
              No chats found.
            </p>
          )}
        </ul>
      </div>

      
      <div className="flex-1 flex flex-col bg-gray-50">
        
        <div className="p-4 border-b bg-white flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
          <div>
            <h2 className="font-bold text-lg">{activeChat.name}</h2>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {activeChat.conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "sent" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-md ${
                  msg.type === "sent"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="font-bold text-lg mb-4">New Message</h2>
            <input
              type="text"
              placeholder="Recipient Name"
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none"
              value={newRecipient}
              onChange={(e) => setNewRecipient(e.target.value)}
            />
            <textarea
              placeholder="Message"
              className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none h-24"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleNewChat}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
