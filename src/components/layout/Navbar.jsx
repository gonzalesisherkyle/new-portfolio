import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import Container from '../ui/Container';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Exp', path: '/experience' },
    { name: 'Skills', path: '/skills' },
    { name: 'About', path: '/about' },
    { name: 'Talk', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0d1117] border-b-2 border-[#30363d] py-3' : 'bg-transparent py-5'
    }`}>
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="font-pixel text-sm md:text-lg tracking-tighter text-white">
            <span className="text-primary-400">./</span>Portfolio
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-pixel text-[10px] uppercase transition-colors px-2 py-1 ${
                  location.pathname === link.path 
                    ? 'text-primary-400 border-b-2 border-primary-400' 
                    : 'text-slate-500 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[#30363d]">
                <Link
                  to="/admin/dashboard"
                  className="text-slate-400 hover:text-primary-400 transition-colors text-xl"
                  title="Admin Dashboard"
                >
                  <HiOutlineViewGrid />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-500 transition-colors text-xl"
                  title="Logout"
                >
                  <HiOutlineLogout />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {user && (
              <Link to="/admin/dashboard" className="text-xl text-primary-400">
                <HiOutlineViewGrid />
              </Link>
            )}
            <button className="text-2xl text-slate-300" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0d1117] border-b-4 border-[#30363d] p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-pixel text-xs uppercase ${
                  location.pathname === link.path ? 'text-primary-400' : 'text-slate-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {user && (
              <button
                onClick={handleLogout}
                className="font-pixel text-xs uppercase text-red-500 flex items-center gap-2 mt-2 pt-4 border-t border-[#30363d]"
              >
                <HiOutlineLogout /> Logout
              </button>
            )}
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
