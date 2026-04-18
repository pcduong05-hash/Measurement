import axios from 'axios';

const API_BASE = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' }
});

export const predictStory = async (userStory, model) => {
    try {
        const response = await api.post('/predict', { user_story: userStory, model });
        return response.data;
    } catch (error) {
        console.error('Predict error:', error);
        throw new Error(error.response?.data?.error || 'Prediction failed');
    }
};

export const batchPredict = async (file, model) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', model);
    try {
        const response = await axios.post(`${API_BASE}/batch_predict`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.results;
    } catch (error) {
        console.error('Batch error:', error);
        throw new Error(error.response?.data?.error || 'Batch prediction failed');
    }
};

export const fetchMetrics = async () => {
    try {
        const response = await api.get('/metrics');
        return response.data;
    } catch (error) {
        console.error('Metrics error:', error);
        return { metrics: null };
    }
};