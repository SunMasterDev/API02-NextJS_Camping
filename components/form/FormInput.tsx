import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type FormInputProps={
    name:string
    type:string
    label?:string
    defaultValue?:string
    placeholder?:string
}

const FormInput = (props:FormInputProps) => {
    const {name,type,label,defaultValue,placeholder} =props
    
    return (
        <div>
            <Label htmlFor={name} className="mb-2">{label}</Label>
            <Input name={name} type={type} 
            placeholder={placeholder}
            defaultValue={defaultValue}/>
        </div>
    )
}
export default FormInput