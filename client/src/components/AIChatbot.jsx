import React, { useState } from "react";
import styled from "styled-components";
import { IoMdChatbubbles } from "react-icons/io";

// Floating Chat Icon
const FloatingIcon = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary + "DD"};
    transform: scale(1.1);
  }

  @media (max-width: 500px) {
    width: 48px;
    height: 48px;
    font-size: 22px;
    bottom: 16px;
    right: 16px;
  }

  animation: pulse 2s infinite;
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 ${({ theme }) => theme.primary + "66"}; }
    70% { box-shadow: 0 0 0 10px transparent; }
    100% { box-shadow: 0 0 0 0 transparent; }
  }
`;

// Chat Box Styling
const ChatContainer = styled.div`
  position: fixed;
  bottom: 90px;
  right: 24px;
  width: 340px;
  max-height: 460px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_primary + 25};
  border-radius: 12px;
  box-shadow: 0 0 12px ${({ theme }) => theme.primary + 25};
  display: flex;
  flex-direction: column;
  z-index: 999;

  @media (max-width: 500px) {
    width: 90%;
    right: 5%;
    bottom: 80px;
  }
`;

const ChatHeader = styled.div`
  padding: 12px;
  font-weight: bold;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  text-align: center;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${({ theme }) => theme.bg_secondary || theme.bg};
`;

const Message = styled.div`
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  background: ${({ isUser, theme }) => (isUser ? theme.primary : theme.text_secondary + "22")};
  color: ${({ isUser, theme }) => (isUser ? "#fff" : theme.text_primary)};
  padding: 10px 14px;
  max-width: 80%;
  border-radius: ${({ isUser }) => (isUser ? "14px 14px 0 14px" : "14px 14px 14px 0")};
  font-size: 14px;
  white-space: pre-line;
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 8px;
  border-top: 1px solid ${({ theme }) => theme.text_primary + 15};
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  outline: none;
`;

const SendButton = styled.button`
  padding: 8px 12px;
  margin-left: 8px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${({ theme }) => theme.primary + "DD"};
  }
`;

const AIChatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chat, setChat] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const updatedChat = [...chat, { role: "user", message: userInput }];
    setChat(updatedChat);
    setUserInput("");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: updatedChat.map((msg) => ({ role: msg.role, content: msg.message })),
        }),
      });

      const data = await response.json();
      const aiMessage = data?.choices?.[0]?.message?.content || "Sorry, I couldn't understand.";
      setChat((prev) => [...prev, { role: "assistant", message: aiMessage }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "assistant", message: "⚠️ Error fetching AI response. Please try again later." },
      ]);
      console.error("AI Chat Error:", error);
    }
  };

  return (
    <>
      <FloatingIcon onClick={() => setShowChat((prev) => !prev)}>
        <IoMdChatbubbles />
      </FloatingIcon>

      {showChat && (
        <ChatContainer>
          <ChatHeader>🤖 AI Fitness Assistant</ChatHeader>
          <ChatBody>
            {chat.map((msg, idx) => (
              <Message key={idx} isUser={msg.role === "user"}>
                {msg.message}
              </Message>
            ))}
          </ChatBody>
          <InputWrapper>
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask your question..."
            />
            <SendButton onClick={sendMessage}>Send</SendButton>
          </InputWrapper>
        </ChatContainer>
      )}
    </>
  );
};

export default AIChatbot;
