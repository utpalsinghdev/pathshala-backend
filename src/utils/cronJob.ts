import axios from 'axios';



const apiUrl = process.env.BASE_URL + '/api/test';

const api = axios.create({ baseURL: apiUrl });

export default async function pingEndpoint() {
  try {
    const response = await api.get('');
    console.log('Ping successful:', response.data);
  } catch (error) {
    console.error('Ping failed:', error.message);
  }
}


// setInterval(pingEndpoint, 1 * 60 * 1000); 
