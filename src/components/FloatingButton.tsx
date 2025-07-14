import React from 'react';
import { motion, Variants } from 'framer-motion';
import styled from '@emotion/styled';

const Button = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  z-index: 1000;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const pulseVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
  },
  animate: {
    scale: [1, 1.1, 1],
    boxShadow: [
      '0 4px 20px rgba(102, 126, 234, 0.4)',
      '0 4px 30px rgba(102, 126, 234, 0.6)',
      '0 4px 20px rgba(102, 126, 234, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

interface FloatingButtonProps {
  onClick?: () => void;
  icon?: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ 
  onClick, 
  icon = '↑' 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      variants={pulseVariants}
      initial="initial"
      animate="animate"
      whileHover={{ 
        scale: 1.1,
        rotate: 360,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick || scrollToTop}
    >
      {icon}
    </Button>
  );
};

export default FloatingButton;
