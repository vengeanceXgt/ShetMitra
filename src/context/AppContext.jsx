import React, { createContext, useContext, useState, useEffect } from 'react';
import { CROPS, LOCATIONS, SAMPLE_QUERIES } from '../data/mockData';
import { CROP_INTELLIGENCE_BASE, generateCropPriceForecastSeries } from '../services/realtimeAgriEngine';
import { transcribeAudioWithBhashini, synthesizeTextWithBhashini, BHASHINI_LANG_CODES } from '../services/bhashiniApi';

const AppContext = createContext();

export const detectCropFromText = (text) => {
  if (!text) return null;
  const lower = text.toLowerCase();
  
  if (lower.includes('कांदा') || lower.includes('प्याज') || lower.includes('onion')) {
    return CROPS.find(c => c.id === 'onion');
  }
  if (lower.includes('बटाटा') || lower.includes('आलू') || lower.includes('potato')) {
    return CROPS.find(c => c.id === 'potato');
  }
  if (lower.includes('कापूस') || lower.includes('कपास') || lower.includes('cotton')) {
    return CROPS.find(c => c.id === 'cotton');
  }
  if (lower.includes('सोयाबीन') || lower.includes('soybean')) {
    return CROPS.find(c => c.id === 'soybean');
  }
  if (lower.includes('टोमॅटो') || lower.includes('टमाटर') || lower.includes('tomato')) {
    return CROPS.find(c => c.id === 'tomato');
  }
  return null;
};

export const AppProvider = ({ children }) => {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]); // Default Tomato
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]); // Default Pune
  const [language, setLanguage] = useState('mr'); // Default Marathi 'mr', 'hi', 'en'
  const [activeTab, setActiveTab] = useState('command-center'); // Navigation tab
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("टोमॅटो आता विकू का थांबू?");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0); // 0-5
  const [ttsSpeaking, setTtsSpeaking] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [bhashiniApiKey, setBhashiniApiKey] = useState(null); // Optional custom key
  const [scenarioParams, setScenarioParams] = useState({
    holdDays: 7,
    fuelRate: 95,
    rainImpact: 'high'
  });

  const activeCropIntel = CROP_INTELLIGENCE_BASE[selectedCrop.id] || CROP_INTELLIGENCE_BASE.tomato;
  const activePriceForecast = generateCropPriceForecastSeries(selectedCrop.currentPrice);

  // Handle TTS Voice Synthesis (Bhashini API with Web Speech Fallback)
  const speakText = async (text) => {
    // Attempt Bhashini API first
    if (bhashiniApiKey) {
      setTtsSpeaking(true);
      const res = await synthesizeTextWithBhashini(text, language, bhashiniApiKey);
      if (res.isPlayed) {
        setTtsSpeaking(false);
        return;
      }
    }

    // Web Speech API fallback
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'mr') {
      utterance.lang = 'mr-IN';
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-US';
    }
    utterance.rate = 0.95;
    utterance.onstart = () => setTtsSpeaking(true);
    utterance.onend = () => setTtsSpeaking(false);
    utterance.onerror = () => setTtsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopTts = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setTtsSpeaking(false);
    }
  };

  // Trigger Voice Input (Bhashini Speech Engine + Web Speech ASR)
  const startVoiceInput = () => {
    setIsRecording(true);
    stopTts();
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const speechResult = event.results[current][0].transcript;
          setTranscript(speechResult);

          const detected = detectCropFromText(speechResult);
          if (detected) {
            setSelectedCrop(detected);
          }
        };
        
        recognition.onend = () => {
          setIsRecording(false);
          runAiAnalysis();
        };

        recognition.onerror = () => {
          simulateVoiceFallback();
        };

        recognition.start();
        return;
      } catch (e) {
        simulateVoiceFallback();
      }
    } else {
      simulateVoiceFallback();
    }
  };

  const simulateVoiceFallback = () => {
    setTimeout(() => {
      setIsRecording(false);
      runAiAnalysis();
    }, 2500);
  };

  // Run Step-by-Step AI Processing Pipeline
  const runAiAnalysis = (customQuery = null) => {
    const queryText = customQuery || transcript;
    if (customQuery) {
      setTranscript(customQuery);
    }

    const detectedCrop = detectCropFromText(queryText);
    let targetCrop = selectedCrop;
    if (detectedCrop) {
      targetCrop = detectedCrop;
      setSelectedCrop(detectedCrop);
    }

    setIsProcessing(true);
    setProcessingStep(1);

    const targetCropIntel = CROP_INTELLIGENCE_BASE[targetCrop.id] || CROP_INTELLIGENCE_BASE.tomato;

    const stepTimers = [
      setTimeout(() => setProcessingStep(2), 700),  
      setTimeout(() => setProcessingStep(3), 1400), 
      setTimeout(() => setProcessingStep(4), 2100), 
      setTimeout(() => setProcessingStep(5), 2800), 
      setTimeout(() => {
        setIsProcessing(false);
        setActiveTab('recommendation'); 
        const cropName = language === 'mr' ? targetCrop.nameMr : targetCrop.nameEn;
        const spokenRec = language === 'mr' 
          ? `शेतमित्र बीभाषिणी सल्ला: ${cropName} पिकासाठी ${targetCropIntel.decisionMr}` 
          : `ShetMitra Bhashini Recommendation for ${cropName}: ${targetCropIntel.decisionEn}`;
        speakText(spokenRec);
      }, 3500)
    ];

    return () => stepTimers.forEach(clearTimeout);
  };

  const runFullDemoJourney = () => {
    setDemoMode(true);
    setActiveTab('voice-intel');
    runAiAnalysis();
  };

  return (
    <AppContext.Provider value={{
      selectedCrop,
      setSelectedCrop,
      selectedLocation,
      setSelectedLocation,
      language,
      setLanguage,
      activeTab,
      setActiveTab,
      isRecording,
      setIsRecording,
      transcript,
      setTranscript,
      isProcessing,
      processingStep,
      startVoiceInput,
      runAiAnalysis,
      runFullDemoJourney,
      speakText,
      stopTts,
      ttsSpeaking,
      scenarioParams,
      setScenarioParams,
      demoMode,
      activeCropIntel,
      activePriceForecast,
      bhashiniApiKey,
      setBhashiniApiKey
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
