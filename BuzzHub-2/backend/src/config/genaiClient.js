// // src/config/genaiClient.js
// import axios from 'axios';

// const genAI = axios.create({
//   baseURL: 'https://generativelanguage.googleapis.com/v1beta/models',
//   headers: {
//     'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
//     'Content-Type': 'application/json',
//   },
// });

// export default genAI;

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default genAI;

