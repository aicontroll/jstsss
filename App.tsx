import React, { useEffect } from 'react';
import { HashRouter as Router, useLocation, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import AnimatedRoutes from './components/AnimatedRoutes';
import ChatWidget from './components/ChatWidget';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import AdminHotkey from './components/admin/AdminHotkey';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <AdminHotkey />
            <ScrollToTop />
            <ScrollProgress />
            {/* Show Navbar on all pages except admin routes (optional, but keeping it simple for now) */}
            <Routes>
              <Route path="/admin/*" element={null} />
              <Route path="*" element={<Navbar />} />
            </Routes>

            <main className="flex-grow">
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                {/* Public Routes */}
                <Route path="/*" element={<AnimatedRoutes />} />
              </Routes>
            </main>

            <Routes>
              <Route path="/admin/*" element={null} />
              <Route path="*" element={<Footer />} />
            </Routes>

            <Routes>
              <Route path="/admin/*" element={null} />
              <Route path="*" element={<ChatWidget />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;