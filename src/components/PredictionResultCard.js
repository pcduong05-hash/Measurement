import React from 'react';

const PredictionResultCard = ({ prediction }) => {
  const points = prediction?.story_points ?? '—';
  const modelUsed = prediction?.model_used ?? '—';
  const confidence = prediction ? `${prediction.confidence}%` : '—';
  const widthPercent = prediction ? parseFloat(prediction.confidence) : 0;

  return (
    <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl text-white p-6 shadow-lg">
      <p className="text-xs tracking-wider opacity-70 uppercase mb-3">Prediction Result</p>
      <p className="text-7xl font-extrabold text-center tracking-tighter">{points}</p>
      <p className="text-center text-sm font-medium opacity-80 mt-1">Story Points</p>
      <div className="border-t border-white/20 mt-5 pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="opacity-70">Model Used</span>
          <span className="font-semibold">{modelUsed}</span>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="opacity-70">Confidence Score</span>
            <span className="font-semibold">{confidence}</span>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: widthPercent }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultCard;