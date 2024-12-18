'use client'

import { deleteBookAction } from '@/app/actions'
import { useParams, useRouter } from 'next/navigation'

import { useState } from 'react'

const DeleteBookButton = () => {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmDelete = confirm('정말로 삭제하시겠습니까?')

    if (confirmDelete) {
      setIsDeleting(true)
      const result = await deleteBookAction(id)

      if (result.success) {
        alert('책이 성공적으로 삭제되었습니다.')
        router.push('/')
      } else {
        alert('잠시 후 다시 시도해주세요.')
        setIsDeleting(false)
      }
    }
  }
  return <button onClick={handleDelete}>{isDeleting ? '삭제 중...' : '삭제하기'}</button>
}

export default DeleteBookButton
