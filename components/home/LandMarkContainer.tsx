import { fetchLandmarks, fetchLandmarksHero } from "@/actions/actions"
import LandMarkList from "./LandMarkList"
import { LandmarkCardProps } from "@/utils/types"
import Hero from "../hero/Hero"
import CategoriesList from "./CategoriesList"
import EmptyList from "./EmptyList"



const LandMarkContainer =async ({search,category}:{search?:string,category?:string}) => {
    const landmarks:LandmarkCardProps[] = await fetchLandmarks({search,category})
    const landmarksHero:LandmarkCardProps[] = await fetchLandmarksHero()

    // if(landmarks.length === 0){
    //   return <EmptyList/>
    // }
    
  return (
    <div>
        <Hero Landmarks={landmarksHero}/>
        <CategoriesList search={search} category={category}/>
        {
          landmarks.length === 0 ? <EmptyList heading="No results" btnText="Clear Filter"/> : <LandMarkList Landmarks={landmarks}/>
        }
    </div>
  )
}
export default LandMarkContainer