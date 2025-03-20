import React from 'react';
import './selectedwork.css';
import projects from '../data/projects';

function SelectedWork() {
  return (
    <div className="extra-long-container">
      <div className="selected-work">SELECTED WORK</div>
      {projects.map((project) => (
        <div key={project.id} className="card">
          <div className="card-image">
            <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="card-content">
            <div className="project-name">{project.name}</div>
            <div className="explore-work">Explore Work</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SelectedWork;