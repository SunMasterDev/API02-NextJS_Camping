'use client'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Share } from 'lucide-react';
import { Button } from "../ui/button";
import {FacebookIcon,FacebookShareButton,TwitterShareButton,TwitterIcon} from 'react-share'

const ShareButton = ({ LandmarkId, name }: { LandmarkId: string, name: string }) => {
    const url=process.env.NEXT_PUBLIC_WEBSITE_URL
    const shareLink=`${url}/landmark/${LandmarkId}`
    return (
        <Popover>
            {/* asChild ส่งต่อ pop ไปให้ลูกเพื่อให้ซ้ำกัน popoverTrigger ไม่ซ้ำ button  */}
            <PopoverTrigger asChild> 
                <Button>
                    <Share />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="end"
            className="flex w-full items-center gap-2">
                <FacebookShareButton url={shareLink} name={name}>
                    <FacebookIcon size={'36px'} className="rounded-md"/>
                </FacebookShareButton>
                <TwitterShareButton url={shareLink} name={name}>
                    <TwitterIcon size={'36px'} className="rounded-md"/>
                </TwitterShareButton>
            </PopoverContent>
        </Popover>
    )
}
export default ShareButton