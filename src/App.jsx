import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

// Screen Components
import { Dashboard } from './components/screens/Dashboard';
import { VoiceIntelligence } from './components/screens/VoiceIntelligence';
import { GISIntelligence } from './components/screens/GISIntelligence';
import { PriceIntelligence } from './components/screens/PriceIntelligence';
import { ClimateIntelligence } from './components/screens/ClimateIntelligence';
import { DecisionEngine } from './components/screens/DecisionEngine';
import { FarmerRecommendation } from './components/screens/FarmerRecommendation';
import { MarketComparison } from './components/screens/MarketComparison';
import { GovernmentSchemes } from './components/screens/GovernmentSchemes';
import { ProofOfConcept } from './components/screens/ProofOfConcept';
import { TechnicalArchitecture } from './components/screens/TechnicalArchitecture';

const MainContent = () => {
  const { activeTab } = useApp();

  const renderScreen = () => {
    switch (activeTab) {
      case 'command-center':
        return <Dashboard />;
      case 'voice-intel':
        return <VoiceIntelligence />;
      case 'gis-map':
        return <GISIntelligence />;
      case 'price-intel':
        return <PriceIntelligence />;
      case 'climate-intel':
        return <ClimateIntelligence />;
      case 'decision-engine':
        return <DecisionEngine />;
      case 'recommendation':
        return <FarmerRecommendation />;
      case 'market-comparison':
        return <MarketComparison />;
      case 'govt-schemes':
        return <GovernmentSchemes />;
      case 'proof-of-concept':
        return <ProofOfConcept />;
      case 'technical-arch':
        return <TechnicalArchitecture />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        <Sidebar />
        
        <div className="flex-1 min-w-0">
          {renderScreen()}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 text-xs py-4 px-6 text-center border-t border-slate-800 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🌾 ShetMitra AI — Intelligent Agricultural Decision Platform for Indian Farmers</span>
          <span className="text-slate-400">Voice → AI → GIS → Decision Intelligence Architecture</span>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
