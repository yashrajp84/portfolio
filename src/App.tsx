import React, { useEffect, useRef } from 'react';
import './fonts.css';
import './index.css';
import './App.css';
import circularVector from './assets/images/Circular _vector.svg';
import gsap from 'gsap';
import Footer from './components/Footer';
import WorkSection from './components/sections/WorkSection';

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const numberChars = "0123456789";

function scrambleText(target: HTMLElement, finalText: string, duration: number, isNumber: boolean = false) {
  const length = finalText.length;
  const steps = Math.floor(duration * 60); // 60fps
  const charactersToUse = isNumber ? numberChars : chars;
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep >= steps) {
      target.textContent = finalText;
      clearInterval(interval);
      return;
    }

    let scrambled = "";
    for (let i = 0; i < length; i++) {
      if (currentStep / steps > i / length) {
        scrambled += finalText[i];
      } else {
        scrambled += charactersToUse[Math.floor(Math.random() * charactersToUse.length)];
      }
    }
    target.textContent = scrambled;
    currentStep++;
  }, duration * 1000 / steps);
}

const journeyData = [
  {
    year: "2021",
    role: "Web Designer",
    company: "Karftysocio"
  },
  {
    year: "2022",
    role: "UI/UX Designer",
    company: "Arintra"
  },
  {
    year: "2023",
    role: "Product Designer",
    company: "MDIT, RMIT"
  }
];

