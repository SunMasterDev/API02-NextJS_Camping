import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { provinces } from "@/utils/province" 

const ProvinceInput = ({defaultValue}:{defaultValue?:string}) => { // ? สามารถเป็นค่าว่างได้
    const name = 'province'
    return (
        <div>
            <Label htmlFor={name} className="mb-2 capitalize">{name}</Label>
            <Select
            defaultValue={defaultValue || provinces[0].PROVINCE_NAME}
            name={name}
            required
            >
                <SelectTrigger className="w-full">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent >
                    {
                        provinces.map((item)=>{
                            return <SelectItem key={item.PROVINCE_ID} value={item.PROVINCE_NAME}>
                                <span className="capitalize flex items-center">
                                    {item.PROVINCE_NAME}
                                </span>
                            </SelectItem>
                        })
                    }
                </SelectContent>
            </Select>
        </div>
    )
}
export default ProvinceInput