import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
// import VideoUpload from "./pages/VideoUpload";
import VideoUpload from "./components/video/VideoUpload";

import VideoList from "./pages/VideoList";
import VideoDetail from "./pages/VideoDetail";
import { Box } from "@mui/material";
import Navbar from "./components/layout/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/auth/Register";
import Profile from "./components/profile/Profile";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6B46C1",
    },
    warning: {
      main: "#FFB800",
    },
    background: {
      default: "#1A1A2E",
      paper: "#252547",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B4B4B4",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#252547",
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          color: "text.primary",
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        <Box component="main" sx={{ pb: 8 }}>
          {/* <VideoUpload /> */}
          <VideoList />
          <VideoDetail />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
