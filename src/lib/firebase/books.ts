import { BookData, FirestoreBookData } from '@/type'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  Query,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { db } from './config'

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

export const getBooks = async (
  searchQuery?: string,
  searchType?: 'title' | 'author'
): Promise<BookData[]> => {
  let booksQuery: Query

  // 검색어가 없는 경우 모든 책 최근 등록 순
  if (!searchQuery) {
    booksQuery = query(collection(db, 'books'), orderBy('createdAt', 'desc'))
  } else if (searchType === 'title') {
    booksQuery = query(
      collection(db, 'books'),
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + '\uf8ff'),
      orderBy('title')
    )
  } else {
    booksQuery = query(collection(db, 'books'), where('authors', 'array-contains', searchQuery))
  }

  const querySnapshot = await getDocs(booksQuery)

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

export const getBookById = async (id: string) => {
  try {
    const docRef = doc(db, 'books', id)
    const docSnapshot = await getDoc(docRef)

    if (!docSnapshot.exists()) {
      return null
    }

    const data = docSnapshot.data() as FirestoreBookData
    return {
      id: docSnapshot.id,
      quantity: data.quantity,
      authors: data.authors || [],
      contents: data.contents || '',
      title: data.title || '',
      thumbnail: data.thumbnail || '',
    }
  } catch (error) {
    console.error('Error fetching book', error)
    return null
  }
}
