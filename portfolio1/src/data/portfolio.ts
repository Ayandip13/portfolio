export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Mobile' | 'Backend' | 'Tools';
  proficiency: number; // 0-100
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

// Portfolio Data
export const portfolioData = {
  // Hero Section
  hero: {
    name: 'Ayandip paul',
    tagline: 'Creative Software Developer',
    description: 'Building next-generation digital experiences with cutting-edge technologies',
    ctaButtons: [
      { text: 'View Projects', href: '#projects', variant: 'primary' as const },
      { text: 'Get in Touch', href: '#contact', variant: 'secondary' as const },
    ],
  },

  // About Section
  about: {
    bio: `I'm a passionate software developer who loves creating beautiful, functional, and user-friendly applications. With expertise in modern mobile and web technologies, I transform ideas into reality through clean code and innovative design.

My approach combines technical excellence with creative problem-solving, always pushing the boundaries of what's possible in digital experiences.`,
    avatar: '/avatar.png', // Placeholder - will be generated
  },

  // Skills
  skills: [
    // Frontend
    { name: 'React Native', category: 'Mobile' as const, proficiency: 75, icon: 'FaReact' },
    { name: 'JavaScript', category: 'Frontend' as const, proficiency: 75, icon: 'FaJsSquare' },
    { name: 'TypeScript', category: 'Mobile' as const, proficiency: 50, icon: 'SiTypescript' },
    { name: 'React', category: 'Frontend' as const, proficiency: 60, icon: 'FaReact' },
    { name: 'Redux-ToolKit', category: 'Mobile' as const, proficiency: 55, icon: 'SiRedux' },
    { name: 'Zustand', category: 'Mobile' as const, proficiency: 50, icon: 'SiReact' },
    { name: 'Tailwind CSS', category: 'Frontend' as const, proficiency: 50, icon: 'SiTailwindcss' },
    { name: "HTML", category: 'Frontend' as const, proficiency: 60, icon: 'FaHtml5' },
    { name: "CSS", category: 'Frontend' as const, proficiency: 60, icon: 'FaCss3Alt' },
    { name: 'Reanimated', category: 'Mobile' as const, proficiency: 40, icon: 'FaReact' },

    // Backend
    { name: 'Node.js', category: 'Backend' as const, proficiency: 60, icon: 'FaNodeJs' },
    { name: 'MongoDB', category: 'Backend' as const, proficiency: 40, icon: 'SiMongodb' },
    { name: 'Firebase', category: 'Backend' as const, proficiency: 40, icon: 'SiFirebase' },

    // Tools
    { name: 'Git', category: 'Tools' as const, proficiency: 60, icon: 'FaGitAlt' },
    { name: 'VS Code', category: 'Tools' as const, proficiency: 60, icon: 'FaCode' },
    { name: 'Postman', category: 'Tools' as const, proficiency: 60, icon: 'SiPostman' }
  ],

  // Projects
  projects: [
    {
      id: '1',
      title: 'E-Commerce Mobile App',
      description: 'A full-featured e-commerce mobile application with modern UI and seamless user experience.',
      longDescription:
        'A complete e-commerce mobile app built with React Native, featuring product browsing, authentication, cart management, and order flow. The app is powered by a scalable Express and MongoDB backend, with state management handled using Redux Toolkit and payment gateway integration using Razorpay.',
      image: '/projects/project1.png',
      technologies: [
        'React Native',
        'TypeScript',
        'Redux Toolkit',
        'Express.js',
        'MongoDB'
      ],
      category: 'Mobile Application',
      githubUrl: 'https://github.com/Ayandip13/e-commerce',
      featured: true,
    },
    {
      id: '2',
      title: 'Social Media App',
      description: 'Social media app for book lovers',
      longDescription: 'A social media app for book lovers with features like review, rating, and recommendation.',
      image: '/projects/project2.png',
      technologies: ['React Native', 'TypeScript', 'Zustand', 'Express', 'MongoDB'],
      category: 'Mobile Application',
      githubUrl: 'https://github.com/Ayandip13/Bookosaurs',
      featured: true,
    },
    {
      id: '3',
      title: 'News App',
      description: 'Modern news app',
      longDescription: "It's a news app using NewsAPI and modern UI.",
      image: '/projects/project3.png',
      technologies: ['React Native', 'TypeScript', 'MMKV'],
      category: 'Mobile Application',
      githubUrl: 'https://github.com/Ayandip13/insiderProto',
      featured: true,
    },
  ],

  // Experience
  experience: [
    {
      id: '1',
      company: 'Weavers web solutions pvt ltd',
      role: 'Software Developer Intern',
      period: '2025(2 june - 9 december)',
      description: '',
      achievements: [
        'Contributed to 2 client projects',
        'Learned new technologies and tools',
        'Collaborated with design and QA team on UX improvements and bug fixes'
      ],
    },
  ],

  // Social Links
  social: [
    { name: 'GitHub', url: 'https://github.com/Ayandip13', icon: 'FaGithub' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ayandip13/', icon: 'FaLinkedin' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'FaTwitter' },
    { name: 'Email', url: 'mailto:ayandippaul284@gmail.com', icon: 'FaEnvelope' },
  ],

  // Contact
  contact: {
    email: 'ayandippaul284@gmail.com',
    location: 'Kolkata, West Bengal, India',
  },
};
