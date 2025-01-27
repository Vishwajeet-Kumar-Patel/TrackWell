import React from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import FeatureSection from "../components/FeatureSection";
import ActivityOverview from "../components/ActivityOverview";
import HealthInsights from "../components/HealthInsights";
import InteractiveChallenges from "../components/InteractiveChallenges";
import Testimonials from "../components/Testimonials";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 22px 16px; /* Add padding for better spacing */
  margin: 0 auto; /* Center the content */
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Title = styled.div`
  font-size: 30px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 800;
  text-align: center;
`;

const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Banner />
        <Section>
          <Title>Features</Title>
          <FeatureSection />
        </Section>
        <Section>
          <Title>Track Your Activities</Title>
          <ActivityOverview />
        </Section>
        <Section>
          <Title>Health Insights</Title>
          <HealthInsights />
        </Section>
        <Section>
          <Title>Interactive Challenges</Title>
          <InteractiveChallenges />
        </Section>
        <Section>
          <Title>Testimonials</Title>
          <Testimonials />
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Home;
