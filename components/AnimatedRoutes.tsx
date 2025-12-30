import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLanguage, LanguageContext } from '../contexts/LanguageContext';

import PageTransition from './ui/PageTransition';

// Pages
import Home from '../pages/Home';
import About from '../pages/About';
import MissionVision from '../pages/MissionVision';
import Legal from '../pages/Legal';
import Operational from '../pages/Operational';
import Governing from '../pages/Governing';
import Contact from '../pages/Contact';
import Activities from '../pages/Activities';
import Gallery from '../pages/Gallery';

const AnimatedRoutes: React.FC = () => {
    const location = useLocation();
    const { language, toggleLanguage } = useLanguage();

    return (
        <AnimatePresence mode="wait">
            <PageTransition key={`${location.pathname}-${language}`}>
                <LanguageContext.Provider value={{ language, toggleLanguage }}>
                    <Routes location={location}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/mission-vision" element={<MissionVision />} />
                        <Route path="/legal" element={<Legal />} />
                        <Route path="/operational-area" element={<Operational />} />
                        <Route path="/governing-body" element={<Governing />} />
                        <Route path="/activities" element={<Activities />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </LanguageContext.Provider>
            </PageTransition>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
