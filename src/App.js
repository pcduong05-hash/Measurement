import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import BatchProcessSection from './components/BatchProcessSection';
import ModelMetrics from './components/ModelMetrics';
import History from './components/History';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 h-[60px] sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-sm">◎</div>
          <span className="font-bold text-gray-900">StoryPoint AI</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Tabs */}
          <div className="flex gap-6">
            {['dashboard', 'batch', 'metrics', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              >
                {tab === 'dashboard' && 'Dashboard'}
                {tab === 'batch' && 'Batch Process'}
                {tab === 'metrics' && 'Model Metrics'}
                {tab === 'history' && 'History'}
              </button>
            ))}
          </div>
          {/* Icons & Avatar */}
          <div className="relative">
            <span className="text-2xl cursor-pointer text-gray-500">🔔</span>
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">1</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer">JD</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'batch' && <BatchProcessSection selectedModel="BERT Transformer (Recommended)" />}
        {activeTab === 'metrics' && <ModelMetrics />}
        {activeTab === 'history' && <History />}
      </main>

      <style>{`
        .nav-link {
          cursor: pointer;
          padding: 6px 4px;
          font-size: 14px;
          font-weight: 500;
          color: #64748b;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }
        .nav-link:hover { color: #0f172a; }
        .nav-link.active { color: #2563eb; border-bottom-color: #2563eb; }
      `}</style>
    </div>
  );
};

export default App;