// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { BookData, FirestoreBookData } from './type'
import { revalidatePath } from 'next/cache'
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

// 책 DB 등록, 조회, 수정, 삭제
export const addBook = async (book: any) => {
  try {
    await addDoc(collection(db, 'books'), {
      ...book,
      createdAt: serverTimestamp(), // 페이지네이션을 위해 정렬할 기준으로 추가
    })
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export const getBooks = async (): Promise<BookData[]> => {
  const querySnapshot = await getDocs(query(collection(db, 'books'), orderBy('createdAt', 'desc')))

  return querySnapshot.docs.map((doc) => {
    const data = doc.data() as FirestoreBookData

    return {
      id: doc.id,
      quantity: data.quantity,
      authors: data.authors || [],
      contents: data.contents || '',
      title: data.title || '',
      thumbnail: data.thumbnail || '',
    }
  })
}
