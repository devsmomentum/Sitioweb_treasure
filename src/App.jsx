import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ActionHero from './components/ActionHero';
import PhoneShowcase from './components/PhoneShowcase';
import InteractiveSection from './components/InteractiveSection';
import CharactersVideo from './components/CharactersVideo';
import Leaderboard from './components/Leaderboard';
import ShopSection from './components/ShopSection';
import PlansSection from './components/PlansSection';
import TrailerSection from './components/TrailerSection';
import Starfield from './components/Starfield';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react";
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Starfield />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <ActionHero />
        <Features />
        <PhoneShowcase />
        <InteractiveSection />
        <CharactersVideo />
        <Leaderboard />
        <ShopSection />
        <TrailerSection />
        <PlansSection />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
