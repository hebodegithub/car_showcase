"use client"

import Image from "next/image";
import { Hero, CustomFilter, SearchBar } from '@/components'
import { fetchCars } from "@/utils";
import { CarCard } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { ShowMore } from "@/components";
import { HomeProps } from "@/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function Home({ searchParams }: HomeProps) {
  const router = useRouter(); 
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState(2022);
  const [limit, setLimit] = useState(10);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // 获取所有汽车
  const getCars = async () => {
    try {
      const allCars = await fetchCars({
        manufacturer: manufacturer || '',
        model: model || '',
        fuel: fuel || '',
        year: year || 2022,
        limit: limit || 10,
      });
      setAllCars(allCars);
    } catch (error) {
      console.log(error);
    }
  }
  //汽车搜索条件加钩子  挂载 更新 卸载
  useEffect(() => {
    setLoading(true);
    getCars();
    setLoading(false);
  }, [manufacturer, model, fuel, year, limit]);

  console.log('limit', limit)
  console.log('allCars', allCars.length)

  return (
    <main className="overflow-hidden">
      {/* 头部汽车 */}
      <Hero />
      <div className="padding-x padding-y max-width" id="discover">
        {/* 文字介绍 */}
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Car catalogue
          </h1>
          <p>Explore the cars you might like</p>
        </div>
        {/* 下拉搜索框+过滤器 */}
        <div className="home__filter-container margin-top-12">
          {/* //条件搜索框 */}
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <CustomFilter title="fuel" options={fuels} onChange={setFuel} />
          <CustomFilter title="year" options={yearsOfProduction} onChange={(value) => setYear(Number(value))}  />
        </div>

        {allCars.length > 0
          ?
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car}  />
              ))}
            </div>

            {loading && (<div className="mt-16 w-full flex-center">
              <Image src="/loader.svg" alt="loader" width={50} height={50} className="object-contain" />
            </div>)}

            {/* 分页 */}
            <ShowMore
              pageNumber= {limit || 10}
              isNext={(limit || 10) <= allCars.length}
              setLimit={setLimit}
            />
          </section>
          : 
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          </div>
        }
      </div>
    </main>
  
  );
}


