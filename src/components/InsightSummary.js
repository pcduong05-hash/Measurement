import React from 'react';

const InsightSummary = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
    <h3 className="font-bold text-base">Insight Summary</h3>
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex gap-2">
        <span>🔴</span>
        <div>
          <p className="font-semibold text-sm">Complexity Detected</p>
          <p className="text-xs text-gray-500">This story involves legacy database changes, which typically increases estimated effort by 40%.</p>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex gap-2">
        <span>👥</span>
        <div>
          <p className="font-semibold text-sm">Team Benchmark</p>
          <p className="text-xs text-gray-500">Similar stories were estimated at 8 points by the team, but took an average of 14 points to complete.</p>
        </div>
      </div>
    </div>
  </div>
);

export default InsightSummary;