import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Mail } from 'lucide-react'; // Lucide icons use kar rahe hain
import '../../styles/components/footer.scss';

const Footer = () => {
  return (
    <footer className="footer glass-effect">
      <div className="footer-content">
        <div className="footer-section brand">
          <Link to="/" className="footer-logo">MOVIEPLATFORM</Link>
          <p>Your ultimate destination for the latest movies and cinematic excellence. Stream anytime, anywhere.</p>
          <div className="social-icons">
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Github size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Mail size={20} /></a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/favorites">My Favorites</Link></li>
            <li><Link to="/login">Sign In</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MoviePlatform. Built with ❤️ for the community.</p>
      </div>
    </footer>
  );
};

export default Footer;