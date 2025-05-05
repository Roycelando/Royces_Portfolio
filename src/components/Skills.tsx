import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faServer, 
  faMobile, 
  faDatabase,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const SkillCategory = styled.div`
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

const CategoryTitle = styled.h3`
  color: #00ff9d;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  color: #e0e0e0;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SkillName = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  &::before {
    content: "•";
    color: #00ff9d;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #00ff9d;
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const SkillLevel = styled.span`
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.25rem;
  text-align: right;
`;

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: any;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: faGlobe,
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "React", level: 85 },
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "Styled Components", level: 80 }
      ]
    },
    {
      title: "Backend Development",
      icon: faServer,
      skills: [
        { name: "Node.js", level: 85 },
        { name: "NestJS", level: 75 },
        { name: "PHP", level: 80 },
        { name: "CodeIgniter", level: 70 },
        { name: "Java", level: 75 }
      ]
    },
    {
      title: "Mobile Development",
      icon: faMobile,
      skills: [
        { name: "Swift", level: 70 },
        { name: "React Native", level: 75 }
      ]
    },
    {
      title: "Systems Programming",
      icon: faCode,
      skills: [
        { name: "C++", level: 80 },
        { name: "Haskell", level: 65 }
      ]
    }
  ];

  const getLevelText = (level: number): string => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 60) return "Intermediate";
    return "Beginner";
  };

  return (
    <SkillsContainer>
      {skillCategories.map((category, index) => (
        <SkillCategory key={index}>
          <CategoryTitle>
            <FontAwesomeIcon icon={category.icon} />
            {category.title}
          </CategoryTitle>
          <SkillsList>
            {category.skills.map((skill, skillIndex) => (
              <SkillItem key={skillIndex}>
                <SkillName>{skill.name}</SkillName>
                <ProgressBarContainer>
                  <ProgressBar style={{ width: `${skill.level}%` }} />
                </ProgressBarContainer>
                <SkillLevel>{getLevelText(skill.level)}</SkillLevel>
              </SkillItem>
            ))}
          </SkillsList>
        </SkillCategory>
      ))}
    </SkillsContainer>
  );
};

export default Skills; 