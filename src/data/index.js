// ============================================================
// src/data/index.js — edit all personal content here
// ============================================================

export const personal = {
  name: "Prabhu Kiran",
  shortName: "Prabhu Kiran",
  tagline: "Building intelligent products with clean code and thoughtful design.",
  subtitle: "Full Stack & AI Developer",
  description:
    "B.Tech CSE student at VNR VJIET passionate about AI, software development, and creative technology, building innovative solutions that combine technology, problem-solving, and modern design.",
  bio: "I'm a B.Tech Computer Science student at VNR VJIET (2024–2028) with a CGPA of 9.07. I build AI-powered, real-world systems such as maritime decision support, patient monitoring and misinformation detection, and turn them into clean, responsive web applications using React, FastAPI and Node.js. I enjoy hackathons, learning quickly, and shipping projects that solve real problems.",
  education: {
    degree: "B.Tech CSE",
    institution: "VNR VJIET",
    year: "2024–2028",
    cgpa: "9.07",
  },
  location: "Hyderabad, India",
  email: "nakkaprabhukiran@gmail.com",
  phone: "+91 9346156382",
  whatsapp: "919346156382",
  resume: "/resume/Prabhu_Kiran_Nakka_Resume.pdf",
  linkedin: "https://www.linkedin.com/in/prabhukiran-nakka/",
  github: "https://github.com/nprabhu-06",
};

export const stats = [
  { value: 9.07, label: "CGPA", decimals: 2 },
  { value: 3, label: "Projects", suffix: "+" },
  { value: 2, label: "Competition Wins", suffix: "" },
  { value: 7, label: "Certifications", suffix: "+" },
];

export const quickFacts = [
  { icon: "🎓", title: "Education", value: "VNR VJIET", sub: "B.Tech CSE" },
  { icon: "🔭", title: "Focus", value: "Full Stack + AI/ML", sub: "React · FastAPI · Python" },
  { icon: "🤝", title: "Community", value: "CSI Volunteer", sub: "ISTE Associate Media Head" },
];

