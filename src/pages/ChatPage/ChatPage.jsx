import React, { useState, useEffect } from 'react';
import MessagePane from './MessagePane';
import ChatPane from './ChatPane';
import './ChatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (message) => {
    // Add the user's message to the state
    setMessages([...messages, { from: 'user', text: message }]);

    // Make an API call to the Gemini API
    try {
      const response = await fetch('/api/gemini/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers or authentication tokens if required
        },
        body: JSON.stringify({
          prompt: message,
          // Add any other parameters required by your Gemini API
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      // Parse the AI's response
      const aiResponse = await response.json();

      // Update the state with the AI's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: 'ai', text: aiResponse.text },
      ]);
    } catch (error) {
      console.error('Error sending message to Gemini API:', error);
    }
  };

  return (
    <div className="chat-page">
      <ChatPane messages={messages} />
      <MessagePane onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatPage;
