import React from 'react';
import { motion, Variants } from 'framer-motion';
import styled from '@emotion/styled';
import StreamingLogos from './StreamingLogos';

const useIsMobile = () => window.innerWidth <= 900;

const HeroContainer = styled(motion.div)`
  min-height: calc(100vh - 72px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom,rgb(81, 110, 255) 0%, #A98EFF 100%);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem;
  }
`;

const HeroFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  gap: 3rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;
  }
`;

const HeroLeft = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
  @media (max-width: 900px) {
    text-align: center;
    width: 100%;
  }
`;

const HeroRight = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
    margin-top: 1.5rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0 auto 2rem;
  max-width: 800px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StreamingText = styled(motion.p)`
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const DemoVideo = styled.video`
  width: 75%;
  max-width: 480px;
  aspect-ratio: 9/16;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  background: #000;
  display: block;
  object-fit: contain;
  height: auto;
  margin: 0;
  @media (max-width: 900px) {
    width: 65vw;
    max-width: 250px;
    height: auto;
    margin: 2rem auto;
    border-radius: 24px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  }
`;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const HeroSection: React.FC = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('join-waitlist');
    if (el) {
      const offset = 72; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <HeroFlex>
        <HeroLeft>
          <Title variants={itemVariants}>
            Learn Korean While Streaming
          </Title>
          <Subtitle variants={itemVariants}>
            {isMobile
              ? 'Hanvert turns streaming into immersive Korean lessons with subtitles, dubbing, and instant vocab help.'
              : 'Transform streaming into immersive Korean learning with Hanvert—auto subtitles, dubbing, and instant vocabulary help.'}
          </Subtitle>
          <CTAButton
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWaitlistClick}
          >
            Join the Waitlist
          </CTAButton>
          {isMobile && (
            <DemoVideo
              src={require('../데모.mp4')}
              autoPlay
              loop
              muted
              playsInline
            />
          )}
          <StreamingText variants={itemVariants}>
            Available on your favorite streaming platforms
          </StreamingText>
          <StreamingLogos />
        </HeroLeft>
        {!isMobile && (
          <HeroRight>
            <DemoVideo
              src={require('../데모.mp4')}
              autoPlay
              loop
              muted
              playsInline
            />
          </HeroRight>
        )}
      </HeroFlex>
    </HeroContainer>
  );
};

export default HeroSection;
