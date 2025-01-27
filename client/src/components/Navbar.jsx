import React, { useState, useContext } from "react";
import styled from "styled-components";
import LogoImg from "../utils/Images/Logo.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { ThemeContext } from "../utils/ThemeContext";
import { lightTheme } from "../utils/Themes";

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  font-size: 24px;
  text-decoration: none;
  color: ${({ theme }) => theme.black};
`;

const Logo = styled.img`
width: 200px;
  height: 55px;
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  list-style: none;
  padding: 0;
  margin: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 2px solid ${({ theme }) => theme.primary};
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.primary};
`;

const TextButton = styled.div`
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  list-style: none;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.bg};
  position: absolute;
  top: 80px;
  right: 0;
  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-100%)")};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const Button = styled.button`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.bg};
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  '
  &:hover {
    background: ${({ theme }) => theme.primary + 20};
  }
`;

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (!currentUser) {
    return null; // Return null if currentUser is not defined
  }

  return (
    <Nav>
      <NavContainer>
        <NavLogo to="/">
          <Logo src={LogoImg} />
        </NavLogo>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded sx={{ color: "inherit" }} />
        </MobileIcon>
        <MobileMenu isOpen={isOpen}>
  <Navlink to="/home">Home</Navlink> {/* Changed to Navlink */}
  <Navlink to="/">Dashboard</Navlink>
  <Navlink to="/workouts">Workouts</Navlink>
  <Navlink to="/tutorials">Tutorials</Navlink>
  <Navlink to="/blogs">Blogs</Navlink>
  <Navlink to="/contact">Contact</Navlink>
</MobileMenu>
<NavItems>
  <Navlink to="/home">Home</Navlink> {/* Changed to Navlink */}
  <Navlink to="/">Dashboard</Navlink>
  <Navlink to="/workouts">Workouts</Navlink>
  <Navlink to="/tutorials">Tutorials</Navlink>
  <Navlink to="/blogs">Blogs</Navlink>
  <Navlink to="/contact">Contact</Navlink>
</NavItems>

        <UserContainer>
          <Navlink to="/profile">
            <Avatar src={currentUser?.img}>{currentUser?.name?.[0]}</Avatar>
          </Navlink>
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
          <Button onClick={toggleTheme}>
            {theme === lightTheme ? "🌙" : "🌞"}
          </Button>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;