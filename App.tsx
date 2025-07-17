import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import CreateRoadmap from './components/CreateRoadmap';
import RoadmapPage from './components/RoadmapPage';
import { Button } from './components/ui/Button';
import AppNavMenu from './components/AppNavMenu';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  return (
    <div className={`relative flex w-full flex-col items-center ${isWelcomePage ? 'h-screen' : 'min-h-screen'}`}>
        {!isWelcomePage && (
          <div className="sticky top-0 z-50 w-full border-b border-gray-200/40 bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto max-w-screen-2xl px-4">
              <AppNavMenu />
            </div>
          </div>
        )}
        <main className={`flex-1 w-full flex items-center justify-center ${!isWelcomePage ? 'p-4' : ''}`}>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-roadmap" element={<CreateRoadmap />} />
                <Route path="/roadmap/:id" element={<RoadmapPage />} />
            </Routes>
        </main>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;