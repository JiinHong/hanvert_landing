import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from '@emotion/styled';

const Section = styled(motion.section)`
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

interface AnimatedSectionProps {
  children: React.ReactNode;
  backgroundColor?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  backgroundColor = '#ffffff',
  delay = 0 
}) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <Section
      ref={ref}
      style={{ backgroundColor }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      {children}
    </Section>
  );
};

export default AnimatedSection;
