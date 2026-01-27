import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import InteractiveSection from './components/InteractiveSection';
import Minigames from './components/Minigames';
import Leaderboard from './components/Leaderboard';
import ShopSection from './components/ShopSection';
import PlansSection from './components/PlansSection';
import TrailerSection from './components/TrailerSection';
import ActionHero from './components/ActionHero';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main>
        <Hero />
        <ActionHero />
        <Features />
        <InteractiveSection />
        <Minigames />
        <Leaderboard />
        <TrailerSection />
        <ShopSection />
        <PlansSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
