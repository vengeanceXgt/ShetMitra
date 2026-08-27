// Bhashini Multilingual Speech API Service (Digital India ULCA / Dhruva Engine)

const BHASHINI_DHRUVA_API_URL = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline";
const BHASHINI_CONFIG_URL = "https://meity-auth.bhashini.gov.in/ulca/apis/v0/model/getModelsPipeline";

// Bhashini Language Code Mapping
export const BHASHINI_LANG_CODES = {
  mr: { sourceScript: "mr", langCode: "mr-IN", modelAsr: "bhashini/asr-marathi-v2", modelTts: "bhashini/tts-marathi-v1" },
  hi: { sourceScript: "hi", langCode: "hi-IN", modelAsr: "bhashini/asr-hindi-v2", modelTts: "bhashini/tts-hindi-v1" },
  en: { sourceScript: "en", langCode: "en-IN", modelAsr: "bhashini/asr-english-v1", modelTts: "bhashini/tts-english-v1" }
};

/**
 * 1. Bhashini ASR (Speech-to-Text) Audio Inference
 * Converts recorded raw base64 audio into Marathi/Hindi/English transcript text.
 */
export const transcribeAudioWithBhashini = async (base64Audio, languageKey = 'mr', apiKey = null) => {
  const langConfig = BHASHINI_LANG_CODES[languageKey] || BHASHINI_LANG_CODES.mr;

  // Real Bhashini Dhruva Pipeline Request Structure
  const payload = {
    pipelineTasks: [
      {
        taskType: "asr",
        config: {
          language: { sourceLanguage: langConfig.sourceScript },
          serviceId: langConfig.modelAsr,
          audioFormat: "wav",
          samplingRate: 16000
        }
      }
    ],
    inputData: {
      audio: [{ audioContent: base64Audio }]
    }
  };

  try {
    if (apiKey) {
      const response = await fetch(BHASHINI_DHRUVA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      const text = data?.pipelineResponse?.[0]?.output?.[0]?.source || null;
      if (text) return { transcript: text, isBhashiniLive: true };
    }
  } catch (error) {
    console.warn("Bhashini API call fallback to browser STT:", error);
  }

  return { transcript: null, isBhashiniLive: false };
};

/**
 * 2. Bhashini TTS (Text-to-Speech) Synthesis
 * Synthesizes text into high-quality Marathi/Hindi audio speech.
 */
export const synthesizeTextWithBhashini = async (text, languageKey = 'mr', apiKey = null) => {
  const langConfig = BHASHINI_LANG_CODES[languageKey] || BHASHINI_LANG_CODES.mr;

  const payload = {
    pipelineTasks: [
      {
        taskType: "tts",
        config: {
          language: { sourceLanguage: langConfig.sourceScript },
          serviceId: langConfig.modelTts,
          gender: "female"
        }
      }
    ],
    inputData: {
      input: [{ source: text }]
    }
  };

  try {
    if (apiKey) {
      const response = await fetch(BHASHINI_DHRUVA_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      const audioBase64 = data?.pipelineResponse?.[0]?.audio?.[0]?.audioContent;
      if (audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);
        audio.play();
        return { isPlayed: true, isBhashiniLive: true };
      }
    }
  } catch (e) {
    console.warn("Bhashini TTS fallback:", e);
  }

  return { isPlayed: false, isBhashiniLive: false };
};
