"use client"
import React from 'react'
import SearchManufacturer from './SearchManufacturer' 
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const SearchButton = ({otherClasses} : {otherClasses: string}) => (
  <button type='submit' className={`ml-3 z-10 ${otherClasses}`}>
    <Image
      src='/magnifying-glass.svg'
      alt='magnifying-glass'
      width={40}
      height={40}
      className='object-contain' />
  </button>
)

//搜索框组件
const SearchBar = () => {
  const [searchManufacturer, setSearchManufacturer] = useState('')
  const [searchModel, setSearchModel] = useState('')
  const router = useRouter()

  //按条件搜索汽车
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(searchManufacturer === '' && searchModel === '') {
      return alert('Please fill in the search bar')
    }
    updateSearchParams(
      searchModel.toLowerCase(),
      searchManufacturer.toLowerCase()
    )
  }

  //更新url
  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer)
    } else {
      searchParams.delete('manufacturer')
    }

    if(model) {
      searchParams.set('model', model)
    } else {
      searchParams.delete('model')
    }

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathName)
  } 


  return (
    <form onSubmit={handleSearch} className='searchbar'>
      <div className='searchbar__item'>
        {/* 搜索框切换操作组件 */}
        <SearchManufacturer
          searchManufacturer={searchManufacturer}
          setSearchManufacturer = {setSearchManufacturer}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          alt='car model'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
        />
        <input
          type='text'
          name='model'
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder='Tiguan...'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  )
}

export default SearchBar
