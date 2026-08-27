import React from 'react';
import { useApp } from '../context/AppContext';
import { CROPS, LOCATIONS } from '../data/mockData';
import { Sprout, MapPin, Globe, Play, Volume2, VolumeX, Mic } from 'lucide-react';

export const Header = () => {
  const {
    selectedCrop,
    setSelectedCrop,
    selectedLocation,
    setSelectedLocation,
    language,
    setLanguage,
    startVoiceInput,
    isRecording,
    runFullDemoJourney,
    ttsSpeaking,
    stopTts
  } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 px-4 lg:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex items-center justify-center shadow-md shadow-emerald-900/20">
            <Sprout className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl text-emerald-950 tracking-tight">ShetMitra <span className="text-emerald-600 font-black">AI</span></h1>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">India Agri Platform</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Agricultural Decision Intelligence Engine</p>
          </div>
        </div>

        {/* Global Context Switchers */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Crop Selector */}
          <div className="flex items-center bg-slate-100/90 rounded-lg p-1 border border-slate-200 text-xs">
            <span className="px-2 text-slate-500 font-medium hidden sm:inline">Crop:</span>
            <select
              value={selectedCrop.id}
              onChange={(e) => setSelectedCrop(CROPS.find(c => c.id === e.target.value))}
              className="bg-white text-slate-800 font-semibold rounded-md px-2 py-1 border border-slate-200 outline-none cursor-pointer hover:bg-slate-50"
            >
              {CROPS.map(crop => (
                <option key={crop.id} value={crop.id}>
                  {crop.icon} {language === 'mr' ? crop.nameMr : language === 'hi' ? crop.nameHi : crop.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Location Selector */}
          <div className="flex items-center bg-slate-100/90 rounded-lg p-1 border border-slate-200 text-xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 ml-1 hidden sm:inline" />
            <select
              value={selectedLocation.id}
              onChange={(e) => setSelectedLocation(LOCATIONS.find(l => l.id === e.target.value))}
              className="bg-white text-slate-800 font-semibold rounded-md px-2 py-1 border border-slate-200 outline-none cursor-pointer hover:bg-slate-50"
            >
              {LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.id}>
                  📍 {loc.name}
                </option>
              ))}
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-100/90 rounded-lg p-1 border border-slate-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-blue-600 ml-1" />
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${language === 'mr' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${language === 'hi' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${language === 'en' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              EN
            </button>
          </div>

          {/* Voice Mic Trigger & Audio Indicator */}
          <div className="flex items-center gap-1.5">
            {ttsSpeaking && (
              <button
                onClick={stopTts}
                className="flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold px-2.5 py-1.5 rounded-lg animate-pulse"
                title="Stop Audio Speech"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Speaking...</span>
                <VolumeX className="w-3 h-3 ml-1" />
              </button>
            )}

            <button
              onClick={startVoiceInput}
              disabled={isRecording}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs shadow-xs transition-all ${
                isRecording 
                  ? 'bg-red-600 text-white animate-pulse' 
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{isRecording ? (language === 'mr' ? 'ऐकत आहे...' : 'Listening...') : (language === 'mr' ? 'बोलून पहा' : 'Speak')}</span>
            </button>

            {/* Live Demo Trigger */}
            <button
              onClick={runFullDemoJourney}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-1.5 rounded-lg font-extrabold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{language === 'mr' ? 'लाइव्ह डेमो सुरू करा' : language === 'hi' ? 'लाइव डेमो चलाएं' : 'Run Live Demo'}</span>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
