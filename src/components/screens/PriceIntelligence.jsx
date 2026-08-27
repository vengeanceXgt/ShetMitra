import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRICE_FORECAST_DATA } from '../../data/mockData';
import { TrendingUp, Sparkles, AlertCircle, BarChart3, Clock, CheckCircle, Cpu, CpuIcon } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const PriceIntelligence = () => {
  const { selectedCrop, language } = useApp();
  const [modelType, setModelType] = useState('ensemble'); // 'ensemble', 'lstm', 'xgboost'

  const activeForecastSeries = 
    modelType === 'lstm' 
      ? PRICE_FORECAST_DATA.lstmOnly 
      : modelType === 'xgboost' 
      ? PRICE_FORECAST_DATA.xgboostOnly 
      : PRICE_FORECAST_DATA.forecast;

  const activeForecastPrice = 
    modelType === 'lstm' ? 2810 : modelType === 'xgboost' ? 2870 : 2850;

  const chartData = {
    labels: PRICE_FORECAST_DATA.labels,
    datasets: [
      {
        label: 'Historical Mandi Price (₹/Qtl)',
        data: PRICE_FORECAST_DATA.historical,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: '#047857',
        fill: true,
        tension: 0.3
      },
      {
        label: `${modelType === 'lstm' ? 'LSTM Deep Learning Trajectory' : modelType === 'xgboost' ? 'XGBoost Regressor Trajectory' : 'Hybrid Ensemble (LSTM + XGBoost) Trajectory'}`,
        data: activeForecastSeries,
        borderColor: modelType === 'lstm' ? '#8b5cf6' : modelType === 'xgboost' ? '#f59e0b' : '#2563eb',
        borderDash: [6, 6],
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: modelType === 'lstm' ? '#7c3aed' : modelType === 'xgboost' ? '#d97706' : '#1d4ed8',
        tension: 0.3
      },
      {
        label: 'Upper Confidence Bound (95%)',
        data: PRICE_FORECAST_DATA.upperBound,
        borderColor: 'rgba(59, 130, 246, 0.2)',
        backgroundColor: 'rgba(59, 130, 246, 0.12)',
        borderWidth: 1,
        pointRadius: 0,
        fill: '+1',
        tension: 0.3
      },
      {
        label: 'Lower Confidence Bound (95%)',
        data: PRICE_FORECAST_DATA.lowerBound,
        borderColor: 'rgba(59, 130, 246, 0.2)',
        backgroundColor: 'transparent',
        borderWidth: 1,
        pointRadius: 0,
        fill: false,
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 11, weight: 'bold' },
          usePointStyle: true
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => `${context.dataset.label}: ₹${context.raw}`
        }
      }
    },
    scales: {
      y: {
        min: 1900,
        max: 3100,
        ticks: { callback: (val) => `₹${val}` },
        grid: { color: 'rgba(226, 232, 240, 0.6)' }
      },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">📊 Price Intelligence Engine (LSTM + XGBoost)</h2>
            <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Dual ML Ensemble</span>
          </div>
          <p className="text-xs text-slate-500">LSTM Time-Series Neural Network + XGBoost Gradient Boosted Regressor</p>
        </div>

        {/* Model Architecture Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setModelType('ensemble')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              modelType === 'ensemble' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🧠 Hybrid Ensemble
          </button>
          <button
            onClick={() => setModelType('lstm')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              modelType === 'lstm' 
                ? 'bg-purple-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🔄 LSTM Only
          </button>
          <button
            onClick={() => setModelType('xgboost')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              modelType === 'xgboost' 
                ? 'bg-amber-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ XGBoost Only
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 space-y-1 border-l-4 border-l-slate-600">
          <span className="text-xs font-bold text-slate-500 block">Current Spot Market Price</span>
          <span className="text-3xl font-black text-slate-900">₹{selectedCrop.currentPrice}</span>
          <span className="text-[11px] text-slate-500 block">per Quintal (Pune APMC Spot)</span>
        </div>

        <div className="glass-card p-5 space-y-1 border-l-4 border-l-blue-600 bg-blue-50/40">
          <span className="text-xs font-bold text-blue-900 block">AI 7-Day Forecast Price ({modelType.toUpperCase()})</span>
          <span className="text-3xl font-black text-blue-900">₹{activeForecastPrice}</span>
          <span className="text-[11px] text-blue-700 font-semibold block">per Quintal (+7 Days Horizon)</span>
        </div>

        <div className="glass-card p-5 space-y-1 border-l-4 border-l-emerald-600 bg-emerald-50/40">
          <span className="text-xs font-bold text-emerald-900 block">Expected Price Gain</span>
          <span className="text-3xl font-black text-emerald-950 flex items-center gap-1">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <span>+18.7%</span>
          </span>
          <span className="text-[11px] text-emerald-800 font-bold block">+₹450 / Quintal Additional Profit</span>
        </div>

        <div className="glass-card p-5 space-y-1 border-l-4 border-l-purple-600 bg-purple-50/30">
          <span className="text-xs font-bold text-purple-900 block">Active ML Architecture</span>
          <span className="text-lg font-extrabold text-purple-950 block capitalize">{modelType} Model</span>
          <span className="text-[11px] text-purple-700 font-medium block">
            {modelType === 'lstm' ? 'Sequential Price Momentum' : modelType === 'xgboost' ? 'Arrivals & Weather Trees' : 'Dual-Stream Intelligence Fusion'}
          </span>
        </div>

      </div>

      {/* MAIN INTERACTIVE PRICE FORECAST CHART */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Tomato Price Forecast Chart — Active Model: <span className="text-blue-700 uppercase font-black">{modelType}</span>
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1 text-emerald-700">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
              Historical Actual
            </span>
            <span className="flex items-center gap-1 text-blue-700">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
              AI Forecast Trajectory
            </span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-80 w-full pt-2">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* DUAL ML MODEL SPECIFICATION BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LSTM Neural Network Specs */}
        <div className="glass-card p-5 space-y-3 border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-purple-950 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-600" />
              <span>1. LSTM Neural Network (Time-Series)</span>
            </h3>
            <span className="text-[10px] bg-purple-100 text-purple-800 font-extrabold px-2 py-0.5 rounded">Deep Learning</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            2-layer Recurrent Neural Network (RNN) capturing multi-week price momentum, long-term historical seasonality, and cyclic demand spikes.
          </p>

          <div className="space-y-1.5 text-[11px] font-medium text-slate-700">
            <div className="flex justify-between">
              <span>Input Sequences:</span>
              <strong className="text-purple-950">30-day sliding window</strong>
            </div>
            <div className="flex justify-between">
              <span>Architecture:</span>
              <strong className="text-purple-950">Stacked PyTorch LSTM (64 Hidden Units)</strong>
            </div>
            <div className="flex justify-between">
              <span>Primary Role:</span>
              <strong className="text-purple-950">Smooth Trend Trajectory Estimation</strong>
            </div>
          </div>
        </div>

        {/* XGBoost Regressor Specs */}
        <div className="glass-card p-5 space-y-3 border-l-4 border-l-amber-600">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-extrabold text-sm text-amber-950 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-600" />
              <span>2. XGBoost Regressor (Tabular Features)</span>
            </h3>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2 py-0.5 rounded">Gradient Boosting</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Gradient boosted decision tree regressor evaluating non-linear tabular features like daily APMC arrival tons, IMD rain probability, and transport fuel rates.
          </p>

          <div className="space-y-1.5 text-[11px] font-medium text-slate-700">
            <div className="flex justify-between">
              <span>Tree Depth & Estimators:</span>
              <strong className="text-amber-950">Max Depth 6, 300 Trees</strong>
            </div>
            <div className="flex justify-between">
              <span>Key Features:</span>
              <strong className="text-amber-950">Daily Arrivals, IMD Rain %, Fuel Rate</strong>
            </div>
            <div className="flex justify-between">
              <span>Primary Role:</span>
              <strong className="text-amber-950">Weather & Supply Disruption Shocks</strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
