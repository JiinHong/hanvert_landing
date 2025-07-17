import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import hanvertLogo from '../hanvert_logo.png';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 1.2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  img {
    height: 48px;
    object-fit: contain;
  }

  .brand-text {
    font-size: 2rem;
    font-weight: 700;
    color: #222;
    margin-left: 0.7rem;
    letter-spacing: -0.03em;
    font-family: inherit;
    @media (max-width: 900px) {
      font-size: 1.3rem;
      margin-left: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    img {
      height: 40px;
    }
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #667eea;
  }
`;

const CTAButton = styled(motion.a)`
  padding: 0.75rem 1.5rem;
  background: #1A1A1A;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 72; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo href="#home" onClick={(e) => handleClick(e, 'home')}>
          <img src={hanvertLogo} alt="Hanvert" />
          <span className="brand-text">Hanvert</span>
        </Logo>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar; 