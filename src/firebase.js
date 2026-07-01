import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBTn_ulQ2wgD_Y4tOyeHyd9oFx0ZZk5hNk",
  authDomain: "rom-text-appeal.firebaseapp.com",
  projectId: "rom-text-appeal",
  storageBucket: "rom-text-appeal.firebasestorage.app",
  messagingSenderId: "568837972025",
  appId: "1:568837972025:web:ca9617719b69643a0b6de8",
  measurementId: "G-DVG9FLVRN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;