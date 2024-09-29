"use client"
import React, { useState } from 'react'
import { SearchManufacturerProps } from '../types'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react'
import Image from 'next/image'
import { manufacturers } from '@/constants'
import { Fragment } from "react";

//一个下拉框 + 一个输入框   下拉首先遍历显示  点击修改最终值  输入修改最终值

//选择框操作按钮 最终组件样式
const SearchManufacturer = ({ searchManufacturer, setSearchManufacturer }: SearchManufacturerProps) => {
  //输入框组件内容   输入更新setQuery  选择更新setSelected
  const [query, setQuery] = useState('')

  const filteredManufacturers =
    query === ''
      ? manufacturers 
      : manufacturers.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
       
  return (
    <div className='search-manufacturer'>
      <Combobox value={searchManufacturer} onChange={setSearchManufacturer}>
        <div className='relative w-full'>

          {/* 车标下拉框 */}
          {/* Button for the combobox. Click on the icon to see the complete dropdown */}
          <ComboboxButton className='absolute top-[14px]'>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              className='ml-4'
              alt='car logo'
            />
          </ComboboxButton>

          {/* 文本输入框 */}
          {/* Input field for searching */}
          <ComboboxInput
            className='search-manufacturer__input '
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
            placeholder='Volkswagen...'
          />

          
          {/* Transition for displaying the options */}
          {/* 处理选项列表的显示/隐藏动画。 */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            // Reset the search query after the transition completes
            afterLeave={() => setQuery("")
            }
          >
            {/* 显示修改框 */}
            <ComboboxOptions
              className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10'
              static
            >
              {/* 无值显示 ： 有值显示 */}
              {filteredManufacturers.length === 0 && query !== "" ? (
                <ComboboxOption
                  value={query}
                  className='search-manufacturer__option'
                >
                  Create "{query}"
                </ComboboxOption>
              ) : (
                filteredManufacturers.map((item) => (
                  <ComboboxOption
                    key={item}
                    className={({ focus }) =>
                      `relative search-manufacturer__option ${
                    focus ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span className={`block truncate ${focus ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${focus? "text-white": "text-pribg-primary-purple"}`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
export default SearchManufacturer


//https://headlessui.com/react/combobox 组件交互网站
