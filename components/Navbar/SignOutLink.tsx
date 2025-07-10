"use client"
import { SignOutButton } from "@clerk/nextjs"
import { toast } from "sonner"

const SignOutLink = () => {
  return (
    <SignOutButton redirectUrl="/">
        <button className="w-full text-left"
        onClick={() =>
        toast("LogOut Success", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })}>Log out</button>
    </SignOutButton>
    
  )
}
export default SignOutLink