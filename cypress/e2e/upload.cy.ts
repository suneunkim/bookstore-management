describe('업로드 폼 모달', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // 1. 책 추가하기 버튼을 누르면 도서 검색 모달창 표시
  it('책 추가하기 버튼을 누르면 AddBookModal 모달의 input창이 보인다', () => {
    cy.get('[data-cy="add-book-button"]').click()
    cy.get('[data-cy="search-book-input"]').should('be.visible')
  })

  // 2. input에 검색어 입력하면 도서 검색 표시
  it('input에 검색어를 입력하면 테스트용 도서 검색 결과가 나온다.', () => {
    cy.get('[data-cy="add-book-button"]').click()

    // 검색 API 모킹하기
    cy.intercept('GET', 'https://dapi.kakao.com/v3/search/book*', {
      statusCode: 200,
      body: {
        documents: [
          {
            title: '테스트 도서',
            thumbnail:
              'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6333047%3Ftimestamp%3D20241109154425',
            authors: ['테스트 작가'],
            contents: '테스트의 본문입니다.',
          },
        ],
      },
    }).as('searchBooks')

    cy.get('[data-cy="search-book-input"]').type('테스트')
    cy.wait('@searchBooks') // 모킹된 응답이 돌아올 때까지 대기

    cy.get('[data-cy="search-results"] [data-cy="book-item"]').should('have.length', 1)
  })

  // 3. 판매 등록 버튼을 누르면 BookFormModal로 전환
  it('판매 등록 버튼을 누르면 업로드 폼인 BookFormModal로 전환된다.', () => {
    cy.get('[data-cy="add-book-button"]').click()

    cy.intercept('GET', 'https://dapi.kakao.com/v3/search/book*', {
      statusCode: 200,
      body: {
        documents: [
          {
            title: '테스트 도서',
            thumbnail:
              'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6333047%3Ftimestamp%3D20241109154425',
            authors: ['테스트 작가'],
            contents: '테스트의 본문입니다.',
          },
        ],
      },
    }).as('searchBooks')

    cy.get('[data-cy="search-book-input"]').type('테스트')
    cy.wait('@searchBooks') // 모킹된 응답이 돌아올 때까지 대기

    cy.get('[data-cy="sale-register-button"]').first().click()
    cy.get('[data-cy="book-upload-form"]').should('be.visible')
  })

  // 4. BookFormModal에서 등록하기 버튼을 누르면 등록
  it('폼 입력 후 등록에 성공한다.', () => {
    cy.get('[data-cy="add-book-button"]').click()

    // 검색 API 모킹하기
    cy.intercept('GET', 'https://dapi.kakao.com/v3/search/book*', {
      statusCode: 200,
      body: {
        documents: [
          {
            title: '테스트 도서',
            thumbnail:
              'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6333047%3Ftimestamp%3D20241109154425',
            authors: ['테스트 작가'],
            contents: '테스트의 본문입니다.',
          },
        ],
      },
    }).as('searchBooks')

    cy.get('[data-cy="search-book-input"]').type('테스트')
    cy.wait('@searchBooks')
    cy.get('[data-cy="sale-register-button"]').first().click()

    // BookForm이 렌더링
    cy.get('[data-cy="book-upload-form"]').should('be.visible')

    // 기존 값을 지우고 새로운 값 입력하기
    cy.get('[data-cy="book-quantity"]').clear().type('3')
    cy.get('[data-cy="book-description"]').type('테스트 도서 설명')
    cy.get('[data-cy="submit-button"]').click()

    // 등록 되었을 때 alert 확인하기
    cy.on('window:alert', (text) => {
      expect(text).to.equal('책이 등록되었습니다.')
    })

    // 모달이 닫히는 것 확인하기
    cy.get('[data-cy="book-upload-form"]').should('not.exist')
  })
})
