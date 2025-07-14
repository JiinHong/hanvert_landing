import React from 'react';
import styled from '@emotion/styled';
import HeroSection from './components/HeroSection';
import AnimatedSection from './components/AnimatedSection';
import FeatureCard from './components/FeatureCard';
import FloatingButton from './components/FloatingButton';
import Navbar from './components/Navbar';

const AppContainer = styled.div`
  font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 72px; /* Add padding for fixed navbar */
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #333;
  text-align: center;
  letter-spacing: -0.01em;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: #666;
  max-width: 800px;
  margin: 0 auto 4rem;
  text-align: center;
  line-height: 1.6;
`;

const EmailInput = styled.input`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  margin-right: 1rem;
  width: 300px;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: white;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const SubscribeButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0 2rem;
  }
`;

function App() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
  };

  return (
    <AppContainer>
      <Navbar />
      <div id="home">
        <HeroSection />
      </div>
      
      <div id="how-it-works">
        <AnimatedSection backgroundColor="#f8f9fa">
          <SectionTitle>How It Works</SectionTitle>
          <SectionSubtitle>
            Start learning Korean naturally while watching your favorite shows and movies
          </SectionSubtitle>
          <FeaturesContainer>
            <FeatureCard
              icon="🎬"
              title="Watch Anywhere"
              description="Works seamlessly with YouTube, Netflix, Disney+, and Prime Video. Just click the Hanvert button to start learning."
              delay={0}
            />
            <FeatureCard
              icon="🎯"
              title="Personalized Learning"
              description="AI automatically adjusts Korean subtitles and dubbing to match your proficiency level, helping you progress naturally."
              delay={0.2}
            />
            <FeatureCard
              icon="📚"
              title="Learn in Context"
              description="Touch any word to see its meaning, examples, and pronunciation. Save interesting phrases to review later or create flashcards."
              delay={0.4}
            />
          </FeaturesContainer>
        </AnimatedSection>
      </div>

      <div id="features">
        <AnimatedSection backgroundColor="#f8f9fa">
          <SectionTitle>Features</SectionTitle>
          <SectionSubtitle>
            Discover all the powerful features that make Hanvert your perfect Korean learning companion
          </SectionSubtitle>
          <FeaturesContainer>
            <FeatureCard
              icon="🎯"
              title="Level-Based Content"
              description="Content automatically adjusts to your proficiency level, ensuring optimal learning progress."
              delay={0}
            />
            <FeatureCard
              icon="🔍"
              title="Smart Dictionary"
              description="Instant access to definitions, pronunciations, and example sentences with a single tap."
              delay={0.2}
            />
            <FeatureCard
              icon="📱"
              title="Study Tools"
              description="Create and export flashcards, vocabulary lists, and review materials from your watched content."
              delay={0.4}
            />
          </FeaturesContainer>
        </AnimatedSection>
      </div>

      <div id="pricing">
        <AnimatedSection backgroundColor="#f8f9fa">
          <SectionTitle>Pricing</SectionTitle>
          <SectionSubtitle>
            Simple and transparent pricing for everyone
          </SectionSubtitle>
          <FeaturesContainer>
            <FeatureCard
              icon="🎁"
              title="Early Access"
              description="Join our waitlist to get special early access pricing and help shape the future of Korean learning."
              delay={0}
            />
          </FeaturesContainer>
        </AnimatedSection>
      </div>

      <div id="join-waitlist">
        <AnimatedSection backgroundColor="#EEF2FF" delay={0.2}>
          <div style={{ color: '#1A1A1A' }}>
            <SectionTitle style={{ color: '#1A1A1A' }}>Be the First to Try</SectionTitle>
            <SectionSubtitle style={{ color: '#333333' }}>
              Join our waitlist to get early access and help shape the future of Korean language learning through entertainment.
            </SectionSubtitle>
            <FormContainer onSubmit={handleSubmit}>
              <EmailInput 
                type="email" 
                placeholder="Enter your email" 
                required 
                style={{
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  color: '#1A1A1A',
                  background: 'rgba(255, 255, 255, 0.5)'
                }}
              />
              <SubscribeButton type="submit" style={{
                background: '#1A1A1A',
                color: 'white',
                border: 'none'
              }}>
                Get Early Access
              </SubscribeButton>
            </FormContainer>
          </div>
        </AnimatedSection>
      </div>

      <FloatingButton />
    </AppContainer>
  );
}

export default App;
