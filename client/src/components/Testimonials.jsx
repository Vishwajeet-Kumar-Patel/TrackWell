import React from "react";
import styled from "styled-components";

const TestimonialsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const TestimonialCard = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 20px;
  background: ${({ theme }) => theme.bg_secondary};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TestimonialText = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const TestimonialAuthor = styled.h4`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const testimonials = [
  { text: "TrackWell has transformed my fitness journey!", author: "John Doe" },
  { text: "I love how easy it is to track my workouts.", author: "Jane Smith" },
  { text: "The insights and analytics are top-notch.", author: "Mike Johnson" },
];

const Testimonials = () => {
  return (
    <TestimonialsContainer>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index}>
          <TestimonialText>"{testimonial.text}"</TestimonialText>
          <TestimonialAuthor>- {testimonial.author}</TestimonialAuthor>
        </TestimonialCard>
      ))}
    </TestimonialsContainer>
  );
};

export default Testimonials;