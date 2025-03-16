// Select main elements
const mainContainer = document.querySelector(".main-container");
const extraLongContainer = mainContainer.querySelector(".extra-long-container");
const horizontalCoordinate = mainContainer.querySelector(".horizontal-coordinate");

// Variables for smooth scrolling
let targetScrollLeft = 0;
let currentScrollLeft = 0;
const scrollEase = 0.05; // Reduced for smoother transitions

// Variables for distortion effect
let distortionStrength = 0;
const maxDistortion = 0.3; // Distortion strength for WebGL effect
const distortionEase = 0.08; // Ease factor for distortion

// Initialize WebGL distortion
let distortionInstances = [];

// Wait for DOM to be fully loaded before initializing WebGL
document.addEventListener('DOMContentLoaded', () => {
    // Initialize WebGL distortion for all card images
    distortionInstances = window.WebGLDistortionUtils.initWebGLDistortion();
});

// Update distortion based on scroll position
function updateDistortion() {
    const scrollDiff = targetScrollLeft - currentScrollLeft;

    // Apply distortion when scrolling
    if (Math.abs(scrollDiff) > 0.1) {
        // Use absolute value for consistent distortion strength in both directions
        // but maintain the sign for direction
        distortionStrength = Math.sign(scrollDiff) * maxDistortion * (Math.abs(scrollDiff) / (extraLongContainer.scrollWidth * 0.1));
    } else {
        // Ease distortion to zero when scrolling stops
        distortionStrength += (0 - distortionStrength) * distortionEase;
    }

    // Update WebGL distortion if instances are available
    if (distortionInstances.length > 0) {
        window.WebGLDistortionUtils.updateWebGLDistortion(distortionInstances, distortionStrength);
    }

    requestAnimationFrame(updateDistortion);
}
updateDistortion();

// Handle scroll events
const onScroll = (event) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    targetScrollLeft += delta * 30;

    targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, extraLongContainer.scrollWidth - mainContainer.clientWidth));
}

document.addEventListener("wheel", onScroll, { passive: false });

// Animation loop for smooth scrolling
function animateScroll() {
    const scrollDiff = targetScrollLeft - currentScrollLeft;

    if (Math.abs(scrollDiff) > 0.1) {
        currentScrollLeft += scrollDiff * scrollEase;
    } else {
        currentScrollLeft = targetScrollLeft;
    }

    mainContainer.scrollLeft = currentScrollLeft;
    // Remove or comment out the line below to stop updating the horizontal coordinate
    // horizontalCoordinate.innerText = "x: " + Math.round(currentScrollLeft);

    requestAnimationFrame(animateScroll);
}
animateScroll();

// Horizontal Scroll Setup
const scrollContainer = document.querySelector(".horizontal-container");
const scrollSpeed = 0.1;
let scrollX = 0;

const updateScroll = () => {
    const maxScroll = scrollContainer.scrollWidth - window.innerWidth;
    scrollX += (window.scrollY * scrollSpeed - scrollX) * 0.1;
    scrollX = Math.max(0, Math.min(scrollX, maxScroll));

    scrollContainer.style.transform = `translateX(-${scrollX}px)`;
    // Remove or comment out the line below to stop updating the horizontal coordinate
    // document.querySelector(".horizontal-coordinate").textContent = `X: ${Math.round(scrollX)}`;

    requestAnimationFrame(updateScroll);
};
updateScroll();

// GSAP animation for cards
gsap.registerPlugin(ScrollTrigger);

gsap.to(".card", {
    scale: 1.2,
    duration: 1,
    scrollTrigger: {
        trigger: ".card",
        start: "left 70%",
        end: "left 30%",
        horizontal: true,
        scrub: true
    }
});

// GSAP Scroll Animations
const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
    gsap.fromTo(
        card,
        { scale: 0.8, opacity: 0.5 },
        {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
                trigger: card,
                start: "top center",
                end: "bottom center",
                scrub: true,
            },
        }
    );
});

// Remove hover effects from .card elements
// Ensure hover effects are only applied to .card-image elements

// Removed hover effects from card images
document.querySelectorAll(".card-image").forEach((cardImage) => {
    // All hover event listeners have been removed
});

// Ensure no hover effects are applied to .card elements
document.querySelectorAll(".card").forEach((card) => {
    card.removeEventListener("mouseenter", () => {});
    card.removeEventListener("mouseleave", () => {});
});
