export interface ApiBookData {
  authors: string[]
  contents: string
  thumbnail: string
  title: string
}

export interface BookData extends ApiBookData {
  id?: string
  quantity: number
  createdAt?: string
}

export interface FirestoreBookData extends BookData {
  [key: string]: unknown
}

// 책 등록과 수정 시 변경 가능한 데이터
export interface BookFormData {
  description: string
  quantity: number
  authors: string[]
}
