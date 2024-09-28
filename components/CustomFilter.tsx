"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps } from '@/types'
import { ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react'
import { Fragment } from 'react'
import { updateSearchParams } from '@/utils'

const CustomFilter = ({title, options}: CustomFilterProps) => {
  const router = useRouter()
  const [selected, setSelected] = useState(options[0])

  const handleUpdateParams = (e: { title: string, value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase())
    router.push(newPathName)
  }

  return (
    <div className='w-fit '>
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e)
          handleUpdateParams(e)
          // setFilter(e.value)
        }}
      >
        <div className='relative w-fit z-10'>
          <ListboxButton className="custom-filter__btn">
            <span className='block truncate'>{selected.title}</span>
            <Image src="/chevron-up-down.svg" width={20} height={20} className='ml-4 object-contain' alt='chevron up down' />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
          <ListboxOptions
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  value={option}
                  className={({focus}) => `relative cursor-default select-none py-2 px-4 ${focus ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                >
                  {({selected}) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter