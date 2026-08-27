import React from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_QUERIES, MANDI_MARKETS, CLIMATE_DATA } from '../../data/mockData';
import { Mic, Sparkles, MapPin, TrendingUp, CloudSun, ArrowRight, CheckCircle2, Play, Cpu, ShieldCheck, Activity } from 'lucide-react';

export const Dashboard = () => {
  const {
    selectedCrop,
    selectedLocation,
    language,
    isRecording,
    startVoiceInput,
    runAiAnalysis,
    setActiveTab,
    runFullDemoJourney
  } = useApp();

  const markets = MANDI_MARKETS[selectedCrop.id] || MANDI_MARKETS.tomato;
  const bestMarket = markets.find(m => m.isRecommended) || markets[0];

  return (
    <div className="space-y-6">
      
      {/* Professional SaaS Hero Banner */}
      <div className="glass-card-dark p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'mr' ? 'कृषी निर्णय विज्ञान' : 'Agricultural Decision Science'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            ShetMitra AI
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-normal">
            {language === 'mr' 
              ? 'तुमच्या पिकाच्या विक्रीचे अचूक निर्णय घ्या. बाजारभाव, हवामान व जीआयएस विश्लेषणाचा वापर करून ५ ते ७ दिवसांचा डेटा-प्रमाणित सल्ला मिळवा.' 
              : language === 'hi' 
              ? 'अपनी फसल के सटीक विक्रय निर्णय लें। बाजार मूल्य, मौसम और जीआईएस विश्लेषण का उपयोग करके डेटा-आधारित सलाह प्राप्त करें।'
              : 'Speak naturally in Marathi or Hindi. ShetMitra combines agricultural market data, geospatial intelligence, and climate risk to generate clear farming decisions.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={runFullDemoJourney}
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{language === 'mr' ? 'टोमॅटो विक्री निर्णय डेमो पहा' : 'Run Live Tomato Decision Journey'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Mic Section: ASK SHETMITRA */}
      <div className="glass-card p-6 sm:p-8 space-y-6 border-2 border-emerald-500/20">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            {language === 'mr' ? 'आवाज सहाय्यक' : 'Voice Assistant Interface'}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {language === 'mr' ? 'शेतमित्राला विचारा (Ask ShetMitra AI)' : 'Ask ShetMitra AI'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            {language === 'mr' ? 'दर, हवामान, जवळची मंडी किंवा पीक विक्रीबाबत बोला...' : 'Ask about crop prices, weather, markets, or farming decisions...'}
          </p>
        </div>

        {/* Large Microphone Button */}
        <div className="flex flex-col items-center justify-center py-4 space-y-4">
          <button
            onClick={startVoiceInput}
            disabled={isRecording}
            className={`w-28 h-28 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-300 transform active:scale-95 shadow-xl ${
              isRecording 
                ? 'bg-red-600 text-white mic-pulse scale-105' 
                : 'bg-gradient-to-tr from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 text-white hover:scale-105 shadow-emerald-700/30'
            }`}
          >
            <Mic className="w-10 h-10 animate-bounce" />
            <span className="text-xs font-black tracking-wide uppercase">
              {isRecording 
                ? (language === 'mr' ? 'ऐकत आहे...' : 'Listening...') 
                : (language === 'mr' ? 'बोलण्यासाठी टॅप करा' : 'Tap to Speak')}
            </span>
          </button>

          <p className="text-xs text-slate-500 font-medium">
            {isRecording 
              ? (language === 'mr' ? 'तुमचा आवाज रेकॉर्ड होत आहे...' : 'Listening to your voice...')
              : (language === 'mr' ? 'मायक्रोफोनवर टॅप करा आणि मराठीत बोला' : 'Tap mic and ask naturally in Marathi/Hindi')}
          </p>
        </div>

        {/* Preset Voice Query Suggestions */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-600">
            {language === 'mr' ? 'उदाहरणासाठी या प्रश्नांवर क्लिक करा:' : 'Sample voice queries:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SAMPLE_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const text = language === 'mr' ? q.textMr : language === 'hi' ? q.textHi : q.textEn;
                  runAiAnalysis(text);
                }}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 text-left transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Mic className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-emerald-950">
                    "{language === 'mr' ? q.textMr : language === 'hi' ? q.textHi : q.textEn}"
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VISUAL AI PROCESSING PIPELINE DIAGRAM */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span>{language === 'mr' ? 'एआय निर्णय प्रक्रिया (AI Pipeline Architecture)' : 'AI Decision Pipeline'}</span>
          </h4>
          <span className="text-[11px] font-semibold text-slate-500">Real-time Data Fusion</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 space-y-1">
            <div className="flex items-center justify-between font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-blue-600" />
                <span>Voice Input</span>
              </span>
              <span className="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded text-blue-800 font-extrabold">Step 1</span>
            </div>
            <p className="text-xs text-blue-700 font-medium">Bhashini STT (Marathi & Hindi)</p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 space-y-1">
            <div className="flex items-center justify-between font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-600" />
                <span>AI Intent Parsing</span>
              </span>
              <span className="text-[10px] bg-purple-200 px-1.5 py-0.5 rounded text-purple-800 font-extrabold">Step 2</span>
            </div>
            <p className="text-xs text-purple-700 font-medium">Extract Crop: Tomato, Action: Hold vs Sell</p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
            <div className="flex items-center justify-between font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>GIS & Weather Matrix</span>
              </span>
              <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded text-amber-800 font-extrabold">Step 3</span>
            </div>
            <p className="text-xs text-amber-800 font-medium">Agmarknet Prices + IMD Weather + APMC Routes</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-1">
            <div className="flex items-center justify-between font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Final Recommendation</span>
              </span>
              <span className="text-[10px] bg-emerald-200 px-1.5 py-0.5 rounded text-emerald-900 font-extrabold">Step 4</span>
            </div>
            <p className="text-xs text-emerald-800 font-bold">Wait 5-7 Days (+18.7% Expected Gain)</p>
          </div>

        </div>
      </div>

      {/* KEY INTELLIGENCE GLANCE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Price KPI */}
        <div 
          onClick={() => setActiveTab('price-intel')}
          className="glass-card p-5 space-y-2 hover:border-emerald-400 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>{selectedCrop.nameEn} Spot Price</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">₹{selectedCrop.currentPrice}</span>
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
              +{selectedCrop.changePct}% AI Forecast
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Predicted: <strong className="text-emerald-800">₹{selectedCrop.predictedPrice}</strong> / Quintal</p>
        </div>

        {/* GIS Mandi KPI */}
        <div 
          onClick={() => setActiveTab('gis-map')}
          className="glass-card p-5 space-y-2 hover:border-blue-400 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Best APMC Opportunity</span>
            <MapPin className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="text-lg font-black text-slate-900 truncate block">{bestMarket.name}</span>
            <span className="text-xs font-bold text-blue-800">₹{bestMarket.price} / Qtl ({bestMarket.distanceKm} km)</span>
          </div>
          <p className="text-[11px] text-slate-500">Net after freight: <strong className="text-blue-900">₹{bestMarket.netReturn}</strong></p>
        </div>

        {/* Climate Risk KPI */}
        <div 
          onClick={() => setActiveTab('climate-intel')}
          className="glass-card p-5 space-y-2 hover:border-amber-400 cursor-pointer transition-all hover:shadow-md group"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Agronomic Weather Risk</span>
            <CloudSun className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="text-xs font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded inline-block">
              {CLIMATE_DATA.riskLevel}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 truncate">{CLIMATE_DATA.rainProbability}</p>
        </div>

        {/* AI Action Summary */}
        <div 
          onClick={() => setActiveTab('recommendation')}
          className="glass-card p-5 space-y-2 border-2 border-emerald-600 bg-emerald-50/60 hover:bg-emerald-50 cursor-pointer transition-all shadow-sm group"
        >
          <div className="flex items-center justify-between text-emerald-950 text-xs font-bold">
            <span>AI Decision Action</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <span className="text-base font-black text-emerald-950">WAIT 5–7 DAYS BEFORE SELLING</span>
          </div>
          <p className="text-[11px] text-emerald-900 font-semibold">Confidence: <strong>87%</strong> | Profit: <strong>+₹450/Qtl</strong></p>
        </div>

      </div>

    </div>
  );
};
