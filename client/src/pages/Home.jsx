import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaRunning, FaWater, FaAppleAlt, FaBurn, FaHeartbeat, FaBed } from "react-icons/fa";
import { FaUsers, FaChalkboardTeacher, FaTasks } from "react-icons/fa"; // Additional icons for achievements

const HomeContainer = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  text-align: center;
  min-height: 100vh;
  overflow-y: auto;
  transition: background 0.3s, color 0.3s;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.div`
  position: relative;
  padding: 80px 20px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
  }

  div {
  position: relative;
  z-index: 10;
  font-family: 'Georgia', serif; /* A classic serif font for an old-fashioned feel */
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  letter-spacing: 2px; /* Adds spacing for a more elegant look */
}

h1 {
  font-size: 3.5rem; /* Larger heading for emphasis */
  font-weight: bold; 
  margin-bottom: 10px; 
  margin-top: 10px;
  text-transform: uppercase; /* Adds a formal touch */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2); /* Light shadow for a vintage effect */
  margin-bottom: 20px; /* Adds spacing between the title and the paragraph */
}

p {
  font-size: 1.3rem; /* Slightly larger than normal text for readability */
  font-style: italic; /* Adds an elegant, old-fashioned feel */
  max-width: 700px; /* Limit the width for better readability */
  margin: 0 auto 30px; /* Center-align and add space below */
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1); /* Slight shadow to enhance readability */
}

Button {
  font-size: 1.2rem; /* Slightly larger text for the button */
  padding: 14px 30px;
  font-weight: bold;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary};
  color: white;
  text-transform: uppercase; /* Adds a strong vintage touch */
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Adds a vintage button shadow */

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-3px); /* Adds a subtle lift on hover */
  }
}

`;

const Button = styled.button`
  margin-top: 16px;
  background: ${({ theme }) => theme.primary};
  padding: 14px 28px;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  border-radius: 10px;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
  }
`;

const Section = styled.div`
  padding: 80px 20px;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1300px;
  margin: auto;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 25px;
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme.cardShadow || '0 6px 15px rgba(0, 0, 0, 0.15)'}; // Adjust shadow for better contrast
  transition: background 0.3s, transform 0.2s;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }

  svg {
    font-size: 50px;
    color: ${({ theme }) => theme.iconColor};
  }
`;

const Footer = styled.footer`
  padding: 30px;
  background: ${({ theme }) => theme.footerBackground};
  color: ${({ theme }) => theme.footerText};
  text-align: center;
  margin-top: auto;
  margin-bottom: 20px;
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <img src="https://i.pinimg.com/736x/91/44/13/914413f0d6bbde467a54eff0fc1d5123.jpg" alt="Hero Background" />
        <div>
          <h1>TrackWell - Your Fitness Journey</h1>
          <p>Transform your body with expert guidance and data-driven progress tracking.</p>
          <Link to="/"> {/* Use Link to wrap the button */}
            <Button>Join Now</Button>
          </Link>
        </div>
      </HeroSection>

      <Section>
        <h2>Our Achievements</h2>
        <Grid>
          <Card>
            <FaUsers />
            <h2>+100</h2>
            <p>Lives Transformed</p>
          </Card>
          <Card>
            <FaChalkboardTeacher />
            <h2>+10</h2>
            <p>Expert Trainers</p>
          </Card>
          <Card>
            <FaTasks />
            <h2>+3</h2>
            <p>Custom Training Programs</p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <h2>What We Offer</h2>
        <Grid>
          <Card>
            <FaRunning />
            <h3>Training</h3>
            <p>Personalized guidance and expert advice for your health and fitness journey.</p>
          </Card>
          <Card>
            <FaWater />
            <h3>Hydration</h3>
            <p>Personalized guidance and expert advice for your health and fitness journey.</p>
          </Card>
          <Card>
            <FaAppleAlt />
            <h3>Diet</h3>
            <p>Personalized guidance and expert advice for your health and fitness journey.</p>
          </Card>
          <Card>
            <FaBurn />
            <h3>Fat Burn</h3>
            <p>Personalized guidance and expert advice for your health and fitness journey.</p>
          </Card>
          <Card>
            <FaHeartbeat />
            <h3>Health</h3>
            <p>Personalized guidance and expert advice for your health and fitness journey.</p>
          </Card>
          <Card>
            <FaBed />
            <h3>Sleep</h3>
            <p>Personalized guidance and expert advice for your health and fitness journey.</p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <h2>How It Works</h2>
        <Grid>
          <Card>
            <FaRunning />
            <h3>Step 01</h3>
            <p>Assess your fitness goals and current status.</p>
          </Card>
          <Card>
            <FaAppleAlt />
            <h3>Step 02</h3>
            <p>Create a tailored fitness and diet plan.</p>
          </Card>
          <Card>
            <FaHeartbeat />
            <h3>Step 03</h3>
            <p>Track progress, get expert feedback, and stay motivated.</p>
          </Card>
        </Grid>
      </Section>

      <Footer>
        <p>&copy; {new Date().getFullYear()} TrackWell. All rights reserved.</p>
      </Footer>
    </HomeContainer>
  );
};

export default Home;
