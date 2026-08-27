import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Mic, 
  Map, 
  TrendingUp, 
  CloudSun, 
  BrainCircuit, 
  CheckCircle2, 
  Store, 
  Landmark,
  FlaskConical, 
  Cpu
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, language } = useApp();

  const navItems = [
    { id: 'command-center', icon: LayoutDashboard, labelEn: 'AI Command Center', labelMr: 'मुख्य नियंत्रण केंद्र', labelHi: 'कमांड सेंटर', badge: 'Main' },
    { id: 'voice-intel', icon: Mic, labelEn: 'Voice Intelligence', labelMr: 'आवाज संभाषण', labelHi: 'वॉयस इंटेलिजेंस', badge: 'STT' },
    { id: 'gis-map', icon: Map, labelEn: 'GIS Spatial Map', labelMr: 'जीआयएस नकाशा', labelHi: 'जीआईएस नक्शा', badge: 'GIS' },
    { id: 'price-intel', icon: TrendingUp, labelEn: 'Price Prediction Engine', labelMr: 'दर अंदाज इंजिन', labelHi: 'मूल्य पूर्वानुमान', badge: 'ML' },
    { id: 'climate-intel', icon: CloudSun, labelEn: 'Climate Risk Engine', labelMr: 'हवामान जोखीम', labelHi: 'मौसम जोखिम', badge: 'IMD' },
    { id: 'decision-engine', icon: BrainCircuit, labelEn: 'Unified AI Decision Engine', labelMr: 'एआय निर्णय इंजिन', labelHi: 'एआई निर्णय', badge: 'Core' },
    { id: 'recommendation', icon: CheckCircle2, labelEn: 'Farmer Recommendation', labelMr: 'शेतकरी सल्ला', labelHi: 'किसान सलाह', badge: 'Result', highlight: true },
    { id: 'market-comparison', icon: Store, labelEn: 'Market Matrix', labelMr: 'मंडई तुलना', labelHi: 'मंडी तुलना', badge: 'APMC' },
    { id: 'govt-schemes', icon: Landmark, labelEn: 'Government Schemes', labelMr: 'शासकीय योजना', labelHi: 'सरकारी योजनाएं', badge: 'Subsidies' },
    { id: 'proof-of-concept', icon: FlaskConical, labelEn: 'Proof of Concept (ML)', labelMr: 'मॉडेल तपासणी (PoC)', labelHi: 'प्रूफ ऑफ कांसेप्ट', badge: 'Metrics' },
    { id: 'technical-arch', icon: Cpu, labelEn: 'Technical Architecture', labelMr: 'सिस्टम आर्किटेक्चर', labelHi: 'तकनीकी वास्तुकला', badge: 'Arch' }
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 p-4 flex flex-col justify-between shrink-0 rounded-2xl shadow-xl border border-slate-800">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-emerald-400/90 flex items-center justify-between">
          <span>{language === 'mr' ? 'नेव्हिगेशन मेनू' : 'Navigation Menu'}</span>
          <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded text-[9px]">11 Modules</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const label = language === 'mr' ? item.labelMr : language === 'hi' ? item.labelHi : item.labelEn;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-900/40 translate-x-1' 
                    : item.highlight
                    ? 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/80 border border-emerald-800/60'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="truncate">{label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : item.highlight 
                      ? 'bg-emerald-500 text-emerald-950 font-black'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Card */}
      <div className="mt-6 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-400 text-[11px] space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-200">
          <span>Engine Status</span>
          <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Online
          </span>
        </div>
        <p className="text-[10px] text-slate-400 leading-tight">
          Combining Agmarknet Mandi Feeds + IMD Weather Radar + MahaDBT Schemes.
        </p>
      </div>
    </aside>
  );
};