export const rollingWords = [
  "Full Stack Developer",
  "AI/ML Builder",
  "Problem Solver",
  "Hackathon Enthusiast",
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const skills = {
  Languages: ["C", "C++", "Java", "Python", "JavaScript", "R"],
  Frontend: ["React", "HTML", "CSS", "Bootstrap", "Tailwind CSS"],
  Backend: ["Node.js", "FastAPI", "REST APIs"],
  Databases: ["PostgreSQL", "MongoDB", "SQL", "Supabase"],
  Tools: ["Git", "GitHub", "Postman", "VS Code"],
  Core: ["Data Structures & Algorithms", "OOP", "DBMS", "Machine Learning"],
  Practices: ["Agile", "SDLC", "RESTful API Design"],
};

export const techMarquee = [
  "React", "Python", "FastAPI", "Node.js", "MongoDB",
  "PostgreSQL", "Supabase", "Git", "Tailwind CSS", "JavaScript",
];

export const experience = [
  {
    id: 1,
    role: "Product Development Intern — EHR Project",
    company: "SEFE Automation Systems Pvt. Ltd.",
    org: "VNR VJIET",
    period: "Aug 2026 – Present",
    type: "Internship",
    description:
      "Contributing to an AI-assisted Electronic Health Records (EHR) system for efficient healthcare data capture and consolidation, streamlining clinical workflows.",
    tags: ["AI", "Healthcare", "Product Development"],
  },
  {
    id: 2,
    role: "ServiceNow Virtual Intern",
    company: "ServiceNow University",
    org: "AICTE · SmartBridge",
    period: "2025",
    type: "Virtual Internship",
    description:
      "Hands-on training in ITSM, workflow automation and ServiceNow platform development through virtual internship program.",
    tags: ["ServiceNow", "ITSM", "Workflow Automation"],
  },
];

export const leadership = [
  { id: 1, role: "Associate Media Head", org: "ISTE Student Chapter", institution: "VNR VJIET", icon: "📸" },
  { id: 2, role: "Volunteer", org: "Computer Society of India (CSI)", institution: "VNR VJIET", icon: "🤝" },
];

export const featuredAchievements = [
  { id: 1, title: "Runner-Up", subtitle: "Project Contest", event: "CONVERGENCE 2K26", org: "VNR VJIET", icon: "🥈" },
  { id: 2, title: "Winner", subtitle: "AdJam Contest", event: "Ecficio 2.0 Entrepreneurship Fest", org: "VNR VJIET", icon: "🏆" },
];

// Used in marquee rows
export const credentials = [
  // Row 1 (scrolls left)
  { id: 1, title: "Microsoft Certified", event: "Power BI Data Analyst Associate", org: "Microsoft", type: "certification", icon: "🔷" },
  { id: 2, title: "ServiceNow Virtual Internship", event: "AICTE · SmartBridge", org: "ServiceNow Univ.", type: "certification", icon: "⚙️" },
  { id: 3, title: "Data Analytics Simulation", event: "Deloitte", org: "Deloitte", type: "certification", icon: "📊" },
  { id: 4, title: "MERN Stack Development", event: "Full-Stack Certification", org: "", type: "certification", icon: "🌐" },
  // Row 2 (scrolls right)
  { id: 5, title: "Cloud Computing", event: "Cloud Certification", org: "", type: "certification", icon: "☁️" },
  { id: 6, title: "Cyber Security Foundations", event: "Security Certification", org: "", type: "certification", icon: "🔐" },
  { id: 7, title: "DSA Coding Training", event: "Smart Interviews", org: "Smart Interviews", type: "certification", icon: "🧠" },
  { id: 8, title: "Associate Media Head", event: "ISTE Student Chapter", org: "VNR VJIET", type: "achievement", icon: "📸" },
];

export const projects = [
  {
    id: 1,
    title: "GreenFleet",
    subtitle: "AI-Powered Maritime Decision Support System",
    description:
      "Optimises fuel selection, vessel speed and route planning by analysing fuel consumption, emissions, weather, fuel costs and voyage constraints.",
    tags: ["Python", "Machine Learning", "Quantum Computing", "React", "FastAPI"],
    github: "https://github.com/nprabhu-06/Green_Fleet.git", // TODO
    color: "#648c11",
  },
  {
    id: 2,
    title: "VitalGuard",
    subtitle: "Smart Patient Monitoring & Emergency Response System",
    description:
      "Real-time ECG, heart rate and SpO2 analysis with anomaly detection, severity scoring and intelligent emergency alerts.",
    tags: ["Python", "FastAPI", "OpenCV", "Socket.IO", "WebSockets"],
    github: "https://github.com/nprabhu-06/Vital-Guard", // TODO
    color: "#dc2626",
  },
  {
    id: 3,
    title: "Fake News Intelligence Platform",
    subtitle: "AI-Powered Misinformation Detection",
    description:
      "Detects misinformation via sentiment analysis and keyword-based risk scoring, with multilingual dashboards and REST APIs.",
    tags: ["React", "Tailwind CSS", "FastAPI", "MongoDB"],
    github: "https://github.com/Prabhukiran16/fake-news-intelligence-system.git", // TODO
    color: "#2563eb",
  },
  {
    id: 4,
    title: "AI-Assisted EHR System",
    subtitle: "Product Development Intern · SEFE Automation Systems · Aug 2026–present",
    description:
      "AI-assisted healthcare data capture and consolidation, streamlining clinical workflows and enabling intelligent health record management.",
    tags: ["AI", "Healthcare", "Product Development"],
    github: "https://github.com/nprabhu-06/EHR_Conversation_decoder.git", // TODO
    color: "#7c3aed",
  },
];

export const capabilities = [
  { id: 1, title: "Full Stack Web Development", tag: "App", color: "#648c11", description: "React frontends with Node.js and FastAPI backends.", icon: "🌐" },
  { id: 2, title: "AI & Machine Learning", tag: "AI", color: "#ff4500", description: "Anomaly detection, NLP and decision-support systems.", icon: "🤖" },
  { id: 3, title: "Data Analytics & Dashboards", tag: "Data", color: "#000080", description: "Power BI, data visualisation and real-time dashboards.", icon: "📊" },
  { id: 4, title: "REST API & Backend Design", tag: "Backend", color: "#dc2626", description: "Clean, documented APIs with PostgreSQL, MongoDB and Supabase.", icon: "⚙️" },
  { id: 5, title: "Healthcare & Real-Time Systems", tag: "Health", color: "#b45309", description: "Patient monitoring, EHR and live data with WebSockets.", icon: "🏥" },
  { id: 6, title: "Hackathon & Rapid Prototyping", tag: "Rapid", color: "#374151", description: "Fast idea-to-working-MVP builds in a team.", icon: "⚡" },
];
