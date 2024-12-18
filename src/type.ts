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
  [key: string]: any
}
