
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { Address, Package, Quote } from '../types';

// Fallback to localhost if environment variable is not set
const API_BASE = (window as any).process?.env?.VITE_SHIPPING_API_BASE_URL || 'http://localhost:8080';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject Firebase Token for enterprise security
client.interceptors.request.use(async (config) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // Auth might not be initialized yet, or no user logged in
    console.warn('Firebase Auth token injection skipped');
  }
  return config;
}, (error) => Promise.reject(error));

export const getRates = async (carrier: 'UPS' | 'DHL' | 'AUTO', shipper: Address, recipient: Address, packages: Package[]) => {
  const res = await client.post('/api/shipping/rates', { carrier, shipper, recipient, packages });
  return res.data.quotes as Quote[];
};

export const createShipment = async (payload: {
  carrier: 'UPS' | 'DHL';
  selected_service_code: string;
  shipper: Address;
  recipient: Address;
  packages: Package[];
  reference?: { order_id?: string };
}) => {
  const res = await client.post('/api/shipping/create-shipment', payload);
  return res.data;
};

export const trackShipment = async (carrier: string, tracking: string) => {
  const res = await client.get(`/api/shipping/track?carrier=${carrier}&tracking=${tracking}`);
  return res.data;
};
