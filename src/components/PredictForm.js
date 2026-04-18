import React, { useState } from 'react';
import { predictStory } from '../api';

const models = ['BERT Transformer (Recommended)', 'XGBoost', 'Random Forest', 'Linear Regression'];

const PredictForm = ({
  storyText, setStoryText, selectedModel, setSelectedModel,
  onPredict, setLoading, setErrorMessage, loading, errorMessage
}) => {
  const [modelOpen, setModelOpen] = useState(false);

  const handlePredict = async () => {
    if (!storyText.trim()) return;
    setLoading(true);
    setErrorMessage('');
    try {
      const result = await predictStory(storyText, selectedModel);
      onPredict(result);
    } catch (err) {
      setErrorMessage(err.message);
      onPredict(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Predict New Story</h2>
        <div className="badge flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs font-semibold">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          AI ENGINE ACTIVE
        </div>
      </div>

      <label className="text-sm font-semibold text-gray-700 block mb-1">User Story Context</label>
      <textarea
        rows={5}
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-blue-400 outline-none"
        placeholder="Enter user story description, acceptance criteria, and technical constraints..."
        value={storyText}
        onChange={(e) => { setStoryText(e.target.value); onPredict(null); }}
      />

      <div className="mt-4">
        <label className="text-sm font-semibold text-gray-700 block mb-1">Predictive Model</label>
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <div
              onClick={() => setModelOpen(!modelOpen)}
              className="border border-gray-300 rounded-lg p-2.5 flex justify-between items-center cursor-pointer bg-white"
            >
              <span className="text-sm">{selectedModel}</span>
              <span className={`transform transition ${modelOpen ? 'rotate-180' : ''}`}>▾</span>
            </div>
            {modelOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
                {models.map(m => (
                  <div
                    key={m}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => { setSelectedModel(m); setModelOpen(false); }}
                  >{m}</div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handlePredict}
            disabled={loading || !storyText.trim()}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 disabled:bg-blue-300"
          >
            {loading ? <div className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <span>⟳</span>}
            Predict Story Point
          </button>
        </div>
        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      </div>

      <style>{`
        .badge { animation: none; }
        .spinner { animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default PredictForm;