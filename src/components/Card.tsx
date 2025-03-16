import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useWebGLDistortion } from '../hooks/useWebGLDistortion';

const CardContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 16px;
  width: 582px;
  height: 418px;
  margin-right: 500px;
  overflow: visible;
  &:last-child {
    margin-right: 0;
  }
`;

const CardImage = styled.div<{ backgroundImage: string }>`
  width: 550px;
  height: 350px;
  background: transparent;
  flex: none;
  position: relative;
  z-index: 10;
  overflow: visible;
  transform-origin: center;
  transition: none;
  background-color: transparent;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px;
  gap: 12px;
  width: 550px;
  height: 28px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const ProjectName = styled.h3`
  margin: 0 auto;
  width: 143px;
  height: 28px;
  font-family: 'Instrument Serif';
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 87%;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ExploreWork = styled.span`
  margin: 0 auto;
  width: 115px;
  height: 11px;
  font-family: 'Breston';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
  color: #FFFFFF;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

interface CardProps {
  projectName: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ projectName, imageUrl }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const { updateDistortion } = useWebGLDistortion(imageRef);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const viewportCenter = window.innerWidth / 2;
        const elementCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
        const maxDistance = window.innerWidth / 2;
        const distortionStrength = Math.max(0, (1 - distanceFromCenter / maxDistance) * 0.3);
        updateDistortion(distortionStrength);
      }
    };

    const container = imageRef.current?.closest('.work-section-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateDistortion]);

  return (
    <CardContainer>
      <CardImage
        ref={imageRef}
        backgroundImage={imageUrl}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardFooter>
        <ProjectName>{projectName}</ProjectName>
        <ExploreWork>Explore Work</ExploreWork>
      </CardFooter>
    </CardContainer>
  );
};

export default Card;