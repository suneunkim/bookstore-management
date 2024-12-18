const calculatePageRange = (currentPage: number, totalPage: number, PAGES_PER_VIEW: number) => {
  // 현재 페이지가 속한 그룹 번호. ex)1부터 5, 6부터 10
  const currentGroup = Math.ceil(currentPage / PAGES_PER_VIEW)

  let startPage = (currentGroup - 1) * PAGES_PER_VIEW + 1
  let endPage = startPage + PAGES_PER_VIEW - 1

  // endPage가 totalPages를 넘지 않도록 조정
  if (endPage > totalPage) {
    endPage = totalPage
  }

  return { startPage, endPage }
}

export default calculatePageRange
