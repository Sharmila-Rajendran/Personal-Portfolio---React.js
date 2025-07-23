import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, Github, Linkedin, MapPin, Send } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const neonColors = ["#7c3aed", "#3b82f6", "#06b6d4"];
    let particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
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
        ctx.globalAlpha = 0.6;
        ctx.shadowBlur = 12;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: <Mail className="icon purple" />, label: "Email", value: "sharmila300803@gmail.com", href: "mailto:sharmila300803@gmail.com" },
    { icon: <Phone className="icon blue" />, label: "Phone", value: "+91 9345285469", href: "tel:+919345285469" },
    { icon: <Github className="icon white" />, label: "GitHub", value: "github.com/Sharmila-Rajendran", href: "https://github.com/Sharmila-Rajendran" },
    { icon: <Linkedin className="icon blue" />, label: "LinkedIn", value: "linkedin.com/in/sharmila-rajendran092a35255", href: "https://linkedin.com/in/sharmila-rajendran092a35255" }
  ];

  return (
    <section id="contact" className="contact-section">
      <canvas ref={canvasRef} className="contact-particle-canvas" />
      <div className="container">
        <div className="header">
          <h2 className="title">Get In Touch</h2>
          <p className="subtitle">
            I'm actively seeking job opportunities. Let's connect and discuss how I can contribute to your team!
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="info-section">
            <div className="box">
              <h3 className="box-title">Let's Connect</h3>
              <p className="box-text">
                I'm passionate about frontend development and eager to learn from experienced teams. Whether you have a job opportunity or just want to chat about technology, I'd love to hear from you!
              </p>
              <div className="contact-list">
                {contactInfo.map((info, i) => (
                  <a key={i} href={info.href} target="_blank" rel="noreferrer" className="contact-item">
                    {info.icon}
                    <div>
                      <p className="contact-label">{info.label}</p>
                      <p className="contact-value">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="box">
              <div className="icon-title">
                <MapPin className="icon green" />
                <h3 className="box-title">Location</h3>
              </div>
              <p className="box-text">Tamil Nadu, India<br />Available for remote work and relocation</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-section box">
            <h3 className="box-title">Send a Message</h3>
            <form onSubmit={handleSubmit} className="form">
              <div>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required value={formData.message} onChange={handleChange}></textarea>
              </div>
              <button type="submit" className="submit-btn">
                <Send size={20} /> Send Message
              </button>
            </form>
          </div>
        </div>

        <footer className="footer">
          © 2024 Sharmila Rajendran. Built with React.
        </footer>
      </div>
    </section>
  );
};

export default Contact;
