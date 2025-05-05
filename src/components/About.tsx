import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChess, 
  faCode, 
  faLightbulb,
  faGraduationCap,
  faGlobe,
  faInfoCircle,
  faCodeBranch,
  faBriefcase,
  faAward
} from '@fortawesome/free-solid-svg-icons';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const BioSection = styled.section`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #4a4a4a;
`;

const SectionTitle = styled.h2`
  color: #00ff9d;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const BioText = styled.p`
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const HighlightsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const HighlightCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #4a4a4a;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: #00ff9d;
  }
`;

const HighlightTitle = styled.h3`
  color: #00ff9d;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HighlightText = styled.p`
  color: #e0e0e0;
  line-height: 1.5;
`;

const Link = styled.a`
  color: #00ff9d;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00cc7a;
  }
`;

const ExperienceCard = styled(HighlightCard)`
  grid-column: 1 / -1;
  margin-top: 1rem;
`;

const ExperienceTitle = styled(HighlightTitle)`
  font-size: 1.2rem;
`;

const ExperienceDetails = styled.div`
  color: #e0e0e0;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const ExperienceDuration = styled.span`
  color: #00ff9d;
  font-weight: 500;
`;

const EducationCard = styled(HighlightCard)`
  grid-column: 1 / -1;
`;

const EducationTitle = styled(HighlightTitle)`
  font-size: 1.2rem;
`;

const EducationDetails = styled.div`
  color: #e0e0e0;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const EducationDuration = styled.span`
  color: #00ff9d;
  font-weight: 500;
`;

const Achievement = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: #e0e0e0;
`;

const About: React.FC = () => {
  return (
    <AboutContainer>
      <BioSection>
        <SectionTitle>
          <FontAwesomeIcon icon={faInfoCircle} />
          About Me
        </SectionTitle>
        <BioText>
          I am a Computer Science (Honours) graduate from Brock University with a strong passion for 
          designing and building safe and efficient software. My academic background has provided me 
          with a solid foundation in computer science principles and software development practices.
        </BioText>
        <BioText>
          I am proficient in multiple programming languages and frameworks, including Java, JavaScript, 
          PHP, Swift, C++, and more. This diverse skill set allows me to approach development challenges 
          with confidence and adaptability, always striving to create robust and maintainable solutions.
        </BioText>
        <Link href="https://github.com/Roycelando" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faCodeBranch} />
          Check out my GitHub profile
        </Link>
      </BioSection>

      <HighlightsContainer>
        <ExperienceCard>
          <ExperienceTitle>
            <FontAwesomeIcon icon={faBriefcase} />
            Professional Experience
          </ExperienceTitle>
          <HighlightText>
            Full Stack Developer at BarterPay®
          </HighlightText>
          <ExperienceDetails>
            <ExperienceDuration>July 2023 - Present</ExperienceDuration> · On-site · Canada
          </ExperienceDetails>
          <HighlightText>
            Full Stack Engineering position focusing on developing and maintaining robust software solutions.
          </HighlightText>
        </ExperienceCard>

        <EducationCard>
          <EducationTitle>
            <FontAwesomeIcon icon={faGraduationCap} />
            Education
          </EducationTitle>
          <HighlightText>
            Bachelor of Science (Honours), Computer Science
          </HighlightText>
          <EducationDetails>
            <EducationDuration>2019 - 2023</EducationDuration> · Brock University
          </EducationDetails>
          <Achievement>
            <FontAwesomeIcon icon={faAward} />
            Graduated with First-Class Honours (Grade: A)
          </Achievement>
          <HighlightText>
            Key skills developed: Angular, OpenGL, and various programming languages and frameworks
          </HighlightText>
        </EducationCard>

        <HighlightCard>
          <HighlightTitle>
            <FontAwesomeIcon icon={faCode} />
            Technical Expertise
          </HighlightTitle>
          <HighlightText>
            Experienced in full-stack development with expertise in multiple programming 
            languages and frameworks. Skilled in creating efficient, maintainable, and 
            secure software solutions.
          </HighlightText>
        </HighlightCard>

        <HighlightCard>
          <HighlightTitle>
            <FontAwesomeIcon icon={faChess} />
            Problem Solving
          </HighlightTitle>
          <HighlightText>
            My passion for chess has honed my strategic thinking and analytical skills, 
            which I apply to software development challenges. I approach problems with 
            careful consideration and innovative solutions.
          </HighlightText>
        </HighlightCard>
      </HighlightsContainer>
    </AboutContainer>
  );
};

export default About; 