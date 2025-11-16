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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: '#2A2A2A',
          color: '#F5F5F5',
          border: '1px solid #F4A261'
        }}
      />
    </div>
  );
}

export default App
