
import { GoogleGenAI } from "@google/genai";
import axios from 'axios';
import { getAuth } from 'firebase/auth';

// --- Gemini AI Client Singleton ---
// Initialize once and export the instance.
// This ensures a single, shared client across the application.
const aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
export const getAiClient = () => aiClient;


// --- Shipping API Client Singleton ---
// In a production environment, this URL should be set via environment variables.
// We provide a fallback here to prevent application crashes during development or in sandboxed environments.
const FALLBACK_SHIPPING_API_URL = 'https://mock-shipping-api.example.com';
const API_BASE = (window as any).process?.env?.VITE_SHIPPING_API_BASE_URL || FALLBACK_SHIPPING_API_URL;

if (API_BASE === FALLBACK_SHIPPING_API_URL) {
  console.warn("ARCHITECTURAL WARNING: VITE_SHIPPING_API_BASE_URL is not defined. Shipping functionality will use a fallback URL and will not connect to a live backend.");
}

const shippingHttpClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject Firebase Auth Token for enterprise security
shippingHttpClient.interceptors.request.use(async (config) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // Auth might not be initialized yet, or no user is logged in.
    console.warn('Firebase Auth token injection was skipped. This is normal if the user is not authenticated.');
  }
  return config;
}, (error) => Promise.reject(error));

export { shippingHttpClient };
