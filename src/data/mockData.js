// ShetMitra AI - Enterprise Agricultural Intelligence & Mandi Price Dataset

export const CROPS = [
  { id: 'tomato', nameEn: 'Tomato', nameMr: 'टोमॅटो', nameHi: 'टमाटर', currentPrice: 2400, predictedPrice: 2850, changePct: 18.75, unit: '₹/Quintal' },
  { id: 'onion', nameEn: 'Onion', nameMr: 'कांदा', nameHi: 'प्याज', currentPrice: 1850, predictedPrice: 2150, changePct: 16.22, unit: '₹/Quintal' },
  { id: 'potato', nameEn: 'Potato', nameMr: 'बटाटा', nameHi: 'आलू', currentPrice: 1400, predictedPrice: 1450, changePct: 3.57, unit: '₹/Quintal' },
  { id: 'cotton', nameEn: 'Cotton', nameMr: 'कापूस', nameHi: 'कपास', currentPrice: 7200, predictedPrice: 7600, changePct: 5.56, unit: '₹/Quintal' },
  { id: 'soybean', nameEn: 'Soybean', nameMr: 'सोयाबीन', nameHi: 'सोयाबीन', currentPrice: 4600, predictedPrice: 4850, changePct: 5.43, unit: '₹/Quintal' }
];

export const LOCATIONS = [
  { id: 'pune', name: 'Pune', lat: 18.5204, lng: 73.8567, apmc: 'Pune APMC (Gultekdi)' },
  { id: 'nashik', name: 'Nashik', lat: 19.9975, lng: 73.7898, apmc: 'Nashik APMC (Panchavati)' },
  { id: 'satara', name: 'Satara', lat: 17.6805, lng: 74.0183, apmc: 'Satara APMC' },
  { id: 'solapur', name: 'Solapur', lat: 17.6599, lng: 75.9064, apmc: 'Solapur APMC' },
  { id: 'nagpur', name: 'Nagpur', lat: 21.1458, lng: 79.0882, apmc: 'Kalamna APMC Nagpur' }
];

export const SAMPLE_QUERIES = [
  { textMr: "टोमॅटो आता विकू का थांबू?", textHi: "क्या मुझे टमाटर अभी बेचना चाहिए या रुकना चाहिए?", textEn: "Should I sell my tomato crop now or wait?", crop: 'tomato', action: 'sell_vs_wait' },
  { textMr: "आज कांद्याचा भाव काय आहे?", textHi: "आज प्याज का भाव क्या है?", textEn: "What is today's onion market price?", crop: 'onion', action: 'price_check' },
  { textMr: "माझ्या शेताजवळ कोणती मंडी चांगली आहे?", textHi: "मेरे खेत के पास कौन सी मंडी सबसे अच्छी है?", textEn: "Which mandi near my farm offers the best price?", crop: 'tomato', action: 'mandi_check' },
  { textMr: "माझ्या पिकासाठी कोणती सरकारी योजना आहे?", textHi: "मेरी फसल के लिए कौन सी सरकारी योजना उपलब्ध है?", textEn: "Which government schemes & subsidies apply to my farm?", crop: 'tomato', action: 'scheme_check' }
];

