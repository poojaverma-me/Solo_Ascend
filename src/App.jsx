import React, { useState, useEffect } from 'react';
import { useTheme } from './components/ThemeContext';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [appState, setAppState] = useState(() => {
    // Try to load player data
    const savedPlayer = localStorage.getItem('solo-player');
    if (savedPlayer) {
      return { status: 'dashboard', user: JSON.parse(savedPlayer) };
    }
    return { status: 'landing', user: null };
  });

  const handleLogin = (forceOnboarding = false) => {
    const savedPlayer = localStorage.getItem('solo-player');
    if (savedPlayer && !forceOnboarding) {
      setAppState({ status: 'dashboard', user: JSON.parse(savedPlayer) });
    } else {
      setAppState({ status: 'onboarding', user: null });
    }
  };

  const handleSignUp = () => {
    setAppState({ status: 'onboarding', user: null });
  };

  const handleOnboardingComplete = (userData) => {
    localStorage.setItem('solo-player', JSON.stringify(userData));
    setAppState({ status: 'dashboard', user: userData });
  };

  const handleLogout = () => {
    // We keep the player data in localStorage but move state to landing
    setAppState({ status: 'landing', user: null });
  };

  // Sync state to local storage if user updates in dashboard
  const updateUserData = (updatedUser) => {
    localStorage.setItem('solo-player', JSON.stringify(updatedUser));
    setAppState(prev => ({ ...prev, user: updatedUser }));
  };

  const renderContent = () => {
    switch (appState.status) {
      case 'landing':
        return <LandingPage onStart={() => setAppState({ status: 'login', user: null })} />;
      case 'login':
        return <Login onLogin={handleLogin} onSignUp={handleSignUp} />;
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return (
          <Dashboard 
            user={appState.user} 
            setUser={updateUserData} 
            onLogout={handleLogout} 
          />
        );
      default:
        return <Login onLogin={handleLogin} onSignUp={handleSignUp} />;
    }
  };

  return (
    <div className="min-h-screen relative transition-colors duration-500 overflow-x-hidden">
      <div className="bg-mesh" />
      
      <AnimatePresence mode="wait">
        <motion.div
           key={appState.status}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.4, ease: "easeOut" }}
           className="relative z-10"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Persistent System Grid effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.2] dark:opacity-[0.1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>
      
      {/* Decorative corner accents */}
      <div className="fixed top-4 left-4 w-48 h-48 border-t border-l border-electric-purple/20 pointer-events-none rounded-tl-3xl" />
      <div className="fixed bottom-4 right-4 w-48 h-48 border-b border-r border-electric-purple/20 pointer-events-none rounded-br-3xl" />
    </div>
  );
}

export default App;
