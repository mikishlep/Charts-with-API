import axios from 'axios';
//import dotenv from 'dotenv';
//dotenv.config();

const apiClient = axios.create({
    baseURL: 'http://109.73.206.144:6969/api'
});

const key = import.meta.env.VITE_API_KEY;


export async function fetchData(endpoint, params = {}) {
    try {
      const fullParams = { ...params, key };
      const { data } = await apiClient.get(endpoint, { params: fullParams });
      return data;
    } catch (error) {
      console.error(`Ошибка запроса ${endpoint}:`, error.message || error);
      throw error;
    }
}

export default fetchData;