export const GOVT_SCHEMES = [
  {
    id: 'operation-greens',
    titleMr: 'ऑपरेशन ग्रीन्स योजना (५०% मालवाहतूक अनुदान)',
    titleHi: 'ऑपरेशन ग्रीन्स योजना (५०% मालभाड़ा सब्सिडी)',
    titleEn: 'Operation Greens Scheme (50% Freight & Storage Subsidy)',
    category: 'Price Stabilization & Freight',
    subsidyAmount: '50% Subsidy on Freight & Storage',
    targetCrops: ['Tomato', 'Onion', 'Potato'],
    eligibilityMr: 'टोमॅटो, कांदा उत्पादक शेतकरी व शेतकरी उत्पादक कंपन्या (FPO)',
    eligibilityEn: 'Tomato, Onion, Potato farmers and registered Farmer Producer Organizations (FPOs)',
    descriptionMr: 'हंगामातील बाजारातील मंदीच्या वेळी पिकांची इतर राज्यातील मंडईत वाहतूक करण्यासाठी किंवा कोल्ड स्टोरेजमध्ये ठेवण्यासाठी ५०% अनुदान.',
    descriptionEn: 'Provides 50% subsidy on transportation and cold storage during peak harvest glut to prevent distress selling.',
    documentsMr: ['७/१२ उतारा', 'आधार कार्ड', 'मंडई विक्री पावती', 'बँक पासबुक'],
    documentsEn: ['7/12 Land Record', 'Aadhaar Card', 'APMC Sale Receipt', 'Bank Passbook'],
    applyUrl: 'https://mofpi.gov.in/operation-greens',
    status: 'ACTIVE',
    badgeColor: 'emerald'
  },
  {
    id: 'pmfby',
    titleMr: 'प्रधानमंत्री पीक विमा योजना (PMFBY)',
    titleHi: 'प्रधानमंत्री फसल बीमा योजना',
    titleEn: 'Pradhan Mantri Fasal Bima Yojana (Crop Insurance)',
    category: 'Crop Insurance',
    subsidyAmount: '₹1 Premium Cover',
    targetCrops: ['Tomato', 'Onion', 'Cotton', 'Soybean'],
    eligibilityMr: 'महाराष्ट्रातील सर्व अल्पभूधारक व बहुभूधारक शेतकरी',
    eligibilityEn: 'All marginal and small farmers in Maharashtra state',
    descriptionMr: 'अवेळी पाऊस, गारा आणि नैसर्गिक आपत्तीमुळे होणाऱ्या पीक नुकसानीसाठी १००% आर्थिक भरपाई.',
    descriptionEn: 'Provides comprehensive insurance coverage against crop failure due to unseasonal rains, drought, or floods.',
    documentsMr: ['७/१२ दाखला', 'पेरा पत्रक', 'आधार कार्ड', 'बँक खाते'],
    documentsEn: ['7/12 Certificate', 'Sowing Certificate', 'Aadhaar Card', 'Bank Account'],
    applyUrl: 'https://pmfby.gov.in',
    status: 'ACTIVE',
    badgeColor: 'blue'
  },
  {
    id: 'kusum-solar',
    titleMr: 'मागेल त्याला सौर कृषी पंप योजना (कुसुम योजना)',
    titleHi: 'कुसुम सोलर कृषि पंप योजना',
    titleEn: 'PM-KUSUM Solar Agricultural Pump Scheme',
    category: 'Solar & Irrigation',
    subsidyAmount: '90% Central & State Subsidy',
    targetCrops: ['All Crops'],
    eligibilityMr: 'सिंचनाची सुविधा असलेले व वीज जोडणी नसलेले शेतकरी',
    eligibilityEn: 'Farmers with irrigation source seeking off-grid solar pumps',
    descriptionMr: '३ एचपी, ५ एचपी व ७.५ एचपी क्षमतेचे सौर कृषी पंप ९०% अनुदानावर उपलब्ध.',
    descriptionEn: 'Provides 3HP to 7.5HP off-grid solar pumps at 90% government subsidy to ensure day-time irrigation.',
    documentsMr: ['७/१२ व ८-अ', 'जातीचा दाखला (लागू असल्यास)', 'आधार जोडलेले बँक खाते'],
    documentsEn: ['7/12 & 8-A Land Extract', 'Caste Certificate (if applicable)', 'Aadhaar-linked Bank Account'],
    applyUrl: 'https://mahadbt.maharashtra.gov.in',
    status: 'ACTIVE',
    badgeColor: 'amber'
  },
  {
    id: 'magel-tyala-shettale',
    titleMr: 'मागेल त्याला शेततळे योजना',
    titleHi: 'मांगे उसको खेत तालाब योजना',
    titleEn: 'Magel Tyala Shettale (Farm Pond Scheme)',
    category: 'Solar & Irrigation',
    subsidyAmount: '₹75,000 Direct Bank Grant',
    targetCrops: ['All Crops'],
    eligibilityMr: 'किमान ०.६० हेक्टर जमीन असणारे शेतकरी',
    eligibilityEn: 'Farmers possessing minimum 0.60 hectares land holding',
    descriptionMr: 'पावसाच्या पाण्याचे पुनर्भरण करून पाण्याची टंचाई दूर करण्यासाठी शेततळ्याच्या बांधकामासाठी आर्थिक मदत.',
    descriptionEn: 'Financial assistance directly credited for constructing water-harvesting farm ponds.',
    documentsMr: ['७/१२ दाखला', 'सहमती पत्र', 'बँक पासबुक प्रत'],
    documentsEn: ['7/12 Extract', 'Consent Letter', 'Bank Passbook Copy'],
    applyUrl: 'https://mahadbt.maharashtra.gov.in',
    status: 'ACTIVE',
    badgeColor: 'purple'
  },
  {
    id: 'cold-storage-subsidy',
    titleMr: 'राष्ट्रीय फलोत्पादन अभियान (कोल्ड स्टोरेज सबसिडी)',
    titleHi: 'राष्ट्रीय बागवानी मिशन (कोल्ड स्टोरेज सब्सिडी)',
    titleEn: 'National Horticulture Mission (Cold Storage Subsidy)',
    category: 'Cold Storage & Infrastructure',
    subsidyAmount: '35% to 50% Capital Subsidy',
    targetCrops: ['Tomato', 'Potato', 'Fruits', 'Vegetables'],
    eligibilityMr: 'फलोत्पादन करणारे शेतकरी, शेतकरी गट व एफपीओ',
    eligibilityEn: 'Horticulture farmers, Farmer Producer Organizations (FPOs), & Agripreneurs',
    descriptionMr: 'शेतमाल साठवणूक व टिकवण क्षमता वाढवण्यासाठी ऑन-फार्म पॅक हाऊस व प्रायमरी कूलिंग सेंटर उभारणीसाठी अनुदान.',
    descriptionEn: 'Subsidizes setting up on-farm pack houses, solar cold rooms, and primary processing units.',
    documentsMr: ['प्रकल्प अहवाल (DPR)', '७/१२ उतारा', 'जीएसटी नोंदणी (FPO)'],
    documentsEn: ['Detailed Project Report (DPR)', '7/12 Land Title', 'GST Registration (FPO)'],
    applyUrl: 'https://midh.gov.in',
    status: 'OPEN FOR APPLICATION',
    badgeColor: 'emerald'
  }
];

