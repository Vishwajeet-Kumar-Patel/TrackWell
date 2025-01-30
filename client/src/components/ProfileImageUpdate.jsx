import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updateProfileImage } from "../api/index";

const ProfileImageUpdate = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select an image.");

    const formData = new FormData();
    formData.append("imageUrl", file);

    try {
      const response = await updateProfileImage(user._id, formData);
      setMessage("Profile image updated successfully!");
    } catch (error) {
      setMessage("Error updating image.");
    }
  };

  return (
    <div>
      <h2>Update Profile Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfileImageUpdate;
