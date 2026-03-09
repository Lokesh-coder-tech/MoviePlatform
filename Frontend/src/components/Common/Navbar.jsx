import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, LogOut, Heart, Search, Home } from 'lucide-react';
import '../../styles/components/navbar.scss';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">MOVIEPLATFORM</Link>
        </div>

        <div className="nav-links">
          <Link to="/" className="desktop-only">Home</Link>
          <Link to="/search" className="desktop-only">Search</Link>
          
          {user && (
            <div className="user-section">
              {/* Admin-only Link */}
              {user.role === 'admin' && (
  <Link to="/admin" className="admin-link">Admin Panel</Link>
)}
              <Link to="/favorites" className="desktop-only">Watchlist</Link>
              <button onClick={logout} className="logout-btn desktop-only">Logout</button>
              <div className="user-badge">{user.username[0].toUpperCase()}</div>
            </div>
          )}

          {!user && (
            <div className="auth-btns">
              <Link to="/login" className="login-link">Sign In</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      {user && (
        <div className="bottom-nav mobile-only">
          <Link to="/"><Home size={22} /><span>Home</span></Link>
          <Link to="/search"><Search size={22} /><span>Search</span></Link>
          {user.role === 'admin' && (
            <Link to="/admin"><LayoutDashboard size={22} /><span>Admin</span></Link>
          )}
          <Link to="/favorites"><Heart size={22} /><span>Favs</span></Link>
          <button onClick={logout}><LogOut size={22} /><span>Exit</span></button>
        </div>
      )}
    </>
  );
};

export default Navbar;