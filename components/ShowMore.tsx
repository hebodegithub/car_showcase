"use client"

import { useRouter } from "next/navigation"
import { ShowMoreProps } from "@/types"
import CustomButton from "./CustomButton"
import { updateSearchParams } from "@/utils"



export const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    const currentLimit = Number(pageNumber);
    const newLimit = currentLimit + 10;
    const newPathName = updateSearchParams("limit", `${newLimit}`);
    setLimit(newLimit);
    router.push(newPathName);
  }

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue text-white rounded-full"
          handleClick={handleNavigation}
        />
       )}
    </div>
  )
}

export default ShowMore;
