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
  background-color: ${({ theme }) => theme.bg_primary};
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
  background-color: ${({ theme }) => theme.bg_secondary};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary || "#777"};
`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser); // Get current user from Redux store

  const [userDetails, setUserDetails] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    profilePicture: currentUser?.img || "https://via.placeholder.com/150",
  });

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

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
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("imageUrl", file);

    try {
      setLoading(true);
      const response = await updateProfileImage(currentUser._id, formData);
      alert("Profile image updated successfully!");
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        profilePicture: response.imageUrl,
      }));
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Error updating profile image");
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updatePersonalDetails(currentUser._id, {
        name: userDetails.name,
        email: userDetails.email,
      });
      alert("Personal details updated successfully!");
    } catch (error) {
      console.error("Error updating personal details:", error);
      alert("Error updating personal details");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      await updatePassword(currentUser._id, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Profile Page</Title>
      <ProfileImage
        src={userDetails.profilePicture}
        alt="Profile"
        onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
      />
      <Label htmlFor="profilePicture">Change Profile Picture</Label>
      <Input
        type="file"
        id="profilePicture"
        accept="image/*"
        onChange={handleProfileImageChange}
      />

      {/* Personal Details Form */}
      <Form onSubmit={handlePersonalDetailsSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Personal Details"}
        </Button>
      </Form>

      {/* Password Update Form */}
      <Form onSubmit={handlePasswordSubmit}>
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
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
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
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </Form>
    </Container>
  );
};

export default ProfilePage;