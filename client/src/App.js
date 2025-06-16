import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Contact from "./pages/Contact";
import Tutorials from "./pages/Tutorials";
import Blogs from "./pages/Blogs";
import Profile from "./pages/Profile";
import { styled } from "styled-components";
import { ThemeProvider } from "./utils/ThemeContext";
import Home from "./pages/Home";
import AIChatbot from "./components/AIChatbot"; // ✅ Correct location

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const App = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ai-assistant" element={<AIChatbot />} />
            </Routes>

            {/* ✅ Floating AI Chatbot on All Authenticated Pages */}
            <AIChatbot />
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
