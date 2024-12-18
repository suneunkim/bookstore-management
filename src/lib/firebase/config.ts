// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'bookstore-c017f.firebaseapp.com',
  projectId: 'bookstore-c017f',
  storageBucket: 'bookstore-c017f.firebasestorage.app',
  messagingSenderId: '787837980022',
  appId: '1:787837980022:web:c718952471669d20813e57',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }
