import React, { createContext, useContext, useState, useEffect } from 'react';
import { CROPS, LOCATIONS, SAMPLE_QUERIES } from '../data/mockData';
import { CROP_INTELLIGENCE_BASE, generateCropPriceForecastSeries } from '../services/realtimeAgriEngine';
import { transcribeAudioWithBhashini, synthesizeTextWithBhashini } from '../services/bhashiniApi';

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
  const [bhashiniApiKey, setBhashiniApiKey] = useState(null);
  const [scenarioParams, setScenarioParams] = useState({
    holdDays: 7,
    fuelRate: 95,
    rainImpact: 'high'
  });

  const activeCropIntel = CROP_INTELLIGENCE_BASE[selectedCrop.id] || CROP_INTELLIGENCE_BASE.tomato;
  const activePriceForecast = generateCropPriceForecastSeries(selectedCrop.currentPrice);

  // Robust Audio Speech Synthesis
  const speakText = async (text) => {
    if (!text) return;
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setTtsSpeaking(true);

    if (bhashiniApiKey) {
      const res = await synthesizeTextWithBhashini(text, language, bhashiniApiKey);
      if (res.isPlayed) {
        setTtsSpeaking(false);
        return;
      }
    }

    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        utterance.onstart = () => setTtsSpeaking(true);
        utterance.onend = () => setTtsSpeaking(false);
        utterance.onerror = () => setTtsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech Synthesis error:", err);
        setTtsSpeaking(false);
      }
    } else {
      setTtsSpeaking(false);
    }
  };

  const stopTts = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setTtsSpeaking(false);
    }
  };

  // Robust Voice Microphone Listener
  const startVoiceInput = () => {
    stopTts();
    setIsRecording(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';
        recognition.interimResults = true;
        recognition.continuous = false;
        
        recognition.onresult = (event) => {
          const current = event.resultIndex;
          const speechResult = event.results[current][0].transcript;
          if (speechResult) {
            setTranscript(speechResult);
            const detected = detectCropFromText(speechResult);
            if (detected) {
              setSelectedCrop(detected);
            }
          }
        };
        
        recognition.onend = () => {
          setIsRecording(false);
          runAiAnalysis();
        };

        recognition.onerror = (err) => {
          console.warn("Speech recognition error, using fallback:", err);
          setIsRecording(false);
          simulateVoiceFallback();
        };

        recognition.start();
      } catch (e) {
        console.warn("Speech recognition exception:", e);
        setIsRecording(false);
        simulateVoiceFallback();
      }
    } else {
      simulateVoiceFallback();
    }
  };

  const simulateVoiceFallback = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      const cropName = language === 'mr' ? selectedCrop.nameMr : selectedCrop.nameEn;
      const fallbackQuery = language === 'mr' 
        ? `${cropName} आता विकू का थांबू?` 
        : `Should I sell my ${cropName.toLowerCase()} crop now or wait?`;
      setTranscript(fallbackQuery);
      runAiAnalysis(fallbackQuery);
    }, 1800);
  };

  // Run AI Processing Pipeline
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
      setTimeout(() => setProcessingStep(2), 600),  
      setTimeout(() => setProcessingStep(3), 1200), 
      setTimeout(() => setProcessingStep(4), 1800), 
      setTimeout(() => setProcessingStep(5), 2400), 
      setTimeout(() => {
        setIsProcessing(false);
        setActiveTab('recommendation'); 
        const cropName = language === 'mr' ? targetCrop.nameMr : targetCrop.nameEn;
        const spokenRec = language === 'mr' 
          ? `शेतमित्र सल्ला: ${cropName} पिकासाठी ${targetCropIntel.decisionMr}` 
          : `ShetMitra Recommendation for ${cropName}: ${targetCropIntel.decisionEn}`;
        speakText(spokenRec);
      }, 3000)
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
