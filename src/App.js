import React from 'react';
import Hero from './components/hero';
import AboutMe from './components/AboutMe';
import DesignJourney from './components/DesignJourney';
import SelectedWork from './components/selectedwork.js';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Hero />
      <AboutMe />
      <DesignJourney />
      <SelectedWork />
      <Footer />
    </div>
  );
}

export default App;