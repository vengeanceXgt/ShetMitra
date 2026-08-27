import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, CheckCircle2, Loader2, Sparkles, Volume2, Globe, Brain, RefreshCw, Landmark, Key, ShieldCheck } from 'lucide-react';

export const VoiceIntelligence = () => {
  const {
    transcript,
    isProcessing,
    processingStep,
    language,
    selectedCrop,
    selectedLocation,
    runAiAnalysis,
    speakText,
    ttsSpeaking,
    activeCropIntel,
    bhashiniApiKey,
    setBhashiniApiKey
  } = useApp();

  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(bhashiniApiKey || '');

  const bhashiniModelName = 
    language === 'mr' ? 'bhashini/asr-marathi-v2 (ULCA Dhruva)' : 
    language === 'hi' ? 'bhashini/asr-hindi-v2 (Dhruva AI)' : 
    'bhashini/asr-english-v1';

  const pipelineSteps = [
    { id: 1, textMr: 'आवाज ओळख पूर्ण (Bhashini Speech Recognized)', textEn: 'Bhashini Voice recognized' },
    { id: 2, textMr: `भाषा व उच्चार ओळखले (${language === 'mr' ? 'मराठी mr-IN' : language === 'hi' ? 'हिंदी hi-IN' : 'English en-US'})`, textEn: `Language detected: ${language === 'mr' ? 'Marathi' : language === 'hi' ? 'Hindi' : 'English'}` },
    { id: 3, textMr: `पीक आणि हेतू ओळखला (Crop Identified: ${selectedCrop.nameEn} / ${selectedCrop.nameMr})`, textEn: `Crop identified: ${selectedCrop.nameEn}` },
    { id: 4, textMr: 'मंडई भाव व जीआयएस शोध (Analyzing Market Intelligence)', textEn: 'Analyzing market intelligence' },
    { id: 5, textMr: 'जवळच्या मंडईंचे भाडे व अंतर मोजले (Checking Nearby Mandis & Logistics)', textEn: 'Checking nearby mandis & logistics' },
    { id: 6, textMr: 'हवामान व पुरवठा जोखीम (Analyzing Climate & Supply Risk)', textEn: 'Analyzing climate & supply risk' }
  ];

  const handleTestAudio = () => {
    const text = language === 'mr' 
      ? `नमस्ते! शेतमित्र बीभाषिणी आवाज सहाय्यक चाचणी यशस्वी झाली आहे.` 
      : `Hello! ShetMitra Bhashini voice speech test is successful.`;
    speakText(text);
  };

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">Voice Intelligence & Bhashini ASR Pipeline</h2>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Digital India Bhashini Engine</span>
          </div>
          <p className="text-xs text-slate-500">Multilingual Speech Recognition & Synthesis powered by Bhashini Dhruva Gateway</p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 flex items-center gap-1.5"
          >
            <Key className="w-3.5 h-3.5 text-purple-600" />
            <span>{bhashiniApiKey ? 'Bhashini API Key Set' : 'Configure Bhashini Key'}</span>
          </button>

          <button
            onClick={() => runAiAnalysis()}
            disabled={isProcessing}
            className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>Run Speech Pipeline</span>
          </button>
        </div>
      </div>

      {/* BHASHINI API KEY CONFIGURATION MODAL BAR */}
      {showApiKeyInput && (
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xs text-purple-950 flex items-center gap-2">
              <Key className="w-4 h-4 text-purple-700" />
              <span>Enter Optional Bhashini MeitY Authorization API Key</span>
            </h3>
            <span className="text-[10px] bg-purple-200 text-purple-900 font-bold px-2 py-0.5 rounded">Optional Custom Gateway</span>
          </div>
          <p className="text-[11px] text-purple-800 leading-relaxed font-medium">
            If you have a production MeitY Bhashini API authorization key (`https://dhruva-api.bhashini.gov.in`), paste it below to direct speech calls to your private ULCA pipeline.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="Paste Bhashini Dhruva Authorization Key..."
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-purple-300 rounded-lg outline-none"
            />
            <button
              onClick={() => {
                setBhashiniApiKey(tempApiKey || null);
                setShowApiKeyInput(false);
              }}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs px-4 py-1.5 rounded-lg"
            >
              Save Key
            </button>
          </div>
        </div>
      )}

      {/* Live Audio Transcription Display Card */}
      <div className="glass-card p-6 border-l-4 border-l-blue-600 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-blue-600 animate-pulse" />
            <h3 className="font-bold text-sm text-slate-900">Farmer Live Audio Query</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-300">
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>Language: {language === 'mr' ? 'Marathi (mr-IN)' : language === 'hi' ? 'Hindi (hi-IN)' : 'English (en-IN)'}</span>
            </span>
            
            <button
              onClick={handleTestAudio}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all ${
                ttsSpeaking ? 'bg-amber-500 text-white animate-pulse' : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{ttsSpeaking ? 'Speaking Audio...' : 'Test Speech Sound'}</span>
            </button>
          </div>
        </div>

        {/* Big Speech Transcript Bubble */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-inner relative space-y-2">
          <p className="text-xl sm:text-2xl font-black text-emerald-300 tracking-wide">
            "{transcript}"
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-800">
            <span>Model: {bhashiniModelName}</span>
            <span className="text-emerald-400 font-bold">Speech Engine Status: Active</span>
          </div>
        </div>
      </div>

      {/* AI INTENT DECOMPOSITION & ENTITY EXTRACTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Intent Extraction Card */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>Bhashini ULCA Intent Parser</span>
            </h3>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-extrabold px-2 py-0.5 rounded">AgriLLM Context</span>
          </div>

          <div className="space-y-3">
            
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center justify-between">
              <span className="text-xs text-purple-800 font-medium">Core Intent</span>
              <span className="text-xs font-black text-purple-950 bg-purple-200 px-2.5 py-1 rounded-md">
                Crop Selling Decision
              </span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
              <span className="text-xs text-emerald-800 font-medium">Detected Crop</span>
              <span className="text-xs font-black text-emerald-950 bg-emerald-200 px-2.5 py-1 rounded-md">
                {selectedCrop.nameEn} ({selectedCrop.nameMr})
              </span>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
              <span className="text-xs text-blue-800 font-medium">Farmer Spatial Location</span>
              <span className="text-xs font-black text-blue-950 bg-blue-200 px-2.5 py-1 rounded-md">
                {selectedLocation.name}
              </span>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <span className="text-xs text-amber-800 font-medium">Dynamic AI Signal</span>
              <span className="text-xs font-black text-amber-950 bg-amber-200 px-2.5 py-1 rounded-md">
                {activeCropIntel.decisionEn}
              </span>
            </div>

          </div>
        </div>

        {/* Animated Step-by-Step Processing Pipeline */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Bhashini Pipeline</span>
            </h3>
            {isProcessing && (
              <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                <span>Processing Step {processingStep}/5</span>
              </span>
            )}
          </div>

          <div className="space-y-2.5">
            {pipelineSteps.map((step) => {
              const isDone = !isProcessing || processingStep > step.id;
              const isCurrent = isProcessing && processingStep === step.id;

              return (
                <div
                  key={step.id}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isDone 
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : isCurrent
                      ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0"></div>
                    )}
                    <span className="font-semibold">
                      {language === 'mr' ? step.textMr : step.textEn}
                    </span>
                  </div>

                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded">
                    {isDone ? '✓ Completed' : isCurrent ? '⟳ Running' : 'Queued'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
