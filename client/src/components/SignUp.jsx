import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

const OuterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.bg}; /* Background for the page */
  padding: 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  background: ${({ theme }) => theme.bg_secondary}; /* Background for the main content */
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.1); /* Shadow for the main content */
  background: linear-gradient(135deg, #f0f4f8, #d1e3f2); /* Optional background gradient */
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignUp = async () => {
    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) {
      try {
        const res = await UserSignUp({ name, email, password });
        if (res && res.user) {
          dispatch(loginSuccess(res.user)); // Use res.user to access the user data
          alert("Account Created Successfully");
        } else {
          alert("Unexpected response from server");
        }
      } catch (err) {
        if (err.message === "Network Error") {
          alert("Network Error: Please check your connection and try again.");
        } else {
          alert(err.response?.data?.message || err.message);
        }
      } finally {
        setLoading(false);
        setButtonDisabled(false);
      }
    }
  };

  return (
    <OuterContainer>
      <Container>
        <div>
          <Title>Create New Account 👋</Title>
          <Span>Please enter details to create a new account</Span>
        </div>
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <TextInput
            label="Full name"
            placeholder="Enter your full name"
            value={name}
            handelChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            handelChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            placeholder="Enter your password"
            password
            value={password}
            handelChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text="SignUp"
            onClick={handelSignUp}
            isLoading={loading}
            isDisabled={buttonDisabled}
          />
        </div>
      </Container>
    </OuterContainer>
  );
};

export default SignUp;
