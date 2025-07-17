import { fetchLandmarkDetail } from "@/actions/actions"
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrumbs from "@/components/landmark/Breadcrumbs";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import MapLandMark from "@/components/map/MapLandMark";
import { redirect } from "next/navigation";



export default async function LandmarkDetail ({params}:{params:{id:string}}) {
    const {id} = await params
    const landmark= await fetchLandmarkDetail({id})

    if(!landmark) redirect('/')

    const {name,image,description,lat,lng}=landmark
      
    // console.log(landmark);
    
  return (
    <section>
      <Breadcrumbs name={name}/>
      <header className="flex justify-between mt-4 items-center">
          <h1 className="text-4xl font-bold">{name}</h1>
          
          <div className="flex items-center gap-x-4">
            <span className="capitalize"><ShareButton LandmarkId={id} name={name}/></span>
            <FavoriteToggleButton LandmarkId={id}/>
          </div>
      </header>
      {/* Image */}
      <ImageContainer mainImage={image} name={name}/>
      {/* Detail */}
      <section>
        <div>
          <Description  description={description}/>
          <MapLandMark location={{lat:lat,lng:lng}}/>
        </div>
      </section>
      </section>
  )
}