import { fetchFavorites } from "@/actions/actions"
import EmptyList from "@/components/home/EmptyList";
import LandMarkList from "@/components/home/LandMarkList";

const favoritsPage =async () => {
  const favorits= await fetchFavorites()
  // console.log(favorits);
  if(favorits.length==0){
    return <EmptyList heading="No item favorits"/>
  }
  
  return (
    <LandMarkList Landmarks={favorits}/>
  )
}
export default favoritsPage