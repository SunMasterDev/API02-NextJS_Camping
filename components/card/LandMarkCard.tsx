import { LandmarkCardProps } from "@/utils/types"
import Image from "next/image"
import LandMarkRating from "./LandMarkRating"
import FavoriteToggleButton from "./FavoriteToggleButton"
import Link from "next/link"

const LandMarkCard = ({ Landmark }: { Landmark: LandmarkCardProps }) => { //[] ไม่ต้องใส่ต่อท้ายเพราะว่าเป็น object อยู่แล้ว
  const { name, image, id, description,
    price, province, lat, lng, category } = Landmark
  return (
    <article className="group relative">
      <Link href={`/landmark/${id}`}>
      <div className="relative h-[300px] rounded-md mb-2">
        <Image
          src={image}
          sizes="(max-width:768px) 100vw, 50vw"
          alt={name}
          fill
          className="object-cover rounded-md group-hover:scale-105
            transition-transform duration-300"
        />
      </div>

      <div className="flex justify-between items-center mt-1">
        <h3 className="text-sm font-semibold">{name.substring(0, 20)}</h3>
        <div className="flex">
          <LandMarkRating />
          <LandMarkRating />
          <LandMarkRating />
          <LandMarkRating />
        </div>
      </div>

      <p className="text-sm mt-1 text-muted-foreground">
        {/* substring กำหนดจำนวนตัวอักษรที่จะแสดงหน้าการ์ด */}
        {description.substring(0, 40)}
      </p>

      <div className="flex justify-between items-center mt-1 font-semibold text-sm">
        <span> {price} บาท </span>
        <p>{province}</p>
      </div>
        </Link>

      <div className="absolute top-2 right-2">
        <FavoriteToggleButton LandmarkId={id}/>
      </div>
    </article>
  )
}
export default LandMarkCard