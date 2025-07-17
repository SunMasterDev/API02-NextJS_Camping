import LoadingCard from "@/components/card/LoadingCard"
import LandMarkContainer from "@/components/home/LandMarkContainer"
import { Suspense } from "react" //แสดงตอนโหลด item

const page = async({searchParams}:{searchParams:Promise<{search?:string,category?:string}>}) => {
  //Search
  const {search,category} = await searchParams

  return (
    <section>
      <Suspense fallback={<LoadingCard/>}>
        <LandMarkContainer search={search} category={category}/>
      </Suspense>
    </section>
  )
}
export default page