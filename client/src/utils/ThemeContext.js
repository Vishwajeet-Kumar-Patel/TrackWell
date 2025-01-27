import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./Themes";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme === "light" ? lightTheme : darkTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme === lightTheme ? "light" : "dark");
  }, [theme]);

  const muiTheme = createTheme({
    palette: {
      mode: theme === lightTheme ? "light" : "dark",
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>
        <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};