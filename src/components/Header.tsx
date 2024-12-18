'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'title' | 'author'>('title')

  const router = useRouter()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) {
      params.set('type', searchType)
      params.set('query', searchQuery)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className='flex justify-between gap-10'>
      <Link href='/' className='bg-slate-900 text-white p-4 rounded-lg'>
        BookStore Management
      </Link>
      <form onSubmit={handleSearch} className='flex gap-4 items-center'>
        <select
          className='border rounded-md p-2'
          onChange={(e) => setSearchType(e.target.value as 'title' | 'author')}
          value={searchType}
        >
          <option value='title'>제목</option>
          <option value='author'>저자</option>
        </select>
        <input
          className='p-2 border rounded-md'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='검색어를 입력해주세요'
        />
      </form>
    </div>
  )
}

export default Header
