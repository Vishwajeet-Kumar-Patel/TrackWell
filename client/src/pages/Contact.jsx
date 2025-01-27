import React from "react";
import styled from "styled-components";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Importing social media icons

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.bg_primary};
  min-height: 100vh; /* Ensures full viewport height */
  overflow-y: auto; /* Enables scrolling if content overflows */
`;

const Section = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px; /* Add spacing between sections */
  padding: 20px;
  background-color: ${({ theme }) => theme.bg_secondary};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden; /* Prevent child content from overflowing */
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  text-align: center;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 16px;
  text-align: center;
`;

const Text = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.8;
  text-align: center;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoItem = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center; /* Center the social icons horizontally */
  flex-wrap: wrap; /* Ensures icons wrap if they don't fit */
`;

const SocialIcon = styled.a`
  font-size: 24px;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; /* Icon container size */
  height: 50px;
  background-color: ${({ theme }) => theme.bg_secondary};
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }
  border: 1px solid ${({ theme }) => theme.text_secondary}; /* Optional border */
`;


const Contact = () => {
  return (
    <Container>
      {/* About Us Section */}
      <Section>
        <Title>About Us</Title>
        <Subtitle>Welcome to TrackWell!</Subtitle>
        <Text>
          TrackWell is a state-of-the-art fitness tracking platform designed to
          empower individuals on their journey to health and wellness. Our
          mission is to simplify the way you monitor your workouts, track
          progress, and achieve your fitness goals. Whether you're an athlete,
          a fitness enthusiast, or just starting your fitness journey, TrackWell
          provides tools tailored to your needs.
        </Text>
        <Text>
          With TrackWell, you can log your daily workouts, monitor your diet,
          and gain insights through detailed analytics to optimize your
          performance. Our platform leverages the latest technologies, ensuring
          a seamless user experience and accurate data tracking. What sets us
          apart is our commitment to innovation and user-centric design,
          enabling you to focus solely on your fitness goals while we handle
          the rest.
        </Text>
        <Text>
          Join the TrackWell community today and transform the way you approach
          fitness. Whether you're aiming to lose weight, build muscle, or
          maintain a healthy lifestyle, TrackWell is here to support every step
          of your journey.
        </Text>
        <Title>Reach Us</Title>
        <InfoContainer>
          <InfoItem>
            📍 <strong>Address:</strong> 123 Fitness Avenue, TrackWell City,
            Wellness State, 56789
          </InfoItem>
          <InfoItem>
            📞 <strong>Phone:</strong> +1 234 567 8900
          </InfoItem>
          <InfoItem>
            ✉️ <strong>Email:</strong>{" "}
            <a href="mailto:support@trackwell.com">support@trackwell.com</a>
          </InfoItem>
        </InfoContainer>
        <SocialLinks>
          <SocialIcon href="https://facebook.com/trackwell" target="_blank">
            <FaFacebook />
          </SocialIcon>
          <SocialIcon href="https://twitter.com/trackwell" target="_blank">
            <FaTwitter />
          </SocialIcon>
          <SocialIcon href="https://instagram.com/trackwell" target="_blank">
            <FaInstagram />
          </SocialIcon>
          <SocialIcon
            href="https://linkedin.com/company/trackwell"
            target="_blank"
          >
            <FaLinkedin />
          </SocialIcon>
        </SocialLinks>
      </Section>
    </Container>
  );
};

export default Contact;
