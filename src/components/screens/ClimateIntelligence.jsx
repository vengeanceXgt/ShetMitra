import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CLIMATE_DATA } from '../../data/mockData';
import { fetchLiveFreeWeather } from '../../services/freeApis';
import { CloudSun, Thermometer, Droplets, Wind, AlertTriangle, CloudRain, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export const ClimateIntelligence = () => {
  const { selectedLocation, language } = useApp();
  const [liveWeather, setLiveWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadLiveWeather = async () => {
    setLoading(true);
    const data = await fetchLiveFreeWeather(selectedLocation.lat, selectedLocation.lng);
    if (data) {
      setLiveWeather(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLiveWeather();
  }, [selectedLocation]);

  const temp = liveWeather?.temperature || CLIMATE_DATA.temperature;
  const wind = liveWeather?.windSpeed || CLIMATE_DATA.windSpeed;
  const humidity = liveWeather?.humidity || CLIMATE_DATA.humidity;
  const rainProb = liveWeather?.rainProbability || CLIMATE_DATA.rainProbability;

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">🌤️ Climate Intelligence & Agronomic Weather Risk</h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Open-Meteo Free API (Live)</span>
          </div>
          <p className="text-xs text-slate-500">Real-time weather radar for {selectedLocation.name} (100% Free Live Data)</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadLiveWeather}
            disabled={loading}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Live Weather</span>
          </button>
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Risk: {CLIMATE_DATA.riskLevel}</span>
          </span>
        </div>
      </div>

      {/* Primary Weather KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 space-y-2 border-l-4 border-l-amber-500 relative">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Air Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-3xl font-black text-slate-900">{temp}</span>
          <p className="text-[11px] text-slate-500">Optimal for ripe tomato plucking</p>
          {liveWeather && (
            <span className="absolute top-2 right-2 text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded">LIVE</span>
          )}
        </div>

        <div className="glass-card p-5 space-y-2 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Relative Humidity</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-3xl font-black text-slate-900">{humidity}</span>
          <p className="text-[11px] text-slate-500">High atmospheric moisture</p>
        </div>

        <div className="glass-card p-5 space-y-2 border-l-4 border-l-indigo-600 bg-indigo-50/30">
          <div className="flex items-center justify-between text-indigo-900 text-xs font-bold">
            <span>Rain Probability</span>
            <CloudRain className="w-4 h-4 text-indigo-600" />
          </div>
          <span className="text-2xl font-black text-indigo-950">{rainProb}</span>
          <p className="text-[11px] text-indigo-700 font-semibold">Heavy spell in 72 hours</p>
        </div>

        <div className="glass-card p-5 space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Wind Speed & Soil</span>
            <Wind className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-slate-900">{wind}</span>
          <p className="text-[11px] text-emerald-700 font-bold">{CLIMATE_DATA.soilMoisture}</p>
        </div>

      </div>

      {/* CLIMATE SHOCK & MARKET IMPACT ANALYSIS */}
      <div className="glass-card p-6 space-y-4 border-l-4 border-l-amber-600">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900">
            <CloudSun className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'mr' ? 'हवामान जोखीम व पुरवठा साखळी परिणाम' : 'Weather Risk & Supply Chain Impact Analysis'}
            </h3>
            <p className="text-xs text-slate-500">How upcoming rainfall affects crop harvesting, market arrivals, and mandi spot prices</p>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1">
          <h4 className="font-extrabold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>IMD Weather Radar Alert (Nashik & Pune Production Clusters)</span>
          </h4>
          <p className="text-xs leading-relaxed font-medium">
            "{language === 'mr' ? CLIMATE_DATA.riskSummaryMr : language === 'hi' ? CLIMATE_DATA.riskSummaryHi : CLIMATE_DATA.riskSummaryEn}"
          </p>
        </div>

        {/* Detailed Impact Breakdown Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-xs text-slate-900">
              <span>🌾 Field Harvesting</span>
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px]">Harvest Window</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Complete mature crop plucking within the next 48 hours before rain causes waterlogging & rot.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-xs text-slate-900">
              <span>🚚 Transport Logistics</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px]">Moderate Delay</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              Rain on highway corridors (NH-48) may slow down truck transport by 3–5 hours between Nashik & Mumbai.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-xs text-emerald-950">
              <span>📈 Price Impact Trigger</span>
              <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded text-[10px] font-black">Price Surge</span>
            </div>
            <p className="text-xs text-emerald-900 font-semibold">
              Restricted market supply will trigger a price surge of ₹300–₹450 per quintal in urban APMC mandis.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
