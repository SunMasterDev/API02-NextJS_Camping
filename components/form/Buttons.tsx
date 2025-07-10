'use client'
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, RotateCw } from 'lucide-react';
import { SignInButton } from "@clerk/nextjs";

type btnSize = 'default' | 'lg' | 'sm'

type SubmitButton = {
    className?: string, size?: btnSize, text: string
}

export const SubmitButton = ({ className, size, text }: SubmitButton) => {
    //code
    const { pending } = useFormStatus()
    return <Button disabled={pending}
        type="submit"
        size={size}
        className={`${className} capitalize`}
    >{
            pending ? <><RotateCw className="animate-spin" />
                <span>please wait</span>
            </> : <p>{text}</p>
        }

    </Button>
}

export const SignInCardButton = () => {
    return <SignInButton mode="modal">
        <Button size='icon' variant='secondary'>
            <Heart/>
        </Button>
    </SignInButton>
}

export const CardSubmitButton=({isFavorite}:{isFavorite:boolean})=>{
    // console.log(isFavorite);
    const {pending}=useFormStatus() //จังหวะโหลดกด submit
    //pending จัดการความช้าของ แจ้งเตือน 
    
    return <Button type="submit" size='icon' variant='secondary' >
        {
            pending?<RotateCw className="animate-spin"/>:isFavorite?<Heart fill="red" />:<Heart/>
        }
    </Button>
}