import React from 'react';

const defaultAccuracy = [
  { name: 'BERT Transformer', value: 94.2 },
  { name: 'XGBoost', value: 88.5 },
  { name: 'Random Forest', value: 82.1 },
  { name: 'Linear Regression', value: 72.3 },
];

const errorBars = [
  { label: 'BERT', height: 30 },
  { label: 'XGB', height: 55 },
  { label: 'R-FOREST', height: 72 },
  { label: 'LINEAR', height: 90 },
];

const ModelPerformance = ({ metricsData }) => {
  // Nếu có metricsData từ backend thì dùng, không thì dùng default
  const accuracyList = metricsData
    ? [
        { name: 'BERT Transformer', value: metricsData['BERT Transformer']?.accuracy ?? 94.2 },
        { name: 'XGBoost', value: metricsData['XGBoost']?.accuracy ?? 88.5 },
        { name: 'Random Forest', value: metricsData['Random Forest']?.accuracy ?? 82.1 },
        { name: 'Linear Regression', value: metricsData['Linear Regression']?.accuracy ?? 72.3 },
      ]
    : defaultAccuracy;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Accuracy Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Model Performance</p>
          <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Refresh</button>
        </div>
        <div className="space-y-4">
          {accuracyList.map(item => (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="font-bold">{item.value}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Metrics Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Error Metrics (MAE)</p>
        <div className="flex items-end justify-around h-24 mb-2">
          {errorBars.map(bar => (
            <div key={bar.label} className="flex flex-col items-center gap-1">
              <div
                className="w-8 rounded-t bg-gradient-to-t from-blue-300 to-blue-600"
                style={{ height: `${bar.height}px` }}
              ></div>
              <span className="text-xs font-semibold text-gray-500">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelPerformance;