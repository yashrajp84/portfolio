import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './selectedwork.css';
import { fetchProjects } from '../utils/supabase';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardShader from './CardShader';
import ScrambleButton from './ScrambleButton';

gsap.registerPlugin(ScrollTrigger);

function SelectedWork() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const lastScrollY = useRef(0);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    if (!containerRef.current || loading) return;

    const container = containerRef.current;
    const section = sectionRef.current;
    let lastTime = performance.now();

    // Calculate the amount to move horizontally
    const totalMove = container.scrollWidth - window.innerWidth;

    // Handle scroll speed calculation
    const handleScroll = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);
      const speed = scrollDelta / Math.max(deltaTime, 16); // normalized speed
      
      setScrollSpeed(Math.min(speed * 2, 1)); // Scale and clamp the speed
      
      lastScrollY.current = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll);

    // Create the horizontal scroll animation
    gsap.to(container, {
      x: -totalMove,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalMove}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: handleScroll
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="main-container">
      {/* Selected Work Section */}
      <section ref={sectionRef} className="section selected-work-section">
        <div className="scroll-wrapper">
          <div ref={containerRef} className="extra-long-container">
            <div className="selected-work">Selected Work</div>
            {loading ? (
              <div className="loading">Loading projects...</div>
            ) : projects.map((project) => (
              <div key={project.id} className="card" onClick={() => handleProjectClick(project.id)}>
                <div className="card-image">
                  <CardShader
                    imageUrl={project.image}
                    distortionStrength={scrollSpeed}
                  />
                </div>
                <div className="card-content">
                  <div className="project-name">{project.name}</div>
                  <ScrambleButton text="Explore Work" className="explore-work-button" onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when button is clicked
                    handleProjectClick(project.id);
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SelectedWork;