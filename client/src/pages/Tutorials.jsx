import React from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: 100vh; /* Ensure the container takes the full viewport height */
  overflow-y: auto; /* Allow vertical scrolling */
  width: 100%;
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 800px;
  margin-bottom: 40px;
`;

const TutorialsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow wrapping of items */
  gap: 20px; /* Space between items */
  justify-content: center; /* Center content horizontally */
  width: 100%; /* Make sure the wrapper takes up the full width */
`;

const TutorialCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.text_secondary + 20};
  border-radius: 8px;
  background: ${({ theme }) => theme.bg_secondary};
  width: 33.33%; /* Set width to 1/3 to fit 3 per row */
  box-sizing: border-box;
  
  /* Adjust card width for smaller screens */
  @media (max-width: 1000px) {
    width: 48%; /* Adjust to 2 per row for medium screens */
  }

  @media (max-width: 600px) {
    width: 100%; /* Stack vertically on small screens */
  }
`;

const TutorialTitle = styled.h3`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  text-align: center;
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
  border-radius: 8px;
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

const tutorialsData = [
  {
    title: "Chest Workout",
    videoUrl: "https://www.youtube.com/embed/dPb9JxFMuuE",
  },
  {
    title: "Back Workout",
    videoUrl: "https://youtube.com/embed/YvKOvyiAdAI?si=Rh0BLhXQMmLY4Q3x",
  },
  {
    title: "Leg Workout",
    videoUrl: "https://www.youtube.com/embed/sDMAPXzvjAo?si=nIoAb5hCYG8tHBIS",
  },
  {
    title: "Abs Workout",
    videoUrl: "https://www.youtube.com/embed/Wv5NcMH9GSY?si=Wq2aIzGWeBez1ncv",
  },
  {
    title: "Muscle Building Workout",
    videoUrl: "https://www.youtube.com/embed/RDWyqnGhmWY?si=sW-w-66YuxxkjsXc",
  },
  {
    title: "Fat Burning Workout",
    videoUrl: "https://www.youtube.com/embed/7fICF_O5esc?si=2rP3QXdHSkLJwNCk",
  },
  {
    title: "Shoulder Workout",
    videoUrl: "https://www.youtube.com/embed/zGZVv5zqCFE?si=k9rd8D9AvdMV4iXx",
  },
  {
    title: "Arms Workout",
    videoUrl: "https://www.youtube.com/embed/rdaIUhFWCpg?si=unbcqr3ZIOR7ibc1",
  },
];

const Tutorials = () => {
  return (
    <Container>
      <Title>Exercise Tutorials</Title>
      <Description>
        Learn about different types of exercises for various muscle groups with
        our video tutorials. Click on the videos below to watch and learn.
      </Description>
      <TutorialsWrapper>
        {tutorialsData.map((tutorial, index) => (
          <TutorialCard key={index}>
            <TutorialTitle>{tutorial.title}</TutorialTitle>
            <VideoWrapper>
              <Iframe
                src={tutorial.videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></Iframe>
            </VideoWrapper>
          </TutorialCard>
        ))}
      </TutorialsWrapper>
    </Container>
  );
};

export default Tutorials;
