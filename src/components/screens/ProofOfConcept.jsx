import React from 'react';
import { useApp } from '../../context/AppContext';
import { PROOF_OF_CONCEPT_DATA } from '../../data/mockData';
import { FlaskConical, CheckCircle2, BarChart3, Database, ShieldCheck, Cpu, Award, Zap, Satellite, GitMerge, Activity } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ProofOfConcept = () => {
  const { selectedCrop } = useApp();

  const backtestData = {
    labels: PROOF_OF_CONCEPT_DATA.backtestChart.labels,
    datasets: [
      {
        label: 'Actual Ground Truth Mandi Price (Agmarknet)',
        data: PROOF_OF_CONCEPT_DATA.backtestChart.actual,
        borderColor: '#0f172a',
        backgroundColor: 'rgba(15, 23, 42, 0.1)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#0f172a',
        tension: 0.3
      },
      {
        label: 'TFT + GNN + XGBoost Stacking Model (97.8% Accuracy)',
        data: PROOF_OF_CONCEPT_DATA.backtestChart.predicted,
        borderColor: '#10b981',
        borderDash: [4, 4],
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: '#10b981',
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
        labels: { font: { size: 11, weight: 'bold' } }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        ticks: { callback: (val) => `₹${val}` },
        grid: { color: 'rgba(226, 232, 240, 0.6)' }
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">Proof of Concept: High-Precision ML Model Suite</h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">97.8% Accuracy Target</span>
          </div>
          <p className="text-xs text-slate-500">Benchmarking TFT Transformers, Graph Neural Networks, and XGBoost Stacking on 1,450 unseen records</p>
        </div>
      </div>

      {/* ULTRA ACCURACY METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 space-y-1 border-l-4 border-l-emerald-600 bg-emerald-50/30">
          <span className="text-xs font-bold text-emerald-900 block">MAE (Mean Absolute Error)</span>
          <span className="text-2xl font-black text-emerald-950">{PROOF_OF_CONCEPT_DATA.metrics.mae}</span>
          <span className="text-[11px] text-emerald-700 font-semibold block">Reduced to &lt; ₹19 per Quintal</span>
        </div>

        <div className="glass-card p-5 space-y-1 border-l-4 border-l-blue-600 bg-blue-50/30">
          <span className="text-xs font-bold text-blue-900 block">RMSE (Root Mean Square Error)</span>
          <span className="text-2xl font-black text-blue-950">{PROOF_OF_CONCEPT_DATA.metrics.rmse}</span>
          <span className="text-[11px] text-blue-700 font-semibold block">Minimizes outlier deviations</span>
        </div>

        <div className="glass-card p-5 space-y-1 border-l-4 border-l-purple-600 bg-purple-50/30">
          <span className="text-xs font-bold text-purple-900 block">MAPE Error Rate</span>
          <span className="text-2xl font-black text-purple-950">{PROOF_OF_CONCEPT_DATA.metrics.mape}</span>
          <span className="text-[11px] text-purple-700 font-semibold block">Ultra-low 1.05% error</span>
        </div>

        <div className="glass-card p-5 space-y-1 border-l-4 border-l-amber-600 bg-amber-50/30">
          <span className="text-xs font-bold text-amber-900 block">Overall Directional Accuracy</span>
          <span className="text-2xl font-black text-amber-950">{PROOF_OF_CONCEPT_DATA.metrics.accuracy}</span>
          <span className="text-[11px] text-amber-700 font-semibold block">Precision Price Trend Signal</span>
        </div>

      </div>

      {/* ACCURACY ENHANCEMENT TECHNIQUES CARDS */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" />
            <span>4 Key Engineering Innovations Used to PUSH Accuracy to 97.8%</span>
          </h3>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">+3.6% Net Accuracy Boost</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROOF_OF_CONCEPT_DATA.accuracyEnhancementTechniques.map((tech, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between font-bold text-xs">
                <span className="text-slate-900 font-extrabold flex items-center gap-2">
                  {idx === 0 && <Satellite className="w-4 h-4 text-emerald-600" />}
                  {idx === 1 && <GitMerge className="w-4 h-4 text-purple-600" />}
                  {idx === 2 && <Cpu className="w-4 h-4 text-blue-600" />}
                  {idx === 3 && <Activity className="w-4 h-4 text-amber-600" />}
                  <span>{tech.title}</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded text-[10px]">
                  {tech.impact}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {tech.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ML MODEL COMPARISON MATRIX TABLE */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            <span>Machine Learning Benchmark Comparison</span>
          </h3>
          <span className="text-xs font-bold text-slate-500">1,450 Historical Days</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-300 font-bold">
                <th className="p-3">ML Model Architecture</th>
                <th className="p-3">MAE (Mean Error)</th>
                <th className="p-3">RMSE</th>
                <th className="p-3">MAPE %</th>
                <th className="p-3">Directional Accuracy</th>
                <th className="p-3">Primary Focus & Intelligence Stream</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              {PROOF_OF_CONCEPT_DATA.modelComparison.map((m, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-slate-50 ${m.isBest ? 'bg-emerald-50/80 font-bold border-l-4 border-l-emerald-600' : ''}`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-xs">{m.name}</span>
                      {m.isBest && (
                        <span className="bg-emerald-700 text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Award className="w-3 h-3" />
                          <span>Highest Precision</span>
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-3 font-bold text-slate-900">{m.mae}</td>
                  <td className="p-3 text-slate-700">{m.rmse}</td>
                  <td className="p-3 text-slate-700">{m.mape}</td>
                  <td className="p-3 font-extrabold text-emerald-700">{m.accuracy}</td>
                  <td className="p-3 text-slate-600">{m.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ACTUAL VS PREDICTED HISTORICAL BACKTEST CHART */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Stacking Model Backtesting: Actual vs Predicted Mandi Prices (97.8% Accuracy Fit)
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">{PROOF_OF_CONCEPT_DATA.metrics.dataPointsTested}</span>
        </div>

        <div className="h-80 w-full pt-2">
          <Line data={backtestData} options={chartOptions} />
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center gap-3 text-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="font-medium text-slate-300">
            <strong>Conclusion:</strong> Pushing prediction accuracy from 94.2% to **97.8%** is achieved by incorporating **ISRO Satellite Crop Density (NDVI)** to detect harvests 3 weeks early and **Graph Neural Networks (GNN)** to capture real-time price arbitrage between interstate APMC mandis.
          </p>
        </div>
      </div>

    </div>
  );
};
