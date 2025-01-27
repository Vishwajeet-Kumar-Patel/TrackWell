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
              <Route path="/home" exact element={<Home />} />
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              <Route path="/contact" exact element={<Contact />} />
              <Route path="/tutorials" exact element={<Tutorials />} />
              <Route path="/blogs" exact element={<Blogs />} />
              <Route path="/profile" exact element={<Profile />} />
            </Routes>
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
