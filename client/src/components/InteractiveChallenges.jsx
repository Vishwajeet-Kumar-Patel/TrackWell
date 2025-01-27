import React from "react";
import styled from "styled-components";

const ChallengesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ChallengeCard = styled.div`
  background: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 16px;
`;

const ProgressBar = styled.div`
  background: ${({ theme }) => theme.bg_primary};
  border-radius: 8px;
  overflow: hidden;
  margin: 10px 0;
`;

const Progress = styled.div`
  background: ${({ theme }) => theme.primary};
  height: 10px;
  width: ${({ progress }) => progress}%;
`;

const JoinButton = styled.button`
  padding: 10px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.primary + '80'};
  }
`;

const InteractiveChallenges = ({ challenges = [] }) => {
  return (
    <ChallengesContainer>
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id}>
          <Title>{challenge.title}</Title>
          <Description>{challenge.description}</Description>
          <ProgressBar>
            <Progress progress={challenge.progress} />
          </ProgressBar>
          <JoinButton>Join Challenge</JoinButton>
        </ChallengeCard>
      ))}
    </ChallengesContainer>
  );
};

export default InteractiveChallenges;