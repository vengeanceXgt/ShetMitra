import React from 'react';
import { useApp } from '../../context/AppContext';
import { BrainCircuit, Sliders, ArrowDown, Sparkles, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

export const DecisionEngine = () => {
  const { scenarioParams, setScenarioParams, selectedCrop, language, setActiveTab } = useApp();

  // Dynamic Calculation based on interactive sliders
  const basePrice = selectedCrop.currentPrice;
  const estimatedGainPerDay = 65; // ~₹65 per day gain
  const computedGain = scenarioParams.holdDays * estimatedGainPerDay;
  const computedTargetPrice = basePrice + computedGain;
  const computedPct = ((computedGain / basePrice) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">🧠 ShetMitra Unified AI Decision Engine</h2>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Multi-Stream Fusion</span>
          </div>
          <p className="text-xs text-slate-500">Combining Market Prices + Spatial GIS + Climate Risks + Farmer Land Context</p>
        </div>
      </div>

      {/* Visual Multi-Stream Fusion Architecture Diagram */}
      <div className="glass-card p-6 space-y-6">
        <h3 className="font-bold text-sm text-slate-900 text-center flex items-center justify-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-600 animate-pulse" />
          <span>ShetMitra Multi-Source Intelligence Fusion Matrix</span>
        </h3>

        {/* 4 Input Streams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
            <div className="flex items-center justify-between font-bold text-xs text-emerald-950">
              <span>📊 Price Intelligence</span>
              <span className="text-[10px] bg-emerald-200 px-1.5 py-0.5 rounded">Agmarknet</span>
            </div>
            <p className="text-xs text-emerald-800 font-medium">Spot: ₹{selectedCrop.currentPrice} | 7-Day Trend: Upward</p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-300 space-y-1">
            <div className="flex items-center justify-between font-bold text-xs text-blue-950">
              <span>🗺️ GIS Spatial Matrix</span>
              <span className="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded">Location</span>
            </div>
            <p className="text-xs text-blue-800 font-medium">Closest: Pune (12km) | Best: Mumbai (145km)</p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-1">
            <div className="flex items-center justify-between font-bold text-xs text-amber-950">
              <span>🌤️ Climate Radar</span>
              <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded">IMD</span>
            </div>
            <p className="text-xs text-amber-800 font-medium">Heavy Rain expected in 3 days (82% probability)</p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 border border-purple-300 space-y-1">
            <div className="flex items-center justify-between font-bold text-xs text-purple-950">
              <span>🌾 Farmer Context</span>
              <span className="text-[10px] bg-purple-200 px-1.5 py-0.5 rounded">Farm Profile</span>
            </div>
            <p className="text-xs text-purple-800 font-medium">Yield: ~100 Quintals | Plucking Stage: Ripe</p>
          </div>

        </div>

        {/* Down Arrow Indicator */}
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md animate-bounce">
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>

        {/* Central Core AI Weighted Optimization Engine */}
        <div className="glass-card-dark p-6 rounded-2xl text-center space-y-3 max-w-2xl mx-auto border-2 border-purple-400/40">
          <div className="inline-flex items-center gap-2 bg-purple-900/80 border border-purple-400/40 text-purple-200 px-3 py-1 rounded-full text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>ShetMitra Core Weighted Decision Engine</span>
          </div>
          <h4 className="text-2xl font-black text-white">
            Computed Best Action: 🟢 WAIT {scenarioParams.holdDays} DAYS
          </h4>
          <p className="text-xs text-purple-100 max-w-md mx-auto">
            Algorithm predicts holding tomato crops for {scenarioParams.holdDays} days yields an additional <strong>+₹{computedGain}/Quintal (+{computedPct}%)</strong> net gain.
          </p>

          <button
            onClick={() => setActiveTab('recommendation')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>View Full Farmer Recommendation</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* INTERACTIVE SCENARIO SIMULATOR (PARAMETER TUNER) */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Interactive Scenario Simulator (Tune Decision Factors)</h3>
          </div>
          <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Live AI Calculation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Slider 1: Holding Days */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-900">
              <span>Holding Duration</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-black">{scenarioParams.holdDays} Days</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="14" 
              value={scenarioParams.holdDays}
              onChange={(e) => setScenarioParams({ ...scenarioParams, holdDays: parseInt(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Days farmer agrees to wait before harvesting/selling</p>
          </div>

          {/* Slider 2: Fuel Rate */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-900">
              <span>Diesel Freight Cost</span>
              <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-black">₹{scenarioParams.fuelRate} / L</span>
            </div>
            <input 
              type="range" 
              min="85" 
              max="120" 
              value={scenarioParams.fuelRate}
              onChange={(e) => setScenarioParams({ ...scenarioParams, fuelRate: parseInt(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Logistics fuel rate impacting inter-mandi transport</p>
          </div>

          {/* Selector 3: Rain Impact */}
          <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-900">
              <span>Rain Supply Disruption</span>
              <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-black capitalize">{scenarioParams.rainImpact} Shock</span>
            </div>
            <select
              value={scenarioParams.rainImpact}
              onChange={(e) => setScenarioParams({ ...scenarioParams, rainImpact: e.target.value })}
              className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs font-semibold outline-none cursor-pointer"
            >
              <option value="low">Low Impact (Normal Supply)</option>
              <option value="moderate">Moderate Impact (-15% Supply)</option>
              <option value="high">High Impact (-24% Supply Surge)</option>
            </select>
            <p className="text-[11px] text-slate-500">Expected weather disruption level on competitor hubs</p>
          </div>

        </div>

        {/* Live Calculation Output Card */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 font-medium block">Simulated Price Result</span>
            <span className="text-2xl font-black text-emerald-400">Target Spot Price: ₹{computedTargetPrice} / Qtl</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium block">Estimated Net Profit Surge (for 100 Qtl)</span>
            <span className="text-xl font-extrabold text-emerald-300">+₹{(computedGain * 100).toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
