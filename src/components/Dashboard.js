import React, { useState, useEffect } from 'react';
import PredictForm from './PredictForm';
import ModelPerformance from './ModelPerformance';
import BatchProcessSection from './BatchProcessSection';
import PredictionResultCard from './PredictionResultCard';
import InsightSummary from './InsightSummary';
import ExploreTrainingCard from './ExploreTrainingCard';
import { fetchMetrics } from '../api';

const Dashboard = () => {
  const [storyText, setStoryText] = useState('');
  const [selectedModel, setSelectedModel] = useState('BERT Transformer (Recommended)');
  const [prediction, setPrediction] = useState(null);
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadMetrics();
  }, []);

const loadMetrics = async () => {
    const data = await fetchMetrics();
    if (data && data.metrics) setMetricsData(data.metrics);
};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
      <div className="space-y-5">
        <PredictForm
          storyText={storyText}
          setStoryText={setStoryText}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          onPredict={setPrediction}
          setLoading={setLoading}
          setErrorMessage={setErrorMessage}
          loading={loading}
          errorMessage={errorMessage}
        />
        <ModelPerformance metricsData={metricsData} />
        <BatchProcessSection selectedModel={selectedModel} />
      </div>
      <div className="space-y-4">
        <PredictionResultCard prediction={prediction} />
        <InsightSummary />
        <ExploreTrainingCard />
      </div>
    </div>
  );
};

export default Dashboard;