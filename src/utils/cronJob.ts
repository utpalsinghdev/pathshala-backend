import axios from 'axios';



export default async function pingEndpoint() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/api/test/`);
    console.log('Ping successful:', response.data);
  } catch (error) {
    console.error('Ping failed:', error.message);
  }
}

// setInterval(pingEndpoint, 1 * 60 * 1000); 
