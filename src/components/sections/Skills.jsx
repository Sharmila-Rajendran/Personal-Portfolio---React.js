import React, { useEffect, useRef } from "react";
import { Code, Database, Settings, Globe } from "lucide-react";
import "./Skills.css";

const Skills = () => {
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

  const skillCategories = [
    {
      icon: <Code size={32} />,
      title: "Frontend Development",
      skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Bootstrap", "jQuery"]
    },
    {
      icon: <Database size={32} />,
      title: "Programming & Databases",
      skills: ["Java", "C", "Python", "MySQL", "MongoDB (Basic)"]
    },
    {
      icon: <Settings size={32} />,
      title: "Tools & Workflow",
      skills: ["Git", "GitHub", "Visual Studio Code", "REST APIs (basic)"]
    },
    {
      icon: <Globe size={32} />,
      title: "Core Web Concepts",
      skills: ["Responsive Design", "Component Architecture", "UX Basics"]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <canvas ref={canvasRef} className="skills-particle-canvas" />
      <div className="container">
        <div className="skills-header">
          <h2 className="title">Skills & Technologies</h2>
          <p className="subtitle">
            My technical expertise and tools I use to bring ideas to life
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                <span className="icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-items">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
