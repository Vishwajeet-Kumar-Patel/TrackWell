// client/src/api/index.js

import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Automatically attach token from Redux store (persisted in localStorage)
API.interceptors.request.use((config) => {
  try {
    const persisted = JSON.parse(localStorage.getItem("persist:root"));
    const user = persisted?.user ? JSON.parse(persisted.user) : null;
    const token = user?.currentUser?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.warn("Error parsing persisted user token:", err.message);
  }

  return config;
});


export const UserSignUp = async (data) => {
  const response = await API.post("/signup", data);
  return response.data;
};

export const UserSignIn = async (data) => {
  const response = await API.post("/signin", data);
  return response.data;
};

export const getDashboardDetails = async () => {
  const response = await API.get("/dashboard");
  return response.data;
};

export const getWorkouts = async (date) => {
  const response = await API.get("/workout", {
    params: { date },
  });
  return response.data;
};

export const addWorkout = async (token, workoutString) => {
  try {
    const res = await API.post("/workout", { workoutString }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error during addWorkout:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteWorkout = async (token, workoutId) => {
  try {
    const response = await API.delete(`/workout/${workoutId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting workout:", error.response?.data || error.message);
    throw error;
  }
};


export const updateProfileImage = async (userId, formData) => {
  const response = await API.put(`/update-profile-image/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updatePassword = async (userId, passwords) => {
  const response = await API.put(`/update-password/${userId}`, passwords, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updatePersonalDetails = async (userId, details) => {
  const response = await API.put(`/update-personal-details/${userId}`, details, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getWorkoutDates = async () => {
  const response = await API.get("/dates");
  return response.data;
};
