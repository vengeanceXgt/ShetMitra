import React from 'react';
import { useApp } from '../../context/AppContext';
import { MANDI_MARKETS } from '../../data/mockData';
import { Store, Truck, Navigation, TrendingUp, CheckCircle2, Award, ArrowUpRight } from 'lucide-react';

export const MarketComparison = () => {
  const { selectedCrop, language } = useApp();
  const markets = MANDI_MARKETS[selectedCrop.id] || MANDI_MARKETS.tomato;

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">🏪 APMC Market Comparison & Freight Optimization Matrix</h2>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Multi-Mandi Analysis</span>
          </div>
          <p className="text-xs text-slate-500">Comparing APMC spot prices, logistics freight costs, and net farmer returns</p>
        </div>
      </div>

      {/* Highlights Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Award className="w-7 h-7 text-emerald-400 shrink-0" />
          <div>
            <h3 className="font-extrabold text-sm text-white">AI Optimal Recommendation: Mumbai Vashi APMC</h3>
            <p className="text-xs text-emerald-100">
              Highest net return of <strong>₹2,470 / Quintal</strong> after deducting ₹310 freight transport costs.
            </p>
          </div>
        </div>
        <span className="bg-emerald-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg shadow-sm hidden sm:inline-block">
          Net Profit +₹150/Qtl
        </span>
      </div>

      {/* MARKET COMPARISON TABLE */}
      <div className="glass-card overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                <th className="p-3.5">APMC Mandi Market</th>
                <th className="p-3.5 text-right">Current Price</th>
                <th className="p-3.5 text-right">Distance (km)</th>
                <th className="p-3.5 text-right">Freight Cost</th>
                <th className="p-3.5 text-right">Net Farmer Return</th>
                <th className="p-3.5 text-center">7-Day Trend</th>
                <th className="p-3.5 text-center">AI Recommendation Tag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
              {markets.map((market, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-slate-50 transition-colors ${market.isRecommended ? 'bg-emerald-50/70 font-bold' : ''}`}
                >
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <Store className={`w-4 h-4 ${market.isRecommended ? 'text-emerald-700' : 'text-slate-500'}`} />
                      <div>
                        <span className="font-extrabold text-slate-900 text-xs block">{market.name}</span>
                        <span className="text-[10px] text-slate-500">{market.district} District</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5 text-right font-black text-slate-900 text-sm">
                    ₹{market.price.toLocaleString('en-IN')}
                  </td>

                  <td className="p-3.5 text-right text-slate-700 font-bold">
                    {market.distanceKm} km
                  </td>

                  <td className="p-3.5 text-right text-slate-600">
                    ₹{market.transportCostPerQtl} / Qtl
                  </td>

                  <td className="p-3.5 text-right">
                    <span className={`px-2 py-1 rounded font-black text-sm ${market.isRecommended ? 'bg-emerald-200 text-emerald-950' : 'bg-slate-100 text-slate-900'}`}>
                      ₹{market.netReturn.toLocaleString('en-IN')}
                    </span>
                  </td>

                  <td className="p-3.5 text-center">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Bullish</span>
                    </span>
                  </td>

                  <td className="p-3.5 text-center">
                    {market.isRecommended ? (
                      <span className="bg-emerald-700 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-xs inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Best Opportunity</span>
                      </span>
                    ) : (
                      <span className="bg-slate-200 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded">
                        {market.badge || 'Alternative'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FREIGHT CALCULATION CRITERIA */}
      <div className="glass-card p-6 space-y-3">
        <h3 className="font-bold text-sm text-slate-900">How ShetMitra AI calculates the best market opportunity:</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">1. Crop Spot Price</span>
            <span className="font-extrabold text-slate-900">APMC Mandi Rate</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">2. Travel Distance</span>
            <span className="font-extrabold text-slate-900">GIS Road Distance</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">3. Freight Diesel Rate</span>
            <span className="font-extrabold text-slate-900">₹95 / Liter Freight</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase block">4. Transit Time & Spoilage</span>
            <span className="font-extrabold text-slate-900">Perishability Index</span>
          </div>
          <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-center space-y-1">
            <span className="text-[10px] font-black text-emerald-800 uppercase block">5. Net Farmer Margin</span>
            <span className="font-black text-emerald-950">Realized Profit</span>
          </div>
        </div>
      </div>

    </div>
  );
};
