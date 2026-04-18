import React, { useState, useRef } from 'react';
import { batchPredict } from '../api';

const BatchProcessSection = ({ selectedModel }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [batchResults, setBatchResults] = useState([
    { story: 'As a user, I want to reset my password...', points: 5, confidence: '98.2%' },
    { story: 'Implement multi-factor authentication...', points: 8, confidence: '89.5%' },
    { story: 'Fix typo in the privacy policy footer...', points: 1, confidence: '99.9%' },
  ]);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.name.endsWith('.csv')) return;
    setUploading(true);
    try {
      const results = await batchPredict(file, selectedModel);
      setBatchResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onFileSelect = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Batch Processing</h2>
        <span className="text-blue-600 text-sm font-semibold cursor-pointer">↓ Sample CSV</span>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
          dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input type="file" ref={fileInputRef} accept=".csv" className="hidden" onChange={onFileSelect} />
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
          <span className="text-xl">{uploading ? '⏳' : '☁'}</span>
        </div>
        <p className="font-semibold text-gray-700">{uploading ? 'Uploading...' : 'Drag & drop CSV files'}</p>
        <p className="text-sm text-gray-400 mt-1">{uploading ? 'Processing predictions...' : 'or click to browse from your computer'}</p>
      </div>

      {/* Batch Results Table */}
      <div className="mt-5">
        <div className="grid grid-cols-[1fr_120px_100px] text-xs font-bold text-gray-400 uppercase border-b pb-2 mb-1">
          <span>User Story Reference</span>
          <span>Prediction</span>
          <span className="text-right">Confidence</span>
        </div>
        {batchResults.map((r, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_120px_100px] py-3 border-b border-gray-100 items-center">
            <span className="text-sm text-gray-700">{r.story}</span>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded w-fit">{r.points} {r.points === 1 ? 'Point' : 'Points'}</span>
            <span className="text-right text-gray-500 text-sm font-mono">{r.confidence}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BatchProcessSection;