export const MANDI_MARKETS = {
  tomato: [
    { name: 'Pune APMC', district: 'Pune', price: 2400, distanceKm: 12, transportCostPerQtl: 80, netReturn: 2320, trend: 'up', isRecommended: false, badge: 'Closest Market' },
    { name: 'Nashik APMC', district: 'Nashik', price: 2650, distanceKm: 85, transportCostPerQtl: 220, netReturn: 2430, trend: 'up', isRecommended: false, badge: 'High Supply Hub' },
    { name: 'Mumbai Vashi APMC', district: 'Navi Mumbai', price: 2780, distanceKm: 145, transportCostPerQtl: 310, netReturn: 2470, trend: 'up', isRecommended: true, badge: 'Best Price Opportunity' },
    { name: 'Satara APMC', district: 'Satara', price: 2350, distanceKm: 65, transportCostPerQtl: 160, netReturn: 2190, trend: 'stable', isRecommended: false, badge: 'Local Market' }
  ],
  onion: [
    { name: 'Lasalgaon APMC', district: 'Nashik', price: 2100, distanceKm: 90, transportCostPerQtl: 230, netReturn: 1870, trend: 'up', isRecommended: true, badge: 'Asia Largest Onion Market' },
    { name: 'Pune APMC', district: 'Pune', price: 1850, distanceKm: 15, transportCostPerQtl: 80, netReturn: 1770, trend: 'stable', isRecommended: false, badge: 'Closest Market' },
    { name: 'Solapur APMC', district: 'Solapur', price: 1920, distanceKm: 110, transportCostPerQtl: 260, netReturn: 1660, trend: 'up', isRecommended: false, badge: 'High Demand' }
  ]
};

export const PRICE_FORECAST_DATA = {
  labels: ['14 Days Ago', '12 Days Ago', '10 Days Ago', '8 Days Ago', '6 Days Ago', '4 Days Ago', '2 Days Ago', 'Today', '+2 Days (Est)', '+4 Days (Est)', '+6 Days (Est)', '+7 Days (Est)'],
  historical: [2100, 2150, 2200, 2180, 2250, 2320, 2380, 2400, null, null, null, null],
  forecast: [null, null, null, null, null, null, null, 2400, 2520, 2680, 2790, 2850],
  tftGnnEnsemble: [null, null, null, null, null, null, null, 2400, 2525, 2682, 2795, 2852],
  lstmOnly: [null, null, null, null, null, null, null, 2400, 2490, 2620, 2740, 2810],
  xgboostOnly: [null, null, null, null, null, null, null, 2400, 2540, 2710, 2810, 2870],
  lowerBound: [null, null, null, null, null, null, null, 2400, 2480, 2630, 2740, 2810],
  upperBound: [null, null, null, null, null, null, null, 2400, 2560, 2730, 2840, 2895]
};

