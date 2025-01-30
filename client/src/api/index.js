import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const UserSignUp = async (data) => {
  try {
    const response = await API.post("/signup", data);
    console.log("Signup API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during UserSignUp:", error.response?.data || error.message);
    throw error;
  }
};

export const UserSignIn = async (data) => {
  try {
    const response = await API.post("/signin", data);
    console.log("Signin API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error during UserSignIn:", error.response?.data || error.message);
    throw error;
  }
};

export const getDashboardDetails = async (token) => {
  try {
    const response = await API.get("/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during getDashboardDetails:", error.response?.data || error.message);
    throw error;
  }
};

export const getWorkouts = async (token, date) => {
  try {
    const response = await API.get("/workout", {
      headers: { Authorization: `Bearer ${token}` },
      params: { date },
    });
    return response.data;
  } catch (error) {
    console.error("Error during getWorkouts:", error.response?.data || error.message);
    throw error;
  }
};

export const addWorkout = async (token, data) => {
  try {
    const response = await API.post("/workout", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during addWorkout:", error.response?.data || error.message);
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
    console.error("Error during deleteWorkout:", error.response?.data || error.message);
    throw error;
  }
};

export const updateProfileImage = async (token, userId, formData) => {
  try {
    const response = await API.put(`/update-profile-image/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile image:", error.response?.data || error.message);
    throw error;
  }
};

export const updatePassword = async (token, userId, passwords) => {
  try {
    const response = await API.put(`/update-password/${userId}`, passwords, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error.response?.data || error.message);
    throw error;
  }
};

export const updatePersonalDetails = async (token, userId, details) => {
  try {
    const response = await API.put(`/update-personal-details/${userId}`, details, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating personal details:", error.response?.data || error.message);
    throw error;
  }
};

// Fetch workout dates
export const getWorkoutDates = async (token) => {
  try {
    const response = await axios.get('/workouts/dates', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching workout dates:", error.response || error.message);
    throw new Error("Error fetching workout dates: " + error.message);
  }
};
