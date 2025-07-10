import { Label } from "../ui/label"
import { Input } from "../ui/input"


const ImageInput = () => {
    const name = 'image'
    return (
        <div className="mt-2">
            <Label className="capitalize mb-2">
                {name}
            </Label>
            <Input
                id={name}
                name={name}
                type="file"
                required
                accept="image/*" //กำหนด type image
            />
        </div>
    )
}
export default ImageInput