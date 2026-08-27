import React, { createContext, useContext, useState, useEffect } from 'react';
import { CROPS, LOCATIONS, SAMPLE_QUERIES } from '../data/mockData';
import { CROP_INTELLIGENCE_BASE, generateCropPriceForecastSeries } from '../services/realtimeAgriEngine';

const AppContext = createContext();

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
  const [scenarioParams, setScenarioParams] = useState({
    holdDays: 7,
    fuelRate: 95,
    rainImpact: 'high'
  });

  // Get active crop intelligence dynamically
  const activeCropIntel = CROP_INTELLIGENCE_BASE[selectedCrop.id] || CROP_INTELLIGENCE_BASE.tomato;
  const activePriceForecast = generateCropPriceForecastSeries(selectedCrop.currentPrice);

  // Update transcript when crop changes
  useEffect(() => {
    const cropName = language === 'mr' ? selectedCrop.nameMr : language === 'hi' ? selectedCrop.nameHi : selectedCrop.nameEn;
    if (language === 'mr') {
      setTranscript(`${cropName} आता विकू का थांबू?`);
    } else if (language === 'hi') {
      setTranscript(`क्या मुझे ${cropName} अभी बेचना चाहिए या रुकना चाहिए?`);
    } else {
      setTranscript(`Should I sell my ${cropName.toLowerCase()} crop now or wait?`);
    }
  }, [selectedCrop, language]);

  // Handle TTS Voice Synthesis
  const speakText = (text) => {
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

  // Trigger Voice Input Simulation / Speech Recognition
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
    if (customQuery) {
      setTranscript(customQuery);
    }
    setIsProcessing(true);
    setProcessingStep(1);

    const stepTimers = [
      setTimeout(() => setProcessingStep(2), 700),  
      setTimeout(() => setProcessingStep(3), 1400), 
      setTimeout(() => setProcessingStep(4), 2100), 
      setTimeout(() => setProcessingStep(5), 2800), 
      setTimeout(() => {
        setIsProcessing(false);
        setActiveTab('recommendation'); 
        const cropName = language === 'mr' ? selectedCrop.nameMr : selectedCrop.nameEn;
        const spokenRec = language === 'mr' 
          ? `शेतमित्र एआय सल्ला: ${cropName} पिकासाठी ${activeCropIntel.decisionMr}` 
          : `ShetMitra AI Recommendation for ${cropName}: ${activeCropIntel.decisionEn}`;
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
      activePriceForecast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
