import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updatePersonalDetails } from "../api/index";

const UpdatePersonalDetails = () => {
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState({ name: user?.name || "", email: user?.email || "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePersonalDetails(user._id, details);
      setMessage("Personal details updated successfully!");
    } catch (error) {
      setMessage("Error updating details.");
    }
  };

  return (
    <div>
      <h2>Update Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={details.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={details.email} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdatePersonalDetails;
