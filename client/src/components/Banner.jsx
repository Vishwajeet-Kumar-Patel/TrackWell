import React from "react";
import styled from "styled-components";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Import images
import bannerImage1 from '../utils/Images/banner-image1.jpg';
import bannerImage2 from '../utils/Images/banner-image2.jpg';
import bannerImage3 from '../utils/Images/banner-image3.jpg';

const BannerContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* Ensure the BannerText is positioned correctly */
`;

const BannerImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 25px;
`;

const BannerText = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: orange;
  font-family: 'Roboto', sans-serif;
  font-style: italic;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  width: 100%; /* Ensure the text is centered */
  z-index: 1; /* Ensure the text is on top of the image */
`;

const Banner = () => {
  return (
    <BannerContainer>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showArrows={false}
      >
        <div>
          <BannerImage src={bannerImage1} alt="Banner 1" />
          <BannerText>Champions aren’t made in the gyms. Champions are made from something they have deep inside them-a desire, a dream, a vision.</BannerText>
        </div>
        <div>
          <BannerImage src={bannerImage2} alt="Banner 2" />
          <BannerText>Rule of thumb: Eat for what you’re going to be doing and not for what you have done. Don’t take in more than you’re willing to burn off.</BannerText>
        </div>
        <div>
          <BannerImage src={bannerImage3} alt="Banner 3" />
          <BannerText>Hard work and training. There’s no secret formula. I lift heavy, work hard and aim to be the best.</BannerText>
        </div>
      </Carousel>
    </BannerContainer>
  );
};

export default Banner;