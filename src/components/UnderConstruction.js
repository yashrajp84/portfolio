import React from 'react';
import './underconstruction.css';
import CircularVector from '../Circular_vector.svg';

const UnderConstruction = () => {
  return (
    <div className="construction-section">
      <div className="construction-content">
        <div className="construction-item">
          <div className="construction-box">
            <img src={CircularVector} alt="Vector Background" className="construction-background" />
            <div className="construction-text-group">
              <h2 className="construction-heading">Under Construction</h2>
              <p className="construction-message">This section is currently being built with care.</p>
              <p className="construction-details">Check back soon for updates!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;