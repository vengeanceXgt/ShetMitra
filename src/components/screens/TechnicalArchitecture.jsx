import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SYSTEM_ARCHITECTURE } from '../../data/mockData';
import { Cpu, ArrowDown, CheckCircle2, Layers, Database, Sparkles, Code2, Server } from 'lucide-react';

export const TechnicalArchitecture = () => {
  const { language } = useApp();
  const [selectedLayer, setSelectedLayer] = useState(SYSTEM_ARCHITECTURE[0]);

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">⚙️ Technical Architecture & System Engineering</h2>
            <span className="bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">6-Layer Stack</span>
          </div>
          <p className="text-xs text-slate-500">End-to-End Voice → AI → GIS → Decision Intelligence Architecture</p>
        </div>
      </div>

      {/* Interactive System Flow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: 6 Architecture Layers Stack */}
        <div className="lg:col-span-2 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            Click layer to inspect specifications:
          </div>

          <div className="space-y-3">
            {SYSTEM_ARCHITECTURE.map((layer, idx) => {
              const isSelected = selectedLayer.id === layer.id;
              return (
                <React.Fragment key={layer.id}>
                  <div
                    onClick={() => setSelectedLayer(layer)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected 
                        ? 'bg-slate-900 text-white border-slate-800 shadow-xl ring-2 ring-emerald-500/50 scale-[1.01]' 
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm"
                        style={{ backgroundColor: layer.color }}
                      >
                        {layer.number}
                      </div>

                      <div>
                        <h4 className="font-extrabold text-sm flex items-center gap-2">
                          <span>{language === 'mr' ? layer.titleMr : layer.title}</span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {layer.subtitle}
                          </span>
                        </h4>
                        <p className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {layer.items.join(' • ')}
                        </p>
                      </div>
                    </div>

                    <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-slate-300'}`} />
                  </div>

                  {/* Connector Arrow */}
                  {idx < SYSTEM_ARCHITECTURE.length - 1 && (
                    <div className="flex justify-center -my-1">
                      <ArrowDown className="w-4 h-4 text-slate-400 opacity-60" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Layer Detail Panel */}
        <div className="glass-card p-6 space-y-5 border-l-4 border-l-emerald-600 self-start sticky top-20">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl text-white font-black text-sm flex items-center justify-center shadow-md"
              style={{ backgroundColor: selectedLayer.color }}
            >
              {selectedLayer.number}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">{selectedLayer.title}</h3>
              <p className="text-xs text-slate-500">{selectedLayer.subtitle}</p>
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Layer Capabilities & Components</span>
            </h4>

            <div className="space-y-2">
              {selectedLayer.items.map((item, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Protocol Notes */}
          <div className="p-4 rounded-xl bg-slate-900 text-slate-300 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Code2 className="w-4 h-4" />
              <span>Production Protocol & API Interfaces</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Integrates REST/gRPC endpoints for Bhashini ASR, Agmarknet Mandi RSS feeds, IMD Weather Grid NetCDF files, and ISRO Bhuvan Spatial Web Services.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