export const CLIMATE_DATA = {
  temperature: '28.5 °C',
  humidity: '76%',
  rainProbability: '82% (Heavy Rain Expected in 3 days)',
  windSpeed: '18 km/h',
  soilMoisture: '34% (Optimal)',
  riskLevel: 'MODERATE RISK',
  riskBadgeColor: 'yellow',
  riskSummaryMr: 'नाशिक व पुणे विभागात ३ दिवसांत मुसळधार पावसाची शक्यता आहे. यामुळे बाजारातील आवक घटून दरात वाढ होऊ शकते.',
  riskSummaryHi: 'नाशिक और पुणे क्षेत्र में ३ दिनों में भारी बारिश का अनुमान है। इससे मंडी में आवक कम होगी और दाम बढ़ सकते हैं।',
  riskSummaryEn: 'Heavy rainfall forecasted in major tomato producing zones in 3 days. Supply transport will be impacted, expected to surge mandi prices.',
  weatherImpacts: [
    { factor: 'Crop Harvest', status: 'Proceed before heavy rain (within 48 hrs)', type: 'warning' },
    { factor: 'Transport & Logistics', status: 'Moderate road delay potential on NH-48', type: 'info' },
    { factor: 'Market Supply Shock', status: 'Mandi arrivals expected to drop by ~24%', type: 'positive' }
  ]
};

export const RECOMMENDATION_DATA = {
  decision: 'WAIT BEFORE SELLING',
  decisionMr: '५ ते ७ दिवस थांबा (आता विकू नका)',
  decisionHi: '५ से ७ दिन रुकें (अभी मत बेचें)',
  decisionEn: 'WAIT 5–7 DAYS BEFORE SELLING',
  confidence: 97.8,
  period: '5-7 Days',
  currentPrice: 2400,
  expectedPrice: 2850,
  potentialIncrease: 450,
  potentialIncreasePct: '18.7%',
  recommendedMarket: 'Mumbai Vashi / Pune APMC',
  reasons: [
    { titleMr: 'बाजारातील आवक घटत आहे', titleHi: 'मंडी में आवक घट रही है', titleEn: 'Daily APMC market arrivals are decreasing (-18% week-on-week)', icon: 'TrendingDown' },
    { titleMr: 'हंगामी मागणी वाढण्याची शक्यता', titleHi: 'मौसमी मांग बढ़ने के संकेत', titleEn: 'Upward seasonal trend & urban retail demand spike', icon: 'TrendingUp' },
    { titleMr: 'मुसळधार पावसाचा पुरवठ्यावर परिणाम', titleHi: 'भारी बारिश से आपूर्ति प्रभावित', titleEn: 'Imminent rainfall in Nashik cluster will interrupt harvest supply', icon: 'CloudRain' },
    { titleMr: 'मुंबई वाशी मंडईत सर्वाधिक दर', titleHi: 'मुंबई वाशी मंडी में सबसे अधिक मूल्य', titleEn: 'Nearby Mumbai Vashi market showing strong ₹2,780 spot buyers', icon: 'Store' },
    { titleMr: 'TFT + GNN + XGBoost स्टॅकिंग मॉडेल अचूकता (९७.८% विश्वासार्हता)', titleHi: 'TFT + GNN + XGBoost स्टेकिंग मॉडल सटीकता (९७.८% विश्वास)', titleEn: 'Temporal Fusion Transformer + Graph Neural Network Ensemble (97.8% Accuracy)', icon: 'Cpu' }
  ]
};

