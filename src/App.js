import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/hero';
import AboutMe from './components/AboutMe';
import DesignJourney from './components/DesignJourney';
import SelectedWork from './components/selectedwork.js';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import Navigation from './components/Navigation';
import UnderConstruction from './components/UnderConstruction';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Home page component that combines all sections
function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <DesignJourney />
      <SelectedWork />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/construction" element={<UnderConstruction />} />
        </Routes>
        <SpeedInsights />
      </div>
    </Router>
  );
}

export default App;