function App() {
  const yearRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const animateText = () => {
      const nextIndex = (currentIndex.current + 1) % journeyData.length;
      const nextData = journeyData[nextIndex];

      if (yearRef.current) {
        scrambleText(yearRef.current, nextData.year, 0.8, true);
      }
      if (roleRef.current) {
        scrambleText(roleRef.current, nextData.role, 0.8);
      }
      if (companyRef.current) {
        scrambleText(companyRef.current, nextData.company, 0.8);
      }

      currentIndex.current = nextIndex;
    };

    const interval = setInterval(animateText, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      {/* Border Container */}
      <div className="border-container">
        <div className="border-background" />
        <div className="border-gradient" />
      </div>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Navigation */}
        <nav className="main-nav">
          <div className="nav-brand">Yashraj Patil</div>
          <button className="nav-menu">Menu</button>
        </nav>

        {/* Hero Section */}
        <section className="hero-section">
          <svg className="hero-background" width="850" height="687" viewBox="0 0 850 687" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M778.083 186.23L292.158 686H512.398L89.3967 186.23L2 273.602L848 277.097L778.083 186.23ZM778.083 186.23L746.621 151.281C746.621 151.281 720.964 126.632 715.158 105.847C710.385 88.7577 709.189 77.1225 715.158 60.4133C721.984 41.3055 733.173 33.1382 750.116 21.9694C761.342 14.57 768.773 12.0871 781.579 7.9898C794.839 3.7472 816.537 1 816.537 1M778.083 186.23L816.537 144.291M606.786 186.23L243.215 567.173H582.315L257.199 186.23M606.786 186.23L767.596 378.449H68.4215L257.199 186.23M606.786 186.23L575.324 151.281C575.324 151.281 549.666 126.632 543.861 105.847C539.088 88.7577 537.892 77.1225 543.861 60.4133C550.687 41.3055 561.876 33.1382 578.82 21.9694C590.045 14.57 597.476 12.0871 610.282 7.9898C623.542 3.7472 645.241 1 645.241 1M606.786 186.23L645.241 144.291M431.993 186.23L162.81 472.811H669.712L431.993 186.23ZM431.993 186.23L400.53 151.281C400.53 151.281 374.873 126.632 369.067 105.847C364.294 88.7577 363.098 77.1225 369.067 60.4133C375.893 41.3055 387.082 33.1382 404.026 21.9694C415.251 14.57 422.683 12.0871 435.489 7.9898C448.749 3.7472 470.448 1 470.448 1M431.993 186.23L470.448 144.291M257.199 186.23L225.736 151.281C225.736 151.281 200.078 126.632 194.273 105.847C189.5 88.7577 188.304 77.1225 194.273 60.4133C201.099 41.3055 212.288 33.1382 229.232 21.9694C240.457 14.57 247.889 12.0871 260.695 7.9898C273.955 3.7472 295.653 1 295.653 1M257.199 186.23L295.653 144.291M295.653 144.291C295.653 144.291 304.685 136.978 306.141 130.311C308.49 119.561 301.895 110.976 292.158 105.847C286.231 102.725 285.166 102.352 278.174 102.352C271.182 102.352 266.521 102.352 260.695 105.847C254.868 109.342 246.711 119.827 250.207 130.311C253.688 140.75 263.682 147.293 274.678 147.786C283.304 148.172 295.653 144.291 295.653 144.291ZM470.448 144.291C470.448 144.291 479.479 136.978 480.935 130.311C483.284 119.561 476.689 110.976 466.952 105.847C461.025 102.725 459.96 102.352 452.968 102.352C445.976 102.352 441.315 102.352 435.489 105.847C429.662 109.342 421.505 119.827 425.001 130.311C428.482 140.75 438.477 147.293 449.472 147.786C458.098 148.172 470.448 144.291 470.448 144.291ZM645.241 144.291C645.241 144.291 654.272 136.978 655.728 130.311C658.077 119.561 651.483 110.976 641.745 105.847C635.818 102.725 634.753 102.352 627.762 102.352C620.77 102.352 616.109 102.352 610.282 105.847C604.456 109.342 596.299 119.827 599.795 130.311C603.275 140.75 613.27 147.293 624.266 147.786C632.891 148.172 645.241 144.291 645.241 144.291ZM816.537 144.291C816.537 144.291 825.568 136.978 827.025 130.311C829.373 119.561 822.779 110.976 813.041 105.847C807.115 102.725 806.05 102.352 799.058 102.352C792.066 102.352 787.405 102.352 781.579 105.847C775.752 109.342 767.596 119.827 771.091 130.311C774.572 140.75 784.566 147.293 795.562 147.786C804.188 148.172 816.537 144.291 816.537 144.291ZM127.836 1C127.836 1 106.137 3.7472 92.8773 7.9898C80.0713 12.0871 72.6399 14.57 61.4144 21.9694C44.4705 33.1382 33.2818 41.3055 26.4557 60.4133C20.4865 77.1225 21.6825 88.7577 26.4557 105.847C32.2613 126.632 57.9186 151.281 57.9186 151.281L89.3814 186.23L127.836 144.291M127.836 144.291C127.836 144.291 136.867 136.978 138.324 130.311C140.672 119.561 134.078 110.976 124.34 105.847C118.414 102.725 117.348 102.352 110.357 102.352C103.365 102.352 98.7037 102.352 92.8773 105.847C87.0508 109.342 78.8938 119.827 82.3897 130.311C85.8703 140.75 95.865 147.293 106.861 147.786C115.487 148.172 127.836 144.291 127.836 144.291Z" stroke="white" strokeLinecap="round"/>
          </svg>
          <div className="hero-content">
            <div className="hero-title">
              <h1 className="main-title">
                Creative Digital <br />
                Designer
              </h1>
            </div>
            <div className="hero-cta">
              <button className="explore-button">Explore More</button>
            </div>
          </div>
          <div className="scroll-text">
            Scroll Down to Know More
          </div>
          <button className="mute-button">
            Mute
          </button>
          <div className="location-text">
            Melbourne, AU
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="about-content">
            <h3 className="about-heading">ABOUT ME</h3>
            <div className="about-text">
              Hey, I'm <span className="italic">Yashraj Patil!</span> I started my design journey as a self <br /> {' '}
              <span className="italic">enthusiast</span>, turning my passion into a profession. I've had <br />the
              opportunity to collaborate with diverse teams,{' '}
              <span className="italic">creating impactful <br />designs that make a difference.</span>
            </div>
          </div>
        </section>

        {/* Design Journey */}
        <section className="journey-section">
          <div className="journey-content">
            <h3 className="journey-heading">MY DESIGN JOURNEY</h3>
            <div className="journey-item">
              <div className="journey-box">
                <img 
                  src={circularVector}
                  alt="Journey background" 
                  className="journey-background"
                />
                <div className="journey-text-group">
                  <div className="journey-year" ref={yearRef}>2021</div>
                  <div className="journey-role" ref={roleRef}>Web Designer</div>
                  <div className="journey-company" ref={companyRef}>Karftysocio</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Work */}
        <section className="work-section">
          <div className="work-header">
            <h2 className="section-title">Selected</h2>
            <h3 className="section-subtitle">Work</h3>
          </div>
          <div className="work-grid">
            <div className="work-item prev">
              <h4 className="work-title">Previous Project</h4>
              <p>IMAGE AT 20% OPACITY</p>
            </div>
            <div className="work-item current">
              <h4 className="work-title">Project name</h4>
              <button className="explore-button">Explore More</button>
            </div>
            <div className="work-item next">
              <h4 className="work-title">Next Project</h4>
              <p>AT 20% OPACITY</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="main-footer">
          <div className="footer-content">
            <h2 className="footer-title">Great Design</h2>
            <h3 className="footer-subtitle">Reflects Within</h3>
            <h4 className="footer-text">Simplicity</h4>
            <button className="explore-button">Let's Catch Up</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
