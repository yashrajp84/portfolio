import React from 'react';
import './underconstruction.css';
import { getAssetUrl } from '../utils/assetUtils';

const UnderConstruction = () => {
  return (
    <div className="construction-section">
      <div className="construction-content">
        <div className="construction-item">
          <div className="construction-box">
            <img src={getAssetUrl('Circular_vector.png')} alt="Vector Background" className="construction-background" />
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