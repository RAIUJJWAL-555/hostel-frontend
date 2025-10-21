// src/apiConfig.js

// This file intelligently determines which backend URL to use.

// 1. Get the base URL from the environment variables.
//    - When you run `npm run dev`, Vite uses your local .env file.
//    - When Netlify builds your site, it uses the variables you set in the dashboard.
const API_BASE_URL = import.meta.env.VITE_API_URL;

// 2. Create the full API endpoint URL.
export const API_URL = `${API_BASE_URL}/api`;

// Now, in any other file, you can simply import this API_URL.
// For example:
// import { API_URL } from './apiConfig.js';
// const response = await fetch(`${API_URL}/student/login`, ...);
