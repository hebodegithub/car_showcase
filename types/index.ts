import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?:
  MouseEventHandler<HTMLButtonElement>
  btnType?: "button" | "submit"
  rightIcon?: string;
  isDisabled?: boolean;
  textStyles?: string;
}

export interface SearchManufacturerProps { 
  searchManufacturer: string;
  setSearchManufacturer: (searchManufacturer: string) => void;
}

export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}



export interface FilterProps {
  manufacturer: string;
  model: string;
  fuel: string;
  year: number;
  limit: number;
}

export interface HomeProps {
  searchParams: FilterProps;
}



export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
  onChange: (value: string) => void;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
  setLimit: (limit: number) => void;
}

export interface SearchParams {
  manufacturer: string;
  model: string;
  fuel: string;
  year: number;
  limit: number;
}

export interface manufacturerProps { 
  setManufacturer: (value: string) => void
  setModel: (value: string) => void
}


export interface CardDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}