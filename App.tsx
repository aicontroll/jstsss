import React, { useEffect } from 'react';
import { HashRouter as Router, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import AnimatedRoutes from './components/AnimatedRoutes';
import ChatWidget from './components/ChatWidget';

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
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <ScrollProgress />
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;