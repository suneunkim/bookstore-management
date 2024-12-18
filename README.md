# 온라인 서점 프로젝트

## 🚀 프로젝트 소개
온라인 서점의 도서 관리 시스템입니다. Next.js App Router와 Firebase를 활용하여 도서 검색, 등록, 수정, 삭제 기능을 구현했습니다.

## 실행 방법

1. 저장소 클론
```
git clone https://github.com/suneunkim/bookstore-management.git
```

2. 종속성 설치
```
npm install
```

3. 환경 변수 설정 .env.local 파일을 생성하고 다음 값들을 설정
```
NEXT_PUBLIC_KAKAO_REST_API_KEY = 4f76f326de4d62ce94ac668c7703610f
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyBnS2JJR31bkj2K_wQ6UQ9rAyfgq44STNk
```

4. 개발 서버 실행

```
npm run dev
```

## Cypress 테스트 실행 방법  (feat/jest-unit-tests 브랜치)

1. 원격의 테스트 브랜치를 로컬로 가져오기
```
git fetch origin feat/jest-unit-tests
```

테스트 브랜치로 전환
```
git checkout feat/jest-unit-tests
```

2. 종속성 설치
```
npm install
```

3. 개발 서버 실행

```
npm run dev
```

4. 테스트 실행
```
npm test
```

Cypress 창이 뜨면 E2E Testing 선택 후 Chrome으로 Start E2E Testing in Chrome!



## 📌 주요 기술 스택
- **Frontend**: Next.js 15 (App Router)
- **Backend/Database**: Firebase
- **Testing**: Cypress
- **Styling**: Tailwind CSS

### 기술 스택 선정 이유
- **Next.js**: SEO 최적화가 중요한 온라인 서점의 특성을 고려하여 선택
- **Firebase**: 신속한 개발과 안정적인 데이터 관리를 위해 채택
- **Cypress**: E2E 테스트를 통한 사용자 시나리오 검증

## 🔍 주요 기능
### 1. 도서 목록 페이지
- 페이지네이션 (한 페이지당 10개 도서)
- 제목/저자 기반 도서 검색
- URL 쿼리 파라미터를 활용한 검색 상태 관리

### 2. 도서 등록
- 카카오 도서 API 연동
- 실시간 도서 검색
- 도서 정보 자동 불러오기

### 3. 도서 상세/수정/삭제
- 상세 정보 표시
- 수량 및 도서 설명 수정
- 삭제 기능

## 💡 성능 최적화
- 서버 컴포넌트 활용으로 초기 로딩 최적화
- 검색 디바운싱 구현
- Next.js의 동적 라우팅 활용

## 🔒 코드 구조 및 설계

```
src/
├── app/
│   ├── books/[id]/         # 도서 상세 페이지 관련
│   │   ├── edit/          # 도서 수정 페이지
│   │   └── page.tsx       # 상세 정보 표시
│   ├── actions.ts         # 서버 액션
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/
│   ├── home/             # 홈 관련 컴포넌트
│   │   ├── book/        # 도서 관련 컴포넌트
│   │   │   ├── BookForm.tsx      # 도서 폼
│   │   │   ├── BookItem.tsx      # 도서 아이템
│   │   │   ├── BookList.tsx      # 도서 목록
│   │   │   └── DeleteBookButton.tsx  # 삭제 버튼
│   │   ├── modal/       # 모달 컴포넌트
│   │   │   ├── AddBookModal.tsx    # 도서 추가 모달
│   │   │   ├── BookFormModal.tsx   # 도서 폼 모달
│   │   │   └── ModalContainer.tsx  # 모달 컨테이너
│   │   └── BookAddSection.tsx    # 도서 추가 섹션
│   └── Header.tsx        # 헤더 컴포넌트
├── lib/
│   └── firebase/        # Firebase 관련
│       ├── books.ts     # 도서 CRUD 함수
│       └── config.ts    # Firebase 설정
└── utils/              # 유틸리티 함수
└── type.ts         # 타입 정의
```

#### `app/`
- Next.js App Router 구조 기반의 페이지 구성
- 도서 상세/수정 페이지는 동적 라우팅(`[id]`)으로 구현
- 서버 액션은 `actions.ts`에서 중앙 관리

