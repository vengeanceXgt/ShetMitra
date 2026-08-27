import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GOVT_SCHEMES } from '../../data/mockData';
import { Landmark, FileText, CheckCircle2, ExternalLink, Sparkles, Filter, ShieldCheck, Download, Search } from 'lucide-react';

export const GovernmentSchemes = () => {
  const { selectedCrop, language, speakText } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeForDocs, setSelectedSchemeForDocs] = useState(null);

  const categories = ['All', 'Price Stabilization & Freight', 'Solar & Irrigation', 'Crop Insurance', 'Cold Storage & Infrastructure'];

  const filteredSchemes = GOVT_SCHEMES.filter(scheme => {
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      scheme.titleMr.toLowerCase().includes(searchQuery.toLowerCase()) || 
      scheme.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">📜 शासकीय योजना व कृषी अनुदाने (Government Schemes & Subsidies)</h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">MahaDBT + MoFPI</span>
          </div>
          <p className="text-xs text-slate-500">
            {language === 'mr' 
              ? 'तुमच्या पिकासाठी उपलब्ध असणाऱ्या शासकीय योजना, वाहतूक सबसिडी आणि पीक विमा' 
              : 'Direct Government Subsidies, Freight Grants, Solar Pumps, and Crop Insurance'}
          </p>
        </div>

        <button
          onClick={() => {
            const text = language === 'mr' 
              ? "टोमॅटो आणि फलोत्पादनासाठी ऑपरेशन ग्रीन्स योजनेअंतर्गत ५० टक्के वाहतूक अनुदान उपलब्ध आहे." 
              : "50 percent freight subsidy available under Operation Greens scheme for tomatoes.";
            speakText(text);
          }}
          className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>🎙️ योजनांचा आवाज ऐका</span>
        </button>
      </div>

      {/* AI ELIGIBILITY RECOMMENDED BANNER FOR SELECTED CROP */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white space-y-3 shadow-lg border border-emerald-700/60 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 px-3 py-1 rounded-full text-xs font-bold border border-emerald-600/50">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Scheme Recommendation for {selectedCrop.icon} {selectedCrop.nameEn} ({selectedCrop.nameMr})</span>
          </div>
          <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-2 py-0.5 rounded uppercase">100% Eligible</span>
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-black text-white">
            🏆 ऑपरेशन ग्रीन्स योजना (५०% मालवाहतूक अनुदान)
          </h3>
          <p className="text-xs text-emerald-100 max-w-2xl leading-relaxed">
            {language === 'mr' 
              ? 'टोमॅटो पिकाची इतर राज्यातील मंडईत (उदा. मुंबई वाशी किंवा दिल्ली) वाहतूक करण्यासाठी ५०% भाडे अनुदान थेट खात्यात जमा केले जाते.'
              : 'Avail 50% freight subsidy on transporting tomato harvest to inter-state mandis under Central Operation Greens scheme.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold">
          <span className="bg-white/10 px-2.5 py-1 rounded-md text-emerald-200 border border-white/10">
            अनुदान: 50% Freight & Storage
          </span>
          <span className="bg-white/10 px-2.5 py-1 rounded-md text-emerald-200 border border-white/10">
            नोडल पोर्टल: MoFPI Sampada / MahaDBT
          </span>
        </div>
      </div>

      {/* SEARCH AND CATEGORY FILTERS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'mr' ? 'योजना शोधा...' : 'Search government schemes...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden md:inline" />
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-emerald-700 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* SCHEMES LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => {
          const title = language === 'mr' ? scheme.titleMr : language === 'hi' ? scheme.titleHi : scheme.titleEn;
          const description = language === 'mr' ? scheme.descriptionMr : scheme.descriptionEn;
          const eligibility = language === 'mr' ? scheme.eligibilityMr : scheme.eligibilityEn;
          const docs = language === 'mr' ? scheme.documentsMr : scheme.documentsEn;

          return (
            <div 
              key={scheme.id}
              className="glass-card p-6 flex flex-col justify-between space-y-4 border border-slate-200 hover:border-emerald-400 transition-all hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-emerald-700 shrink-0" />
                    <h3 className="font-extrabold text-slate-900 text-sm leading-tight group-hover:text-emerald-950">
                      {title}
                    </h3>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                    {scheme.status}
                  </span>
                </div>

                <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-950 font-black text-xs px-3 py-1 rounded-lg">
                  {scheme.subsidyAmount}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {description}
                </p>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 block">पात्रता (Eligibility):</span>
                  <p className="text-[11px] text-slate-500 font-medium">{eligibility}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => setSelectedSchemeForDocs(scheme)}
                  className="text-emerald-800 hover:text-emerald-950 font-extrabold flex items-center gap-1 hover:underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>आवश्यक कागदपत्रे ({docs.length})</span>
                </button>

                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                >
                  <span>अर्ज करा</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* REQUIRED DOCUMENTS MODAL DIALOG */}
      {selectedSchemeForDocs && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>आवश्यक कागदपत्रे (Required Documents)</span>
              </h3>
              <button 
                onClick={() => setSelectedSchemeForDocs(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">
              <strong>{language === 'mr' ? selectedSchemeForDocs.titleMr : selectedSchemeForDocs.titleEn}</strong> अंतर्गत अर्जासाठी लागणारे मुख्य दस्तऐवज:
            </p>

            <div className="space-y-2">
              {(language === 'mr' ? selectedSchemeForDocs.documentsMr : selectedSchemeForDocs.documentsEn).map((doc, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedSchemeForDocs(null)}
                className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                समजले (Close)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
