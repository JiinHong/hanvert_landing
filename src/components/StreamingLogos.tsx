import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

import youtube from '../youtube_logo.png';
import netflix from '../netflix_logo.png';
import disneyplus from '../disneyplus_logo.png';
import primevideo from '../primevideo_logo.png';

const LogoContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 2.5rem;
  margin: 2rem 0;
  padding: 0 2rem;
  max-width: 700px;
  @media (max-width: 900px) {
    justify-content: center;
    flex-wrap: wrap;
    max-width: 100%;
  }
`;

const LogoWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(100%) brightness(0) invert(1);
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0) brightness(1) invert(0);
    opacity: 1;
  }

  img {
    height: 48px;
    max-width: 120px;
    object-fit: contain;
  }

  @media (max-width: 900px) {
    img {
      height: 36px;
      max-width: 80px;
    }
  }
`;

const StreamingLogos: React.FC = () => {
  const logos = [
    { src: youtube, alt: 'YouTube' },
    { src: netflix, alt: 'Netflix' },
    { src: disneyplus, alt: 'Disney+' },
    { src: primevideo, alt: 'Prime Video' }
  ];

  return (
    <LogoContainer>
      {logos.map((logo, index) => (
        <LogoWrapper
          key={logo.alt}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <img src={logo.src} alt={logo.alt} />
        </LogoWrapper>
      ))}
    </LogoContainer>
  );
};

export default StreamingLogos; 