import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MANDI_MARKETS } from '../../data/mockData';
import { MapPin, Navigation, Store, Truck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const GISIntelligence = () => {
  const { selectedCrop, selectedLocation, language, setActiveTab } = useApp();
  const markets = MANDI_MARKETS[selectedCrop.id] || MANDI_MARKETS.tomato;
  const [selectedMarket, setSelectedMarket] = useState(markets.find(m => m.isRecommended) || markets[0]);

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">🗺️ GIS Spatial Intelligence & Route Optimization</h2>
            <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Spatial Matrix</span>
          </div>
          <p className="text-xs text-slate-500">Geospatial analysis connecting farmer field location to nearby APMC mandis & logistics</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-lg">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <span>Farmer Location: {selectedLocation.name}</span>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Market List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Map Representation Box */}
        <div className="lg:col-span-2 glass-card p-4 space-y-4 relative flex flex-col justify-between min-h-[420px] bg-slate-950 text-white overflow-hidden border border-slate-800">
          
          {/* Map Top Header */}
          <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-xl border border-slate-800 z-20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-slate-200">ISRO Bhuvan / Google Maps GIS Layer</span>
            </div>
            <div className="flex gap-2 text-[10px] font-bold">
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">📍 Farm: {selectedLocation.name}</span>
              <span className="bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded">🏪 APMC Mandis: {markets.length}</span>
            </div>
          </div>

          {/* Map Graphical Visual Simulation */}
          <div className="relative w-full h-80 rounded-xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center">
            
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            
            {/* SVG Connecting Routes & Mandi Nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 300">
              {/* Route lines from Farm to Mandis */}
              <path d="M 120 180 Q 240 80 440 70" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="6,6" className="animate-pulse" />
              <path d="M 120 180 Q 220 200 380 230" fill="none" stroke="#10b981" strokeWidth="4" />
              <path d="M 120 180 Q 300 150 480 180" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            </svg>

            {/* FARMER LOCATION NODE */}
            <div className="absolute left-[18%] top-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-emerald-500/50 border-2 border-white animate-bounce">
                📍
              </div>
              <div className="bg-slate-950 text-emerald-400 font-extrabold text-[11px] px-2 py-0.5 rounded-md border border-emerald-700 mt-1 shadow-md whitespace-nowrap">
                Farmer's Farm ({selectedLocation.name})
              </div>
            </div>

            {/* PUNE APMC NODE */}
            <div 
              onClick={() => setSelectedMarket(markets[0])}
              className={`absolute left-[60%] top-[72%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer transition-all ${
                selectedMarket.name === markets[0]?.name ? 'scale-110' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center border border-white shadow-md">
                🏪
              </div>
              <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 shadow-md">
                Pune APMC (₹2,400)
              </div>
            </div>

            {/* NASHIK APMC NODE */}
            <div 
              onClick={() => setSelectedMarket(markets[1] || markets[0])}
              className={`absolute left-[70%] top-[22%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer transition-all ${
                selectedMarket.name === markets[1]?.name ? 'scale-110' : 'opacity-80 hover:opacity-100'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center border border-white shadow-md">
                🏬
              </div>
              <div className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 shadow-md">
                Nashik APMC (₹2,650)
              </div>
            </div>

            {/* MUMBAI VASHI APMC NODE (BEST MARKET) */}
            <div 
              onClick={() => setSelectedMarket(markets[2] || markets[0])}
              className={`absolute left-[82%] top-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer transition-all ${
                selectedMarket.name === markets[2]?.name ? 'scale-110 ring-4 ring-emerald-400' : 'opacity-90 hover:opacity-100'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black flex items-center justify-center border-2 border-white shadow-xl animate-pulse">
                🏆
              </div>
              <div className="bg-emerald-950 text-emerald-300 text-[11px] font-black px-2.5 py-0.5 rounded border border-emerald-600 shadow-lg whitespace-nowrap">
                Mumbai Market (₹2,780) ★ Best Price
              </div>
            </div>

          </div>

          {/* Map Overlay Recommendation Footer */}
          <div className="bg-emerald-950 border border-emerald-700/80 p-3 rounded-xl flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-200">🟢 Best Market Opportunity: Mumbai Market (₹2,780/Qtl)</p>
                <p className="text-[10px] text-emerald-400">Net Return after ₹310 transport freight cost: <strong>₹2,470 / Qtl</strong> (+₹150 net profit over Pune APMC)</p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('market-comparison')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shrink-0"
            >
              <span>Full Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Nearby APMC Markets List */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-600" />
            <span>Nearby APMC Markets & Freight</span>
          </h3>

          <div className="space-y-3">
            {markets.map((m, idx) => {
              const isSelected = selectedMarket.name === m.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedMarket(m)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected 
                      ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-500/20' 
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-slate-900 text-sm">{m.name}</h4>
                        {m.isRecommended && (
                          <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                            🟢 Best Option
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{m.district} District</p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-slate-900 block">₹{m.price}</span>
                      <span className="text-[10px] text-slate-500">per Quintal</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                    <div className="bg-slate-100 p-1.5 rounded text-center">
                      <span className="text-slate-500 block">Distance</span>
                      <strong className="text-slate-800">{m.distanceKm} km</strong>
                    </div>
                    <div className="bg-slate-100 p-1.5 rounded text-center">
                      <span className="text-slate-500 block">Freight</span>
                      <strong className="text-slate-800">₹{m.transportCostPerQtl}</strong>
                    </div>
                    <div className="bg-emerald-100 p-1.5 rounded text-center">
                      <span className="text-emerald-800 block font-semibold">Net Profit</span>
                      <strong className="text-emerald-950 font-black">₹{m.netReturn}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
