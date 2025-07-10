import { LandmarkCardProps } from "@/utils/types"
import LandMarkCard from "../card/LandMarkCard"


// [] เพื่อใช้เพื่อประกาศว่าเป็นอาร์เรย์ของชนิดข้อมูลนั้น ๆ
const LandMarkList = ({ Landmarks }: { Landmarks: LandmarkCardProps[] }) => {
  return (
    <section className="grid sm:grid-cols-2 
    lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-4">
      {
        Landmarks.map((Landmark) => {
          return <LandMarkCard key={Landmark.id} Landmark={Landmark} />
        })
      }
    </section>
  )
}
export default LandMarkList