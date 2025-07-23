import React, { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import "./Projects.css";

const Projects = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const neonColors = ["#7c3aed", "#3b82f6", "#06b6d4"];
    let particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: neonColors[Math.floor(Math.random() * neonColors.length)]
    }));

    const resize = () => {
      if (!canvas.parentElement) return; // Prevent errors if not mounted
      const section = canvas.parentElement;

      // Fallback in case section has no size yet
      const width = section.offsetWidth || window.innerWidth;
      const height = section.offsetHeight || window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#0a0f1f");
      gradient.addColorStop(1, "#1e1b4b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });

      requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      particles.forEach((p) => {
        const distX = e.clientX - p.x;
        const distY = e.clientY - p.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance < 120) {
          p.x -= distX * 0.02;
          p.y -= distY * 0.02;
        }
      });
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const projects = [
    {
      title: "Age Calculator",
      description: "A practical tool that computes age using JavaScript's Date API with a clean, interactive UI.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Date API"],
      type: "Mini Project",
      highlights: ["Real-time calculations", "Clean UI", "Lightweight"],
      codeLink: "https://github.com/Sharmila-Rajendran/Age-Calculator-Using-html-css-javascript.git",
      demoLink: "https://sharmila-rajendran.github.io/Age-Calculator-Using-html-css-javascript/"
    },
    {
      title: "Fluffopia - Pet's Care Website",
      description: "A responsive e-commerce website for pet care products with cart, filtering, and dark mode.",
      technologies: ["HTML5", "CSS3", "JavaScript (ES6)", "Bootstrap"],
      type: "Mini Project",
      highlights: ["Dynamic cart", "Category filtering", "Dark mode", "Checkout page"],
      codeLink: "https://github.com/Sharmila-Rajendran/Fluffopia-Pet-s-Care-Website.git",
      demoLink: "https://sharmila-rajendran.github.io/Fluffopia-Pet-s-Care-Website/"
    },
    {
      title: "Stopwatch",
      description: "A functional stopwatch using JavaScript timing functions with start, stop, and reset.",
      technologies: ["JavaScript", "HTML5", "CSS3"],
      type: "Mini Project",
      highlights: ["Accurate timing", "Multiple controls", "Minimalist UI"],
      codeLink: "https://github.com/Sharmila-Rajendran/Stop-Watch",
      demoLink: "https://sharmila-rajendran.github.io/Stop-Watch/"
    },
    {
      title: "Portfolio",
      description: "A dynamic portfolio showcasing animations and interactive UI. Coming Soon!",
      technologies: ["React.js", "CSS3", "Lucide Icons"],
      type: "Coming Soon",
      highlights: ["Modern UI", "Animations", "Responsive Design"],
      codeLink: null,
      demoLink: null
    },
    {
      title: "Chat Application",
      description: "A client-server chat app where multiple clients can chat via socket communication over a network.",
      technologies: ["Core Java", "Socket Programming", "Networking", "Exception Handling"],
      type: "Coming Soon",
      highlights: ["Multi-client chat", "Socket-based communication", "Network-ready"],
      codeLink: null,
      demoLink: null
    },
    {
      title: "Job Portal",
      description: "A web platform for job seekers and recruiters with listings, applications, and basic authentication.",
      technologies: ["React.js", "Node.js", "MySQL", "REST APIs"],
      type: "Coming Soon",
      highlights: ["Job listings", "Apply & manage jobs", "Simple authentication"],
      codeLink: null,
      demoLink: null
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <canvas ref={canvasRef} className="projects-particle-canvas" />
      <div className="container">
        <div className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            A showcase of my work in frontend development and interactive web apps
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className={`project-card ${project.type === "Coming Soon" ? "coming-soon" : ""}`}>
              <div className="project-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-type">{project.type}</span>
              </div>
              <p className="project-description">{project.description}</p>

              <div className="project-highlights">
                <h4>Key Features:</h4>
                <ul>
                  {project.highlights.map((highlight, i) => (
                    <li key={i}>• {highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="project-tech">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>

              {project.type !== "Coming Soon" && (
                <div className="project-buttons">
                  {project.codeLink && (
                    <a href={project.codeLink} target="_blank" rel="noreferrer" className="btn purple">
                      <Github size={16} /> View Code
                    </a>
                  )}
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="btn blue">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="github-link">
          <a href="https://github.com/Sharmila-Rajendran" target="_blank" rel="noreferrer" className="btn primary">
            <Github size={20} /> View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
