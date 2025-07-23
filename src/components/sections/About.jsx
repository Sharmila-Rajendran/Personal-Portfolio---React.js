import React, { useEffect, useRef } from "react";
import { GraduationCap, MapPin, Award } from "lucide-react";
import "./About.css";

// Import your profile image (make sure filename has no spaces!)
import profilePic from "../../assets/SharmilaProfileNew.jpg";

const About = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Subtle particles for background
    const neonColors = ["#7c3aed", "#3b82f6", "#06b6d4"];
    let particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
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
        ctx.globalAlpha = 0.4;
        ctx.shadowBlur = 10;
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

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section id="about" className="about-section">
      <canvas ref={canvasRef} className="about-particle-canvas" />
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Learn more about my journey, education, and passion for frontend development
          </p>
        </div>

        <div className="about-content">
          {/* Left Column: Profile & Story */}
          <div className="left-column">
            <div className="profile-wrapper">
              {/* Profile Image */}
              <img src={profilePic} alt="Profile" className="profile-image" />
              <div className="profile-circle animated" />
            </div>

            <div className="about-box">
              <h3 className="about-heading">My Story</h3>
              <p className="about-text">
                I am deeply passionate about building clean, scalable, and user-centric web interfaces.
                Currently seeking job opportunities where I can contribute my frontend development skills,
                learn from experienced teams, and grow into a full-stack developer role.
              </p>
            </div>
          </div>

          {/* Right Column: Education & Achievements */}
          <div className="right-column">
            <div className="about-box">
              <div className="icon-title">
                <GraduationCap className="icon" size={24} />
                <h3 className="about-heading">Education</h3>
              </div>
              <p className="about-text">
                <strong>Computer Science Engineering</strong><br />
                Hindusthan College of Engineering and Technology<br />
                Class of 2025
              </p>
              <p className="about-text"><b>CGPA:</b> 9.08</p>
            </div>

            <div className="about-box">
              <div className="icon-title">
                <Award className="icon" size={24} />
                <h3 className="about-heading">Achievements</h3>
              </div>
              <ul className="about-list">
                <li>• Notable Participant - IIT Bombay FOSSEE Mapathon 2023</li>
                <li>• Notable Participant - AICTE Mapathon 2022</li>
                <li>• HTML5 Basics Certification - Udemy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Language Box */}
        <div className="language-box-center">
          <div className="about-box">
            <div className="icon-title">
              <MapPin className="icon" size={24} />
              <h3 className="about-heading">Languages I Speak</h3>
            </div>
            <div className="language-tags">
              <div className="language-tag">
                <span>Tamil</span>
                <span className="level">(Native)</span>
              </div>
              <div className="language-tag">
                <span>Malayalam</span>
                <span className="level">(Fluent)</span>
              </div>
              <div className="language-tag">
                <span>English</span>
                <span className="level">(Professional)</span>
              </div>
              <div className="language-tag">
                <span>Hindi</span>
                <span className="level">(Basic)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
