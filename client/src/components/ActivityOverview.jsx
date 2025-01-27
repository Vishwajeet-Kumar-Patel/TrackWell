import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  width: 300px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.text_primary};
  font-size: 20px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text_secondary};
`;

const ActivityOverview = () => {
  return (
    <Container>
      <Card>
        <Title>Daily Steps</Title>
        <Description>10,000 steps completed today</Description>
      </Card>
      <Card>
        <Title>Calories Burned</Title>
        <Description>500 kcal burned</Description>
      </Card>
      <Card>
        <Title>Workout Time</Title>
        <Description>45 minutes of cardio</Description>
      </Card>
    </Container>
  );
};

export default ActivityOverview;
