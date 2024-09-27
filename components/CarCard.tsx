"use client"
import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { CarProps } from '@/types'
import CustomButton from './CustomButton'
import { calculateCarRent } from '@/utils'
import CardDetails from './CardDetails'

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({car}: CarCardProps) => {
  // const { city_mpg, class, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year } = car;
  const {city_mpg, class: drive, make, model, transmission, year} = car;
  const carRent = calculateCarRent(city_mpg, year);
  const [isOpen, setIsOpen] = useState(false);
  return (
    //汽车卡片组件
    <div className='car-card group'>
      {/* //单个汽车卡片块   标题图片加 下面三个块 */}
      <div className='car-card__content'>
        {/* 标题加段落 */}
        <h2 className='car-card__content-title'>{make} {model}</h2>
        <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
          <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
          {carRent}
          <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
        </p>
        {/* 汽车图片 */}
        <div className='relative w-full h-40 my-3 object-contain'>
          <Image src='/hero.png' alt='car model' fill priority className='object-contain' />
        </div>

        {/* 下面是三个块 */}
        <div className='relative flex w-full mt-2'>
          <div className='flex group-hover:invisible w-full justify-between text-grey'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' />
              <p className='text-[14px] leading-[17px]'>
                {transmission === 'a' ? 'Automatic' : 'Manual'}
              </p>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <Image src='/tire.svg' width={20} height={20} alt='tire' />
              <p className='text-[14px] leading-[17px]'>
                {drive.toUpperCase()}
              </p>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <Image src='/gas.svg' width={20} height={20} alt='gas' />
              <p className='text-[14px] leading-[17px]'>
                {city_mpg} MPG
              </p>
            </div>
          </div>
          {/* 按钮 */}
          <div className='car-card__btn-container '>
            {/* 按钮无法正常显示 */} 
            <CustomButton 
              title='View More'
              containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
              textStyles='text-white text-[14px] leading-[17px] font-bold'
              rightIcon='/right-arrow.svg'
              handleClick={() => setIsOpen(true)}
            />
          </div>
        </div>

        {/* 弹窗 */}
        <CardDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
      </div>
    </div>
  )
}

export default CarCard
