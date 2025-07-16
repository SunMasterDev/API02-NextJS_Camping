import { AlignLeft } from 'lucide-react';
import UserIcon from './UserIcon';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import Link from 'next/link';
import { links } from '@/utils/links';

import SignOutLink from './SignOutLink';
import { SignedOut, SignInButton, SignUpButton, SignedIn } from '@clerk/nextjs';


const DropDownListMenu = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <UserIcon />
                        <AlignLeft />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/*ยังไม่ได้ login */}
                    <SignedOut>
                        <DropdownMenuItem >
                            {/* mode ทำให้หน้า Login อยู่กับปัจจุบัน */}
                            <SignInButton mode='modal'> 
                                <button>Log in</button>
                            </SignInButton>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <SignUpButton mode='modal'>
                                <button>Sign Up</button>
                            </SignUpButton>
                        </DropdownMenuItem>
                    </SignedOut>
                    {/* login แล้ว */}
                    <SignedIn>
                        {
                            links.map((item, index) => {
                                return <DropdownMenuItem key={index}>
                                    <Link href={item.href} className='capitalize'>
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            })
                        }
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            <SignOutLink />
                        </DropdownMenuItem>
                    </SignedIn>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
export default DropDownListMenu