import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import './ProjectDetail.css';
import ScrambleButton from './ScrambleButton';
import Footer from './Footer';

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  // Make projects available throughout the component
  const [projectsList] = useState(projects);

  useEffect(() => {
    // Find the project by ID
    const foundProject = projects.find(p => p.id === parseInt(projectId));
    if (foundProject) {
      setProject(foundProject);
      // Simulate loading data from a CMS
      setTimeout(() => {
        setLoading(false);
      }, 500);
      
      // Scroll to top when component mounts
      window.scrollTo(0, 0);
    }

    // Track scroll position for animations
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projectId]);

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="loader"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Project Not Found</h1>
        <Link to="/">Return Home</Link>
      </div>
    );
  }

  return (
    <div 
      className="project-detail"
      style={{
        background: project.backgroundGradient || 'var(--background-color)'
      }}>
      <div className="project-header">
        <div 
          className="project-hero" 
          style={{
            backgroundImage: `url(${project.heroImage || project.image})`,
            transform: `translateY(${scrollPosition * 0.2}px)`
          }}
        >
          <div className="project-overlay"></div>
          <div className="project-title-container">
            <h1 className="project-title">{project.name}</h1>
            <p className="project-category">{project.category}</p>
          </div>
        </div>
      </div>

      <div className="project-content">
        <div className="project-info">
          <div className="project-metadata">
            <div className="metadata-item">
              <h3>Client</h3>
              <p>{project.client || 'Personal Project'}</p>
            </div>
            <div className="metadata-item">
              <h3>Year</h3>
              <p>{project.year || '2025'}</p>
            </div>
            <div className="metadata-item">
              <h3>Role</h3>
              <p>{project.role || 'Designer & Developer'}</p>
            </div>
            <div className="metadata-item">
              <h3>Technologies</h3>
              <div className="tech-tags">
                {(project.technologies || ['React', 'GSAP', 'Three.js']).map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="project-description">
            <h2>Overview</h2>
            <p>{project.description || 'This is a detailed description of the project that would come from a CMS. It includes information about the goals, challenges, and solutions implemented in the project.'}</p>
            
            <h2>Challenge</h2>
            <p>{project.challenge || 'The main challenge of this project was to create a visually stunning and interactive experience while maintaining performance and accessibility.'}</p>
            
            <h2>Solution</h2>
            <p>{project.solution || 'I implemented a combination of modern web technologies including React for the UI, GSAP for animations, and Three.js for 3D effects. The result is a seamless and engaging user experience that showcases the project in the best possible way.'}</p>
          </div>
        </div>

        <div className="gallery-container">
          <div className="gallery-controls">
            <h2>Project Gallery</h2>
            <div className="gallery-navigation">
              <button className="gallery-nav-button prev" onClick={() => {
                const gallery = document.querySelector('.project-gallery');
                gallery.scrollBy({ left: -gallery.offsetWidth * 0.85, behavior: 'smooth' });
              }}>
                <span>←</span>
              </button>
              <button className="gallery-nav-button next" onClick={() => {
                const gallery = document.querySelector('.project-gallery');
                gallery.scrollBy({ left: gallery.offsetWidth * 0.85, behavior: 'smooth' });
              }}>
                <span>→</span>
              </button>
            </div>
          </div>
          <div className="project-gallery">
            {(project.gallery || [project.image, project.image, project.image]).map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`${project.name} - Gallery ${index + 1}`} />
                <div className="gallery-item-number">{index + 1}/{(project.gallery || [project.image, project.image, project.image]).length}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="project-links">
          <div className="project-links-container">
            <div className="project-links-content">
              <div className="project-links-info">
                <h2>WHY?</h2>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-links-buttons">
                <ScrambleButton text="Download PDF" className="download-button" onClick={() => {}} />
                <ScrambleButton text="View Figma File" className="figma-button" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>

        <div className="project-next">
          <h2>More Projects</h2>
          <div className="next-projects">
            {projectsList.filter(p => p.id !== project.id).slice(0, 2).map((nextProject) => (
              <Link to={`/project/${nextProject.id}`} key={nextProject.id} className="next-project-card">
                <div className="next-project-image" style={{ backgroundImage: `url(${nextProject.image})` }}></div>
                <div className="next-project-info">
                  <h3>{nextProject.name}</h3>
                  <ScrambleButton text="View Project" className="view-project-button" onClick={() => {}} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="back-to-home">
          <Link to="/">
            <ScrambleButton text="Back to Home" className="back-button" onClick={() => {}} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProjectDetail;
