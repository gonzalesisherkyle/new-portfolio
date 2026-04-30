import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Public Pages
const Home = lazy(() => import('../pages/Home'));
const Projects = lazy(() => import('../pages/Projects'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const Experience = lazy(() => import('../pages/Experience'));
const Skills = lazy(() => import('../pages/Skills'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));

// Admin Pages
const AdminLogin = lazy(() => import('../pages/admin/Login'));
const AdminLayout = lazy(() => import('../components/layout/AdminLayout'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const ProjectAdmin = lazy(() => import('../pages/admin/ProjectAdmin'));
const ExperienceAdmin = lazy(() => import('../pages/admin/ExperienceAdmin'));
const SkillAdmin = lazy(() => import('../pages/admin/SkillAdmin'));
const MessageAdmin = lazy(() => import('../pages/admin/MessageAdmin'));
const AboutAdmin = lazy(() => import('../pages/admin/AboutAdmin'));
const SettingsAdmin = lazy(() => import('../pages/admin/SettingsAdmin'));

const Loading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user || !user.isAdmin) return <Navigate to="/admin/login" />;
  return children;
};

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ProjectAdmin />} />
            <Route path="experience" element={<ExperienceAdmin />} />
            <Route path="skills" element={<SkillAdmin />} />
            <Route path="messages" element={<MessageAdmin />} />
            <Route path="about" element={<AboutAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRoutes;
