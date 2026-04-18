import React from 'react';

const ExploreTrainingCard = () => (
  <div className="relative bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-6 overflow-hidden cursor-pointer min-h-[130px]">
    <div className="absolute -top-5 -right-5 w-32 h-32 rounded-full bg-cyan-400/20"></div>
    <div className="absolute -bottom-3 left-5 w-20 h-20 rounded-full bg-indigo-500/20"></div>
    <div className="relative">
      <p className="text-white font-bold text-base">Explore Model Training</p>
      <p className="text-white/60 text-sm">Deep dive into our latest dataset updates.</p>
    </div>
  </div>
);

export default ExploreTrainingCard;