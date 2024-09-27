import { CarProps } from "@/types";
import { FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, year, fuel, limit } = filters;
  const headers = {
    'X-RapidAPI-Key': 'b948f07923msh11a739b7b40b47ep1ae744jsnc48160eacb38',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
  }

  const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}$yaer=${year}$fuel=${fuel}$limit=${limit}`, {
    headers: headers,
  });

  const result = await response.json();

  return result;
}


export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
 
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0); 
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, model, year } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(' ')[0]);
 
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}


export const updateSearchParams = (type: string, value: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.set(type, value);
  const newPathName = `${window.location.pathname}?${newSearchParams.toString()}`
  return newPathName;
}

