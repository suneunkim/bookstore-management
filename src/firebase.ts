// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { BookData } from './type'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

export const addBook = async (book: any) => {
  try {
    await addDoc(collection(db, 'books'), book)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
