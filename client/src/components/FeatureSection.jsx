import React from "react";
import styled from "styled-components";

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const FeatureCard = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 20px;
  background: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
`;

const features = [
  { title: "Track Workouts", description: "Easily track your daily workouts and progress." },
  { title: "Set Goals", description: "Set and achieve your fitness goals." },
  { title: "Get Insights", description: "Analyze your performance with detailed insights." },
];

const FeatureSection = () => {
  return (
    <FeaturesContainer>
      {features.map((feature, index) => (
        <FeatureCard key={index}>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureDescription>{feature.description}</FeatureDescription>
        </FeatureCard>
      ))}
    </FeaturesContainer>
  );
};

export default FeatureSection;