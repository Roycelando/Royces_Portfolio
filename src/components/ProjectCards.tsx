import React from 'react';
import styled from 'styled-components';

const ProjectsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const ProjectCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
  border: 1px solid #4a4a4a;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #00ff9d;
  }
`;

const ProjectTitle = styled.h3`
  color: #00ff9d;
  margin: 0 0 1rem 0;
`;

const ProjectDescription = styled.p`
  color: #e0e0e0;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechTag = styled.span`
  background-color: #333;
  color: #00ff9d;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const Link = styled.a`
  color: #00ff9d;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
}

const ProjectCards: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Chess Game Viewer",
      description: "An interactive chess game viewer that allows users to analyze and replay chess games using PGN notation.",
      tech: ["React", "Chess.js", "Styled Components"],
      github: "#",
      demo: "#"
    },
    {
      title: "Portfolio Website",
      description: "A modern portfolio website showcasing my projects and chess games.",
      tech: ["React", "Styled Components"],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <ProjectsContainer>
      {projects.map((project, index) => (
        <ProjectCard key={index}>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          <TechStack>
            {project.tech.map((tech, techIndex) => (
              <TechTag key={techIndex}>{tech}</TechTag>
            ))}
          </TechStack>
          <ProjectLinks>
            <Link href={project.github} target="_blank" rel="noopener noreferrer">GitHub</Link>
            <Link href={project.demo} target="_blank" rel="noopener noreferrer">Live Demo</Link>
          </ProjectLinks>
        </ProjectCard>
      ))}
    </ProjectsContainer>
  );
};

export default ProjectCards; 