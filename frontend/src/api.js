import axios from 'axios';

const API_BASE_URL = "/api";

export const checkHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

export const predictDisease = async (symptoms) => {
    try {
        const response = await axios.post(`${API_URL}/predict`, { symptoms });
        return response.data;
    } catch (error) {
        console.error("Prediction Error:", error);
        return null;
    }
}
