import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import styled from '@emotion/styled';
import StreamingLogos from './StreamingLogos';

const useIsMobile = () => window.innerWidth <= 900;

const HeroContainer = styled(motion.div)`
  min-height: 100vh;
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
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
  color: white;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
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
  aspect-ratio: 1080/1780;
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

const FormContainer = styled(motion.form)`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 999px;
  padding: 0.25rem 0.5rem 0.25rem 1.5rem;
  box-shadow: none;
  width: 100%;
  max-width: 480px;
  margin: 2rem 0 2.5rem 0;
  @media (max-width: 900px) {
    margin: 1.5rem auto 2rem auto;
    max-width: 95vw;
    padding: 0.12rem 0.31rem 0.12rem 0.7rem;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  padding: 0.8rem 0;
  outline: none;
  color: #222;
  border-radius: 999px;
  &::placeholder {
    color: #888;
    opacity: 1;
  }
  @media (max-width: 900px) {
    font-size: 1rem;
    padding: 1rem 0;
    &::placeholder {
      font-size: 0.85rem;
    }
  }
`;

const SubscribeButton = styled.button`
  background: #222;
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 1.5rem;
  margin-left: 0.7rem;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 90px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #111;
  }
  @media (max-width: 900px) {
    font-size: 0.95rem;
    padding: 0.7rem 1.2rem;
    margin-left: 0.5rem;
    min-width: 90px;
    height: 40px;
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

const formVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const HeroSection: React.FC = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('https://whlfxkvrmdzgscnlklmn.supabase.co/functions/v1/hanvert-email', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobGZ4a3ZybWR6Z3NjbmxrbG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTQwNjUsImV4cCI6MjA2MTU3MDA2NX0.R6aI0I3XLpfr7WEGuyYdwvULgt9HYszYNIx2R6P6tLI',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed to submit email');
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
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
          Your Favorite Shows are Now Your Best Korean Lessons
          </Title>
          <Subtitle variants={itemVariants}>
            {isMobile
              ? 'Hanvert transforms any video into your personal, immersive textbook—complete with level-matched subtitles, AI dubbing, and interactive nuance quizzes.'
              : 'Hanvert transforms any video into your personal, immersive textbook—complete with level-matched subtitles, AI dubbing, and interactive nuance quizzes.'}
          </Subtitle>
          <FormContainer
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleWaitlistSubmit}
          >
            <EmailInput
              type="email"
              placeholder={success ? "Success! You're on the list for early access." : "Your email address"}
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading || success}
            />
            <SubscribeButton type="submit" disabled={loading || success}>
              {loading ? 'Submitting...' : 'Unlock the Magic'}
            </SubscribeButton>
          </FormContainer>
          {error && <div style={{ color: '#d32f2f', marginTop: 8 }}>{error}</div>}
          {isMobile && (
            <video
              src={require('../데모.mp4')}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                maxWidth: 320,
                border: '8px solid #fff',
                borderRadius: 40,
                boxShadow: '-12px 16px 32px 0 rgba(0,0,0,0.4)',
                background: '#111',
                display: 'block',
                margin: '0 auto',
                marginBottom: 40
              }}
            />
          )}
          <StreamingText variants={itemVariants}>
            Available on your favorite streaming platforms
          </StreamingText>
          <StreamingLogos />
        </HeroLeft>
        {!isMobile && (
          <HeroRight>
            <video
              src={require('../데모.mp4')}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                maxWidth: 320,
                border: '8px solid #fff',
                borderRadius: 40,
                boxShadow: '-12px 16px 32px 0 rgba(0,0,0,0.4)',
                background: '#111',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </HeroRight>
        )}
      </HeroFlex>
    </HeroContainer>
  );
};

export default HeroSection;
