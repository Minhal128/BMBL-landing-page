import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import Charity from './components/Charity';
import EcoImpact from './components/EcoImpact';
import Presale from './components/Presale';
import Community from './components/Community';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Hero />
        <About />
        <Tokenomics />
        <Roadmap />
        <Charity />
        <EcoImpact />
        <Presale />
        <Community />
      </main>
      <Footer />
    </div>
  )
}

export default App
