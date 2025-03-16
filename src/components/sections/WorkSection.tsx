import React, { useRef } from 'react';
import styled from 'styled-components';
import Card from '../Card';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

const WorkSectionContainer = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
`;

const ExtraLongContainer = styled.div`
  width: 9000px;
  height: 100%;
  position: relative;
  background: linear-gradient(to bottom, #013E6A, #D0D5CE);
  display: flex;
  align-items: center;
  padding-left: 40vw;
`;

const SectionTitle = styled.h2`
  font-family: 'Instrument Serif', serif;
  font-size: 42px;
  color: #FFFFFF;
  margin-left: 20px;
  margin-right: 1000px;
  white-space: nowrap;
`;

const projects = [
  { projectName: 'Project One', imageUrl: 'https://picsum.photos/550/350?random=1' },
  { projectName: 'Project Two', imageUrl: 'https://picsum.photos/550/350?random=2' },
  { projectName: 'Project Three', imageUrl: 'https://picsum.photos/550/350?random=3' },
  { projectName: 'Project Four', imageUrl: 'https://picsum.photos/550/350?random=4' },
  { projectName: 'Project Five', imageUrl: 'https://picsum.photos/550/350?random=5' },
  { projectName: 'Project Six', imageUrl: 'https://picsum.photos/550/350?random=6' },
  { projectName: 'Project Seven', imageUrl: 'https://picsum.photos/550/350?random=7' },
  { projectName: 'Project Eight', imageUrl: 'https://picsum.photos/550/350?random=8' },
  { projectName: 'Project Nine', imageUrl: 'https://picsum.photos/550/350?random=9' },
  { projectName: 'Project Ten', imageUrl: 'https://picsum.photos/550/350?random=10' },
  { projectName: 'Project Eleven', imageUrl: 'https://picsum.photos/550/350?random=11' },
  { projectName: 'Project Twelve', imageUrl: 'https://picsum.photos/550/350?random=12' },
  { projectName: 'Project Thirteen', imageUrl: 'https://picsum.photos/550/350?random=13' },
  { projectName: 'Project Fourteen', imageUrl: 'https://picsum.photos/550/350?random=14' },
  { projectName: 'Project Fifteen', imageUrl: 'https://picsum.photos/550/350?random=15' }
];

const WorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(containerRef);

  return (
    <WorkSectionContainer ref={containerRef}>
      <ExtraLongContainer>
        <SectionTitle>SELECTED WORK</SectionTitle>
        {projects.map((project, index) => (
          <Card
            key={index}
            projectName={project.projectName}
            imageUrl={project.imageUrl}
          />
        ))}
      </ExtraLongContainer>
    </WorkSectionContainer>
  );
};

export default WorkSection;