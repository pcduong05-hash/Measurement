import React, { useState, useEffect } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Giả lập lịch sử từ localStorage hoặc API
    const saved = localStorage.getItem('predictionHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    } else {
      // Dữ liệu mẫu
      setHistory([
        { id: 1, story: 'As a user, I want to reset my password', points: 5, confidence: 98.2, timestamp: '2025-04-17 10:30' },
        { id: 2, story: 'Implement multi-factor authentication', points: 8, confidence: 89.5, timestamp: '2025-04-17 11:15' },
      ]);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Prediction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">User Story</th>
              <th className="text-left p-2">Story Point</th>
              <th className="text-left p-2">Confidence</th>
              <th className="text-left p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.story}</td>
                <td className="p-2 font-semibold">{item.points}</td>
                <td className="p-2">{item.confidence}%</td>
                <td className="p-2 text-gray-500">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;