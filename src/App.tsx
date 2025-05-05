import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChess, 
  faUser, 
  faLaptopCode,
  faCode,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import ProjectCards from './components/ProjectCards';
import ChessGameViewer from './components/ChessGameViewer';
import Skills from './components/Skills';
import About from './components/About';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a;
  color: #e0e0e0;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.header`
  background-color: #2a2a2a;
  padding: 2rem;
  text-align: center;
  border-bottom: 2px solid #4a4a4a;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #00ff9d;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 1.2rem;
  margin-top: 0.5rem;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  color: #e0e0e0;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #333;
    color: #00ff9d;
  }
  
  &.active {
    background-color: #333;
    color: #00ff9d;
    border-bottom: 2px solid #00ff9d;
  }
`;

const Section = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Main = styled.main`
  padding: 2rem;
`;

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('projects');

  return (
    <AppContainer>
      <Header>
        <Title>Royce Lando's Portfolio</Title>
        <Subtitle>Strategic. Analytical. Innovative.</Subtitle>
      </Header>
      
      <Navigation>
        <NavButton
          className={activeSection === 'projects' ? 'active' : ''}
          onClick={() => setActiveSection('projects')}
        >
          <FontAwesomeIcon icon={faCode} /> Projects
        </NavButton>
        <NavButton
          className={activeSection === 'skills' ? 'active' : ''}
          onClick={() => setActiveSection('skills')}
        >
          <FontAwesomeIcon icon={faLaptopCode} /> Skills
        </NavButton>
        <NavButton
          className={activeSection === 'chess' ? 'active' : ''}
          onClick={() => setActiveSection('chess')}
        >
          <FontAwesomeIcon icon={faChess} /> Chess Games
        </NavButton>
        <NavButton
          className={activeSection === 'about' ? 'active' : ''}
          onClick={() => setActiveSection('about')}
        >
          <FontAwesomeIcon icon={faInfoCircle} /> About
        </NavButton>
      </Navigation>

      <Main>
        <Section>
          {activeSection === 'projects' && <ProjectCards />}
          {activeSection === 'skills' && <Skills />}
          {activeSection === 'chess' && <ChessGameViewer />}
          {activeSection === 'about' && <About />}
        </Section>
      </Main>
    </AppContainer>
  );
};

export default App; 