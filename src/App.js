import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/hero';
import AboutMe from './components/AboutMe';
import DesignJourney from './components/DesignJourney';
import SelectedWork from './components/selectedwork.js';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import Cursor from './components/Cursor';

import { ThemeProvider, useTheme } from './context/ThemeContext';

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

const AppContent = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <Router>
      <div className="App">
        <Cursor />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
      ) : (
        <AppContent />
      )}
    </ThemeProvider>
  );
}

export default App;