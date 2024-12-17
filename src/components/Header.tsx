const Header = () => {
  return (
    <div className='flex gap-10'>
      <div>BookStore Management</div>
      <div className='flex gap-4'>
        <div>제목 검색</div>
        <input placeholder='검색어를 입력해주세요' />
      </div>
    </div>
  )
}

export default Header
