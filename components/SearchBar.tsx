"use client"
import React from 'react'
import SearchManufacturer from './SearchManufacturer' 
import { useState } from 'react'

//搜索框组件
const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('')
  const handleSearch = () => {}
  return (
    <form onSubmit={handleSearch} className='searchbar'>
      {/* 搜索框切换操作组件 */}
      <SearchManufacturer
        manufacturer={manufacturer}
        setManufacturer = {setManufacturer}
      />
    </form>
  )
}

export default SearchBar
