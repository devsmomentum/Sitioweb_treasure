import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import RockstarExperience from './components/RockstarExperience'; // Unificación Total
import Starfield from './components/Starfield';
import { Analytics } from "@vercel/analytics/react";
import './App.css';

// Lazy load components below the fold
const Features = lazy(() => import('./components/Features'));
const PhoneShowcase = lazy(() => import('./components/PhoneShowcase'));
const InteractiveSection = lazy(() => import('./components/InteractiveSection'));
const CharactersVideo = lazy(() => import('./components/CharactersVideo'));
const Leaderboard = lazy(() => import('./components/Leaderboard'));
const ShopSection = lazy(() => import('./components/ShopSection'));
const TrailerSection = lazy(() => import('./components/TrailerSection'));
const PlansSection = lazy(() => import('./components/PlansSection'));
const Footer = lazy(() => import('./components/Footer'));

const LoadingFallback = () => <div style={{ height: '200px', background: 'transparent' }} />;

function App() {
  return (
    <div className="app-wrapper">
      <Starfield />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <RockstarExperience /> {/* Hero + Eventos + Aventura Conectados */}
        
        <Suspense fallback={<LoadingFallback />}>
          <Features />
          <PhoneShowcase />
          <InteractiveSection />
          <CharactersVideo />
          <Leaderboard />
          <ShopSection />
          <TrailerSection />
          <PlansSection />
          <Footer />
        </Suspense>
      </main>
      <Analytics />
    </div>
  );
}

export default App;

