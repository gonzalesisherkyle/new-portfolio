import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  HiOutlineViewGrid, 
  HiOutlineBriefcase, 
  HiOutlineAcademicCap, 
  HiOutlineMail, 
  HiOutlineLogout,
  HiOutlineHome
} from 'react-icons/hi';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <HiOutlineViewGrid /> },
    { name: 'Projects', path: '/admin/projects', icon: <HiOutlineBriefcase /> },
    { name: 'Experience', path: '/admin/experience', icon: <HiOutlineAcademicCap /> },
    { name: 'Skills', path: '/admin/skills', icon: <HiOutlineViewGrid /> },
    { name: 'About', path: '/admin/about', icon: <HiOutlineViewGrid /> },
    { name: 'Messages', path: '/admin/messages', icon: <HiOutlineMail /> },
    { name: 'Settings', path: '/admin/settings', icon: <HiOutlineHome /> },
  ];

  return (
    <div className="min-h-screen flex bg-dark-bg text-dark-text">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-card border-r border-slate-800 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold gradient-text">Admin Panel</h2>
          <p className="text-xs text-slate-500 mt-1">Logged in as {user?.name}</p>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white">
            <HiOutlineHome className="text-xl" /> Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
          >
            <HiOutlineLogout className="text-xl" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
