import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import projects from '../data/projects';
import './ProjectDetail.css';
import ScrambleButton from './ScrambleButton';
import Footer from './Footer';

function ProjectDetail() {

  let projects = [
    {
      id: 1,
      name: 'ContinuCare Health Platform',
      category: 'UX/UI Design & Development',
      image: '/project1.jpg',
      heroImage: '/project1-hero.jpg',
      backgroundGradient: 'linear-gradient(, #7E0050 0%, #290122 100%)',
      client: 'Royal Women\'s Hospital',
      year: '2024',
      role: 'Lead Designer & Frontend Developer',
      technologies: ['React', 'GSAP', 'Figma', 'Node.js', 'MongoDB'],
      description: 'ContinuCare is a comprehensive healthcare platform designed to enhance the patient experience at the Royal Women\'s Hospital in Melbourne. The project focuses on creating a seamless, personalized, and supportive experience for expectant mothers through an empathy-driven and trauma-informed approach.',
      challenge: 'The main challenge was to address existing gaps in the healthcare system, particularly by fostering trust and accessibility at every touchpoint. Using a combination of digital and physical tools, the design needed to provide consistent support both during hospital visits and remotely.',
      solution: 'I implemented a user-centered design approach with extensive research and iterative prototyping. The final solution includes a responsive web application with real-time appointment tracking, personalized care plans, and educational resources. The interface prioritizes accessibility and emotional well-being, with careful attention to color psychology and intuitive navigation.',
      gallery: [
        '/project1-detail1.jpg',
        '/project1-detail2.jpg',
        '/project1-detail3.jpg'
      ],
      testimonial: {
        quote: 'The ContinuCare platform has transformed how we interact with expectant mothers, significantly improving patient satisfaction and care outcomes.',
        author: 'Dr. Sarah Johnson, Director of Maternal Health'
      }
    },
    {
      id: 2,
      name: 'EcoTrack Sustainability App',
      category: 'Mobile Application',
      image: '/project2.jpg',
      client: 'GreenFuture Initiative',
      year: '2023',
      role: 'UX Designer & Prototyper',
      technologies: ['React Native', 'Firebase', 'Sketch', 'Lottie Animations'],
      description: 'EcoTrack is a mobile application that helps users monitor and reduce their carbon footprint through daily activities tracking, personalized recommendations, and community challenges.',
      challenge: 'The key challenge was to create an engaging and intuitive interface that would motivate users to consistently track their environmental impact without feeling overwhelmed by data or guilty about their habits.',
      solution: 'I designed a gamified experience with progressive disclosure of information, celebratory micro-interactions, and social features that foster community support. The app uses beautiful visualizations to represent abstract environmental concepts and provides actionable insights tailored to each user\'s lifestyle.',
      gallery: [
        '/project2-detail1.jpg',
        '/project2-detail2.jpg',
        '/project2-detail3.jpg'
      ],
      testimonial: {
        quote: 'EcoTrack has revolutionized how we approach environmental education and personal responsibility. The user engagement metrics have exceeded our expectations.',
        author: 'Maya Chen, CEO of GreenFuture Initiative'
      }
    },
    {
      id: 3,
      name: 'Artisan E-commerce Platform',
      category: 'Web Design & Development',
      image: '/project3.jpg',
      client: 'Handcrafted Collective',
      year: '2023',
      role: 'Full-stack Designer & Developer',
      technologies: ['React', 'Three.js', 'GSAP', 'Node.js', 'Stripe API'],
      description: 'A bespoke e-commerce platform designed to showcase and sell handcrafted products from independent artisans across Australia, with immersive product experiences and storytelling elements.',
      challenge: 'The challenge was to create a digital shopping experience that could capture the tactile and emotional qualities of handcrafted items, while providing a seamless and secure purchasing process for customers.',
      solution: 'I developed a platform with interactive 3D product previews, artisan story features, and a streamlined checkout process. The design emphasizes the unique characteristics of each product through high-quality imagery, detailed descriptions, and behind-the-scenes content about the creation process.',
      gallery: [
        '/project3-detail1.jpg',
        '/project3-detail2.jpg',
        '/project3-detail3.jpg'
      ],
      testimonial: {
        quote: 'Our online sales have increased by 200% since launching the new platform. Customers particularly love the immersive product experiences and artisan stories.',
        author: 'Emma Taylor, Founder of Handcrafted Collective'
      }
    },
    {
      id: 4,
      name: 'Neuroscience Institute Rebrand',
      category: 'Brand Identity & Web Design',
      image: '/project4.jpg',
      heroImage: '/project4-hero.jpg',
      backgroundGradient: 'linear-gradient(135deg, #F8F6F4 0%, #E3E3E3 100%)',
      client: 'Melbourne Neuroscience Institute',
      year: '2022',
      role: 'Brand Designer & Creative Director',
      technologies: ['Adobe Creative Suite', 'Figma', 'WordPress', 'After Effects'],
      description: 'A comprehensive rebrand for the Melbourne Neuroscience Institute, including a new visual identity, website, and communication materials that reflect the organization\'s innovative research and community impact.',
      challenge: 'The institute needed a modern identity that would communicate complex scientific concepts to diverse audiences—from academic researchers and healthcare professionals to patients and donors—while maintaining scientific credibility.',
      solution: 'I created a flexible visual system inspired by neural networks, with a dynamic logo that represents connectivity and knowledge exchange. The color palette transitions from deep blues to vibrant purples, symbolizing the depth and breadth of neuroscience research. The website architecture was designed to serve multiple user journeys with tailored content presentation.',
      gallery: [
        '/project4-detail1.jpg',
        '/project4-detail2.jpg',
        '/project4-detail3.jpg'
      ],
      testimonial: {
        quote: 'The new brand identity perfectly captures our mission to advance neuroscience research while making our work accessible to the broader community.',
        author: 'Professor David Wilson, Director of Melbourne Neuroscience Institute'
      }
    }
  ];

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
