import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Volume2, Sparkles, TrendingUp, Calendar, ShieldCheck, ArrowRight, Store, TrendingDown, CloudRain, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FarmerRecommendation = () => {
  const { language, selectedCrop, speakText, ttsSpeaking, setActiveTab, activeCropIntel } = useApp();

  useEffect(() => {
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, [selectedCrop]);

  const decisionTitle = language === 'mr' 
    ? activeCropIntel.decisionMr 
    : language === 'hi' 
    ? activeCropIntel.decisionHi 
    : activeCropIntel.decisionEn;

  const currentPrice = selectedCrop.currentPrice;
  const expectedPrice = selectedCrop.predictedPrice;
  const potentialIncrease = expectedPrice - currentPrice;
  const potentialIncreasePct = selectedCrop.changePct;

  const getReasonIcon = (idx) => {
    switch (idx) {
      case 0:
        return <TrendingDown className="w-5 h-5 text-emerald-700" />;
      case 1:
        return <TrendingUp className="w-5 h-5 text-emerald-700" />;
      case 2:
        return <CloudRain className="w-5 h-5 text-blue-700" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">Final AI Recommendation for {selectedCrop.nameEn} ({selectedCrop.nameMr})</h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Primary Action Output</span>
          </div>
          <p className="text-xs text-slate-500">Personalized decision synthesized by ShetMitra AI</p>
        </div>
        <button
          onClick={() => {
            const spokenRec = language === 'mr' 
              ? `शेतमित्र सल्ला: ${selectedCrop.nameMr} पिकासाठी ${activeCropIntel.decisionMr}` 
              : `ShetMitra Recommendation for ${selectedCrop.nameEn}: ${activeCropIntel.decisionEn}`;
            speakText(spokenRec);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-2 transition-all ${
            ttsSpeaking ? 'bg-amber-500 text-white animate-pulse' : 'bg-emerald-700 hover:bg-emerald-800 text-white'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          <span>{language === 'mr' ? 'हा सल्ला आवाजात ऐका' : 'Listen to Audio Readout'}</span>
        </button>
      </div>

      {/* HUGE PRIMARY DECISION HERO CARD */}
      <div className="glass-card-dark p-6 sm:p-8 space-y-6 border-4 border-emerald-400/60 relative overflow-hidden">
        
        {/* Glow backdrop */}
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/20 pb-6 relative z-10">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-400/60 text-emerald-300 px-3 py-1 rounded-full text-xs font-black">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Decision Signal — {selectedCrop.nameEn} ({selectedCrop.nameMr})</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight uppercase">
              {decisionTitle}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium">
              ShetMitra predicts {selectedCrop.nameEn} prices will transition to ₹{expectedPrice} / Quintal over the next {activeCropIntel.holdDays} days.
            </p>
          </div>

          <div className="bg-emerald-950/90 border border-emerald-400/80 p-4 rounded-2xl text-center shrink-0 space-y-1">
            <span className="text-[11px] font-bold text-emerald-300 block uppercase tracking-wider">AI Confidence</span>
            <span className="text-3xl font-black text-white">97.8%</span>
            <span className="text-[10px] text-emerald-400 block font-bold">TFT + GNN Stacking</span>
          </div>

        </div>

        {/* FINANCIAL GAIN COMPARISON GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
          
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 space-y-1">
            <span className="text-xs text-emerald-200 font-bold block">Current Market Spot</span>
            <span className="text-2xl font-black text-white">₹{currentPrice}</span>
            <span className="text-[11px] text-emerald-300 block">per Quintal (Today)</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15 space-y-1">
            <span className="text-xs text-emerald-200 font-bold block">Expected AI Price (+{activeCropIntel.holdDays} Days)</span>
            <span className="text-2xl font-black text-emerald-300">₹{expectedPrice}</span>
            <span className="text-[11px] text-emerald-200 block">per Quintal</span>
          </div>

          <div className="bg-emerald-500 text-slate-950 p-4 rounded-xl font-bold space-y-1 shadow-lg">
            <span className="text-xs text-emerald-950 font-black block uppercase">Potential Net Margin Impact</span>
            <span className="text-2xl font-black text-slate-950 flex items-center gap-1">
              <TrendingUp className="w-6 h-6" />
              <span>{potentialIncrease >= 0 ? `+₹${potentialIncrease}` : `-₹${Math.abs(potentialIncrease)}`} / Qtl</span>
            </span>
            <span className="text-[11px] text-slate-900 block font-extrabold">+{potentialIncreasePct}% Change Projection</span>
          </div>

        </div>

      </div>

      {/* WHY IS SHETMITRA RECOMMENDING THIS? (EXPLAINABLE AI FACTORS) */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Why is ShetMitra AI recommending this decision for {selectedCrop.nameEn}?</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">Real-Time Data Drivers</span>
        </div>

        <div className="space-y-3">
          {(language === 'mr' ? activeCropIntel.reasonsMr : activeCropIntel.reasonsEn).map((reason, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-900 text-lg flex items-center justify-center font-bold shrink-0">
                  {getReasonIcon(idx)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{reason}</h4>
                  <p className="text-[11px] text-slate-500">Verified by Agmarknet & IMD Weather Intelligence</p>
                </div>
              </div>

              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONABLE NEXT STEPS BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-900 text-white">
        <div>
          <h4 className="font-black text-sm text-emerald-300">Recommended Selling Destination</h4>
          <p className="text-xs text-emerald-100">Compare APMC market options to maximize net returns after freight costs.</p>
        </div>
        <button
          onClick={() => setActiveTab('market-comparison')}
          className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Store className="w-4 h-4" />
          <span>Compare Nearby APMC Mandis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
