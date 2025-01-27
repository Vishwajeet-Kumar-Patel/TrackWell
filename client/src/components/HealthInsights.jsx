import React from "react";
import styled from "styled-components";

const InsightsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const Insight = styled.div`
  width: 80%;
  padding: 16px;
  background-color: ${({ theme }) => theme.bg_secondary};
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 10px;
  text-align: center;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.text_primary};
`;

const Value = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 24px;
  font-weight: bold;
`;

const HealthInsights = () => {
  return (
    <InsightsContainer>
      <Insight>
        <Title>Heart Rate</Title>
        <Value>72 bpm</Value>
      </Insight>
      <Insight>
        <Title>Calories Consumed</Title>
        <Value>1,800 kcal</Value>
      </Insight>
      <Insight>
        <Title>Sleep Analysis</Title>
        <Value>7 hours, 30 minutes</Value>
      </Insight>
    </InsightsContainer>
  );
};

export default HealthInsights;
