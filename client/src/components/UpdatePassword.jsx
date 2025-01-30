import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updatePassword } from "../api/index";

const UpdatePassword = () => {
  const { user } = useContext(AuthContext);
  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(user._id, passwords);
      setMessage("Password updated successfully!");
    } catch (error) {
      setMessage("Error updating password.");
    }
  };

  return (
    <div>
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" name="oldPassword" placeholder="Old Password" onChange={handleChange} required />
        <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePassword;
