import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileImage, updatePassword, updatePersonalDetails } from "../api"; // Import API functions

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.primary + 20};
  }
`;

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux store

  // Initial user details (can be fetched from an API or context)
  const [userDetails, setUserDetails] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    profilePicture: currentUser?.img || "https://via.placeholder.com/150",
  });

  // Form data for updating details
  const [formData, setFormData] = useState({
    profilePicture: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUserDetails({
        name: currentUser.name,
        email: currentUser.email,
        profilePicture: currentUser.img,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("imageUrl", file);

    try {
      await updateProfileImage(currentUser._id, formData);
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Error updating profile image");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await updatePassword(currentUser._id, { oldPassword: formData.oldPassword, newPassword: formData.password });
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password");
    }
  };

  const handlePersonalDetailsChange = async (e) => {
    e.preventDefault();
    try {
      await updatePersonalDetails(currentUser._id, { name: userDetails.name, email: userDetails.email });
      alert("Personal details updated successfully!");
    } catch (error) {
      console.error("Error updating personal details:", error);
      alert("Error updating personal details");
    }
  };

  return (
    <Container>
      <Title>Update Profile</Title>
      <Form>
        <Input
          type="file"
          name="profilePicture"
          onChange={handleProfileImageChange}
          accept="image/*"
        />
        <Button type="button" onClick={handleProfileImageChange}>Update Profile Picture</Button>
      </Form>
      <Form onSubmit={handlePasswordChange}>
        <Input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <Button type="submit">Update Password</Button>
      </Form>
      <Form onSubmit={handlePersonalDetailsChange}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
          required
        />
        <Button type="submit">Update Personal Details</Button>
      </Form>
    </Container>
  );
};

export default Profile;