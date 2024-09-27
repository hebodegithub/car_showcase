import { CarProps } from "@/types";

export async function generateCarImageUrl(car: CarProps, angle?: string) {
  const url = new URL('https://cdn.imagin.studio/getimage');

  const { make, model, year } = car;
  
  
}