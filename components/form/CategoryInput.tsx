import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from "@/utils/category"

const CategoryInput = ({defaultValue}:{defaultValue?:string}) => { // ? สามารถเป็นค่าว่างได้
    const name = 'category'
    return (
        <div>
            <Label htmlFor={name} className="mb-2 capitalize">{name}</Label>
            <Select
            defaultValue={defaultValue || categories[0].label}
            name={name}
            required
            >
                <SelectTrigger className="w-full">
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent >
                    {
                        categories.map((item)=>{
                            return <SelectItem key={item.label} value={item.label}>
                                <span className="capitalize flex items-center gap-4">
                                    <item.icon/>
                                    {item.label}
                                </span>
                            </SelectItem>
                        })
                    }
                </SelectContent>
            </Select>
        </div>
    )
}
export default CategoryInput