#### `components/`
- **home/**: 메인 페이지 관련 컴포넌트
  - **book/**: 도서 관련 재사용 컴포넌트
  - **modal/**: 모달 관련 컴포넌트
- 컴포넌트 계층 구조를 통한 관심사 분리
  
#### `lib/`
- Firebase 관련 설정 및 CRUD 함수 분리
- 데이터베이스 로직 모듈화
  
#### `utils/`
- 타입 정의 및 유틸리티 함수

### 설계 원칙
- 컴포넌트 단위의 모듈화로 재사용성 확보
- 관심사 분리를 통한 유지보수성 향상
- 서버/클라이언트 컴포넌트 적절한 분리


## 📚 주요 기능 구현 상세
### 1. 도서 목록 및 페이지네이션
#### 데이터 페칭
- 서버 컴포넌트에서 Firebase 쿼리를 통한 도서 목록 조회
- 검색 조건에 따른 동적 쿼리 구성

```typescript
// Firebase 쿼리 구성
export const getBooks = async (searchQuery?: string, searchType?: 'title' | 'author') => {
  let booksQuery: Query
  
  if (!searchQuery) {
    // 기본: 최근 등록순 정렬
    booksQuery = query(collection(db, 'books'), orderBy('createdAt', 'desc'))
  } else if (searchType === 'title') {
    // 제목 검색: Firebase의 범위 쿼리 활용
    booksQuery = query(
      collection(db, 'books'),
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + '\uf8ff'),
      orderBy('title')
    )
  } else {
    // 저자 검색: 배열 포함 여부 확인
    booksQuery = query(collection(db, 'books'), 
      where('authors', 'array-contains', searchQuery))
  }
}
```

#### 클라이언트 사이드 페이지네이션

- 한 페이지당 10개 도서 표시
- useMemo를 활용한 페이지네이션 데이터 최적화
- 동적 페이지 범위 계산으로 UX 개선(마지막 페이지가 5를 넘어도 페이지네이션으로는 5까지 보이고 다음 버튼 이동 활성화)

```jsx
const BookList = ({ books }: { books: BookData[] }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const PAGES_PER_VIEW = 5 // 한 번에 표시할 페이지 번호 수

  // 현재 페이지의 도서 목록 계산 (메모이제이션)
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return books.slice(startIndex, startIndex + pageSize)
  }, [books, currentPage])
}
```

페이지 범위 계산 로직

사용자 경험을 고려한 페이지 번호 표시 제한
이전/다음 버튼을 통한 페이지 그룹 이동

```jsx
const calculatePageRange = (currentPage: number, totalPage: number, PAGES_PER_VIEW: number) => {
  const currentGroup = Math.ceil(currentPage / PAGES_PER_VIEW)
  const startPage = (currentGroup - 1) * PAGES_PER_VIEW + 1
  let endPage = startPage + PAGES_PER_VIEW - 1
  
  // 전체 페이지 수를 초과하지 않도록 조정
  if (endPage > totalPage) {
    endPage = totalPage
  }

  return { startPage, endPage }
}
```

#### 구현 특징

- 서버-클라이언트 분리: 데이터 페칭은 서버 컴포넌트에서, 페이지네이션 UI는 클라이언트 컴포넌트에서 처리
- 성능 최적화: useMemo를 통한 불필요한 재계산 방지
- 직관적인 UI:
  - 한 번에 5개의 페이지 번호만 표시
  - 현재 페이지 하이라이트
  - 이전/다음 버튼으로 페이지 그룹 간 이동

### 2. 도서 등록 프로세스
#### 모달 기반의 단계별 등록 시스템
- 두 단계의 모달을 통한 직관적인 등록 프로세스 구현
- 상태 관리를 통한 모달 전환 및 데이터 흐름 제어

```typescript
const BookAddSection = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<ApiBookData | null>(null)

  const handleSaleButton = useCallback((book: ApiBookData) => {
    setSelectedBook(book)
    setIsSearchModalOpen(false)
    setIsFormModalOpen(true)
  }, [])
  
  // ... 모달 컴포넌트 렌더링
}

#### 카카오 도서 API 연동
- 실시간 도서 검색 구현
- 디바운싱을 통한 API 호출 최적화
```jsx
useEffect(() => {
  const timerId = setTimeout(() => {
    const searchBooks = async () => {
      if (query?.length > 0) {
        const response = await fetch(
          `https://dapi.kakao.com/v3/search/book?query=${query}`,
          {
            headers: {
              Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
            },
          }
        )
        // ... 데이터 처리
      }
    }
    searchBooks()
  }, 500)  // 500ms 디바운싱

  return () => clearTimeout(timerId)
}, [query])
```

#### 재사용 가능한 도서 폼 컴포넌트

- 등록과 수정에서 공통으로 사용되는 폼 컴포넌트
- Props를 통한 유연한 동작 설정
  - onSubmit: 상위 컴포넌트에서 결정되는 제출 동작
  - book: API 또는 DB의 도서 데이터
  - text: 상황에 맞는 버튼 텍스트

```jsx
interface BookFormProps {
  onSubmit: (formData: BookFormData) => Promise<void>
  book: ApiBookData | BookData
  text: string
}

const BookForm = ({ onSubmit, book, text }: BookFormProps) => {
  // 폼 상태 관리
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // 초기값 설정
    if (book) {
      setDescription(book.contents)
      setQuantity('quantity' in book ? book.quantity : 1)
    }
  }, [book])
  
  // ... 폼 렌더링
}
```

#### 구현 특징

- 단계적 UI: 검색 → 상세 정보 입력의 명확한 플로우
- 재사용성: BookForm 컴포넌트의 추상화로 등록/수정 기능에서 재사용
- 에러 처리:
  - API 호출 실패 대응
  - 유효성 검사 (수량 최소값 설정 등)

- 최적화:
  - 검색 API 호출 디바운싱
  - useCallback을 통한 콜백 함수 메모이제이션


### 3. 도서 상세 및 수정/삭제 기능
#### 동적 라우팅을 활용한 상세 페이지
- Next.js의 동적 라우팅(`[id]`)을 활용한 개별 도서 페이지
- 서버/클라이언트 컴포넌트의 적절한 활용

```typescript
// app/books/[id]/page.tsx (서버 컴포넌트)
const DetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
 const { id } = await params
 const book = await getBookById(id)
 // ... 렌더링
}

// Firebase 상세 조회
export const getBookById = async (id: string) => {
 const docRef = doc(db, 'books', id)
 const docSnapshot = await getDoc(docRef)
 // ... 데이터 처리
}
```

#### 도서 정보 수정 페이지

- 클라이언트 사이드 라우팅과 상태 관리
- 재사용 가능한 BookForm 컴포넌트 활용
- 로딩/에러 상태 처리

```jsx
const EditPage = () => {
  const { id } = useParams<{ id: string }>()
  const [book, setBook] = useState<BookData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true)
      try {
        const fetchedBook = await getBookById(id)
        setBook(fetchedBook)
      } catch (error) {
        setErrorMessage('책 정보를 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const handleSubmit = async (formData: BookFormData) => {
    const result = await updateBook(id, {
      contents: formData.description,
      quantity: formData.quantity,
    })
    // ... 결과 처리
  }
}
```
#### 구현 특징

- 서버/클라이언트 컴포넌트 분리:
  - 상세 페이지: 서버 컴포넌트로 구현하여 초기 로딩 최적화
  - 수정 페이지: 클라이언트 컴포넌트로 구현하여 상태 관리 용이


- 에러 처리 및 사용자 피드백:
  - 로딩 상태 표시
  - 에러 메시지 표시
  - 수정 성공/실패 알림


- 코드 재사용:
  - BookForm 컴포넌트를 등록/수정에서 공통으로 사용
  - Firebase 관련 함수들을 별도 모듈로 분리


- 라우팅 처리:
  - 서버 컴포넌트: params를 통한 라우트 파라미터 접근
  - 클라이언트 컴포넌트: useParams 훅을 통한 라우트 파라미터 접근
 
## 🧪 테스트
### Cypress E2E 테스트 구현 (`feat/jest-unit-tests` 브랜치)
도서 등록 플로우에 대한 엔드투엔드 테스트를 구현했습니다.

#### 테스트 시나리오
1. 도서 검색 모달 열기
2. 도서 API 검색 결과 표시
3. 등록 폼 모달 전환
4. 도서 정보 입력 및 등록

```typescript
describe('업로드 폼 모달', () => {
 it('책 추가하기 버튼을 누르면 AddBookModal 모달의 input창이 보인다', () => {
   cy.get('[data-cy="add-book-button"]').click()
   cy.get('[data-cy="search-book-input"]').should('be.visible')
 })

 it('input에 검색어를 입력하면 테스트용 도서 검색 결과가 나온다.', () => {
   // 카카오 도서 API 모킹
   cy.intercept('GET', 'https://dapi.kakao.com/v3/search/book*', {
     statusCode: 200,
     body: {
       documents: [/* ... */]
     }
   }).as('searchBooks')

   // 검색 및 결과 확인
   cy.get('[data-cy="search-book-input"]').type('테스트')
   cy.wait('@searchBooks')
   cy.get('[data-cy="search-results"] [data-cy="book-item"]')
     .should('have.length', 1)
 })
})
```
