'use client'

import { toggleFavoriteAction } from "@/actions/actions"
import FormContainer from "../form/FormContainer"
import { usePathname } from "next/navigation";
import { CardSubmitButton } from "../form/Buttons";

const FavoriteToggleForm = (
    {favoriteId,LandmarkId}
    :{favoriteId:string | null ,LandmarkId:string}) => {
        const pathname = usePathname()
        console.log(favoriteId);
        console.log(pathname);

        const toggleAction=toggleFavoriteAction.bind(null,{favoriteId,
            LandmarkId,pathname
        })
        
  return (
    <FormContainer action={toggleAction}>
        <CardSubmitButton isFavorite={favoriteId ? true : false}/>
    </FormContainer>
  )
}
export default FavoriteToggleForm