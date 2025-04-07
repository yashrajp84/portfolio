import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero'; // Ensure correct case
import AboutMe from './components/AboutMe'; // Ensure correct case
import DesignJourney from './components/DesignJourney'; // Ensure correct case
import SelectedWork from './components/SelectedWork'; // Ensure correct case
import Footer from './components/Footer'; // Ensure correct case
import ProjectDetail from './components/ProjectDetail'; // Ensure correct case
import Navigation from './components/Navigation'; // Ensure correct case
import LoadingScreen from './components/LoadingScreen'; // Ensure correct case
import Cursor from './components/Cursor'; // Ensure correct case

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