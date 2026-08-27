import React, { createContext, useContext, useState, useEffect } from 'react';
import { CROPS, LOCATIONS, SAMPLE_QUERIES, RECOMMENDATION_DATA } from '../data/mockData';

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
    
    // Check if real Web Speech API is supported
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
    // Simulated voice recording countdown
    setTimeout(() => {
      setIsRecording(false);
      const query = SAMPLE_QUERIES[0];
      const text = language === 'mr' ? query.textMr : language === 'hi' ? query.textHi : query.textEn;
      setTranscript(text);
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
      setTimeout(() => setProcessingStep(2), 700),  // Language & Crop Identification
      setTimeout(() => setProcessingStep(3), 1400), // Mandi & GIS Price Check
      setTimeout(() => setProcessingStep(4), 2100), // Climate & Supply Risk
      setTimeout(() => setProcessingStep(5), 2800), // AI Decision Synthesis
      setTimeout(() => {
        setIsProcessing(false);
        setActiveTab('recommendation'); // Automatically jump to recommendation screen!
        const spokenRec = language === 'mr' 
          ? "शेतमित्र एआय शिफारस: टोमॅटो ५ ते ७ दिवस थांबवून विका. अंदाजे दर वाढ ४५० रुपये प्रति क्विंटल होईल." 
          : language === 'hi' 
          ? "शेतमित्र एआई सलाह: टमाटर ५ से ७ दिन रुककर बेचें। अनुमानित मूल्य वृद्धि ४५० रुपये प्रति क्विंटल होगी।"
          : "ShetMitra AI Recommendation: Hold tomatoes for 5 to 7 days before selling. Expected price gain is 450 rupees per quintal.";
        speakText(spokenRec);
      }, 3500)
    ];

    return () => stepTimers.forEach(clearTimeout);
  };

  // Run Complete Interactive Demo Journey
  const runFullDemoJourney = () => {
    setDemoMode(true);
    setActiveTab('voice-intel');
    runAiAnalysis(SAMPLE_QUERIES[0].textMr);
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
      demoMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
