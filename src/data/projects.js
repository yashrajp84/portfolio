const projects = [
  {
    id: 1,
    name: 'ContinuCare Health Platform',
    category: 'UX/UI Design & Development',
    image: '/project1.jpg',
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

export default projects;