export const PROOF_OF_CONCEPT_DATA = {
  metrics: {
    mae: '18.40 ₹/Qtl (0.76%)',
    rmse: '24.10 ₹/Qtl',
    mape: '1.05%',
    accuracy: '97.8%',
    dataPointsTested: '1,450 Unseen APMC Mandi Records'
  },
  modelComparison: [
    { name: 'LSTM Deep Learning Only', mae: '42.10 ₹/Qtl', rmse: '61.40 ₹/Qtl', mape: '2.85%', accuracy: '90.4%', focus: 'Sequential Time-Series Momentum' },
    { name: 'XGBoost Regressor Only', mae: '38.50 ₹/Qtl', rmse: '56.20 ₹/Qtl', mape: '2.62%', accuracy: '91.8%', focus: 'Tabular Arrivals & Weather Features' },
    { name: 'Dual Ensemble (LSTM + XGBoost)', mae: '34.20 ₹/Qtl', rmse: '48.50 ₹/Qtl', mape: '2.18%', accuracy: '94.2%', focus: 'Dual-Stream Intelligence Fusion' },
    { name: 'TFT + GNN + XGBoost Ultra Stacking', mae: '18.40 ₹/Qtl', rmse: '24.10 ₹/Qtl', mape: '1.05%', accuracy: '97.8%', focus: 'Satellite NDVI + Graph Spatial Arbitrage + Attention', isBest: true }
  ],
  accuracyEnhancementTechniques: [
    { title: 'ISRO Satellite Crop Density (NDVI)', impact: '+1.8% Accuracy Gain', detail: 'Tracks standing crop density & harvest timing 21 days before arrival.' },
    { title: 'Graph Neural Network (GNN) Spatial Arbitrage', impact: '+1.4% Accuracy Gain', detail: 'Models APMC mandis as a spatial-temporal graph connected by highways.' },
    { title: 'Temporal Fusion Transformer (TFT) Attention', impact: '+1.2% Accuracy Gain', detail: 'Multi-horizon self-attention capturing complex seasonal interactions.' },
    { title: 'FASTag Logistics Freight Density', impact: '+0.8% Accuracy Gain', detail: 'Real-time truck movement counts on NH-48 interstate trade corridors.' }
  ],
  backtestChart: {
    labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30', 'Day 35', 'Day 40', 'Day 45', 'Day 50', 'Day 55', 'Day 60'],
    actual: [2200, 2240, 2310, 2280, 2350, 2410, 2390, 2450, 2520, 2600, 2580, 2690, 2750],
    predicted: [2205, 2238, 2308, 2282, 2348, 2412, 2392, 2448, 2522, 2598, 2582, 2688, 2752]
  }
};

export const SYSTEM_ARCHITECTURE = [
  {
    id: 'layer1',
    number: '01',
    title: 'Voice & Speech Intelligence',
    titleMr: 'आवाज व भाषा संवाद',
    subtitle: 'Bhashini / Whisper Multilingual Engine',
    color: '#2563eb',
    items: ['Web Speech STT (Marathi, Hindi, English)', 'Dialect Normalizer (Punyagiri, Varhadi, Malvani)', 'Text-to-Speech Audio Synthesis (Voice Output)']
  },
  {
    id: 'layer2',
    number: '02',
    title: 'AI Orchestration & Intent Engine',
    titleMr: 'एआय विचार व हेतू विश्लेषण',
    subtitle: 'AgriLLM & Context Parser',
    color: '#7c3aed',
    items: ['Farmer Intent Extraction (Sell vs Wait)', 'Crop & Variety Identifier', 'Spatial & Action Scope Mapper']
  },
  {
    id: 'layer3',
    number: '03',
    title: 'Domain Decision Engines (TFT + GNN + XGBoost)',
    titleMr: 'विशेषज्ञ निर्णय प्रणाली (TFT + GNN + XGBoost)',
    subtitle: 'Ultra High-Precision Multi-Model Stacking (97.8% Acc)',
    color: '#059669',
    items: ['Temporal Fusion Transformer (Self-Attention Time-Series)', 'Graph Neural Network (APMC Spatial Arbitrage Graph)', 'XGBoost Regressor (Weather & Arrivals Shock)', 'Satellite NDVI Yield Density Classifier']
  },
  {
    id: 'layer4',
    number: '04',
    title: 'GIS Spatial Intelligence Core',
    titleMr: 'जीआयएस भौगोलिक विश्लेषण',
    subtitle: 'Geospatial Matrix',
    color: '#d97706',
    items: ['Farmer Location Geocoding', 'Nearby APMC Mandi Distance Matrix', 'Transport Freight Cost Calculator', 'ISRO Bhuvan Yield Zone Overlay']
  },
  {
    id: 'layer5',
    number: '05',
    title: 'Data & Memory Layer',
    titleMr: 'डेटा आणि मेमरी लेयर',
    subtitle: 'Real-time Time Series Store',
    color: '#db2777',
    items: ['Agmarknet Daily Mandi Time-Series', 'IMD High-Res Grid Weather Data', 'Farmer Land Profile & Harvest Logs']
  },
  {
    id: 'layer6',
    number: '06',
    title: 'Personalized Farmer Action',
    titleMr: 'सल्ला आणि कृती',
    subtitle: 'Actionable Agricultural Intelligence',
    color: '#047857',
    items: ['Clear Hold or Sell Signal', 'Net Profit Projection per Quintal', 'Audio Voice Readout in Marathi', 'Multi-Mandi Freight Comparison']
  }
];
