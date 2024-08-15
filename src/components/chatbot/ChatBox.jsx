import React, { useState } from 'react';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChatButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={handleChatButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        AskGPT
      </button>
      {isOpen && (
        <div className="chat-box bg-white p-4 mt-4 rounded-lg shadow-lg">
          <div className="chat-messages p-4 border-b-2">
          </div>
          <div className="chat-input mt-4">
            <input type="text" value={message} onChange={handleInputChange} className="w-full rounded p-2" placeholder="AI bot Coming soon..." />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
