interface Props {
  children: React.ReactNode
  onClick: () => void
  modal: 'add' | 'form'
}

const ModalContainer = ({ children, onClick, modal }: Props) => {
  return (
    <div className='fixed inset-0 z-20 bg-black/20 flex justify-center items-center'>
      <section className='relative flex flex-col gap-5 bg-white rounded-lg p-4 w-[90%] max-w-[700px] h-[90%]'>
        <p className='text-center font-semibold'>
          {modal === 'add' ? '판매 등록할 책 검색하기' : '수정 후 등록하기'}
        </p>
        <button className='absolute top-4 right-4' onClick={onClick}>
          닫기
        </button>
        {children}
      </section>
    </div>
  )
}

export default ModalContainer
