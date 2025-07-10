import Link from "next/link"
import { Button } from "../ui/button"

const EmptyList = ({heading='No Item',message='Please Try Again',btnText='back home'}:{heading?:string,message?:string,btnText?:string}) => {
  return (
    <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold">{heading}</h2>
        <p className="text-lg mb-4">{message}</p>
        <Button className="capitalize" asChild> 
          {/* asChild ส่งความสามารถให้ลูก */}
          <Link href='/'>
          {btnText}
          </Link>
        </Button>
    </div>
  )
}
export default EmptyList