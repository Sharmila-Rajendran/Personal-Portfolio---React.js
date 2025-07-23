import React, { useEffect, useRef } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import "./Hero.css";

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Dark neon palette (purple, blue, teal)
    const neonColors = ["#7c3aed", "#3b82f6", "#06b6d4", "#9333ea"];

    let particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
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
      // Dark gradient background fill
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#0a0f1f");
      gradient.addColorStop(1, "#1e1b4b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
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
        if (distance < 150) {
          p.x -= distX * 0.015;
          p.y -= distY * 0.015;
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

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section">
      {/* Cursor-reactive neon particles with dark gradient background */}
      <canvas ref={canvasRef} className="particle-canvas" />

      <div className="hero-content">
        <h1 className="hero-title">Sharmila Rajendran</h1>
        <p className="hero-subtitle">Aspiring Frontend Developer</p>
        <p className="hero-description">
          Computer Science Engineering Graduate passionate about building clean, scalable, and user-centric web interfaces using modern technologies.
        </p>

        <div className="hero-buttons">
          <a
            href="/resume.pdf"  // Place resume in the `public/` folder
            download="Sharmila_New_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            <Download size={20} /> Download Resume <span className="arrow">→</span>
          </a>

          <div className="social-links">
            <a href="https://github.com/Sharmila-Rajendran" target="_blank" rel="noreferrer">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/sharmila-rajendran092a35255" target="_blank" rel="noreferrer">
              <Linkedin size={24} />
            </a>
            <a href="mailto:sharmila300803@gmail.com">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <button onClick={scrollToAbout} className="scroll-btn">
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
